import chai from 'chai';
import _ from 'lodash';
import app from '../../app';
import request from 'supertest';
import Article from './article.model.js';
import User from '../user/user.model';
chai.should();

var expect = chai.expect;

var user = {
  username: 'fakeuser',
  email: 'test@test.com',
  password: 'password',
  role: 'admin'
};
var userToken;

var newArticle = {
  title: 'Testing Article',
  seoTitle: 'testing-post',
  content: '<p>This is a testing post</p>',
  state: 'Published'
};

/**
 * Remove all users and create an admin
 * @param {Function} done Callback to be invoked when done.
 */
function createAdmin(done) {
  User.remove().exec().then(() => {
    // Create user
    new User(user).save((err, user) => {
      if (err) { return done(err); }
      // Get auth token for user
      var credentials = {
        'email': user.email,
        'username': user.username,
        'password': user.password
      };

      request(app)
        .post('/auth/local')
        .send(credentials)
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err); }
          userToken = res.body.token;
          done();
      });
    });
  });
}

/**
 * Add post as an admin with Bearer token
 *
 * @param {Object} Article that should be added
 * @returns {Promise}
 */
function addArticleAsAdmin(post) {
  return new Promise(resolve => {
    request(app)
      .post('/api/articles')
      .set('authorization', 'Bearer ' + userToken)
      .send(post)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(err => {
        if (err) { throw err.message; }
        resolve();
      });
  });
}

/**
 * Clear all articles
 * @param {Function} done Callback to be invoked when done.
 */
function clearAllArticles(done) {
  Article.remove().exec().then(() => {
    done();
  });
}

describe('Article API', function() {
  before(done => createAdmin(done));
  before(done => clearAllArticles(done));
  afterEach(done => clearAllArticles(done));

  it('should add new article to the database', done => {
    addArticleAsAdmin(newArticle).then(function checkDatabase() {
      Article.find({}, (err, articles) => {
        if (err) { return done(err); }
        articles.should.have.length(1);
        done();
      });
    });
  });

  it('should not add post with the same seoTitle to the database', done => {
    // Add first post.
    addArticleAsAdmin(newArticle).then(function addSecond() {
      request(app)
        .post('/api/articles')
        .set('authorization', 'Bearer ' + userToken)
        .send(newArticle) // Same post
        .expect(400, done); // Validation Error
    });
  });

  it('should reject article without a title', done => {
    var postWithoutTitle = _.clone(newArticle);
    postWithoutTitle.title = '';
    // Try to add the post
    request(app)
      .post('/api/articles')
      .set('authorization', 'Bearer ' + userToken)
      .send(postWithoutTitle)
      .expect(400, done);
  });

  it('should respond with a single post', done => {
    // Add post. Should be able to add
    addArticleAsAdmin(newArticle).then(function getArticle() {
      request(app)
        .get('/api/articles/' + newArticle.seoTitle)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) { return done(err); }
          res.body.should.be.json;
          done();
        });
    });
  });

  it('should respond with JSON array', done => {
    request(app)
      .get('/api/articles')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { return done(err); }
        res.body.results.should.be.instanceof(Array);
        res.body.total.should.equal(0);
        done();
      });
  });

  it('should not respond with drafts when unauthorized', done => {
    request(app)
      .get('/api/articles?state=Draft')
      .expect(401, done);
  });

  it('should show all article when authorized', done => {
    request(app)
      .get('/api/articles?state=any')
      .set('authorization', 'Bearer ' + userToken)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { return done(err); }
        res.body.results.should.be.instanceof(Array);
        done();
      });
  });

  it('should be able to remove an article', done => {
    addArticleAsAdmin(newArticle).then(function removeArticle() {
      request(app)
        .delete('/api/articles/' + newArticle.seoTitle)
        .set('authorization', 'Bearer ' + userToken)
        .expect(200, checkDatabase);

        function checkDatabase(err) {
          if (err) { return done(err); }
          Article.find({}, (err, articles) => {
            if (err) { return done(err); }
            articles.should.have.length(0);
            done();
          });
        }
    });
  });

  it('should be able to edit a post', done => {
    addArticleAsAdmin(newArticle).then(function editArticle() {
      let editedArticle = {
        title: 'Testing edited Article',
        seoTitle: 'testing-edited-post',
        content: '<p>This is a testing of edited post</p>'
      };

      request(app)
        .patch('/api/articles/' + newArticle.seoTitle)
        .set('authorization', 'Bearer ' + userToken)
        .send(editedArticle)
        .expect(200, checkDatabase);

      function checkDatabase(err) {
        if (err) { return done(err); }

        Article.findOne({seoTitle: editedArticle.seoTitle}, (err, article) => {
          if (err) { return done(err); }

          expect(article).to.exist;
          article.title.should.be.equal(editedArticle.title);
          article.seoTitle.should.be.equal(editedArticle.seoTitle);
          article.content.should.be.equal(editedArticle.content);
          article.state.should.be.equal(newArticle.state, 'should contain unchanged properties');
          done();
        });
      }
    });
  });

  it('should not be able to remove post when not authorized', done => {
    addArticleAsAdmin(newArticle).then(function removeArticle() {
      request(app)
        .delete('/api/articles/' + newArticle.seoTitle)
        .expect(401, done);
    });
  });

  it('should not be able to edit post when not authorized', done => {
    addArticleAsAdmin(newArticle).then(function removeArticle() {
      request(app)
        .patch('/api/articles/' + newArticle.seoTitle)
        .expect(401, done);
    });
  });
});

