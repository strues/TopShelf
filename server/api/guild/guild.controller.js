'use strict';

var Guild = require('./guild.model');
var __    = require('lodash');

module.exports = {
    getRoster: function(req, res) {
        Guild.findOne({}, function(err, guild) {
            if(err) throw err;

            guild.members =
                __.filter(
                    __.sortBy(guild.members,
                        function(member) {
                            return [member.rank, member.character.class, member.character.spec, member.character.name];
                        }),
                    function(member) {
                        return member.character.level >= 91 && member.rank <= 7;
                    });

            res.send(guild.members);
        });
    }
};
