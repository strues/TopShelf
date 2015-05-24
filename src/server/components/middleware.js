/**
 * Module defining connect middleware to use in the matApp application.
 * @module {Object} middleware
 * @requires {@link responses}
 */
'use strict';

var _ = require('lodash');
var customResponses = require('./responses');
var reserved = ['__v'].concat(Object.keys(require('mongoose').Schema.reserved));

/**
 * The default error handler
 * Binds the handleError method of reponse to the request and response objects.
 * Passes the error to following handlers. The handleErrpr function will send the best
 * response available.
 *
 * @type {Function}
 * @param {Error|String} err - The error that occured during the request-response-cycle
 * @param {http.IncomingMessage} req - The request message object
 * @param {http.ServerResponse} res - The outgoing response object
 * @param {function} [next] - The next handler callback
 */
exports.defaultErrorHandler = function defaultErrorHandler(err, req, res, next) {
    console.error('defaultErrorHandler', req.originalUrl, res.statusCode, err);
    _.bind(customResponses.handleError, {res: res, req: req}, err);
    // pass the error to following handlers (if next if passed)
    if (next) {
        return next(err);
    }
};

/**
 * Removes reserved properties from the request body.
 *
 * @param {http.IncomingMessage} req - The request message object
 * @param {http.ServerResponse} res - The outgoing response object
 * @param {function} next - The next handler callback
 */
exports.removeReservedSchemaKeywords = function removeReservedSchemaKeywords(req, res, next) {
    if (!_.isObject(req.body)) {
        return next();
    }
    req.body = _.omit(req.body, reserved);
    return next();
};

/**
 * Extends the response with custom methods.
 *
 * Attach custom responses to `res` object,
 * provide access to `req` and `res` in their `this` context.
 * @param {http.IncomingMessage} req - The request message object
 * @param {http.ServerResponse} res - The outgoing response object
 * @param {function} next - The next handler callback
 */
exports.extendResponse = function extendResponse(req, res, next) {
    _.forEach(customResponses, function eachResponse(fn, name) {
        res[name] = _.bind(fn, {
            req: req,
            res: res
        });
    });
    return next();
};


/**
 * Formats mongoose errors into proper array
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */

exports.errors = function (errors) {
  var keys = Object.keys(errors)
  var errs = []

  // if there is no validation error, just display a generic error
  if (!keys) {
    return ['Oops! There was an error']
  }

  keys.forEach(function (key) {
    if (errors[key]) errs.push(errors[key].message)
  })

  return errs
}

/**
 * Index of object within an array
 *
 * @param {Array} arr
 * @param {Object} obj
 * @return {Number}
 * @api public
 */

exports.indexof = function (arr, obj) {
  var index = -1; // not found initially
  var keys = Object.keys(obj);
  // filter the collection with the given criterias
  var result = arr.filter(function (doc, idx) {
    // keep a counter of matched key/value pairs
    var matched = 0;

    // loop over criteria
    for (var i = keys.length - 1; i >= 0; i--) {
      if (doc[keys[i]] === obj[keys[i]]) {
        matched++;

        // check if all the criterias are matched
        if (matched === keys.length) {
          index = idx;
          return idx;
        }
      }
    };
  });
  return index;
}

/**
 * Find object in an array of objects that matches a condition
 *
 * @param {Array} arr
 * @param {Object} obj
 * @param {Function} cb - optional
 * @return {Object}
 * @api public
 */

exports.findByParam = function (arr, obj, cb) {
  var index = exports.indexof(arr, obj)
  if (~index && typeof cb === 'function') {
    return cb(undefined, arr[index])
  } else if (~index && !cb) {
    return arr[index]
  } else if (!~index && typeof cb === 'function') {
    return cb('not found')
  }
  // else undefined is returned
}
