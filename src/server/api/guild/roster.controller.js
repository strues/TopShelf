'use strict';

var _ = require('lodash');
var Guild = require('./guild.model');
var config = require('../../config/environment');

exports.getRoster = function(req, res) {
  Guild.findOne({}, function(err, guild) {
    if (err) throw err;

    guild.members =
        _.filter(
            _.sortBy(guild.members,
                    function(member) {
                      return [member.rank, member.character.class,
                          member.character.spec, member.character.name
                      ];
                    }),
                function(member) {
                  return member.character.level >= 100 && member.rank <= 4;
                });

    return res.json(guild);
  });
}
