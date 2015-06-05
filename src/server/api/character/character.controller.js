/*jshint node:true*/
'use strict';

var _ = require('lodash'),
  async = require('async'),
  bnet = require('battlenet-api')('5m653qcbnr4h6rue7e4e4k7ryvcnpa9p'),
  utf8 = require('utf8'),
  config = require('../../config/environment'),
  Character = require('./character.model'),
  User = require('../user/user.model');

// Get list of characters
exports.index = function(req, res) {
  var guildstuff = {};

  if (req.query.action === 'UPDATE') {
    var allMemberData = [];
    async.series([
      function(cb) {
        bnet.wow.guild.members({
          origin: 'us',
          realm: 'Sargeras',
          name: 'Top Shelf'
        }, function(err, data) {
          if (err) console.log(err);
          allMemberData = data.members;
          cb();
        });
      },
      function(cb) {
        async.each(allMemberData, function(item, cb2) {
          if (item.rank === 6 || (item.rank < 5 && item.rank !== 2)) {
            bnet.wow.character.items({
              origin: 'us',
              realm: 'Sargeras',
              name: utf8.encode(item.character.name)
            }, function(err, data) {

              console.log('Updating ' + item.character.name);
              if (err) console.log(err);

              Character.raiders.update({
                name: data.name
              }, {
                name: data.name,
                class: data.class,
                race: data.race,
                level: data.level,
                spec: {
                  name: item.character.spec.name,
                  role: item.character.spec.role
                },
                rank: item.rank,
                items: data.items
              }, {
                upsert: true,
                overwrite: true
              }, function(err) {
                cb2();
              });
            });
          }
          else {
            cb2();
          }
        }, function() {
          cb();
        });
      },
      function(cb) {
        Character.raiders.remove({
          name: null
        }, function(err) {
          if (err) console.log(err);
          cb();
        });
      }
    ], function() {
      Character.raiders.find(function(err, data) {
        if (err) console.log(err);
        res.json(data);
      });
    });
  }

  if (isEmptyObject(req.query)) {
    Character.raiders.find({}, null, {
        sort: {
          name: 1
        }
      },
      function(err, data) {
        if (err) console.log(err);
        guildstuff.raiders = data;
        console.log(guildstuff);
        //res.render('index', guildstuff);
      });
  }
}

function isEmptyObject(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}

// Get a single character
exports.show = function(req, res) {
  Character.findById(req.params.id)
    .populate('player', 'characterName')
    .exec(function(err, character) {
      if (err) {
        return handleError(res, err);
      }
      if (!character) {
        return res.sendStatus(404);
      }
      return res.json(character);
    });
};

// Creates a new character in the DB.
exports.create = function(req, res) {
  Character.create(_.merge(req.body), function(err, character) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(character);
  });
};

// Updates an existing character in the DB.
exports.update = function(req, res) {
  Character.findById(req.params.id, function(err, character) {
    if (err) {
      return handleError(res, err);
    }
    if (!character) {
      return res.sendStatus(404);
    }
    // set the new user information if it exists in the request
    if (req.body.achievementPoints) character.achievementPoints = req.body
      .achievementPoints;
    if (req.body.battlegroup) character.battlegroup = req.body.battlegroup;
    if (req.body.class) character.class = req.body.class;
    if (req.body.gender) character.gender = req.body.gender;
    if (req.body.guild) character.guild = req.body.guild;
    if (req.body.level) character.level = req.body.level;
    if (req.body.name) character.name = req.body.name;
    if (req.body.race) character.race = req.body.race;
    if (req.body.realm) character.realm = req.body.realm;
    if (req.body.rank) character.rank = req.body.rank;
    if (req.body.player) character.player = req.body.player;
    if (req.body.ilevel) character.ilevel = req.body.ilevel;

    character.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      console.log('character updated');
      return res.status(200).json(character);
    });
  });
};

// Deletes a character from the DB.
exports.destroy = function(req, res) {
  Character.findById(req.params.id, function(err, character) {
    if (err) {
      return handleError(res, err);
    }
    if (!character) {
      return res.sendStatus(404);
    }
    character.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.sendStatus(204);
    });
  });
};


function handleError(res, err) {
  return res.status(500).json(err);
}
