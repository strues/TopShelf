'use strict';

var express = require('express');
var Article = require('../article/article.model');
var router = express.Router();

function handleError(res, err) {
      return res.status(500).json(err);
    }

// Export the configured express router for the post api routes
module.exports = router;

router.get('/:tag', function (req, res) {
  var criteria = { tags: req.params.tag };
  var perPage = 5;
  var page = (req.params.page > 0 ? req.params.page : 1) - 1;
  var options = {
    perPage: perPage,
    page: page,
    criteria: criteria
  };

  Article.list(options, function(err, articles) {
    if (err) {
            return handleError(res, err);
          }
    Article.count(criteria).exec(function (err, count) {
 return res.status(200).json(articles);
        });
    });
  });

