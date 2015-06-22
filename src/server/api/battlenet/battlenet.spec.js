import chai from 'chai';
import _ from 'lodash';
import request from 'supertest';
import app from '../../app';
import Character from '../user/character.model.js';
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

var newCharacter = {
		characterName: 'Soopie'
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
function addCharacterAsAdmin(recruitment) {
    return new Promise(resolve => {
        request(app)
            .post('/api/battlenet/character')
            .set('authorization', 'Bearer ' + userToken)
            .send(newCharacter)
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
 * Clear all characters from db
 * @param {Function} done Callback to be invoked when done.
 */
function clearAllCharacters(done) {
    Character.remove().exec().then(() => {
        done();
    });
}

describe('Battlenet API', function() {
    before(done => createAdmin(done));
    before(done => clearAllCharacters(done));
    afterEach(done => clearAllCharacters(done));

    it('should add new character to the database', done => {
        addCharacterAsAdmin(newCharacter).then(function checkDatabase() {
            Character.find({}, (err, characters) => {
                if (err) {
                    return done(err);
                }
                characters.should.have.length(
                    1);
                done();
            });
        });
    });

    it('should respond with JSON array', done => {
        request(app)
            .get('/api/battlenet/character')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });

}); // end
