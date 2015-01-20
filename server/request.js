var https = require('https');
var http  = require('http');

function responseHandler(res, done) {
    var data = '';

    res.on('data', function (chunk) {
        data += chunk;
    });

    res.on('end', function () {
        data = JSON.parse(data);
        done(data);
    });
}

module.exports = {
    oauth: function(host, path, token, done) {
        var request = https.request({
            host: host,
            path: path + '?access_token=' + token,
            port: 443,
            method: 'GET',
            headers: {
                Authorization: 'OAuth ' + token
            }
        },
        function(res) {
            responseHandler(res, done);
        });
        request.end();
    },
    bnet: function(host, path, done) {
        var request = http.request({
            host: host,
            path: path,
            port: 80,
            method: 'GET'
        },
        function(res) {
            responseHandler(res, done);
        });
        request.end();
    }
};
