import chai from 'chai';
import _ from 'lodash';
import app from '../../app';
import request from 'supertest';
import Recruitment from './recruitment.model.js';
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

var newRecruitment = {
    classType: 'Warrior',
    classSpec: 'Protection',
    priority: 'high',
    currentlyRecruiting: true
};

/**
 * Remove all users and create an admin
 * @param {Function} done Callback to be invoked when done.
 */
function createAdmin(done) {
    User.remove().exec().then(() => {
        // Create user
        new User(user).save((err, user) => {
            if (err) {
                return done(err);
            }
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
                    if (err) {
                        return done(err);
                    }
                    userToken = res.body.token;
                    done();
                });
        });
    });
}

/**
 * Add recruitment as an admin with Bearer token
 *
 * @param {Object} Recruitment that should be added
 * @returns {Promise}
 */
function addRecruitmentAsAdmin(recruitment) {
    return new Promise(resolve => {
        request(app)
            .post('/api/recruiting')
            .set('authorization', 'Bearer ' + userToken)
            .send(recruitment)
            .expect('Content-Type', /json/)
            .expect(201)
            .end(err => {
                if (err) {
                    throw err.message;
                }
                resolve();
            });
    });
}

/**
 * Clear all recruitments
 * @param {Function} done Callback to be invoked when done.
 */
function clearAllRecruitments(done) {
    Recruitment.remove().exec().then(() => {
        done();
    });
}

describe('Recruitment API', function() {
    before(done => createAdmin(done));
    before(done => clearAllRecruitments(done));
    afterEach(done => clearAllRecruitments(done));

    it('should add new recruitment to the database', done => {
        addRecruitmentAsAdmin(newRecruitment).then(function checkDatabase() {
            Recruitment.find({}, (err, recruitments) => {
                if (err) {
                    return done(err);
                }
                recruitments.should.have.length(
                    1);
                done();
            });
        });
    });

    it('should respond with JSON array', done => {
        request(app)
            .get('/api/recruiting')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });

}); // end
