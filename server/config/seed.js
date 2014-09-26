/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Inbox = require('../api/inbox/inbox.model');
var Conversation = require('../api/conversation/conversation.model');

Thing.find({}).remove(function() {
  console.log('Seed > Resetting Things')
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

Inbox.find({}).remove(function (){
  console.log('Seed > Clearing Inboxes');
});

Conversation.find({}).remove(function (){
  console.log('Seed > Clearing Conversations');
})

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, {
    provider: 'local',
    name: 'dennis',
    email: 'd.ruiter@live.nl',
    password: 'test'
  }, {
    provider: 'local',
    name: 'wat',
    email: 'wat@wat.com',
    password: 'test'
  }, function (err, test, admin, dennis, wat) {
      if(err) console.log(err);

      /*
        Map emails to user ID's (id's not available in create)
      */

      var users     = [test, admin, dennis, wat],
          relations = [
            {friendlist: ['d.ruiter@live.nl', 'admin@admin.com'], friendrequests: ['wat@wat.com']},
            {friendlist: ['test@test.com', 'd.ruiter@live.nl'], friendrequests: ['wat@wat.com']},
            {friendlist: ['admin@admin.com', 'test@test.com'], friendrequests: ['wat@wat.com']},
            {friendlist: ['admin@admin.com', 'test@test.com'], friendrequests: ['d.ruiter@live.nl']}
          ];

      function emailToId (email){
        var id = '';

        users.forEach(function (user){
          if(user.email === email) id = user._id;
        })

        return id;
      }

      users.forEach(function (user, index){
        /*
          Seed user inboxes
        */

        function seedInbox (user){
          Inbox.create({
            owner: user._id,
            box: [{
              sender: user.friendlist[0],
              messages: [{message: 'Hey I\'m > '+user.friendlist[0]}]
            }]
          }, function (err){
            if(err) console.log(err);
          })
        }

        user.friendlist = relations[index].friendlist.map(emailToId);
        user.friendrequests = relations[index].friendrequests.map(emailToId);
        
        seedInbox(user);
       
        user.save();
      });
      
      console.log('Seed > User.friendlist')
      console.log('Seed > User.friendrequests')
      console.log('Seed > Creating Inboxes')

      console.log('Seed > Creating Conversations')
      var con = {
        identifier: 'front-page',
        publicConversation: true,
        banlist: [],
        admins: ['admin@admin.com'],
        moderators: ['test@test.com'],
        participants: ['d.ruiter@live.nl'],
        messages: []
      }

      con.banlist       = con.banlist.map(emailToId);
      con.admins        = con.admins.map(emailToId);
      con.moderators    = con.moderators.map(emailToId);
      con.participants  = con.participants.map(emailToId);

      Conversation.create(con, function (err, created){
        if(err) console.log(err);
      });

      console.log('Seed > Finished seeding database.');
  })
});