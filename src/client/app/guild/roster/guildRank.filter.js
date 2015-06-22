
angular.module('app.guild').filter('guildRank', function() {
  return function(rankId) {
    switch (rankId) {
      case 0:
        return 'Guild Master';
      case 1:
        return 'Guild Commander';
      case 2:
        return 'Commander Alt';
      case 3:
        return 'Veteran Raider';
      case 4:
        return 'Raider';
      case 5:
        return 'Friends and Family';
      case 7:
        return 'Trial';
      case 8:
        return 'Casual/Alt';
    }
  };
});
