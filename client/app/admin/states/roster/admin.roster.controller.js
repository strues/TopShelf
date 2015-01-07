(function() {
    'use strict';

    angular
        .module('topshelf.admin.states')
        .controller('AdminRosterCtrl', AdminRosterCtrl);

    /* @ngInject */
    function AdminRosterCtrl(GameDS, $filter, $scope, sweet, $rootScope, ArmoryService) {
        /*jshint validthis: true */
        var adminRoster = this;
        // Pagination
        adminRoster.currentPage = 1;
        adminRoster.pageSize = 10;

        adminRoster.guildName = null;
        adminRoster.maxLevelOnly = true;

        // Init
        adminRoster.classes = [];
        adminRoster.specializations = [];
        var classes = GameDS.getClasses();
        for (var index in classes) {
            adminRoster.classes.push(classes[index].name);
            var classSpecs = classes[index].specialization;
            for (var wowClass in classSpecs) {
                adminRoster.specializations.push(wowClass);
            }
        } // end fors
        adminRoster.notifyFetchCharacters = function () {
            $rootScope.$broadcast('fetch-characters');
        };
        // Members
        adminRoster.characters = [];

        adminRoster.getFilteredCharacters = function () {
            var sortedCharacters = $filter('orderBy')(adminRoster.characters, 'name');
            if (adminRoster.maxLevelOnly) {
                sortedCharacters = $filter('filter')(sortedCharacters,
                    {level: 100});
            }
            return sortedCharacters;
        };

        adminRoster.getCharacterCount = function () {
            return adminRoster.getFilteredCharacters().length;
        };

        $scope.$on('fetch-characters', function () {
            adminRoster.fetchCharacters();
        });

        adminRoster.fetchCharacters = function () {
        adminRoster.lastError = null;
        adminRoster.characters = [];

            ArmoryService.getTopShelf().success(function (data) {
                    // Convert to a character list
                    storeCharacters(data);
                    // Save these new correct values
                    ArmoryService.saveInStorage();
                    adminRoster.guildName = 'Top Shelf';
                }).error(function (data, status, headers, config, statusText) {
                    if (status === '404') {
                        sweet.show('warning', 'No guild named ' + adminRoster.guildName +
                            ' was found!');
                    } else {
                        sweet.show('danger', ArmoryService.asError(status, statusText));
                    }
                });
            function storeCharacters(data) {
                angular.forEach(data.members, function (value) {
                    var member = {
                        name: value.character.name,
                        level: value.character.level,
                        spec: !value.character.spec ? null : value.character.spec.name,
                        role: !value.character.spec ? null : value.character.spec.role,
                        wowClass: classes[value.character.class],
                        classLabel: classes[value.character.class].name
                    };
                    adminRoster.characters.push(member);
                });
            }
        }; // fetch
         // Roster
        adminRoster.roster = {};
        adminRoster.rosterCount = 0;
        adminRoster.roles = GameDS.getRoles();

        // Buffs
        adminRoster.buffs = GameDS.getBuffs();
        adminRoster.availableBuffs = {};

        adminRoster.cooldowns = GameDS.getCooldowns();
        adminRoster.availableCDs = {};

        adminRoster.getRosterData = function () {
            var armorData = [
                {"label": "Plate", "value": 0},
                {"label": "Mail", "value": 0},
                {"label": "Leather", "value": 0},
                {"label": "Cloth", "value": 0}
            ];
            var classData = [];
            for (index in classes) {
                classData.push({
                    label: classes[index].name,
                    value: 0,
                    color: classes[index].color
                });
            }

            for (var role in adminRoster.roster) {
                for (index in adminRoster.roster[role]) {
                    var member = adminRoster.roster[role][index];

                    for (var armorIndex in armorData) {
                        if (armorData[armorIndex].label === member.wowClass.armor) {
                            armorData[armorIndex].value++;
                        }
                    }
                    for (var classIndex in classData) {
                        if (classData[classIndex].label === member.wowClass.name) {
                            classData[classIndex].value++;
                        }
                    }
                }
            }
            return {
                armorData: armorData,
                classData: classData
            };
        };
        var armorDonut = null;
        var classDonut = null;
        $scope.$watch('rosterCount', function () {
        setTimeout(function () { //Using a timeout to prevent a bug : morris doesn't like to be used on hidden DOM...
            if (adminRoster.rosterCount > 0) {
                var rosterData = adminRoster.getRosterData();
                if (!armorDonut && !classDonut) {
                    armorDonut = Morris.Donut({
                        element: 'armor-donut',
                        data: rosterData.armorData,
                        colors: ['#F8BD7F', '#D79F64', '#825322', '#5F3406'],
                        resize: true
                    });
                    classDonut = Morris.Donut({
                        element: 'class-donut',
                        data: rosterData.classData,
                        resize: true
                    });
                } else {
                    armorDonut.setData(rosterData.armorData);
                    classDonut.setData(rosterData.classData);
                }
            }
        }, 200);
    });

        adminRoster.getCount = function (role) {
            if (adminRoster.roster[role.id]) {
                return adminRoster.roster[role.id].length;
            }
            return 0;
        };

        adminRoster.getTankCount = function() {
            return adminRoster.getCount(adminRoster.roles.Tank);
        };

        adminRoster.getHealerCount = function() {
            return adminRoster.getCount(adminRoster.roles.Heal);
        };

        adminRoster.getNonHealerCount = function() {
            return adminRoster.rosterCount - adminRoster.getHealerCount();
        };

        adminRoster.validHealerCount = function() {
            return adminRoster.rosterCount > 0 && adminRoster.getHealerCount() >= 1 &&
            adminRoster.getHealerCount() * 4 >= adminRoster.getNonHealerCount() &&
            (adminRoster.getHealerCount() - 1) * 4 < adminRoster.getNonHealerCount();
        };

        adminRoster.get = function (role) {
            return adminRoster.roster[role.id];
        };

        function updateBuff(memberSpec) {
            if (memberSpec.buffs) {
                // 0 = Missing. 0,5 = Available, but exclusive. 1+ = Available
                var processedExclusiveBuffs = [];
                for (var index in memberSpec.buffs) {
                    var buffDef = memberSpec.buffs[index];
                    // If this buff was not already handled as an exclusive buff
                    if ($.inArray(buffDef.buff.id, processedExclusiveBuffs) === -1) {
                        // If the buff is not yet initialized
                        if (!adminRoster.availableBuffs[buffDef.buff.id]) {
                            adminRoster.availableBuffs[buffDef.buff.id] = {
                                buff: buffDef.buff, count: 0
                            };
                        }
                        if (buffDef.exclusive) {
                            // Only one of these two buff is actually available. Raid leader has to choose
                            var currentBuffStatus = adminRoster.availableBuffs[buffDef.buff.id];

                            var otherBuff = buffDef.exclusive;
                            // Init the other buff
                            if (!adminRoster.availableBuffs[otherBuff.id]) {
                                adminRoster.availableBuffs[otherBuff.id] = {
                                    buff: otherBuff, count: 0
                                };
                            }
                            var otherBuffStatus = adminRoster.availableBuffs[otherBuff.id];

                            var count;
                            var otherCount;
                            if (currentBuffStatus.count >= 1 && otherBuffStatus.count >= 1) { //Both already available
                                count = 0.5;
                                otherCount = 0.5;
                            } else if (otherBuffStatus.count >= 1) { //Only the other is available
                                count = 1;
                                otherCount = 0.5;
                            } else if (currentBuffStatus.count >= 1) { // This one is available
                                count = 0.5;
                                otherCount = 1;
                            } else { //None available
                                count = 0.5;
                                otherCount = 0.5;
                            }
                            currentBuffStatus.count += count;
                            currentBuffStatus.exclusive = buffDef.exclusive;
                            otherBuffStatus.count += otherCount; // Mark the other too

                            processedExclusiveBuffs.push(otherBuff.id);
                        } else {
                            // Buff is simply available
                            var currentBuffStatus = adminRoster.availableBuffs[buffDef.buff.id];
                            if (currentBuffStatus.count == 0.5) {
                                // This buff will be available, so we may also set the other exclusive buff to available
                                var exclusiveBuffStatus = adminRoster.availableBuffs[currentBuffStatus.exclusive.id];
                                exclusiveBuffStatus.count += 0.5;
                            }
                            currentBuffStatus.count += 1;
                        }
                        processedExclusiveBuffs.push(buffDef.buff.id);
                    } else {
                        // This buff is (probably) exclusive, so only add the link ,the counter has already been updated
                        if (buffDef.exclusive) {
                            var currentBuffStatus = adminRoster.availableBuffs[buffDef.buff.id];
                            currentBuffStatus.exclusive = buffDef.exclusive;
                        }
                    }
                }
            }
        }
        function updateCD(memberSpec) {
        if (memberSpec.cooldowns) {
            // 0 = Missing. 0.5 = Available, but exclusive. 1+ = Available
            var processedExclusiveCDs = [];
            for (var index in memberSpec.cooldowns) {
                var cdDef = memberSpec.cooldowns[index];
                // If this cooldown was not already handled as an exclusive cooldown
                if ($.inArray(cdDef.cooldown.id, processedExclusiveCDs) == -1) {
                    // If the cooldown is not yet initialized
                    if (!adminRoster.availableCDs[cdDef.cooldown.id]) {
                        adminRoster.availableCDs[cdDef.cooldown.id] = {
                            cooldown: cdDef.cooldown, count: 0
                        };
                    }
                    if (cdDef.exclusive) {
                        // Only one of these two cooldown is actually available. Raid leader has to choose
                        var currentCDstatus = adminRoster.availableCDs[cdDef.cooldown.id];

                        var otherCD = cdDef.exclusive;
                        // Init the other cooldown
                        if (!adminRoster.availableCDs[otherCD.id]) {
                            adminRoster.availableCDs[otherCD.id] = {
                                cooldown: otherCD, count: 0
                            };
                        }
                        var otherCDstatus = adminRoster.availableCDs[otherCD.id];

                        var count;
                        var otherCount;
                        if (currentCDstatus.count >= 1 && otherCDstatus.count >= 1) { //Both already available
                            count = 0.5;
                            otherCount = 0.5;
                        } else if (otherCDstatus.count >= 1) { //Only the other is available
                            count = 1;
                            otherCount = 0.5;
                        } else if (currentCDstatus.count >= 1) { // This one is available
                            count = 0.5;
                            otherCount = 1;
                        } else { //None available
                            count = 0.5;
                            otherCount = 0.5;
                        }
                        currentCDstatus.count += count;
                        currentCDstatus.exclusive = cdDef.exclusive;
                        otherCDstatus.count += otherCount; // Mark the other too

                        processedExclusiveCDs.push(otherCD.id);
                    } else {
                        // Buff is simply available
                        var currentCDstatus = adminRoster.availableCDs[cdDef.cooldown.id];
                        if (currentCDstatus.count == 0.5) {
                            // This cooldown will be available, so we may also set the other exclusive cooldown to available
                            var exclusiveCDStatus = adminRoster.availableCDs[currentCDstatus.exclusive.id];
                            exclusiveCDStatus.count += 0.5;
                        }
                        currentCDstatus.count += 1;
                    }
                    processedExclusiveCDs.push(cdDef.cooldown.id);
                } else {
                    // This cooldown is (probably) exclusive, so only add the link ,the counter has already been updated
                    if (cdDef.exclusive) {
                        var currentCDstatus = adminRoster.availableCDs[cdDef.cooldown.id];
                        currentCDstatus.exclusive = cdDef.exclusive;
                    }
                }
            }
        }
    }
    adminRoster.addToRoster = function (member) {
        // Find the current specialization
        var memberClass = member.wowClass;
        var memberSpec = memberClass.specialization[member.spec];
        if (memberSpec) {
            // Add to the matching role in the roster
            var memberRole = memberSpec.role.id;
            if (!adminRoster.roster[memberRole]) {
                adminRoster.roster[memberRole] = [];
            }
            adminRoster.roster[memberRole].push(member);
            adminRoster.rosterCount++;

            // Check for new buffs
            updateBuff(memberSpec);
            updateCD(memberSpec);
        } else {
            AlertService.addAlert('warning', 'This character (' + member.name + ') has no valid specialization');
        }
    };

    adminRoster.removeFromRoster = function (member) {
        var memberClass = member.wowClass;
        var memberSpec = memberClass.specialization[member.spec];
        var memberRole = memberSpec.role.id;
        adminRoster.roster[memberRole].splice($.inArray(member, adminRoster.roster[memberRole]), 1);
        adminRoster.rosterCount--;

        adminRoster.availableBuffs = {};
        // Instead of trying to computer all counts and following all exclusive links, we just recompute from scratch.
        // The code is much more easy, buf-free, but a bit more costly to execute. For a full roster (30 members),
        // and an average of ~3 buff/ member, that's still less than 100 values to process.
        for (var curRole in adminRoster.roster) {
            for (var index in adminRoster.roster[curRole]) {
                var curMember = adminRoster.roster[curRole][index];
                var curMemberClass = curMember.wowClass;
                var curMemberSpec = curMemberClass.specialization[curMember.spec];
                updateBuff(curMemberSpec);
            }
        }

    };

    adminRoster.hasBeenAddedToRoster = function (member) {
        var memberClass = member.wowClass;
        var memberSpec = memberClass.specialization[member.spec];
        if (memberSpec) {
            if (!memberSpec.role) {
                console.log(memberSpec + " is invalid");
            }
            var memberRole = memberSpec.role.id;
            if (adminRoster.roster[memberRole]) {
                var matches = $filter('filter')(adminRoster.roster[memberRole], {name: member.name});
                return matches.length > 0;
            }

        }
        return false;
    };

    adminRoster.isBuffAvailable = function (buff) {
        return adminRoster.availableBuffs[buff.id] && adminRoster.availableBuffs[buff.id].count > 0.5;
    };

    adminRoster.isBuffMissing = function (buff) {
        return !adminRoster.availableBuffs[buff.id] || adminRoster.availableBuffs[buff.id].count === 0.0;
    };

    adminRoster.isBuffExclusiveAvailable = function (buff) {
        return adminRoster.availableBuffs[buff.id] && adminRoster.availableBuffs[buff.id].count == 0.5;
    };

    adminRoster.getSpecWith = function(buff) {
        var tooltip = "";
        for(var index in adminRoster.classes) {
            var className = adminRoster.classes[index].name;
            var classColor = adminRoster.classes[index].color;
            tooltip += "<i class='glyphicon glyphicon-stop' style='color:" + classColor + "'></i><br />";
            var classSpecs = adminRoster.classes[index].specialization;
            tooltip += "1<br />2<br />";
        }
      return tooltip;
    };
    adminRoster.isCDavailable = function (cooldown) {
        return adminRoster.availableCDs[cooldown.id] && adminRoster.availableCDs[cooldown.id].count > 0.5;
    };

    adminRoster.isCDmissing = function (cooldown) {
        return !adminRoster.availableCDs[cooldown.id] || adminRoster.availableCDs[cooldown.id].count === 0.0;
    };

    adminRoster.isCDExclusiveAvailable = function (cooldown) {
         return adminRoster.availableCDs[cooldown.id] && adminRoster.availableCDs[cooldown.id].count == 0.5;
     };
    adminRoster.clearRoster = function () {
        adminRoster.roster = [];
        adminRoster.rosterCount = 0;
        adminRoster.availableBuffs = {};
    };
    } // End Ctrl
})();
