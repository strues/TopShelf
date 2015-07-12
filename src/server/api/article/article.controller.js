import reportError from '../../lib/errors/reporter';
import _ from 'lodash';
import Article from './article.model';
import QueryParser from '../../lib/queryParser';
import isNumeric from 'isnumeric';
import auth from '../../auth/auth.service';

/**
 * Get single Article by a query
 *
 * @param {string|int} query - seoTitle or id of the article
 * @returns Article.query
 */
function singleArticleQuery(query) {
  let article;
  if (isNumeric(query)) {
    article = Article.findById(query);
  } else {
    article = Article.findOne({
      'seoTitle': query
    });
  }
  return article;
}

// Get list of articles
exports.index = function(req, res) {

  const defaultConditions = {
    state: 'Published'
  };

  const defaultOptions = {
    limit: 10,
    sort: '-createdDate'
  };

  let conditions = QueryParser.getConditions(req.query, defaultConditions);
  let options = QueryParser.getOptions(req.query, defaultOptions);

  if (conditions.state !== 'Published') {
    auth.hasRole('admin')(req, res, returnArticles);
  } else {
    returnArticles();
  }

  function returnArticles(err) {
    if (err) {
      return res.status(401).json(err.message);
    }
    let articles = Article.find(conditions, null, options)
      .populate('author', '-salt -hashedPassword')
      .exec();
    let count = Article.count(conditions).exec();

    Promise.all([articles, count]).then(results => {
      let response = {
        total: results[1],
        results: results[0]
      };
      return res.status(200).json(response);
    });
  }
};

/**
 * Get a single article
 *
 * We can search a post by a seoTitle as well.
 *
 */
exports.show = function(req, res) {

  let response = function(err, article) {
    if (err) {
      return res.status(500).json(reportError(err));
    }
    if (!article) {
      return res.status(404);
    }

    return res.json(article);
  };

  singleArticleQuery(req.params.id)
    .populate('author', '-salt -hashedPassword')
    .exec(response);
};

// Creates a new post in the DB.
exports.create = function(req, res) {
  // Set author of the post
  // The `isAuthenticated` function set user to the request.
  let newArticle = req.body;
  newArticle.author = req.user._id;
  newArticle.lastUpdated = Date.now();

  Article.create(newArticle, function(err, article) {
    if (err) {
      return res.status(400).json(reportError(err));
    }
    return res.status(201).json(article);
  });
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  singleArticleQuery(req.params.id).exec((err, article) => {
    if (err) {
      return res.status(500).json(reportError(err));
    }
    if (!article) {
      return res.sendStatus(404);
    }

    let updated = _.merge(article, req.body);
    updated.lastUpdated = Date.now();

    updated.save(() => {
      if (err) {
        return res.status(400).json(reportError(err));
      }
      return res.status(200).json(article);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  singleArticleQuery(req.params.id).exec((err, article) => {
    if (err) {
      return res.status(500).json(reportError(err));
    }
    if (!article) {
      return res.sendStatus(404);
    }
    article.remove(function() {
      if (err) {
        return res.status(400).json(reportError(err));
      }
      return res.sendStatus(200);
    });
  });
};

/**
 * Adds new comment to the post
 */
exports.addComment = function(req, res) {
  let comment = req.body;
  comment.date = Date.now();

  singleArticleQuery(req.params.id).exec((err, article) => {
    if (err) {
      return res.status(500).json(reportError(err));
    }
    if (!article) {
      return res.status(404).json({
        message: 'Article does not exist'
      });
    }
    article.comments.push(comment);
    article.save(() => {
      if (err) {
        return res.status(400).json(reportError(err));
      }
      return res.status(201).json(article);
    });

  });
};

/**
 * Edit comment by comment ID
 */
exports.editComment = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  // get post
  singleArticleQuery(req.params.id).exec((err, article) => {
    if (err) {
      return res.status(500).json(reportError(err));
    }
    if (!article) {
      return res.sendStatus(404);
    }

    // get comment
    let comment = article.comments.id(req.params.commentId);
    if (!comment) {
      return res.sendStatus(404);
    }
    _.merge(comment, req.body);

    article.save(() => {
      if (err) {
        return res.status(400).json(reportError(err));
      }
      return res.status(200).json(article);
    });
  });
};

/**
 * Delete comment by its ID
 */
exports.destroyComment = function(req, res) {
  singleArticleQuery(req.params.id).exec((err, article) => {
    if (err) {
      return res.status(500).json(reportError(err));
    }
    if (!article) {
      return res.sendStatus(404);
    }

    // get comment
    let comment = article.comments.id(req.params.commentId);
    if (!comment) {
      return res.sendStatus(404);
    }
    comment.remove();

    article.save(() => {
      if (err) {
        return res.status(400).json(reportError(err));
      }
      return res.status(200).json(article);
    });
  });
};

/**
 * Get all comments
 */
exports.getAllComments = function(req, res) {
  let defaultConditions = {
    state: 'Published'
  };

  let defaultOptions = {
    limit: 10,
    sort: '-comments.date',
    skip: 0
  };

  let conditions = QueryParser.getConditions(req.query, defaultConditions);
  let options = QueryParser.getOptions(req.query, defaultOptions);

  if (conditions.state !== 'Published') {
    auth.hasRole('admin')(req, res, returnArticles);
  } else {
    returnArticles();
  }

  function returnArticles(err) {
    if (err) {
      return res.status(401).json(err.message);
    }

    let results = Article.aggregate()
      .match(conditions)
      .unwind('comments')
      .sort(options.sort)
      .skip(parseInt(options.skip))
      .limit(parseInt(options.limit))
      .exec();

    let total = Article.aggregate()
      .group({
        _id: null,
        count: {
          $sum: {
            $size: '$comments'
          }
        }
      })
      .exec();

    Promise.all([results, total]).then(response => {
      return res.status(200).json({
        total: response[1][0].count,
        results: response[0]
      });
    });
  }
};

Article.on('error', function(err) {
  return err;
});
