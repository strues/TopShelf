/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function () {
  'use strict';
  /**
   * @ngdoc overview
   * @name app.core
   * @description
   * The `app.core` module
   *
   * @requires ui.router
   */
  angular
      .module('app.core', [
        'ngAnimate',
        'ngMessages',
        'ngResource',
        'ui.router',
        'ngStorage',
        'btford.socket-io',
        'ui.bootstrap',
        'textAngular',
        'toastr',
        'angularFileUpload',
        'youtube-embed'
      ]);
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
angular.module("app.core").run(['$templateCache', function($templateCache) {$templateCache.put("app/account/account.html","<div ui-view=\"\"></div>");
$templateCache.put("app/admin/admin.html","<div class=\"container-fluid\" ng-controller=\"SidebarCtrl as vm\"><button class=\"btn btn-primary navicon\" ng-click=\"vm.toggle()\"><i class=\"fa fa-navicon fa-2x\"></i></button><div class=\"row\"><aside class=\"col-sm-2 sidebar\" ng-class=\"vm.showSidebar ? \'col-sm-2\' : \'hidden\'\"><nav class=\"menu\"><div class=\"smartphone-menu-trigger\"></div><ul><li><a ui-sref=\"guild.home\">Home</a></li><li><a ui-sref=\"admin.dashboard\">Dashboard</a></li><li><a ui-sref=\"admin.news\">News</a></li><li><a ui-sref=\"admin.carousel\">Carousel</a></li><li><a ui-sref=\"admin.recruitment\">Recruitment</a></li><li><a ui-sref=\"admin.users\">Users</a></li><li><a ui-sref=\"admin.media\">Media</a></li></ul></nav></aside><div id=\"content\" class=\"col-sm-10 workspace-area\" style=\"margin-left: 15px;\" ng-class=\"vm.showSidebar ? \'col-sm-10\' : \'col-sm-12\'\"><div ui-view=\"workspace\"></div></div></div></div>");
$templateCache.put("app/admin/sidebar.html","<h2>sidebar</h2><ul class=\"list-unstyled\"><li><a ui-sref=\"root.admin.news\">News</a></li><li><a ui-sref=\"root.admin.news.create\">New Article</a></li><li><a ui-sref=\"root.admin.media\">Media</a></li><li><a ui-sref=\"root.admin.recruitment\">Recruiting</a></li></ul>");
$templateCache.put("app/account/login/login.html","<div id=\"wrapper\" ng-controller=\"LoginCtrl as login\"><form autocomplete=\"off\" method=\"post\" name=\"loginForm\" ng-submit=\"login.login(loginForm)\" novalidate=\"\"><div class=\"input-wrapper\"><label for=\"username\"><i class=\"fa fa-envelope fa-3x\"></i></label><input type=\"text\" id=\"username\" ng-model=\"login.user.email\" placeholder=\"Email\" required=\"\" spellcheck=\"false\"></div><div class=\"input-wrapper\"><label for=\"password\"><i class=\"fa fa-lock fa-3x\"></i></label><input type=\"password\" id=\"password\" ng-model=\"login.user.password\" placeholder=\"Password\" required=\"\"></div><div class=\"input-wrapper\"><input type=\"submit\" value=\"Login\" ng-disabled=\"loginForm.$invalid\"><p><a ui-sref=\"account.password.forgot\">Forgot your password?</a> Not a member? <a ui-sref=\"account.signup\">Sign up now</a> <span>&rarr;</span></p></div></form></div>");
$templateCache.put("app/account/profile/profile.html","<div ng-controller=\"ProfileCtrl as profile\"><div class=\"container\"><div class=\"panel panel-default\"><div class=\"panel-heading\">Profile</div><div class=\"panel-body\"><legend><i class=\"ion-clipboard\"></i> Edit My Profile</legend><form method=\"post\" ng-submit=\"profile.updateProfile()\"><div class=\"form-group\"><label class=\"control-label\">Profile Picture</label> <img class=\"profile-picture\" ng-src=\"{{profile.user.picture || \'http://placehold.it/100x100\'}}\"></div><div class=\"form-group\"><label class=\"control-label\"><i class=\"fa fa-user\"></i> Display Name</label> <input type=\"text\" class=\"form-control\" ng-model=\"profile.user.displayName\"></div><div class=\"form-group\"><label class=\"control-label\"><i class=\"ion-at\"></i> Email Address</label> <input type=\"email\" class=\"form-control\" ng-model=\"profile.user.email\"></div><button class=\"btn btn-lg btn-success\">Update Information</button></form></div></div><div class=\"panel panel-default\"><div class=\"panel-heading\">Accounts</div><div class=\"panel-body\"></div></div></div></div>");
$templateCache.put("app/account/signup/signup.html","<div id=\"wrapper\" ng-controller=\"SignupCtrl as signup\" style=\"padding-top: 120px;\"><form autocomplete=\"off\" method=\"post\" ng-submit=\"signup.register(signupForm)\" name=\"signupForm\" novalidate=\"\"><div class=\"input-wrapper\" ng-class=\"{ \'has-error\' : signupForm.displayName.$invalid && signupForm.displayName.$dirty }\"><label for=\"username\"><i class=\"fa fa-user fa-3x\"></i></label><input id=\"username\" name=\"displayName\" type=\"text\" placeholder=\"Username\" ng-model=\"signup.user.username\" required=\"\" autofocus=\"\"><div class=\"help-block text-danger\" ng-if=\"signupForm.displayName.$dirty\" ng-messages=\"signupForm.displayName.$error\"><div ng-message=\"required\">You must enter your name.</div></div></div><div class=\"input-wrapper\" ng-class=\"{ \'has-error\' : signupForm.email.$invalid && signupForm.email.$dirty }\"><label for=\"username\"><i class=\"fa fa-envelope fa-3x\"></i></label><input name=\"email\" id=\"username\" type=\"email\" placeholder=\"Email\" ng-model=\"signup.user.email\" ng-pattern=\"/^[A-z]+[a-z0-9._]+@[a-z]+\\.[a-z.]{2,5}$/\" required=\"\"><div class=\"help-block text-danger\" ng-if=\"signupForm.email.$dirty\" ng-messages=\"signupForm.email.$error\"><div ng-message=\"required\">Your email address is required.</div><div ng-message=\"pattern\">Your email address is invalid.</div></div></div><div class=\"input-wrapper\" ng-class=\"{ \'has-error\' : signupForm.password.$invalid && signupForm.password.$dirty }\"><label for=\"password\"><i class=\"fa fa-lock fa-3x\"></i></label><input name=\"password\" id=\"password\" type=\"password\" placeholder=\"Password\" ng-model=\"signup.user.password\" required=\"\"><div class=\"help-block text-danger\" ng-if=\"signupForm.password.$dirty\" ng-messages=\"signupForm.password.$error\"><div ng-message=\"required\">Password is required.</div></div></div><div class=\"input-wrapper\" ng-class=\"{ \'has-error\' : signupForm.confirmPassword.$invalid && signupForm.confirmPassword.$dirty }\"><label for=\"password\"><i class=\"fa fa-lock fa-3x\"></i></label><input id=\"password\" name=\"confirmPassword\" type=\"password\" placeholder=\"Confirm Password\" required=\"\"><div class=\"help-block text-danger\" ng-if=\"signupForm.confirmPassword.$dirty\" ng-messages=\"signupForm.confirmPassword.$error\"><div ng-message=\"compareTo\">Password must match.</div></div></div><div class=\"input-wrapper\"><input type=\"submit\" value=\"Signup\" ng-disabled=\"signupForm.$invalid\"><p>Already a member? <a ui-sref=\"account.login\">Login Now</a> <span>&rarr;</span></p></div></form></div>");
$templateCache.put("app/admin/dashboard/admin-dashboard.html","<article id=\"content-wrapper\" class=\"content-wrapper admin-wrapper\"><section id=\"content-main\" class=\"content-main admin-main clearfix\" ng-cloak=\"\"><h1 class=\"content-heading\">Admin</h1><div ng-if=\"dash.isAuthenticated() && dash.showAdmin\"><section ng-if=\"dash.users\" class=\"userList content-section\"><h2><i class=\"fa fa-users\"></i> Users</h2><p class=\"lead\">View all users and their currently linked authentication accounts.</p><ul class=\"userList-list\"><li ng-repeat=\"user in dash.users | orderBy:\'displayName\'\" class=\"userList-item user clearfix\"><img class=\"user-picture img-thumbnail\" height=\"150px\" ng-src=\"{{user.picture ? user.picture : \'/img/user-placeholder.png\'}}\"> <span class=\"user-displayName\">{{::user.displayName}}</span> <i ng-if=\"user.isAdmin\" class=\"fa fa-wrench\" title=\"Admin\"></i> <i class=\"user-logins fa fa-{{::login}}\" ng-repeat=\"login in user.linkedAccounts\"></i></li></ul></section></div><div ng-if=\"dash.showAdmin === false\" class=\"alert alert-danger\"><i class=\"fa fa-warning\"></i> You are not authorized to view this page.</div></section></article>");
$templateCache.put("app/admin/news/listing.html","<div class=\"container\" ng-controller=\"NewsListingCtrl as nlc\"><div class=\"row\" <h2=\"\">News Listing<p class=\"lead\">The most recent posts on the homepage. <a ui-sref=\"admin.news.create\"><button class=\"btn btn-success btn-med pull-right\"><i class=\"fa fa-plus-square\"></i> New Article</button></a></p><table class=\"table table-hover\"><thead><th>Title</th><th>Description</th><th>Created</th></thead><tbody><tr ng-repeat=\"article in nlc.articles | orderBy:\'-created\':reverse\"><td>{{article.title}}</td><td ta-bind-html=\"article.description | limitTo : 100\"></td><td>{{article.created | date:\'MM/dd/yyyy\'}}</td><td><a ui-sref=\"admin.news.article({id:article._id})\"><i class=\"fa fa-pencil\"></i></a> | <i ng-click=\"nlc.deleteArticle(article._id)\" class=\"fa fa-trash\"></i></td></tr></tbody></table></div></div>");
$templateCache.put("app/admin/media/media.html","<div ng-controller=\"MediaController\"><div class=\"container\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"well\"><div nv-file-drop=\"\" uploader=\"uploader\" filters=\"queueLimit, customFilter\"><div class=\"wrapper-md bg-light dk b-b\"><span class=\"pull-right m-t-xs\">Queue length: <b class=\"badge bg-info\">{{ uploader.queue.length }}</b></span><h3 class=\"m-n font-thin\">Upload queue</h3><div class=\"wrapper-md\"><table class=\"table bg-white-only b-a\"><thead><tr><th width=\"50%\">Name</th><th ng-show=\"uploader.isHTML5\">Size</th><th ng-show=\"uploader.isHTML5\">Progress</th><th>Status</th><th>Actions</th></tr></thead><tbody><tr ng-repeat=\"item in uploader.queue\"><td><strong>{{ item.file.name }}</strong></td><td ng-show=\"uploader.isHTML5\" nowrap=\"\">{{ item.file.size/1024/1024|number:2 }} MB</td><td ng-show=\"uploader.isHTML5\"><div class=\"progress progress-sm m-b-none m-t-xs\"><div class=\"progress-bar bg-info\" role=\"progressbar\" ng-style=\"{ \'width\': item.progress + \'%\' }\"></div></div></td><td class=\"text-center\"><span ng-show=\"item.isSuccess\" class=\"text-success\"><i class=\"glyphicon glyphicon-ok\"></i></span> <span ng-show=\"item.isCancel\" class=\"text-warning\"><i class=\"glyphicon glyphicon-ban-circle\"></i></span> <span ng-show=\"item.isError\" class=\"text-danger\"><i class=\"glyphicon glyphicon-remove\"></i></span></td><td nowrap=\"\"><button type=\"button\" class=\"btn btn-default btn-xs\" ng-click=\"item.upload()\" ng-model=\"image\" ng-disabled=\"item.isReady || item.isUploading || item.isSuccess\">Upload</button> <button type=\"button\" class=\"btn btn-default btn-xs\" ng-click=\"item.cancel()\" ng-disabled=\"!item.isUploading\">Cancel</button> <button type=\"button\" class=\"btn btn-default btn-xs\" ng-click=\"item.remove()\">Remove</button></td></tr></tbody></table><span><p>Queue progress:</p><div class=\"progress bg-light dker\" style=\"\"><div class=\"progress-bar progress-bar-striped bg-info\" role=\"progressbar\" ng-style=\"{ \'width\': uploader.progress + \'%\' }\"></div></div></span> <button type=\"button\" class=\"btn btn-addon btn-success\" ng-click=\"uploader.uploadAll()\" ng-disabled=\"!uploader.getNotUploadedItems().length\"><i class=\"fa fa-arrow-circle-o-up\"></i> Upload all</button> <button type=\"button\" class=\"btn btn-addon btn-warning\" ng-click=\"uploader.cancelAll()\" ng-disabled=\"!uploader.isUploading\"><i class=\"fa fa-ban\"></i> Cancel all</button> <button type=\"button\" class=\"btn btn-addon btn-danger\" ng-click=\"uploader.clearQueue()\" ng-disabled=\"!uploader.queue.length\"><i class=\"fa fa-trash-o\"></i> Remove all</button><p class=\"text-muted m-t-xl\">Files are uploaded to \"/uploads/\"</p></div></div></div></div></div></div><div class=\"row\"><div class=\"block-type-btn cf\"><ul><li><div ng-click=\"changeSize(2)\" class=\"fa fa-th\"></div></li><li><div ng-click=\"changeSize(3)\" class=\"fa fa-th-large\"></div></li></ul></div><div ng-repeat=\"file in files track by $index\" ng-class=\"class\" class=\"home-page-ab-wrap\"><div class=\"\"><div class=\"home-page-ab-img\"><a href=\"#\" class=\"thumbnail\"><img ng-src=\"/uploads/{{file.filename}}\" class=\"img-responsive\" alt=\"uploaded image\"></a></div><span class=\"\">{{file.filename}}</span></div></div></div></div></div>");
$templateCache.put("app/admin/recruit/recruitment.html","<div class=\"row\"><div ng-controller=\"RecruitmentCtrl as recruit\"><div class=\"col-sm-6 col-md-4 col-md-offset-1\"><h1>Guild Recruitment</h1><div class=\"well\"><tabset justified=\"true\"><tab heading=\"Modify Recruitment\"><form role=\"form\" class=\"form\" name=\"recruitmentStatusForm\" ng-submit=\"recruit.submit()\"><div class=\"row\"><div class=\"col-xs-4\"><label>Status</label><select ng-model=\"recruit.formData.currentlyRecruiting\" class=\"form-control input-md\" required=\"\"><option value=\"\"></option><option value=\"True\">Open</option><option value=\"False\">Closed</option></select></div><div class=\"col-xs-8\"><label>Class Type</label><select ng-model=\"recruit.formData.classType\" class=\"form-control input-md\" required=\"\"><option value=\"\"></option><option value=\"DeathKnight\">Death Knight</option><option value=\"Druid\">Druid</option><option value=\"Hunter\">Hunter</option><option value=\"Mage\">Mage</option><option value=\"Monk\">Monk</option><option value=\"Paladin\">Paladin</option><option value=\"Priest\">Priest</option><option value=\"Rogue\">Rogue</option><option value=\"Shaman\">Shaman</option><option value=\"Warlock\">Warlock</option><option value=\"Warrior\">Warrior</option></select></div><div class=\"col-xs-8\"><label>Specialization</label><select ng-model=\"recruit.formData.classSpec\" class=\"form-control input-md\" required=\"\"><option value=\"\"></option><option value=\"Affliction\">Affliction</option><option value=\"Arcane\">Arcane</option><option value=\"Arms\">Arms</option><option value=\"Assasination\">Assasination</option><option value=\"Balance\">Balance</option><option value=\"Beast Mastery\">Beast Mastery</option><option value=\"Blood\">Blood</option><option value=\"Brewmaster\">Brewmaster</option><option value=\"Combat\">Combat</option><option value=\"Demonology\">Demonology</option><option value=\"Destruction\">Destruction</option><option value=\"Discipline\">Discipline</option><option value=\"Elemental\">Elemental</option><option value=\"Enhancement\">Enhancement</option><option value=\"Feral\">Feral</option><option value=\"Fire\">Fire</option><option value=\"Frost\">Frost</option><option value=\"Fury\">Fury</option><option value=\"Gladiator\">Gladiator</option><option value=\"Guardian\">Guardian</option><option value=\"Holy\">Holy</option><option value=\"Marksman\">Marksman</option><option value=\"Mistweaver\">Mistweaver</option><option value=\"Protection\">Protection</option><option value=\"Restoration\">Restoration</option><option value=\"Retribution\">Retribution</option><option value=\"Shadow\">Shadow</option><option value=\"Subtlety\">Subtlety</option><option value=\"Survival\">Survival</option><option value=\"Unholy\">Unholy</option><option value=\"Windwalker\">Windwalker</option></select></div><div class=\"col-xs-4\"><label>Priority</label><select ng-model=\"recruit.formData.priority\" class=\"form-control\" required=\"\"><option value=\"\"></option><option value=\"Low\">Low</option><option value=\"Medium\">Medium</option><option value=\"High\">High</option></select></div><div class=\"col-xs-12\"><button style=\"margin-top: 5px\" type=\"submit\" class=\"btn btn-success btn-block\">Save <i class=\"fa fa-save\"></i></button></div></div></form></tab><tab heading=\"Add Thread\"><h3>Recruitment Threads</h3><form role=\"form\" class=\"form\" name=\"recruitTForm\" ng-submit=\"recruit.save()\"><div class=\"form-group\"><label>Thread URL</label> <input type=\"text\" class=\"form-control\" ng-model=\"recruit.recruitTD.threadUrl\" placeholder=\"http://www.mmo-champion.com\" required=\"\"></div><div class=\"form-group\"><label>Website Name</label> <input type=\"text\" class=\"form-control\" ng-model=\"recruit.recruitTD.websiteName\" placeholder=\"MMO-Champ\" required=\"\"></div><div class=\"form-group\"><label>Notes</label> <textarea class=\"form-control\" ng-model=\"recruit.recruitTD.threadNotes\">\n          </textarea></div><button style=\"margin-top: 5px\" type=\"submit\" class=\"btn btn-success btn-block\">Save <i class=\"fa fa-save\"></i></button></form></tab></tabset></div></div></div><div class=\"col-sm-6 col-md-5 col-md-offset-1\" ng-controller=\"RecruitmentListCtrl as vm\"><h2 class=\"text-primary pull-right\">Currently Recruiting</h2><table class=\"table table-condensed\"><thead><tr><th class=\"col-sm-2\">Class Type:</th><th class=\"col-sm-4\">Class Spec:</th><th class=\"col-sm-3\">Priority:</th><th class=\"col-sm-3\">Recruiting:</th></tr></thead><tbody><tr ng-repeat=\"recruitment in vm.recruitments\" ng-class-even=\"table-striped\"><td><img ng-src=\"img/icons/class/{{ recruitment.classType }}.png\" style=\"padding-right: 10px;\" height=\"30px\"></td><td>{{recruitment.classSpec}}</td><td>{{recruitment.priority}}</td><td>{{recruitment.currentlyRecruiting}}</td><td><div class=\"btn-group\"><a href=\"\" ng-click=\"vm.deleteRecruitment(recruitment._id)\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-trash\"></i></a></div></td></tr></tbody></table><div class=\"row\"><div ng-repeat=\"thread in vm.threads\">{{thread.threadUrl}}<div class=\"btn-group\"><a href=\"\" ng-click=\"vm.deleteThread(thread._id)\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-trash\"></i></a></div></div></div></div></div>");
$templateCache.put("app/admin/users/users.html","<div id=\"content\" ng-controller=\"UserCtrl as uctrl\"><div class=\"container\"><div ng-repeat=\"user in uctrl.users\" ng-class=\"{deleted: user.deleted}\">{{user.username}}</div></div></div>");
$templateCache.put("app/guild/home/home.html","<div class=\"container-fluid\"><div class=\"row\"><carousel current-index=\"selected\" data-interval=\"4000\" data-pause=\"false\"><slide ng-repeat=\"article in home.articles | limitTo: 3\" active=\"article.active\"><img ng-src=\"{{article.image}}\" alt=\"\"><div class=\"caption\"><h3><a ui-sref=\"guild.home.article({id:article._id})\">{{::article.title | limitTo: 31}}</a></h3><p>Author: {{::article.author.username}}</p></div></slide></carousel></div><div class=\"row\"><section class=\"tagline-area\"><div class=\"block-area\"><div class=\"container\"><div class=\"row text-center\"><div class=\"col-sm-12 col-md-4 block-area-col\"><a ui-sref=\"guild.videos\"><i class=\"fa fa-play-circle fa-5x\"></i><h1 class=\"text-center\">Kill Videos</h1></a></div><div class=\"col-sm-12 col-md-4 block-area-col\"><a ng-href=\"https://topshelfguild.com/forums\" target=\"_blakn\" trustashtml=\"\"><i class=\"fa fa-comments fa-5x\"></i><h1 class=\"text-center\">Forums</h1></a></div><div class=\"col-sm-12 col-md-4 block-area-col\"><a ng-href=\"https://topshelfguild.com/forums/applicationform/raider.2/form\" target=\"_blank\" trustashtml=\"\"><i class=\"fa fa-tasks fa-5x\"></i><h1 class=\"text-center\">Apply Now</h1></a></div></div></div></div></section></div><div class=\"row\"><div class=\"container\"><section id=\"home-left\"><div class=\"col-sm-12 col-md-3\"><h3 class=\"text-blue\">Currently Recruiting</h3><recruiting-widget></recruiting-widget></div></section><section id=\"home-right\"><div class=\"col-sm-12 col-md-9\"><div class=\"row\"><div class=\"home-page-hl\"><div class=\"col-sm-4 cf\"><h3 class=\"tagline\">Latest News</h3></div><div class=\"col-sm-5 cf\"><div class=\"line\"></div></div><div class=\"col-sm-3 cf\"><div class=\"block-type-btn cf\"><ul><li><div ng-click=\"home.changeSize(1)\" class=\"glyphicon glyphicon-th\"></div></li><li><div ng-click=\"home.changeSize(2)\" class=\"glyphicon glyphicon-th-large\"></div></li><li><div ng-click=\"home.changeSize(3)\" class=\"glyphicon glyphicon-th-list\"></div></li></ul></div></div></div></div><div ng-repeat=\"article in home.articles | limitTo: 9\" ng-class=\"home.class\" class=\"home-page-ab-wrap\"><div class=\"home-page-article-block\"><div class=\"home-page-ab-img\"><img ng-src=\"{{article.image}}\" alt=\"\"></div><div class=\"home-page-ab-header\"><h3><a ui-sref=\"guild.home.article({id:article._id})\">{{::article.title | limitTo: 61}}</a></h3><p>{{::article.description | limitTo: 140}}</p></div><div class=\"other-article-data\"><ul><li><p>{{article.author.username}}</p></li><li><p>{{article.created | date:\'MMM dd, yyyy\'}}</p></li></ul></div></div></div></div></section></div></div></div><the-footer></the-footer>");
$templateCache.put("app/guild/info/info.html","<div id=\"content\"><section class=\"page-banner-section\"><div class=\"container\"><div class=\"row\"><div class=\"col-md-6\"><h2>Life on the <span>Shelf</span></h2></div><div class=\"col-md-6\"><ul class=\"page-pagin\"><li><a href=\"index.html\">Home</a></li><li><a href=\"faqs.html\">Faq\'s</a></li></ul></div></div></div></section><section class=\"faqs-section card\"><div class=\"container\"><div class=\"row\"><div class=\"title-section\"><h1>Interested in joining Top Shelf?</h1><span></span><p class=\"lead\">Top Shelf is a relatively new, competitive raiding guild on Sargeras-US (CST, Chicago Datacenter). We formed at the beginning of Mists of Pandaria on the server Alterac Mountains. Shortly after we began raiding, we decided to move to Sargeras in search of stronger competition, active players, and a thriving economy.</p></div></div><div class=\"row\"><div class=\"col-sm-12 col-md-9\"><tabset justified=\"true\"><tab heading=\"Basic Info\"><div class=\"section\"><h3 class=\"text-primary\">Top Shelf</h3><p>As a guild we are <strong>well-established, focused, progression oriented, and resilient.</strong> We take pride in being <strong>serious without taking ourselves too seriously.</strong> We enjoy long sensual strolls across Azeroth, collecting purples and killing internet dragons. Our guild chat is active and our members do things together outside of just logging in for raids. Many of us hangout in Mumble at all hours of the day.</p></div><div class=\"divider\"></div><div class=\"section\"><p>Many of us in Top Shelf play multiple alts and we encourage all of our raiders to have at-least one well-geared alt that they are able to play on the same level as their main. Our off nights are often filled with alt raids, that are able to full-clear mythic content while it\'s still relevant (ex: during SoO before the 6.0 nerf, we were selling 3 carries per week). Other than raiding, many of us enjoy running challenge mode dungeons and going for realm best times. A handful of our members enjoy PvPing together, but many of us don\'t partake on a serious level.</p></div></tab><tab heading=\"Application Info\"><h3 class=\"text-primary\">Thinking about applying?</h3><p class=\"lead\">We try to respond to all applications within two days. We realize our decisions impact you and respect that you need an answer quickly.</p><h4 class=\"subtitle\">What We\'re Looking For</h4><p>Top Shelf is interested in bettering ourselves as a guild by making you a part of our team. You should be skilled, vocal, well versed in your class/role and possess a strong desire to conquer challenging content. We’re looking for someone who is going to be in it for the long haul, and someone who puts the needs of Top Shelf and its members over theirs. This means we want unselfish players unafraid to sit out fights sometimes. We are particularly interested in people who are highly motivated and do not need to be told to do something before acting themselves.</p><p>If you get offended very easily or don’t respond well to criticism then this is not the guild for you. You are expected to own up to your mistakes, and learn from them. We also expect that your skill will be up to par with any of our other current raiders. We encourage competitiveness and you should drive yourself to become more efficient at adapting to any fight or any role. We’re constantly striving to be the best and so should you.</p><ol class=\"appProcess\"><li>Once submitted, your application will be reviewed and discussed by the entire raid team. All of our raiders have a say in the recruiting process because they will be spending the same amount of time with you as the officers.</li><li>We will setup an interview with you to go over our guild discussion, and address any questions or concerns you might have.</li><li>Following your acceptance to the guild, you will be given a trial that lasts at most thirty days, but on average, two to three weeks. You may not trial while you are not wearing our guild tag. No exceptions. During your trial period you may be removed at any time, for any reason. Missing raids during your trial almost always will result in a failed trial and removal from the guild.</li><li>While raiding as a trial in Top Shelf, you may or may not receive loot. Your priority for loot is as follows: Raider > Raiding Alt / Trial / Social Member > D/E</li></ol></tab><tab heading=\"Expectations\"><h3 class=\"text-primary\">Guild Expectations</h3><p class=\"lead\">We at Top Shelf hold ourselves to <strong>high standards; both in raid and outside.</strong> Our members have each others\' backs and we expect the same from you.</p><ul class=\"expectations\"><li>Raiders should possess an in-depth knowledge of their class, its strengths / weaknesses and proper rotations.</li><li>Top Shelf provides boss strategies, and links to information from outside sources. We expect each and every raider to know the general strategies and mechanics before raid begins so that our time is spent doing, rather than explaining like you\'re five.</li><li>You are expected to have a name without special characters. If you have them and are accepted, we require that you change your character\'s name.</li><li>We expect you to be able to communicate effectively during encounters. This means having a headset <i class=\"fa fa-headphones\"></i>, working microphone <i class=\"fa fa-microphone\"></i>, and Mumble. If you cannot talk or prefer to never talk, perhaps look elsewhere. We won\'t force you to speak until it\'s absolutely necessary, but encourage you to be social!</li><li>We want to like you because we all spend a lot of time together. Raiding with players you don\'t get along with doesnt fit what we\'re trying to accomplish. This doesn\'t mean we\'ll make you hangout and listen to shitty music, or talk sports, but you are encouraged to. <strong>We believe you get out what you put in.</strong> If the guild as a whole is not getting the right \"vibe\" you will more than likely fail your trial.</li><li>You must be tolerant of the stresses involved in competitive raiding, to include repetitive wiping, criticism, being sat during progression, and roster changes.</li></ul><a href=\"https://topshelfguild.com/forums/applicationform/raider.2/form\" target=\"_blank\"><button class=\"btn btn-primary btn-w-md\">Join Us</button></a></tab></tabset></div><div class=\"col-sm-12 col-md-3\"><div class=\"tbar\"><h2 class=\"white-text\"><i class=\"icon-crown\"></i> Important Info</h2></div><ul class=\"collection\" style=\"padding-left:0;\"><li class=\"collection-item\">We raid <strong>Tues, Wed and Thurs</strong> from <strong>8:00pm to 12:00am</strong>.</li><li class=\"collection-item\">On Mondays we run alt raids and occasionally (if we\'re close to a kill or with new content) will expand main raid to this night. Monday night alt raids are completely optional.</li><li class=\"collection-item\">Our loot system is <strong>Loot Council</strong> comprised of three officers.</li><li class=\"collection-item\">We expect 90% attendance or higher. Our bench is small.</li><li class=\"collection-item\"><a href=\"https://topshelfguild.com/forums/applicationform/raider.2/form\" target=\"_blank\"><button class=\"btn btn-block btn-material-bluegrey btn-raised\">Application</button></a></li></ul></div></div></div></section></div>");
$templateCache.put("app/guild/roster/roster.html","<div class=\"container\" ng-controller=\"RosterCtrl as vm\"><div id=\"content\" class=\"row\"><table class=\"table table-condensed table-hover\"><thead><tr><th></th><th>Character Name</th><th>Class</th><th>Spec</th><th>Rank</th></tr></thead><tbody><tr ng-repeat=\"member in ::vm.members | orderBy:\'rank\' | filter:filterMaxOnly | filter:filterNoAlt | filter:filterNoRAlt\"><td><img ng-src=\"https://us.battle.net/static-render/us/{{member.character.thumbnail}}\" class=\"img-circle img-responsive\"></td><td>{{member.character.name}}</td><td>{{member.character.class | className}}</td><td>{{member.character.spec.name}}</td><td>{{member.rank | guildRank}}</td><td><a ng-href=\"http://us.battle.net/wow/en/character/sargeras/{{ trustUrl(member.character.name) }}/simple\" target=\"_blank\">Armory</a></td></tr></tbody></table></div></div>");
$templateCache.put("app/guild/videos/video-list.html","<div class=\"row blue-area\"><div class=\"container\" ng-controller=\"VideoCtrl as vid\"><div class=\"card card-panel\"><div class=\"card-title\"><h1>Mythic Blackhand</h1></div><div class=\"card-image\"><div class=\"embed-responsive embed-responsive-16by9\"><youtube-video class=\"embed-responsive-item\" video-id=\"vid.teoBH\"></youtube-video></div></div><div class=\"card-content\"><p>Holy Paladin PoV</p></div></div><div class=\"card card-panel\"><div class=\"card-title\"><h1>Mythic Iron Maidens</h1></div><div class=\"card-image\"><div class=\"embed-responsive embed-responsive-16by9\"><youtube-video class=\"embed-responsive-item\" video-id=\"vid.ironM\"></youtube-video></div></div><div class=\"card-content\"><p>Brewmaster Monk PoV</p></div></div><div class=\"card card-panel\"><div class=\"card-title\"><h1>Mythic Operator Thogar</h1></div><div class=\"card-image\"><div class=\"embed-responsive embed-responsive-16by9\"><youtube-video class=\"embed-responsive-item\" video-id=\"vid.operator\"></youtube-video></div></div><div class=\"card-content\"><p>Brewmaster Monk PoV</p></div></div><div class=\"card card-panel\"><div class=\"card-title\"><h1>Mythic Kromog</h1></div><div class=\"card-image\"><div class=\"embed-responsive embed-responsive-16by9\"><youtube-video class=\"embed-responsive-item\" video-id=\"vid.kromog\"></youtube-video></div></div><div class=\"card-content\"><p>Brewmaster Monk PoV</p></div></div></div></div>");
$templateCache.put("app/core/layout/footer.html","<footer><div class=\"row\"><div class=\"col-sm-12 col-lg-6\"><h5 class=\"white-text\">Footer Content</h5><p class=\"grey-text text-lighten-4\">Filler text</p></div><div class=\"col-sm-12 col-lg-4 col-lg-offset-2\"><h5 class=\"white-text\">Resources</h5><ul><li><a class=\"grey-text text-lighten-3\" href=\"http://www.wowprogress.com/guild/us/sargeras/Top+Shelf\" target=\"new_blank\">WoW Progress</a></li><li><a class=\"grey-text text-lighten-3\" <a=\"\" href=\"http://guildox.com/guild/us/sargeras/Top%20Shelf\" target=\"new_blank\">GuildOx</a></li><li><a class=\"grey-text text-lighten-3\" href=\"https://www.warcraftlogs.com/guilds/7658/\" target=\"_blank\">WarcraftLogs</a></li></ul></div></div><div class=\"footer-copyright\">© 2014-2015 Top Shelf Guild | Website by <a class=\"grey-text text-lighten-4 right\" href=\"https://twitter.com/itsSoop\">@itsSoop</a></div></footer>");
$templateCache.put("app/core/layout/navbar.html","<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\" ng-controller=\"NavbarCtrl as nav\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" ng-click=\"nav.isCollapsed = !nav.isCollapsed\" aria-controls=\"navbar\" aria-expanded=\"false\"><span class=\"sr-only\">Toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span></button> <a class=\"navbar-brand\" ui-sref=\"guild.home\" rel=\"home\"><img src=\"/img/logo.png\" height=\"60px\" class=\"brand-image\" alt=\"Top Shelf Guild logo\"></a></div><div id=\"navbar\" class=\"navbar-collapse collapse\" ng-class=\"{collapse: nav.isCollapsed}\"><ul class=\"nav navbar-nav navbar-right\"><li class=\"nav-link\"><a ui-sref=\"guild.home\">Home</a></li><li class=\"nav-link\"><a ui-sref=\"guild.info\">Info</a></li><li class=\"nav-link\"><a ng-href=\"https://topshelfguild.com/forums/applicationform/raider.2/form\" target=\"_blank\" trustashtml=\"\">Apply</a></li><li class=\"nav-link\"><a ui-sref=\"guild.roster\">Roster</a></li><li class=\"nav-link\"><a ui-sref=\"guild.videos\">Kill Videos</a></li><li class=\"nav-link\"><a ng-href=\"https://topshelfguild.com/forums/\" target=\"_blank\" trustashtml=\"\">Forums</a></li><li class=\"nav-link\" ng-show=\"nav.isAdmin()\"><a ui-sref=\"admin.dashboard\">Admin</a></li><li class=\"nav-link\" ng-if=\"!nav.isLoggedIn()\"><a ui-sref=\"account.signup\">Sign up</a></li><li class=\"nav-link\" ng-if=\"!nav.isLoggedIn()\"><a ui-sref=\"account.login\">Login</a></li><li class=\"dropdown\" ng-if=\"nav.isLoggedIn()\" dropdown=\"\"><a href=\"#\" class=\"dropdown-toggle\" role=\"button\" aria-expanded=\"false\" dropdown-toggle=\"\"><span class=\"caret\"></span></a><ul class=\"dropdown-menu\" role=\"menu\"><li><a ng-click=\"nav.logout()\">Logout</a></li></ul></li></ul></div></div></nav>");
$templateCache.put("app/core/layout/shell.html","<div ng-controller=\"MasterCtrl as master\"><header class=\"clearfix\"><navbar></navbar></header><section><div ui-view=\"main\"></div></section><footer class=\"main-footer\"></footer></div>");
$templateCache.put("app/account/password/forgot/forgot.html","<div id=\"wrapper\" ng-controller=\"ForgotCtrl as forgot\"><h2>Enter your email and we\'ll send you a link to reset your password.</h2><form autocomplete=\"off\" method=\"post\" ng-submit=\"forgot.forgot()\" name=\"forgotForm\"><div class=\"input-wrapper\"><label for=\"email\"><i class=\"fa fa-envelope fa-3x\"></i></label><input type=\"text\" id=\"username\" ng-model=\"forgot.email\" placeholder=\"Email\" required=\"\" spellcheck=\"false\"></div><div class=\"input-wrapper\"><input type=\"submit\" value=\"Reset Password\" ng-disabled=\"forgotForm.$invalid\"></div></form></div>");
$templateCache.put("app/account/password/reset/form.html","<div id=\"wrapper\" ng-controller=\"ResetCtrl as reset\"><form autocomplete=\"off\" method=\"post\" name=\"resetForm\" ng-submit=\"reset.reset()\"><div class=\"input-wrapper\"><label for=\"password\"><i class=\"fa fa-lock fa-3x\"></i></label><input type=\"password\" id=\"password\" ng-model=\"login.password\" placeholder=\"Password\" required=\"\"></div><div class=\"input-wrapper\" ng-class=\"{ \'has-error\' : signupForm.confirmPassword.$invalid && signupForm.confirmPassword.$dirty }\"><label for=\"password\"><i class=\"fa fa-lock fa-3x\"></i></label><input id=\"password\" name=\"confirmPassword\" type=\"password\" placeholder=\"Confirm Password\" required=\"\"><div ng-messages=\"resetForm.confirmPassword.$error\" ng-show=\"resetForm.confirmPassword.$touched || resetForm.$submitted\"><div ng-message=\"compareTo\">Password must match.</div><div ng-message=\"required\">Password confirmation is required.</div></div></div><div class=\"input-wrapper\"><input type=\"submit\" value=\"Reset Password\" ng-disabled=\"resetForm.$invalid\"><p>Not a member? <a ui-sref=\"account.signup\">Sign up now</a> <span>&rarr;</span></p></div></form><div class=\"\"></div></div>");
$templateCache.put("app/account/password/reset/invalid.html","This password reset is invalid or expired. Ask for a new one.");
$templateCache.put("app/admin/news/article/article.html","<div ng-controller=\"EditArticleCtrl as eac\"><div class=\"row\"><div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\"><h1 class=\"text-primary\">New Post</h1><form novalidate=\"\" ng-submit=\"eac.saveArticle()\"><div class=\"row\"><div class=\"col-sm-12 col-lg-7 form-group\"><input type=\"text\" class=\"form-control\" placeholder=\"Post Title\" ng-minlength=\"3\" ng-maxlength=\"75\" ng-model=\"eac.articleData.title\" required=\"\"></div></div><div class=\"row\"><div class=\"col-sm-12 col-lg-10\"><text-angular ta-toolbar=\"[[\'h1\',\'h2\',\'h3\',\'p\',\'quote\'],[\'bold\',\'italics\',\'underline\'],[\'justifyLeft\',\'justifyCenter\',\'ul\',\'ol\',\'indent\',\'outdent\',\'undo\',\'redo\'], [\'insertLink\',\'insertImage\', \'insertVideo\', \'html\']]\" class=\"textEditor\" ng-model=\"ncc.articleData.content\"></text-angular></div></div><div class=\"row\"><div class=\"col-sm-12 col-lg-10\"><textarea class=\"form-control\" placeholder=\"Description / summary of your post. This will show on the home page and is limited to 140 characters.\" ng-model=\"eac.articleData.description\" rows=\"3\"></textarea></div></div><div class=\"row\"><div class=\"col-sm-4\"><input type=\"text\" class=\"form-control\" placeholder=\"Home Image 750x450\" ng-model=\"eac.articleData.image\" style=\"padding-left: 15px;\"></div><div class=\"col-sm-4\"><input type=\"text\" class=\"form-control\" placeholder=\"sluggin\" ng-model=\"eac.articleData.slug\" style=\"padding-left: 15px;\"></div></div><div class=\"row\"><div class=\"col-sm-3 col-sm-offset-4\" style=\"padding-top: 15px;\"><input type=\"submit\" class=\"btn btn-primary\" value=\"Save Article\"></div></div></form></div></div></div>");
$templateCache.put("app/admin/news/create/create.html","<div class=\"container-fluid\" ng-controller=\"NewsCreateCtrl as ncc\"><div class=\"row\"><h1 class=\"text-primary\">New Post</h1><form novalidate=\"\" ng-submit=\"ncc.saveArticle()\"><div class=\"col-sm-12 col-md-8\" style=\"margin-right: 20px;\"><div class=\"row\"><input type=\"text\" class=\"form-control\" placeholder=\"Post Title\" ng-minlength=\"3\" ng-maxlength=\"75\" ng-model=\"ncc.articleData.title\" required=\"\"></div><div class=\"row\"><text-angular ta-toolbar=\"[[\'h1\',\'h2\',\'h3\',\'p\',\'quote\'],[\'bold\',\'italics\',\'underline\'],[\'justifyLeft\',\'justifyCenter\',\'ul\',\'ol\',\'indent\',\'outdent\',\'undo\',\'redo\'], [\'insertLink\',\'insertImage\', \'insertVideo\', \'html\']]\" class=\"textEditor\" ng-model=\"ncc.articleData.content\"></text-angular></div><div class=\"row\"><textarea class=\"form-control\" placeholder=\"Description / summary of your post. This will show on the home page and is limited to 140 characters.\" ng-model=\"ncc.articleData.description\" rows=\"3\"></textarea></div></div><div class=\"well col-sm-12 col-md-3\"><div class=\"row\"><div class=\"col-sm-12\"><label>Hero Image</label> <input type=\"text\" class=\"form-control\" placeholder=\"Image\" ng-model=\"ncc.articleData.image\" style=\"padding-left: 15px;\"></div></div><div class=\"row\"><div class=\"col-sm-12 col-md-6\"><label>Slug/SEO Title</label> <input type=\"text\" class=\"form-control\" placeholder=\"sluggin\" ng-model=\"ncc.articleData.slug\" style=\"padding-left: 15px;\"></div><div class=\"col-sm-12 col-md-6\"><label>Article Status</label><select ng-model=\"ncc.articleData.state\" class=\"form-control\" required=\"\"><option value=\"\"></option><option value=\"Published\">Published</option><option value=\"Draft\">Draft</option><option value=\"Archive\">Archive</option></select></div></div><div class=\"row\"><div class=\"col-sm-3 col-sm-offset-4\" style=\"padding-top: 15px;\"><input type=\"submit\" class=\"btn btn-primary\" value=\"Save Article\"></div></div></div></form></div></div>");
$templateCache.put("app/guild/components/widgets/progression-widget.html","<ul class=\"collapsible popout\" data-collapsible=\"accordion\"><li><div class=\"collapsible-header\"><i class=\"mdi-navigation-unfold-more\"></i>Mythic Highmaul</div><div class=\"collapsible-body\"><p><dt>{{prog.charData.progression.raids[32].bosses[0].name}}</dt><dd>{{charData.progression.raids[32].bosses[0].mythicKills}}</dd><dt>{{charData.progression.raids[32].bosses[1].name}}</dt><dd>{{charData.progression.raids[32].bosses[1].mythicKills}}</dd><dt>{{charData.progression.raids[32].bosses[2].name}}</dt><dd>{{charData.progression.raids[32].bosses[2].mythicKills}}</dd><dt>{{charData.progression.raids[32].bosses[3].name}}</dt><dd>{{charData.progression.raids[32].bosses[3].mythicKills}}</dd><dt>{{charData.progression.raids[32].bosses[4].name}}</dt><dd>{{charData.progression.raids[32].bosses[4].mythicKills}}</dd><dt>{{charData.progression.raids[32].bosses[5].name}}</dt><dd>{{charData.progression.raids[32].bosses[5].mythicKills}}</dd><dt>{{charData.progression.raids[32].bosses[6].name}}</dt><dd>{{charData.progression.raids[32].bosses[6].mythicKills}}</dd></p></div></li><li><div class=\"collapsible-header\"><i class=\"mdi-navigation-unfold-more\"></i> Mythic Blackrock Foundry</div><div class=\"collapsible-body\"><p><dt>{{charData.progression.raids[33].bosses[0].name}}</dt><dd>{{charData.progression.raids[33].bosses[0].mythicKills}}</dd><dt>{{charData.progression.raids[33].bosses[1].name}}</dt><dd>{{charData.progression.raids[33].bosses[1].mythicKills}}</dd><dt>{{charData.progression.raids[33].bosses[2].name}}</dt><dd>{{charData.progression.raids[33].bosses[2].mythicKills}}</dd><dt>{{charData.progression.raids[33].bosses[3].name}}</dt><dd>{{charData.progression.raids[33].bosses[3].mythicKills}}</dd><dt>{{charData.progression.raids[33].bosses[4].name}}</dt><dd>{{charData.progression.raids[33].bosses[4].mythicKills}}</dd><dt>{{charData.progression.raids[33].bosses[5].name}}</dt><dd>{{charData.progression.raids[33].bosses[5].mythicKills}}</dd><dt>{{charData.progression.raids[33].bosses[6].name}}</dt><dd>{{charData.progression.raids[33].bosses[6].mythicKills}}</dd><dt>{{charData.progression.raids[33].bosses[7].name}}</dt><dd>{{charData.progression.raids[33].bosses[7].mythicKills}}</dd><dt>{{charData.progression.raids[33].bosses[8].name}}</dt><dd>{{charData.progression.raids[33].bosses[8].mythicKills}}</dd><dt>{{charData.progression.raids[33].bosses[9].name}}</dt><dd>{{charData.progression.raids[33].bosses[9].mythicKills}}</dd></p></div></li></ul>");
$templateCache.put("app/guild/components/widgets/recruit-widget.html","<div class=\"recruitment-widget\"><ul class=\"collection with-header list-unstyled\" ng-repeat=\"recruitment in rwidget.recruitments\"><li class=\"collection-item\"><img ng-src=\"/img/icons/class/{{recruitment.classType}}.png\" style=\"padding-left: 10px;\" height=\"32px\" alt=\"icon for {{recruitment.classType}}\"> <span style=\"padding-left: 10px;\">{{ recruitment.classSpec }}</span> <strong>{{ recruitment.priority }}</strong></li></ul></div>");
$templateCache.put("app/guild/news/view/news.view.html","<section class=\"page-banner-section\"><div class=\"container\"><div class=\"row\"><div class=\"col-md-6\"><h2><span>Articles</span> From The Shelf</h2></div><div class=\"col-md-6\"><ul class=\"page-pagin\"><li><a ui-sref=\"guild.home\">Home</a></li></ul></div></div></div></section><section class=\"blog-section standard\" ng-controller=\"NewsViewCtrl as vm\"><div class=\"container\"><div class=\"row\"><div class=\"col-md-9\"><div class=\"blog-box\"><div class=\"blog-post single-post\"><div class=\"date-post\">{{vm.article.created | date:\'MMM dd, yyyy\'}}</div><div class=\"post-content\"><div class=\"post-content-text\"><ul class=\"post-tags\"><li><img class=\"user-picture\" ng-src=\"{{::vm.author.picture}}\"><a class=\"user-displayName\" ng-href=\"/news/author/{{::vm.author.id}}\">{{::vm.author.displayName}}</a></li><li><a href=\"#\">{{vm.article.category}}</a></li></ul><div ng-if=\"vm.article && vm.article !== \'error\'\"><h1 class=\"content-heading\">{{::vm.article.title}}</h1><p><div ta-bind=\"\" ng-model=\"vm.article.content\"></div></p><div class=\"share-box\"><div class=\"row\"><div class=\"col-md-6\"><span>Share this article:</span></div><div class=\"col-md-6\"><ul class=\"social-share\"><li><a class=\"facebook\" href=\"#\"><i class=\"fa fa-facebook\"></i></a></li><li><a class=\"twitter\" href=\"#\"><i class=\"fa fa-twitter\"></i></a></li><li><a class=\"google\" href=\"#\"><i class=\"fa fa-google-plus\"></i></a></li></ul></div></div></div></div></div><div class=\"autor-post\"><div class=\"autor-content\"><h2>{{vm.article.author.displayName}}</h2><p>{{::vm.article.author.bio}}</p></div></div><div class=\"comment-section\"><h2>Comments</h2><form class=\"comment-form\"><h2>Leave a Reply</h2><input name=\"name\" id=\"name\" type=\"text\" placeholder=\"Name (required)\"> <textarea name=\"comment\" id=\"comment\" placeholder=\"Your Message (required)\"></textarea> <input type=\"submit\" id=\"submit_contact\" value=\"Post Comment\"></form></div></div></div></div></div><div class=\"col-md-3\"><div class=\"sidebar\"><div class=\"category-widget widget\"><h2>Categories</h2><ul class=\"category-list\"><li>{{vm.article.category}}</li></ul></div><div class=\"top-posts-widget widget\"><h2>Top Posts</h2></div></div><div class=\"flickr-widget widget\"><h2>Recruitment</h2><recruiting-widget></recruiting-widget></div></div></div></div></section>");}]);
/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function()
{
  'use strict';

  /* @ngdoc object
   * @name app.guild
   * @description
   * Module for the guild portions of the application
   */
  angular
    .module('app.guild', [])
    .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider)
  {
    $stateProvider
      .state('guild',
      {
        abstract: true,
        url: '',
        template:'<ui-view />'
      })
      .state('guild.home',
      {
        url: '/',
        title: 'Top Shelf - Sargeras US Mythic Raiding',
        views:
        {
          'main@':
          {
            templateUrl: 'app/guild/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'home',
            resolve:
            { /* @ngInject */
              articles: ['articleSvc', function(articleSvc)
              {
                return articleSvc.all();
              }]
            }
          }
        }

      })
      .state('guild.home.article',
      {
        url: 'news/:id',
        views:
        {
          'main@':
          {
            templateUrl: 'app/guild/news/view/news.view.html',
            controller: 'NewsViewCtrl',
            controllerAs: 'vm',
            resolve:
            { /* @ngInject */
              article: ['$stateParams', 'articleSvc', function($stateParams, articleSvc)
              {
                return articleSvc.get($stateParams.id);
              }]
            }
          }
        }
      })
      .state('guild.info',
      {
        url: '/info',
        title: 'About Us - Top Shelf',
        views:
        {
          'main@':
          {
            templateUrl: 'app/guild/info/info.html',
            controller: 'InfoCtrl as info'
          }
        }
      })
      .state('guild.videos',
      {
        url: '/videos',
        title: 'Boss Kill Videos - Top Shelf',
        views:
        {
          'main@':
          {
            templateUrl: 'app/guild/videos/video-list.html',
            controller: 'VideoCtrl as vid'
          }
        }
      })
      .state('guild.roster',
      {
        url: '/roster',
        title: 'Active Raid Roster - Top Shelf',
        views:
        {
          'main@':
          {
            templateUrl: 'app/guild/roster/roster.html',
            controller: 'RosterCtrl as roster',
            resolve: { /*@ngInject*/
              members: ['armorySvc', function(armorySvc) {
                return armorySvc.getMembers();
              }]
            }
          }
        }
      });
  }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  angular
    .module('app.guild')
    .controller('NewsViewCtrl', NewsViewCtrl);

  NewsViewCtrl.$inject = ['articleSvc', '$stateParams'];

  function NewsViewCtrl(articleSvc, $stateParams) {

    /*jshint validthis: true */
    var vm = this;
    var articleId = $stateParams.id;
    if (articleId && articleId.length > 0) {

      articleSvc.get(articleId).success(function(article) {
        vm.article = article;
      });
    }
  }
})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  angular
    .module('app.guild')
    .directive('recruitingWidget', recruitingWidget);

  function recruitingWidget() {

    var directive = {
      restrict: 'ACE',
      templateUrl: 'app/guild/components/widgets/recruit-widget.html',
      scope: {
      },
      controller: 'RecruitingWidgetCtrl',
      controllerAs: 'rwidget',
      bindToController: true
    };
    return directive;
  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

 /**
  * @ngdoc controller
  * @name app.guild.controller:RecruitingWidgetCtrl
  * @description < description placeholder >
  */

  angular
    .module('app.guild')
    .controller('RecruitingWidgetCtrl', RecruitingWidgetCtrl);

  RecruitingWidgetCtrl.$inject = ['recruitSvc', 'toastr'];
  /* @ngInject */
  function RecruitingWidgetCtrl(recruitSvc, toastr) {

    /*jshint validthis: true */
    var vm = this;

    recruitSvc.list().success(function (data) {
          vm.recruitments = data;
        })
        .error(function() {
          toastr.error('Sorry, unable to retrieve  recruitment status');
        });

  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  angular
    .module('app.guild')
    .directive('progressionWidget', progressionWidget);

  function progressionWidget() {

    var directive = {
      restrict: 'ACE',
      templateUrl: 'app/guild/components/widgets/progression-widget.html',
      scope: {
      },
      controller: 'myController',
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;

  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function () {
  'use strict';
  /**
   * @name ProgressionWidgetCtrl
   * @desc ProgressionWidgetCtrl controller
   * @memberOf app.guild
   */
  angular
    .module('app.guild')
    .controller('ProgressionWidgetCtrl', ProgressionWidgetCtrl);

  ProgressionWidgetCtrl.$inject = ['$scope', 'Progression'];
  /* @ngInject */
  function ProgressionWidgetCtrl($scope, Progression)  {
    Progression.all().success(function(data) {
      $scope.charData = data;
    });
  }

}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  /* @ngdoc object
   * @name app.admin
   * @description
   * Module for admin things
   */
  angular
    .module('app.admin', [])
    .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
    $stateProvider
      .state('admin', {
        title: 'Admin - TSG Admin',
        url: '/admin',
        authorize: 'admin',
        views: {
          'main@': {
            templateUrl: 'app/admin/admin.html',
            controller: 'AdminDashboardCtrl',
            controllerAs: 'vm'
          },
          'workspace': {
            template: '<div ui-view="workspace"></div>',
            controller: 'AdminDashboardCtrl'
          }
        }
      })
      .state('admin.dashboard', {
        title: 'Dashboard - TSG Admin',
        url: '/dashboard',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/dashboard/admin-dashboard.html',
            controller: 'AdminDashboardCtrl',
            controllerAs: 'dash'
          }
        }
      })
      .state('admin.media', {
        url: '/media',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/media/media.html',
            controller: 'MediaController'
          }
        }
      })
      .state('admin.users', {
        url: '/users',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/users/users.html',
            controller: 'UserCtrl as uctrl'
          }
        }
      })
      .state('admin.news', {
        title: 'Article List - TSG Admin',
        url: '/news',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/news/listing.html',
            controller: 'NewsListingCtrl',
            controllerAs: 'nlc',
            resolve: { /* @ngInject */
              articles: ['articleSvc', function(articleSvc) {
                return articleSvc.all();
              }]
            }
          }
        }
      })
      .state('admin.news.create', {
        title: 'Article Composer - TSG Admin',
        url: '/create',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/news/create/create.html',
            controller: 'NewsCreateCtrl',
            controllerAs: 'ncc'
          }
        }
      })
      .state('admin.news.article', {
        url: '/:id',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/news/article/article.html',
            controller: 'EditArticleCtrl',
            controllerAs: 'eac',
            resolve: { /* @ngInject */
              article: ['$stateParams', 'articleSvc', function($stateParams, articleSvc) {
                return articleSvc.get($stateParams.id);
              }]
            }
          }
        }
      })
      .state('admin.recruitment', {
        title: 'Recruitment - TSG Admin',
        url: '/recruit',
        views: {
          'workspace@admin': {
            templateUrl: 'app/admin/recruit/recruitment.html',
            controller: 'RecruitmentCtrl as recruit'
          }
        }
      });
  }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('NewsCreateCtrl', NewsCreateCtrl);

  NewsCreateCtrl.$inject = ['articleSvc', 'toastr'];

  function NewsCreateCtrl(articleSvc, toastr) {

    var vm = this;
    vm.saveArticle = function() {
      vm.processing = true;
      vm.message = '';
      articleSvc.create(vm.articleData).success(function(data) {
        vm.processing = false;
        vm.articleData = {};
        vm.message = data.message;
        toastr.success('Your post should now appear on the main page',
          'Article Saved!');

      }).error(function(error) {
        toastr.error('There was a problem with your post' +
          error.message, 'Something broke');
      });
    }; // end of $scope.createPost
  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function()
{
  'use strict';

  angular
    .module('app.admin')
    .controller('EditArticleCtrl', EditArticleCtrl);

  EditArticleCtrl.$inject = ['articleSvc', '$stateParams', 'toastr'];

  function EditArticleCtrl(articleSvc, $stateParams, toastr)
  {

    /*jshint validthis: true */
    var vm = this;
    var articleId = $stateParams.id;

    articleSvc.get(articleId).success(function(data)
    {
      vm.articleData = data;
    });

    vm.saveArticle = function()
    {
      vm.processing = true;
      vm.message = '';
      // call the userService function to update
      articleSvc.update(articleId, vm.articleData)
        .success(function()
        {
          vm.processing = false;
          // clear the form
          vm.articleData = {};
          // bind the message from our API to vm.message
          toastr.success('Your post has been updated', 'Success');
        });
    };

  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  /* @ngdoc object
   * @name app.account
   * @description
   * Module for the user accounts
   */
  angular
    .module('app.account', [])
    .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
    $stateProvider
      .state('account', {
        url: '/account',
        abstract: true
      })
      .state('account.login', {
        url: '/login',
        views: {
          'main@': {
            templateUrl: 'app/account/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
          }
        }
      })
      .state('account.signup', {
        url: '/signup',
        views: {
          'main@': {
            templateUrl: 'app/account/signup/signup.html',
            controller: 'SignupCtrl',
            controllerAs: 'signup'
          }
        }
      })
      .state('account.logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: ['$state', 'Auth', function($state, Auth) {
          var referrer = $state.params.referrer ||
                          $state.current.referrer ||
                          'guild.home';
          Auth.logout();
          $state.go(referrer);
        }]
      })
      .state('account.profile', {
        url: '/profile',
        views: {
          'main@': {
            templateUrl: 'app/account/profile/profile.html',
            controller: 'ProfileCtrl',
            controllerAs: 'profile',
            resolve: {
              authenticated: ['$q', '$location', 'Auth', function($q, $location, Auth) {
                var deferred = $q.defer();

                if (!Auth.isLoggedIn) {
                  $location.path('/account/login');
                }
                else {
                  deferred.resolve();
                }

                return deferred.promise;
              }]
            }
          }
        }
      })
      .state('account.password', {
        abstract: true,
        url: '/password',
        views: {
          'main@': {
            template: '<ui-view/>'
          }
        }
      })
      .state('account.password.forgot', {
        url: '/forgot',
        views: {
          'main@': {
            templateUrl: 'app/account/password/forgot/forgot.html',
            controller: 'ForgotCtrl as forgot'
          }
        }
      })
      .state('account.password.reset', {
        abstract: true,
        url: '/reset',
        views: {
          'main@': {
            template: '<ui-view/>'
          }
        }
      })
      .state('account.password.reset.invalid', {
        url: '/invalid',
        views: {
          'main@': {
            templateUrl: 'app/account/password/reset/invalid.html'
          }
        }
      })
      .state('account.password.reset.form', {
        url: '/:token',
        views: {
          'main@': {
            templateUrl: 'app/account/password/reset/form.html',
            controller: 'ResetCtrl as reset'
          }
        }
      });
  }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

 /**
  * @ngdoc controller
  * @name app.account.controller:ResetCtrl
  * @description < description placeholder >
  */

  angular
    .module('app.account')
    .controller('ResetCtrl', ResetCtrl);

  ResetCtrl.$inject = ['userSrv', 'toastr', '$auth', '$stateParams'];
  /* @ngInject */
  function ResetCtrl(userSrv, toastr, $auth, $stateParams) {

    /*jshint validthis: true */
    var vm = this;

    vm.reset = function() {
      userSrv.resetPassword($stateParams.token, {'password': vm.password})
        .then(function(token) {
          toastr.success('Password has been updated');
          $auth.setToken(token, true);
        })
        .catch(function(response) {
          toastr.info(response.data.message);
        });
    };
  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

 /**
  * @ngdoc controller
  * @name app.account.controller:ForgotCtrl
  * @description < description placeholder >
  */

  angular
    .module('app.account')
    .controller('ForgotCtrl', ForgotCtrl);

  ForgotCtrl.$inject = ['userSrv', 'toastr'];
  /* @ngInject */
  function ForgotCtrl(userSrv, toastr) {

    /*jshint validthis: true */
    var vm = this;

    vm.forgot = function() {
      userSrv.forgotPassword({'email': vm.email})
         .then(function() {
           toastr.success('Email has been sent');
         })
         .catch(function(response) {
           toastr.info(response.data.message);
         });
     };

  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

 /**
  * @ngdoc controller
  * @name app.guild.controller:VideoCtrl
  * @description < description placeholder >
  */

  angular
    .module('app.guild')
    .controller('VideoCtrl', VideoCtrl);

  VideoCtrl.$inject = ['$scope'];
  /* @ngInject */
  function VideoCtrl($scope) {

    /*jshint validthis: true */
    var vm = this;

    vm.ctrl = 'videoctrl';

    vm.teoBH = 'QLMgPul3jNQ';
    vm.ironM = 'iunGvJf_kDY';
    vm.operator = 'nXT7n-nbtPM';
    vm.kromog = '5sKuBe72-ZQ';
  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.guild.controller:RosterCtrl
   * @description < description placeholder >
   */

  angular
    .module('app.guild')
    .controller('RosterCtrl', RosterCtrl);

  RosterCtrl.$inject = ['armorySvc', '$scope', '$sce'];
  /* @ngInject */
  function RosterCtrl(armorySvc, $scope, $sce) {

    /*jshint validthis: true */
    var vm = this;
    armorySvc.getMembers().success(function(data) {
      vm.members = data.members;

    });

    $scope.trustUrl = function(url) {
      return $sce.trustAsResourceUrl(url);
    }
    vm.rosterlist = {
      maxLevelOnly: true
    };

    $scope.filterMaxOnly = function(member) {
      return member.rank <= 5;
    };
    $scope.filterNoAlt = function(member) {
      return member.rank !== 2;
    };
    $scope.filterNoRAlt = function(member) {
      return member.rank !== 5;
    };
  }
})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

 /**
  * @ngdoc controller
  * @name app.guild.controller:InfoCtrl
  * @description < description placeholder >
  */

  angular
    .module('app.guild')
    .controller('InfoCtrl', InfoCtrl);

  InfoCtrl.$inject = [];
  /* @ngInject */
  function InfoCtrl() {

    /*jshint validthis: true */
    var vm = this;

    vm.controllerName = 'GuildInfo';

  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  angular
    .module('app.guild')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['articleSvc'];

  function HomeCtrl(articleSvc) {

    /*jshint validthis: true */
    var vm = this;
    vm.articles = {};
    articleSvc.all().success(function(data) {
      // bind the articles that come back to vm.articles
      vm.articles = data;
    });

    vm.selectSlide = function(i) {
      vm.selected = i;
    };

    vm.class = 'col-sm-6 col-md-4';

    vm.changeSize = function(btnNum) {
      switch (btnNum) {
        case 1:
          vm.class = 'col-sm-6 col-md-4';
          break;
        case 2:
          vm.class = 'col-sm-6 col-md-6';
          break;
        case 3:
          vm.class = 'col-sm-12 col-md-12';
          break;
      }
    };
  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name app.core.ShellCtrl
   * @description
   * Controller
   */
  angular
    .module('app.core')
    .controller('MasterCtrl', MasterCtrl);

  MasterCtrl.$inject = ['$scope'];
  /* @ngInject */
  function MasterCtrl($scope) {
    var master = this;

    master.isCollapsed = true;

    var mobileView = 992;

    master.getWidth = function() {
      return window.innerWidth;
    };

    master.toggleSidebar = function() {
      master.toggle = !master.toggle;
    };

    window.onresize = function() {
      $scope.$apply();
    };

  }
})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

/**
 * @ngdoc directive
 * @name app.core.directive:navbar
 * @scope true
 * @param {object} test test object
 * @restrict E
 *
 * @description < description placeholder >
 *
 */

  angular
    .module('app.core')
    .directive('navbar', navbar);

  navbar.$inject = [];

  function navbar() {
    // Usage: ...
    var directive = {
      bindToController: true,
      controller: 'NavbarCtrl',
      controllerAs: 'nav',
      restrict: 'EA',
      templateUrl: 'app/core/layout/navbar.html',
    };
    return directive;
  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  angular
    .module('app.core')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = ['Auth', 'toastr', '$location', 'User'];
  /* @ngInject */
  function NavbarCtrl(Auth, toastr, $location, User) {
    // controllerAs ViewModel
    var vm = this;
    vm.isCollapsed = true;

    vm.isAdmin = Auth.isAdmin;
    vm.currentUser = Auth.getCurrentUser;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAuthenticated = function() {
      return Auth.isLoggedIn();
    };
    vm.logout = function() {
      Auth.logout();
      toastr.info('See you around', 'Logged Out!');
      $location.path('/account/login');
    };

    vm.isActive = function(route) {
      if (route !== '/') {
        return -1 !== $location.path().indexOf(route);
      }
      else {
        return route === $location.path();
      }
    };
  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function () {
    'use strict';
    /**
       * @ngdoc directive
       * @name app.core.directive:footer
       * @restrict EA
       * @element
       *
       * @description
       *
       * @example
       *
       */
angular
  .module('app.core')
  .directive('theFooter', theFooter);

    function theFooter() {
        return {
            restrict: 'EA',
            templateUrl: 'app/core/layout/footer.html',
            controller: 'FooterCtrl'
        };
    }

}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function () {
    'use strict';
    /**
       * @ngdoc object
       * @name app.core.controller:FooterCtrl
       *
       * @description
       *
       */
    angular
      .module('app.core')
      .controller('FooterCtrl', FooterCtrl);
          /* @ngInject */
    function FooterCtrl() {
      var vm = this;
      vm.ctrlName = 'footer';
    }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function () {
  'use strict';

  /* @ngdoc object
   * @name app.common
   * @description
   * Module for the common (shared) portions of the application
   */
  angular
    .module('app.common', []);
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.common.socketFactory
   * @description < description placeholder >
   */

  angular
    .module('app.common') /*@ngInject*/
    .factory('socket', ['socketFactory', function(socketFactory) {


      // socket.io now auto-configures its connection when we ommit a connection url
      var ioSocket = io('', {
        // Send auth token on connection, you will need to DI the Auth service above
        // 'query': 'token=' + Auth.getToken()
      });

      var socket = socketFactory({
        ioSocket: ioSocket
      });

      return {
        socket: socket,

        /**
         * Register listeners to sync an array with updates on a model
         *
         * Takes the array we want to sync, the model name that socket updates are sent from,
         * and an optional callback function after new items are updated.
         *
         * @param {String} modelName
         * @param {Array} array
         * @param {Function} cb
         */
        syncUpdates: function(modelName, array, cb) {
          cb = cb || angular.noop;

          /**
           * Syncs item creation/updates on 'model:save'
           */
          socket.on(modelName + ':save', function(item) {
            var oldItem = _.find(array, {
              _id: item._id
            });
            var index = array.indexOf(oldItem);
            var event = 'created';

            // replace oldItem if it exists
            // otherwise just add item to the collection
            if (oldItem) {
              array.splice(index, 1, item);
              event = 'updated';
            }
            else {
              array.push(item);
            }

            cb(event, item, array);
          });

          /**
           * Syncs removed items on 'model:remove'
           */
          socket.on(modelName + ':remove', function(item) {
            var event = 'deleted';
            _.remove(array, {
              _id: item._id
            });
            cb(event, item, array);
          });
        },

        /**
         * Removes listeners for a models updates on the socket
         *
         * @param modelName
         */
        unsyncUpdates: function(modelName) {
          socket.removeAllListeners(modelName + ':save');
          socket.removeAllListeners(modelName + ':remove');
        }
      };

    }]);

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  angular
    .module('app.common')
    .factory('recruitSvc', recruitSvc);

  recruitSvc.$inject = ['$http'];

  function recruitSvc($http) {
    var apiBase = '/api/recruiting';
    var service = {
      list: list,
      show: show,
      create: create,
      change: change,
      destroy: destroy,
      createThread: createThread,
      listThreads: listThreads,
      destroyThread: destroyThread
    };

    return service;

    ////////////////////////////

    function list() {
      return $http.get(apiBase);
    }

    function show(id) {
      return $http.get(apiBase + '/' + id);
    }
    function create(recruitData) {
      return $http.post(apiBase, recruitData);
    }
    function change(id, recruitData) {
      return $http.put(apiBase + '/' + id, recruitData);
    }
    function destroy(id) {
      return $http.delete(apiBase + '/' + id);
    }
    function createThread(recruitTD) {
      return $http.post('/api/recruitment-threads', recruitTD);
    }
    function listThreads() {
      return $http.get('/api/recruitment-threads');
    }
    function destroyThread(id) {
      return $http.delete('/api/recruitment-threads' + '/' + id);
    }

  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {

  'use strict';

  angular
    .module('app.common')
    .factory('classSpec', classSpec);

  function classSpec() {
    function getClassSpecs() {
      return [{
          'value': 'Assassination',
          'name': 'Assassination'
        }, {
          'value': 'Affliction',
          'name': 'Affliction'
        }, {
          'value': 'Arcane',
          'name': 'Arcane'
        }, {
          'value': 'Arms',
          'name': 'Arms'
        }, {
          'value': 'Balance',
          'name': 'Balance'
        }, {
          'value': 'Beast Mastery',
          'name': 'Beast Mastery'
        }, {
          'value': 'Brewmaster',
          'name': 'Brewmaster'
        }, {
          'value': 'Combat',
          'name': 'Combat'
        }, {
          'value': 'Destruction',
          'name': 'Destruction'
        }, {
          'value': 'Demonology',
          'name': 'Demonology'
        }, {
          'value': 'Discipline',
          'name': 'Discipline'
        }, {
          'value': 'Elemental',
          'name': 'Elemental'
        }, {
          'value': 'Enhancement',
          'name': 'Enhancement'
        }, {
          'value': 'Frost',
          'name': 'Frost'
        }, {
          'value': 'Feral',
          'name': 'Feral'
        }, {
          'value': 'Fury',
          'name': 'Fury'

        }, {
          'value': 'Fire',
          'name': 'Fire'
        }, {
          'value': 'Guardian',
          'name': 'Guardian'
        }, {
          'value': 'Holy',
          'name': 'Holy'
        }, {
          'value': 'Restoration',
          'name': 'Restoration'
        }, {
          'value': 'Marksman',
          'name': 'Marksman'
        }, {
          'value': 'Mistweaver',
          'name': 'Mistweaver'
        }, {
          'value': 'Protection',
          'name': 'Protection'
        }, {
          'value': 'Retribution',
          'name': 'Retribution'
        }, {
          'value': 'Shadow',
          'name': 'Shadow'
        }, {
          'value': 'Subtlety',
          'name': 'Subtlety'
        }, {
          'value': 'Survival',
          'name': 'Survival'
        }, {
          'value': 'Unholy',
          'name': 'Unholy'
        }, {
          'value': 'Windwalker',
          'name': 'Windwalker'
        }
      ];
    }

    return {
      getClassSpecs: getClassSpecs
    };
  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {

  'use strict';

  angular
    .module('app.common')
    .factory('classDef', classDef);

  function classDef() {
    function getClassDefs() {
      return [
        {
          'value': 'deathknight',
          'name': 'Death Knight'
        }, {
          'value': 'druid',
          'name': 'Druid'
        }, {
          'value': 'hunter',
          'name': 'Hunter'
        }, {
          'value': 'mage',
          'name': 'Mage'
        }, {
          'value': 'monk',
          'name': 'Monk'
        }, {
          'value': 'paladin',
          'name': 'Paladin'
        }, {
          'value': 'priest',
          'name': 'Priest'
        }, {
          'value': 'rogue',
          'name': 'Rogue'
        }, {
          'value': 'shaman',
          'name': 'Shaman'
        }, {
          'value': 'warlock',
          'name': 'Warlock'
        }, {
          'value': 'warrior',
          'name': 'Warrior'
        }
      ];
    }

    return {
      getClassDefs: getClassDefs
    };
  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.common.authInterceptor
   * @description < description placeholder >
   */

  angular
    .module('app.common')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', '$localStorage', '$location'];
  /* @ngInject */
  function authInterceptor($rootScope, $q, $localStorage, $location) {

    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.Authorization = 'Bearer ' +
            $localStorage.token;
        }
        return config;
      },
      // Intercept 401s and redirect you to account-login
      responseError: function(response) {
        if (response.status === 401) {
          $location.path('/');
          // remove any stale tokens
          delete $localStorage.token;
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function () {
  'use strict';
  /**
       * @ngdoc service
       * @name app.common.service:articleSvc
       * @desc Communicates with backend returning posts
       * @memberOf app.guild
       */
  angular
    .module('app.common')
    .factory('articleSvc', articleSvc);
  /* @ngInject */
  articleSvc.$inject = ['$http'];

  function articleSvc($http) {
    var apiBase = 'api/articles';
    var service = {
      all: all,
      get: get,
      create: create,
      update: update,
      destroy: destroy
    };
    return service;

    function all() {
      return $http.get(apiBase);
    }
    function get(id) {
      return $http.get(apiBase + '/' + id);
    }
    function create(articleData) {
      return $http.post(apiBase, articleData);
    }
    function update(id, articleData) {
      return $http.put(apiBase + '/' + id, articleData);
    }
    function destroy(id) {
      return $http.delete(apiBase + '/' + id);
    }
  }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.common.armorySvc
   * @description < description placeholder >
   */

  angular
    .module('app.common')
    .factory('armorySvc', armorySvc);

  armorySvc.$inject = ['$http'];
  /* @ngInject */
  function armorySvc($http) {
    var urlBase = 'https://us.api.battle.net/wow/';
    var realm = 'Sargeras';
    var cb = 'jsonp=JSON_CALLBACK';
    var api = '5m653qcbnr4h6rue7e4e4k7ryvcnpa9p';
    var locale = 'locale=en_US';
    var guild = 'Top%20Shelf';

    var exports = {};

    /*
     * @TODO: Setup $cacheFactory and eventually save data to Mongo
     */

    exports.getMembers = function () {
      return $http.jsonp(urlBase + 'guild/' + realm + '/' + guild + '?fields=' +
      'members' + '&' + locale + '&' + cb + '&apikey=' + api, {cache:true});
    };

    return exports;

  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
/**
* @ngdoc directive
* @name app.common.directive:passwordMatch
* @scope true
* @restrict A
*
* @description Indicator showing whether or not two passwords match
*
*/

(function() {
  'use strict';

  angular
    .module('app.common')
    .directive('passwordMatch', passwordMatch);

  /* @ngInject */
  function passwordMatch() {

    return {
      link: link,
      require: 'ngModel',
      scope: {
        otherModelValue: '=passwordMatch'
      }
    };

    /////////////////////

    function link(scope, element, attributes, ngModel) {
      ngModel.$validators.compareTo = function(modelValue) {
        return modelValue === scope.otherModelValue;
      };
      scope.$watch('otherModelValue', function() {
        ngModel.$validate();
      });
    }
  }

}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
/**
 * @ngdoc directive
 * @module app.common
 * @name mongooseError
 * @restrict A
 * @scope true
 * @description Removes server error when user updates input
 */

(function() {
  'use strict';

  angular
    .module('app.common')
    .directive('mongooseError', mongooseError);

  /* @ngInject */
  function mongooseError() {

    return {
      link: link,
      restrict: 'A',
      require: 'ngModel'
    };

    /////////////////////

    function link(scope, element, attrs, ngModel) {
      element.on('keydown', function() {
        return ngModel.$setValidity('mongoose', true);
      });
    }
  }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name app.admin.AdminDashboardCtrl
   * @description
   * Controller
   */
  angular
    .module('app.admin')
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['User', 'toastr'];
  /* @ngInject */
  function UserCtrl(User, toastr) {
    var vm = this;
    vm.users = User.query();

    vm.deleteUser = function(user, ev) {
      User.remove({
        id: user._id
      }, function() {
        vm.users.splice(this.$index, 1);
      }.bind(this), function() {
        toastr.success('deleted');
      });
    };
  }
})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';
  /*
   * @ngdoc Controller
   * @name RecruitmentListCtrl
   * @description Logic to display the current admin-recruitment status
   */
  angular
    .module('app.admin')
    .controller('RecruitmentListCtrl', RecruitmentListCtrl);

  RecruitmentListCtrl.$inject = ['$http', 'toastr', '$state', 'recruitSvc'];
  /* @ngInject */
  function RecruitmentListCtrl($http, toastr, $state, recruitSvc) {
    var vm = this;

    recruitSvc.list().success(function(data) {
      vm.recruitments = data;
    });
    vm.deleteRecruitment = function(id) {
      recruitSvc.destroy(id).success(function () {
        toastr.success('Removed');
        $state.reload();
      });
    };
    recruitSvc.listThreads().success(function(data) {
      vm.threads = data;
    });
    vm.deleteThread = function(id) {
      recruitSvc.destroyThread(id).success(function () {
        toastr.success('Removed');
        $state.reload();
      });
    };

  }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('RecruitmentCtrl', RecruitmentCtrl);

  RecruitmentCtrl.$inject = ['recruitSvc', '$state', 'classSpec', 'classDef', 'toastr'];

  function RecruitmentCtrl(recruitSvc, $state, classSpec, classDef, toastr) {

    /*jshint validthis: true */
    var vm = this;

    // funcation assignment
    vm.formData = {};
    vm.submit = function () {
      recruitSvc.create(vm.formData).success(function() {

        toastr.success('Goodluck, you\'re going to need it',
          'Recruitment Updated');
        $state.reload();

      }).error(function(error) {
        toastr.error('There was a problem with the server' +
          error.message, 'Something broke');
      });
    };

    vm.recruitTD = {}
    vm.save = function () {
      recruitSvc.createThread(vm.recruitTD).success(function() {

        toastr.success('Goodluck, you\'re going to need it',
          'Recruitment Updated');
        $state.reload();

      }).error(function(error) {
        toastr.error('There was a problem with the server' +
          error.message, 'Something broke');
      });
    };
  }
})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('NewsListingCtrl', NewsListingCtrl);

  NewsListingCtrl.$inject = ['articleSvc', '$state', '$stateParams', 'toastr'];

  function NewsListingCtrl(articleSvc, $state, $stateParams, toastr) {

    /*jshint validthis: true */
    var vm = this;
    articleSvc.all().success(function(data) {
        vm.articles = data;
        vm.articlesLength = data.length;
      })
      .error(function(errMsg) {
        toastr.error(errMsg.message, 'Whoops');
      });

    vm.deleteArticle = function(id) {
      articleSvc.destroy(id).success(function() {
        toastr.success('Deleted that poorly written article for you', 'Done');
        $state.reload();
      });
    };

  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';
  /*
   * @ngdoc Controller
   * @name ResourceCtrl
   * @description Logic for displaying admin-resources in admin area
   */
  angular
    .module('app.admin')
    .controller('MediaController', MediaController);
  /* @ngInject */
  MediaController.$inject = ['$rootScope', 'FileUploader', '$state', '$scope', '$http'];

  function MediaController($rootScope, FileUploader, $state, $scope, $http) {
    $scope.files = {};
    $scope.current = {};
    $scope.selectedImages = {};
    $scope.showMediaLibrary = true;
    var uploader = $scope.uploader = new FileUploader({
      url: '/api/uploads'
    });
    // FILTERS
    $http.get('/api/uploads').success(function(files) {
      $scope.files = files;
    });
    $scope.uploader.filters.push({
      name: 'customFilter',
      fn: function() {
        return this.queue.length < 10;
      }
    });

    uploader.onCompleteAll = function() {
      $http.get('/api/uploads').success(function(files) {
        $scope.files = files;
      });
    };

    $scope.class = 'col-sm-3';

    $scope.changeSize = function(btnNum) {
      switch (btnNum) {
        case 1:
          $scope.class = 'col-sm-2';
          break;
        case 2:
          $scope.class = 'col-sm-3';
          break;
        case 3:
          $scope.class = 'col-sm-4';
          break;
      }
    };
  }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name app.admin.AdminDashboardCtrl
   * @description
   * Controller
   */
  angular
    .module('app.admin')
    .controller('AdminDashboardCtrl', AdminDashboardCtrl);

  AdminDashboardCtrl.$inject = ['Auth'];
  /* @ngInject */
  function AdminDashboardCtrl(Auth) {
    var vm = this;

    //Page.setTitle('Admin');

    /**
     * Determines if the user is authenticated
     *
     * @returns {boolean}
     */

  }
})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  /** @ngdoc controller
   * @name app.account.controller:SignupCtrl
   *
   * @propertyOf app.account
   *
   * @description
   * The controller relating to user registeration
   */
  angular
    .module('app.account')
    .controller('SignupCtrl', SignupCtrl);

  SignupCtrl.$inject = ['Auth', 'toastr', '$window', '$location'];
  /* @ngInject */
  function SignupCtrl(Auth, toastr, $window, $location) {
    var vm = this;
    vm.ctrlName = 'SignupController';
    vm.user = {};
    vm.error = false;
    vm.register = register;

    function register(form) {
      if (form.$valid) {
        Auth.createUser({
          username: vm.user.username,
          email: vm.user.email,
          battletag: vm.user.battletag,
          password: vm.user.password
        }).then(function() {
          toastr
            .success('Sucessfully created your account.', 'Welcome!');
          // Account created, redirect to home
          $location.path('/');
        }).catch(function(err) {
          vm.error = err;
          toastr.error('Uh oh');
        });
      }
    }
  }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';
  /**
   * @ngdoc service
   * @name user.factory:User
   *
   * @description
   *
   */
  angular
    .module('app.account')
    .factory('User', User);

  User.$inject = ['$resource'];
  /* @ngInject */
  function User($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      },
      update: {
        method: 'PUT'
      }
    });
  }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.account.Auth
   * @description < description placeholder >
   */

  angular
    .module('app.account')
    .factory('Auth', Auth);

  Auth.$inject = ['$http', 'User', '$localStorage', '$q'];
  /* @ngInject */
  function Auth($http, User, $localStorage, $q) {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    var safeCb = function(cb) {
        return (angular.isFunction(cb)) ? cb : angular.noop;
      },
      currentUser = {};

    if ($localStorage.token) {
      currentUser = User.get();
    }

    return {
      /**
       * @ngdoc function
       * @name login
       * @methodOf auth.service:Auth
       * @description
       * Authenticate user and save token
       *
       * @param {Object} user login info
       * @param {Function} [callback] A callback
       * @return {Promise} A promise
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        $http.post('/auth/local', {
            email: user.email,
            password: user.password
          })
          .then(function(res) {
            $localStorage.token = res.data.token;
            currentUser = User.get();
            deferred.resolve(res.data);
            safeCb(callback)();
          }, function(err) {
            this.logout();
            safeCb(callback)(err.data);
            return $q.reject(err.data);
          }.bind(this));
        return deferred.promise;
      },
      /**
       * @ngdoc function
       * @name logout
       * @methodOf auth.service:Auth
       * @description
       * Delete access token and user info.
       * Redirect to login page by forcing a page reload.
       *
       */
      logout: function() {
        delete $localStorage.token;
        currentUser = {};
      },
      /**
       * @ngdoc function
       * @name createUser
       * @methodOf auth.service:Auth
       * @description
       * Create a new user
       *
       * @param {Object} user user info to use
       * @param {Function} [callback] A callback
       * @return {Promise} The promise of the User service
       */
      createUser: function(user, callback) {
        return User.save(user, function(data) {
          $localStorage.token = data.token;
          currentUser = User.get();
          return safeCb(callback)(null, user);
        }, function(err) {
          this.logout();
          return safeCb(callback)(err);
        }.bind(this)).$promise;
      },
      /**
       * @ngdoc method
       * @name changePassword
       * @methodOf auth.service:Auth
       * @description
       * Change password
       *
       * @param {String} oldPassword The old used password
       * @param {String} newPassword The new password to use
       * @param {Function} [callback] A callback
       * @return {Promise} The promise of the User service
       */
      changePassword: function(oldPassword, newPassword, callback) {
        return User.changePassword({
          id: currentUser._id
        }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return safeCb(callback)(null, user);
        }, function(err) {
          return safeCb(callback)(err);
        }).$promise;
      },
      /**
       * @ngdoc function
       * @name getCurrentUser
       * @methodOf auth.service:Auth
       * @description
       * Gets all available info on authenticated user
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, funciton(user)
       * @return {Object|Promise}
       */
      getCurrentUser: function(callback) {
        if (arguments.length === 0) {
          return currentUser;
        }

        var value = (currentUser.hasOwnProperty('$promise')) ? currentUser.$promise :
          currentUser;
        return $q.when(value)
          .then(function(user) {
            safeCb(callback)(user);
            return user;
          }, function() {
            safeCb(callback)({});
            return {};
          });
      },
      /**
       * @ngdoc function
       * @name isLoggedIn
       * @methodOf auth.service:Auth
       * @description
       * Check if a user is logged in
       *   (synchronous|asynchronous)
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isLoggedIn: function(callback) {
        if (arguments.length === 0) {
          return currentUser.hasOwnProperty('role');
        }

        return this.getCurrentUser(null)
          .then(function(user) {
            var is = user.hasOwnProperty('role');
            safeCb(callback)(is);
            return is;
          });
      },

      /**
       * @ngdoc function
       * @name isAdmin
       * @methodOf auth.service:Auth
       * @description
       * Check if a user is an admin
       *
       * @param  {Function|*} callback - optional, function(is)
       * @return {Bool|Promise}
       */
      isAdmin: function(callback) {
        if (arguments.length === 0) {
          return currentUser.role === 'admin';
        }

        return this.getCurrentUser(null)
          .then(function(user) {
            var is = user.role === 'admin';
            safeCb(callback)(is);
            return is;
          });
      },
      /**
       * Get auth token
       *
       * @return {String} - a token string used for authenticating
       */
      getToken: function() {
        return $localStorage.token;
      },
      setSessionToken: function(sessionToken, callback) {
        var cb = callback || angular.noop;
        $localStorage.token = sessionToken;
        currentUser = User.get(cb);
      }
    };
  }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';
  /**
   * @ngdoc service
   * @name app.account.accountSrv
   * @description < description placeholder >
   */
  angular
    .module('app.account')
    .factory('accountSrv', accountSrv);

  accountSrv.$inject = ['$http'];

  function accountSrv($http) {

    var service = {
      getProfile: getProfile,
      updateProfile: updateProfile
    };

    return service;

    ////////////////////////////

    /**
     * @ngdoc
     * @name app.account.userSrv#getProfile
     * @methodOf app.account.accountSrv
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * user.testFunction(id);
     * </pre>
     * @param {int} entity id
     */
    function getProfile() {
      return $http.get('/api/users/me');
    }

    /**
     * @ngdoc
     * @name app.account.userSrv#updateProfile
     * @methodOf app.account.accountSrv
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * user.testFunction(id);
     * </pre>
     * @param {int} entity id
     */
    function updateProfile(profileData) {
      return $http.put('/api/users/me', profileData);
    }
  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  angular
    .module('app.account')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['Auth', 'User', 'toastr'];

  function ProfileCtrl(Auth, User, toastr) {
    var vm = this;

    //var userRole = Authorization.checkAccess();
    //console.log(userRole);

  }
})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';
  /**
   * @ngdoc controller
   * @name app.account.controller:LoginCtrl
   *
   * @description
   * Controller for the login page
   */
  angular
    .module('app.account')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['Auth', 'toastr', '$window', '$location'];
  /* @ngInject */
  function LoginCtrl(Auth, toastr, $window, $location) {
    var vm = this;
    /**
     * @ngdoc property
     * @name user
     * @propertyOf app.account.controller:LoginController
     * @description
     * The user data to use as login
     *
     * @returns {User} The user data
     */
    vm.user = {};
    /**
     * @ngdoc property
     * @name error
     * @propertyOf app.account.controller:LoginController
     * @description
     * Error flag
     * @returns {Boolean} True if there is an error
     */
    vm.error = false;
    vm.login = login;

    function login(form) {
      if (form.$valid) {
        Auth.login({
          email: vm.user.email,
          password: vm.user.password
        }).then(function() {
          toastr.success('Successfully logged in', 'Welcome Back!');
          // Logged in, redirect to home
          $location.path('/');
        }).catch(function(err) {
          vm.error = err;
        });
      }
    }
    vm.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {

  'use strict';

  angular
    .module('app.core')
    .config(configure)
    .run(authRun);

  configure.$inject = ['$urlRouterProvider', '$httpProvider', '$locationProvider', 'toastrConfig'];
  /* @ngInject */
  function configure($urlRouterProvider, $httpProvider, $locationProvider, toastrConfig) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true).hashPrefix('!');
    $httpProvider.interceptors.push('authInterceptor');
    angular.extend(toastrConfig, {
      autoDismiss: true,
      closeButton: true,
      positionClass: 'toast-top-right',
      tapToDismiss: true,
      target: 'body',
      timeOut: 5000,
      titleClass: 'toast-title',
      toastClass: 'toast'
    });
  }

  authRun.$inject = ['$rootScope', '$location', 'Auth'];

  function authRun($rootScope, $location, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
     Auth.isLoggedIn(function(loggedIn) {
       if (next.authenticate && !loggedIn) {
         $location.path('/account/login');
       }
       if (next.authorize) {
         if (next.authorize === 'admin' && !Auth.isAdmin()) {
           $location.path('/');
         }
       }
     });
   });
  }

}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  /**
   * @ngdoc filter
   * @name common.filter:trustAsHtml
   *
   * @description
   *
   * @param {String} input The string of text to filter
   * @returns {String} The trusted by SCE text
   *
   */
  angular
    .module('app.common')
    .filter('trustAsHtml', trustAsHtml);

  trustAsHtml.$inject = ['$sce'];

  function trustAsHtml($sce) {
    return function(text) {
      return $sce.trustAsHtml(text);
    };
  }
}());

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
'use strict';
angular.module('app.common').filter('guildRank', function() {
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

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
'use strict';
angular.module('app.common').filter('className', function() {
  return function(classId) {
    switch (classId) {
      case 1:
        return 'Warrior';
      case 2:
        return 'Paladin';
      case 3:
        return 'Hunter';
      case 4:
        return 'Rogue';
      case 5:
        return 'Priest';
      case 6:
        return 'Death Knight';
      case 7:
        return 'Shaman';
      case 8:
        return 'Mage';
      case 9:
        return 'Warlock';
      case 10:
        return 'Monk';
      case 11:
        return 'Druid';
    }
  };
});

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('SidebarCtrl', SidebarCtrl);

  SidebarCtrl.$inject = [];

  function SidebarCtrl() {

    /*jshint validthis: true */
    var vm = this;

    vm.showSidebar = false;
    vm.toggle = function() {
      vm.showSidebar = !vm.showSidebar;
    };
  }

})();

/*!
 * TopShelf
 * 
 * http://github.com/
 * @author Steven Truesdell <steven.truesdell@gmail.com>
 * @version 0.1.0
 * Copyright 2015. MIT licensed.
 */
(function() {
  'use strict';

  /* @ngdoc overview
   * @name app
   *
   * @description
   * Main module for the application
   *
   * @requires
   * app.core, app.common, app.account, app.guild, app.admin
   */
  angular
    .module('app', [
      'app.core',
      'app.common',

      'app.account',
      'app.guild',
      'app.admin'
    ]);

  run.$inject = ['$rootScope', '$state', '$stateParams', '$timeout'];
  /* @ngInject */
  function run($rootScope, $state, $stateParams, $timeout) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'account.logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });

    $rootScope.$on('$stateChangeSuccess',
    function(e, toState) {
      $timeout(function() {
        $rootScope.$emit('$stateChangeRender');
      });
      $rootScope.pageTitle = toState.title || 'Top Shelf';

    });
  }
  angular.module('app').run(run);
}());

//# sourceMappingURL=app.js.map