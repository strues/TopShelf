import should from 'should';
const app = require('../../app');
import {request} from 'supertest';

describe('GET /api/roles', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/roles')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