describe('Article comments API', () => {
  before(done => createAdmin(done));
  before(done => clearAllArticles(done));
  afterEach(done => clearAllArticles(done));


  function findCommentId(comment) {
    return new Promise(function (resolve) {
      Article.findOne({ 'comments.author.name': comment.author.name })
        .exec((err, article) => {
          if (err) { throw err; }
          let commentId = article.comments.filter(c => {
            return c.author.name === comment.author.name;
          }).pop()._id;

          resolve(commentId);
      });
    });
  }

  it('should be able to post a comment', done => {
    addArticleAsAdmin(newArticle).then(() => {
      let comment = {
        body: 'Hey, Tests are awesome',
        author: {
          name: 'Tester',
          email: 'testing@awesome.com'
        },
        isReply: false
      };

      request(app)
        .post(`/api/articles/${newArticle.seoTitle}/comment`)
        .send(comment)
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });

  it('should return not accept a comment without email', done => {
    addArticleAsAdmin(newArticle).then(() => {
      let comment = {
        body: 'Hey, Tests are awesome',
        author: {
          name: '', // left blank
          email: 'testing@awesome.com'
        },
        isReply: false
      };

      request(app)
        .post(`/api/articles/${newArticle.seoTitle}/comment`)
        .send(comment)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  it('should not accept a comment when commenter has no name', done => {
    addArticleAsAdmin(newArticle).then(() => {
      let comment = {
        body: 'Hey, Tests are awesome',
        author: {
          name: 'Tester',
          email: '' // left blank
        },
        isReply: false
      };

      request(app)
        .post(`/api/articles/${newArticle.seoTitle}/comment`)
        .send(comment)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
  });

  it('should be able to remove a comment', done => {
    let comment = {
      body: 'Hey, Tests are awesome',
      author: {
        name: 'Tester',
        email: 'testing@awesome.com'
      },
      isReply: false
    };

    addArticleAsAdmin(newArticle).then(function addComment(post) {
      request(app)
        .post(`/api/articles/${newArticle.seoTitle}/comment`)
        .send(comment)
        .expect('Content-Type', /json/)
        .expect(201, removeCommentUnauthorized);
      });

    function removeCommentUnauthorized(err) {
      if (err) { return done(err); }
      // get comment id
      findCommentId(comment).then(commentId => {
        // Try unauthorized
        request(app)
          .delete(`/api/articles/${newArticle.seoTitle}/comment/${commentId}`)
          .expect(401)
          .end((err) => {
            if (err) { return done(err); }
            removeCommentAuthorized(commentId);
          });
      });
    }

    function removeCommentAuthorized(commentId) {
      request(app)
        .delete(`/api/articles/${newArticle.seoTitle}/comment/${commentId}`)
        .set('authorization', 'Bearer ' + userToken)
        .expect(200, done);
    }
  });

  it('should be able to edit a comment', done => {
    let comment = {
      body: 'Hey, Tests are awesome',
      author: {
        name: 'Tester',
        email: 'testing@awesome.com'
      },
      isReply: false
    };

    let editedComment = {
      body: 'edited comment'
    };

    addArticleAsAdmin(newArticle).then(() => {
      request(app)
        .post(`/api/articles/${newArticle.seoTitle}/comment`)
        .send(comment)
        .expect('Content-Type', /json/)
        .expect(201, editCommentUnauthorized);
    });

    function editCommentUnauthorized(err, res) {
      if (err) { return done(err); }
      findCommentId(comment).then(commentId => {
        request(app)
          .patch(`/api/articles/${newArticle.seoTitle}/comment/${commentId}`)
          .send(editedComment)
          .expect(401, (err) => {
            if (err) { return done(err); }
            editCommentAuthorized(commentId);
          });
      });
    }

    function editCommentAuthorized(commentId) {
      request(app)
        .patch(`/api/articles/${newArticle.seoTitle}/comment/${commentId}`)
        .set('authorization', 'Bearer ' + userToken)
        .send(editedComment)
        .expect(200, err => {
          if (err) { return done(err); }
          checkDatabase();
        });
    }

    function checkDatabase() {
      Article.find({}, (err, post) => {
        if (err) { return done(err); }
        post[0].comments[0].body.should.equal(editedComment.body);
        done();
      });
    }
  });
});

describe('Article all comments API', () => {
  before(done => createAdmin(done));
  before(done => {
    // Create Articles with comments
    Article.remove().exec()
      .then(() => {
        return addArticleAsAdmin(newArticle);
      }).then(() => {
        newArticle.title = 'Second Article';
        newArticle.seoTitle = 'second-post';
        return addArticleAsAdmin(newArticle);
      }).then(() => {
        let comment1 = {
          body: 'First testing comment that should be oldest',
          isReply:  false,
          date: '2013-06-01T14:43:21.692Z',
          author: {
              name: 'Tester',
              email: 'testing@awesome.com'
          }
        };

        let comment2 = {
          body: 'Second testing comment that should be in the middle',
          isReply:  false,
          date: '2014-06-01T14:43:21.692Z',
          author: {
              name: 'Tester',
              email: 'testing@awesome.com'
          }
        };

        let comment3 = {
          body: 'Third testing comment that should be newest',
          isReply:  false,
          date: '2015-06-01T14:43:21.692Z',
          author: {
              name: 'Tester',
              email: 'testing@awesome.com'
          }
        };

        let firstArticleAddition = Article.findOne({seoTitle: 'testing-post'}).exec((err, post) => {
          if (err) { return done(err); }

          post.comments.push(comment1, comment2);
          return post.save();
        });

        let secondArticleAddition = Article.findOne({seoTitle: 'second-post'}).exec((err, post) => {
          if (err) { return done(err); }

          post.comments.push(comment3);
          return post.save();
        });

        return Promise.all([firstArticleAddition, secondArticleAddition]);
      }).then(() => done());
  });

  after(done => {
    Article.remove().exec().then(() => done());
  });
  after(done => {
    User.remove().exec().then(() => done());
  })

  it('should show all latest comments', done => {
    request(app)
      .get(`/api/articles/comments`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { return done(err); }
        res.body.results.should.be.instanceof(Array);
        res.body.total.should.be.eql(3);
        res.body.results[0].seoTitle.should.be.eql('second-post'); // test if the newest comment is on top
        done();
      });
  });

  it('should accept query parameters for all latest comments', done => {
    request(app)
      .get(`/api/articles/comments?limit=1&skip=1&sort=comments.date`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { return done(err); }
        res.body.results.should.be.instanceof(Array);
        res.body.results.length.should.be.eql(1);
        res.body.total.should.be.eql(3);
        expect(res.body.results[0].comments.body).to.contain('Second'); // test if the newest comment is on top
        done();
      });
  });

  it('should not show all latest comments for drafts when unauthorized', done => {
    request(app)
      .get(`/api/articles/comments?state=Draft`)
      .expect(401, done);
  });

  it('should show all latest comments for drafts when authorized', done => {
    request(app)
      .get(`/api/articles/comments?state=Draft`)
      .set('authorization', 'Bearer ' + userToken)
      .expect(200, done);
  });
});
