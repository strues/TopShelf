import http from 'http';
import https from 'https';

function responseHandler (res, done) {
  var data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    data = JSON.parse(data);
    done(data);
  });
}

module.exports = {
  oauth: (host, path, token, done) => {
    var rq = https.request({
        host: host,
        path: path + '?access_token=' + token,
        port: 443,
        method: 'POST',
        headers: {
          Authorization: 'OAuth ' + token
        }
      },
      (res) => {
        responseHandler(res, done);
      });
    rq.end();
  },
  bnet: (host, path, done) => {
    var rq = http.request({
        host: host,
        path: path,
        port: 80,
        method: 'GET'
      },
      (res) => {
        responseHandler(res, done);
      });
    rq.end();
  }
};
