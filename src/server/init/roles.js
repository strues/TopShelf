module.exports = function() {
  console.log('creating roles...');
  let Roles = require('../api/roles/roles.model');

  let basicRoles = [];
// Roles Schema
// Basic = fresh registeration
  let basic = {
    role: 'basic',
    permissions: {
      editContent: false,
      publishContent: false,
      deleteContent: false,
      manageMedia: false,
      restrictAccess: false,
      manageExtensions: false,
      moderateComments: false,
      manageUsers: false,
      manageRoles: false,
      manageRecruitment: false,
      manageRecruitmentThreads: false,
      changeSiteSettings: false,
      importExportData: false,
      deleteSite: false,
      allPrivilages: false
    }
  };
// Guild Member
  let member = {
    role: 'guild member',
    permissions: {
      editContent: true,
      publishContent: false,
      deleteContent: false,
      manageMedia: false,
      restrictAccess: false,
      manageExtensions: false,
      moderateComments: false,
      manageUsers: false,
      manageRoles: false,
      manageRecruitment: false,
      manageRecruitmentThreads: false,
      changeSiteSettings: false,
      importExportData: false,
      deleteSite: false,
      allPrivilages: false
    }
  };
// Raider
  let raider = {
    role: 'raider',
    permissions: {
      editContent: true,
      publishContent: true,
      deleteContent: false,
      manageMedia: true,
      restrictAccess: false,
      manageExtensions: false,
      moderateComments: false,
      manageUsers: false,
      manageRoles: false,
      manageRecruitment: false,
      manageRecruitmentThreads: false,
      changeSiteSettings: false,
      importExportData: false,
      deleteSite: false,
      allPrivilages: false
    }
  };
// Officer
  let officer = {
    role: 'officer',
    permissions: {
      editContent: true,
      publishContent: true,
      deleteContent: true,
      manageMedia: true,
      restrictAccess: true,
      manageExtensions: true,
      moderateComments: true,
      manageUsers: false,
      manageRoles: false,
      manageRecruitment: false,
      manageRecruitmentThreads: false,
      changeSiteSettings: false,
      importExportData: false,
      deleteSite: false,
      allPrivilages: false
    }
  };

  let admin = {
    role: 'admin',
    permissions: {
      editContent: true,
      publishContent: true,
      deleteContent: true,
      manageMedia: true,
      restrictAccess: true,
      manageExtensions: true,
      moderateComments: true,
      manageUsers: true,
      manageRoles: true,
      manageRecruitment: true,
      manageRecruitmentThreads: true,
      changeSiteSettings: true,
      importExportData: true,
      deleteSite: true,
      allPrivilages: true
    }
  };

  basicRoles.push(basic, member, raider, officer, admin);

  // Roles.remove({}, function(err, roles) {
  //   if(err) { return handleError(err); }
  //   console.log('deleted roles');
  // });

  Roles.find(function(err, roles) {
    if (err) {
      return handleError(err);
    }
    if (roles.length === 0) {
      Roles.create(basicRoles, function(roles) {
        if (err) {
          return handleError(err);
        }
        roles = getArguments(arguments);
        // populateGlobalRoles(roles);
        console.log('roles initialized');
      });
    } else {
      console.log('null');
      // populateGlobalRoles(roles);
    }
  });

  function handleError(err) {
    return console.log('Initializing data error: ', err);
  }

  function getArguments(args) {
    // Since mongoose returns created items as list of params we must iterate through them
    let allFound = [];
    for (let i = 1; i < args.length; ++i) {
      allFound.push(args[i]);
    }
    return allFound;
  }
};
