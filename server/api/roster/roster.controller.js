'use strict';

var _ = require('lodash');
var Roster = require('./roster.model');

exports.getRoster = function(req, res) {
        Roster.findOne({}, function(err, roster) {
            if (err) throw err;

            roster.members =
                _.filter(
                    _.sortBy(roster.members,
                        function(member) {
                            return [member.rank, member.character.class,
                            member.character.spec, member.character.name];
                        }),
                    function(member) {
                        return member.character.level >= 92 && member.rank <= 5;
                    });

            return res.json(roster);
        });
    }

function handleError(res, err) {
    return res.send(500, err);
}
