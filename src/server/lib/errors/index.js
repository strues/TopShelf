
/**
 * Error responses
 */

'use strict';

module.exports[404] = function pageNotFound(req, res) {
    var viewFilePath = '404';
    var statusCode = 404;
    var result = {
        status: statusCode
    };

    res.status(result.status);
    res.render(viewFilePath, function(err) {
        if(err) {
            return res.json(result, result.status);
        }

        res.render(viewFilePath);
    });
};

module.exports[410] = function pageGone(req, res) {
    var viewFilePath = '410';
    var statusCode = 410;
    var result = {
        status: statusCode
    };

    res.status(result.status);
    res.render(viewFilePath, function(err) {
        if(err) {
            return res.json(result, result.status);
        }

        res.render(viewFilePath);
    });
};
