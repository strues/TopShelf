'use strict';

var _ = require('lodash');
var Roster = require('./roster.model');
var blizReq = require('./blizReq.controller');
var config = require('../../config/environment');

exports.getRoster = function(req, res) {

    Roster.findOne({}, function(err, roster) {
        blizReq.bnet(
            'us.battle.net',
            '/api/wow/guild/' + config.realm + '/' + encodeURIComponent(config.guild) + '?fields=members,news',
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
                        if (err) throw err;
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
                        if (err) throw err;
                    });
                }
            }
        );
    });

    Roster.findOne({}, function(err, roster) {
        if (err) throw err;

        roster.members =
            _.filter(
                _.sortBy(roster.members,
                    function(member) {
                        return [member.rank, member.character.class,
                            member.character.spec, member.character.name
                        ];
                    }),
                function(member) {
                    return member.character.level >= 100 && member.rank <= 4;
                });

        return res.json(roster);
    });
}
