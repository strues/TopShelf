'use strict';

var __ = require('lodash');
var Roster = require('./roster.model');
var blizReq = require('./blizReq.controller');
var config = require('../../config/environment');

exports.getGuild = function(req, res) {

  function responseHandler(res, done) {
    var data = '';
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      data = JSON.parse(data);
      done(data);
    });
  }

  Roster.findOne({}, function(err, roster) {
    blizReq.bnet(
      'us.battle.net',
      '/api/wow/guild/' + config.realm + '/' +
      encodeURIComponent(config.guild) + '?fields=members,news',
      function(data) {
        var lastUpdated = new Date().getTime();
        if (roster !== null) {
          for (var key in data) {
            roster[key] = data[key];
          }

          roster.lastUpdated = lastUpdated;
          roster.news = data.news;
          roster.settings = {
            webAdminBattletag: ''
          };

          roster.save(function(err) {
            if (err) {
              throw err;
            }
          });
        }
        else {
          var newRoster = new Roster();
          for (var key in data) {
            newRoster[key] = data[key];
          }

          newRoster.lastUpdated = lastUpdated;
          newRoster.settings = {
            webAdminBattletag: ''
          };

          newRoster.save(function(err) {
            if (err) {
              throw err;
            }
          });
        }
      }
    );
  });
};

exports.getRoster = function(req, res) {
  Roster.findOne({}, function(err, roster) {
    if (err) throw err;

    roster.members =
      __.filter(
        __.sortBy(roster.members,
          function(member) {
            return [member.rank, member.character.class, member.character
              .spec, member.character.name
            ];
          }),
        function(member) {
          return member.character.level >= 100 && member.rank <= 5;
        });

    res.render('roster', {
      user: req.user,
      roster: roster
    });
  });
}
