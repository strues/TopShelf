(function() {
    'use strict';

    angular
        .module('topshelf.core')
        .constant('wowConstants', wowConstants);

    var wowConstants = {
        locale: 'en_US',
        regions: 'us',

        itemQualities: {
            0: 'poor',
            1: 'common',
            2: 'uncommon',
            3: 'rare',
            4: 'epic',
            5: 'legendary',
            6: 'artifact',
            7: 'heirloom'
        },
        itemSlots: [
            'head',
            'neck',
            'shoulder',
            'back',
            'chest',
            'wrist',
            'hands',
            'waist',
            'legs',
            'feet',
            'finger1',
            'finger2',
            'trinket1',
            'trinket2',
            'mainHand',
            'offHand'
        ],

        itemStats: {
            '-1': 'None',
            0: 'Mana',
            1: 'Health',
            3: 'Agility',
            4: 'Strength',
            5: 'Intellect',
            6: 'Spirit',
            7: 'Stamina',
            //-------------------------------
            12: 'Defense Skill',
            13: 'Dodge',
            14: 'Parry',
            15: 'Block',
            16: 'Melee Hit',
            17: 'Ranged Hit',
            18: 'Spell Hit',
            19: 'Melee Crit',
            20: 'Ranged Crit',
            21: 'Spell Crit',
            22: 'Melee Hit Taken',
            23: 'Ranged Hit Taken',
            24: 'Spell Hit Taken',
            25: 'Melee Crit Taken',
            26: 'Ranged Crit Taken',
            27: 'Spell Crit Taken',
            28: 'Melee Haste',
            29: 'Ranged Haste',
            30: 'Spell Haste',
            31: 'Hit',
            32: 'Crit',
            33: 'Hit Taken',
            34: 'Crit Taken',
            35: 'Resilience',
            36: 'Haste',
            37: 'Expertise',
            38: 'Attack Power',
            39: 'Ranged Attack Power',
            40: 'Versality',
            41: 'Spell Healing Done', // deprecated
            42: 'Spell Damage Done', // deprecated
            43: 'Mana Regeneration',
            44: 'Armor Penetration',
            45: 'Spell Power',
            46: 'Health Regen',
            47: 'Spell Penetration',
            48: 'Block Value',
            49: 'Mastery',
            50: 'Bonus Armor',
            51: 'Fire Resistance',
            52: 'Frost Resistance',
            53: 'Holy Resistance',
            54: 'Shadow Resistance',
            55: 'Nature Resistance',
            56: 'Arcane Resistance',
            57: 'PVP Power',
            58: 'Amplify',
            59: 'Multistrike',
            60: 'Readiness',
            61: 'Speed',
            62: 'Leech',
            63: 'Avoidance',
            64: 'Indestructible',
            65: 'WOD_5',
            66: 'Cleave',
            //-------------------------------
            71: 'Strength, Agility, Intellect',
            72: 'Strength, Agility',
            73: 'Agility, Intellect',
            74: 'Strength, Intellect'
        },
        relevantStats: [3, 5, 6, 4, 59, 32, 36, 40, 49, 63, 62, 61, 7],
        combinedRelevantStats: {
            71: [4, 3, 5],
            72: [4, 3],
            73: [3, 5],
            74: [4, 5]
        },

        classSpecs: {
            1: {
                name: 'Warrior',
                specs: {
                    a: {
                        name: 'Arms',
                        mainStat: 4
                    },
                    Z: {
                        name: 'Fury',
                        mainStat: 4
                    },
                    b: {
                        name: 'Protection',
                        mainStat: 4
                    },
                }
            },
            2: {
                name: 'Paladin',
                specs: {
                    a: {
                        name: 'Holy',
                        mainStat: 5
                    },
                    Z: {
                        name: 'Protection',
                        mainStat: 4
                    },
                    b: {
                        name: 'Retribution',
                        mainStat: 4
                    },
                }
            },
            3: {
                name: 'Hunter',
                specs: {
                    a: {
                        name: 'Beast Mastery',
                        mainStat: 3
                    },
                    Z: {
                        name: 'Marksmanship',
                        mainStat: 3
                    },
                    b: {
                        name: 'Survival',
                        mainStat: 3
                    },
                }
            },
            4: {
                name: 'Rogue',
                specs: {
                    a: {
                        name: 'Assassination',
                        mainStat: 3
                    },
                    Z: {
                        name: 'Combat',
                        mainStat: 3
                    },
                    b: {
                        name: 'Sublety',
                        mainStat: 3
                    },
                }
            },
            5: {
                name: 'Priest',
                specs: {
                    a: {
                        name: 'Discipline',
                        mainStat: 5
                    },
                    Z: {
                        name: 'Holy',
                        mainStat: 5
                    },
                    b: {
                        name: 'Shadow',
                        mainStat: 5
                    },
                }
            },
            6: {
                name: 'Death Knight',
                specs: {
                    a: {
                        name: 'Blood',
                        mainStat: 4
                    },
                    Z: {
                        name: 'Frost',
                        mainStat: 4
                    },
                    b: {
                        name: 'Unholy',
                        mainStat: 4
                    },
                }
            },
            7: {
                name: 'Shaman',
                specs: {
                    a: {
                        name: 'Elemental',
                        mainStat: 5
                    },
                    Z: {
                        name: 'Enhancement',
                        mainStat: 3
                    },
                    b: {
                        name: 'Restoration',
                        mainStat: 5
                    },
                }
            },
            8: {
                name: 'Mage',
                specs: {
                    a: {
                        name: 'Arcane',
                        mainStat: 5
                    },
                    Z: {
                        name: 'Fire',
                        mainStat: 5
                    },
                    b: {
                        name: 'Frost',
                        mainStat: 5
                    },
                }
            },
            9: {
                name: 'Warlock',
                specs: {
                    a: {
                        name: 'Affliction',
                        mainStat: 5
                    },
                    Z: {
                        name: 'Demonology',
                        mainStat: 5
                    },
                    b: {
                        name: 'Destruction',
                        mainStat: 5
                    },
                }
            },
            10: {
                name: 'Monk',
                specs: {
                    a: {
                        name: 'Brewmaster',
                        mainStat: 3
                    },
                    Z: {
                        name: 'Mistweaver',
                        mainStat: 5
                    },
                    b: {
                        name: 'Windwalker',
                        mainStat: 3
                    },
                }
            },
            11: {
                name: 'Druid',
                specs: {
                    a: {
                        name: 'Balance',
                        mainStat: 5
                    },
                    Z: {
                        name: 'Feral',
                        mainStat: 3
                    },
                    b: {
                        name: 'Guardian',
                        mainStat: 3
                    },
                    Y: {
                        name: 'Restoration',
                        mainStat: 5
                    },
                }
            },
        }
    }
})();
