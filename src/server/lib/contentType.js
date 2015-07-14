/*
 * ContentTypeValidator.js
 *
 * The ContentTypeValidator checks whether the header of a request
 * has it's content-type set to 'application/json'
 * If not, an error response is sent
 */

module.exports = function(req, res, next) {

  let isPostRequest = (req.method === 'POST'),
    isApplicationJSON = (req.get('content-type') === 'application/json');

  if ((isPostRequest) && (!isApplicationJSON)) {
    res.status(415);
    res.json({
      'error': '415 Unsupported Media Type. Use application/json',
    });
  } else {
    next();
  }
};
