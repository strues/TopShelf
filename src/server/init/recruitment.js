module.exports = function() {
  let Recruitment = require('../api/recruitment/recruitment.model');

  let recruitmentSeed = [];
  let mage1 = {
    classType: 'mage',
    classSpec: 'arcane',
    priority: 'high',
    status: 'open'
  };

  let warrior1 = {
    classType: 'warrior',
    classSpec: 'fury',
    priority: 'high',
    status: 'open'
  };

  recruitmentSeed.push(warrior1);
  recruitmentSeed.push(mage1);

  // In case we need to delete any users
  // User.remove({}, function (err, users) {
  //   if(err) { return handleError(err); }
  //   if(!users) { return false; }
  // });

  Recruitment.find(function(err, recruitments) {
    if (err) {
      return handleError(err);
    }
    if (recruitments.length === 0) {
      Recruitment.create(recruitmentSeed, function() {
        if (err) {
          return handleError(err);
        }
        console.log('recruiting status initialized');
      });
    }
  });

  function handleError(err) {
    return console.log('Initializing data error: ', err);
  }
};
