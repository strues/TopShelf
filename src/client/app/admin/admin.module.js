(function() {
  'use strict';
  /* @ngdoc object
   * @name admin
   * @requires $stateProvider
   *
   * @description States for the admin
   *
   */
  angular
      .module('app.admin', [])
      .config(config);

  config.$inject = ['$stateProvider'];
  /* @ngInject */
  function config($stateProvider) {

    var adminState = {
      name: 'admin',
      url: '/admin',
      templateUrl: 'app/admin/dashboard/dashboard.tpl.html',
      controller: 'DashboardCtrl',
    }

    var newsState = {
      name: 'news',
      url: '/admin/news',
      templateUrl: 'app/admin/news/news.tpl.html',
      controller: 'NewsListCtrl',
      controllerAs: 'vm'
    }

    var newsCreateState = {
      name: 'news.create',
      url: '/create',
      templateUrl: 'app/admin/news/create/new-article.tpl.html',
      controller: 'NewsCreateCtrl',
      controllerAs: 'vm'
    }

    var newsEditState = {
      name: 'news.edit',
      url: '/:articleId',
      templateUrl: 'app/admin/news/edit/edit-article.tpl.html',
      controller: function($stateParams) {
        console.log($stateParams);
      }
    }

    var carouselState = {
      name: 'slider',
      url: '/admin/slider',
      templateUrl: 'app/admin/carousel/carousel.tpl.html',
      controller: 'CarouselCtrl',
      controllerAs: 'vm'
    }

    var recruitingState = {
      name: 'recruit',
      url: '/admin/recruit',
      templateUrl: 'app/admin/recruiting/recruitment.tpl.html',
      controller: 'RecruitmentCtrl'
    }

    var adminUsersState = {
      name: 'users',
      url: '/admin/users',
      templateUrl: 'app/admin/users/users.tpl.html',
      controller: 'UsersCtrl'
    }

    var adminUserDetails = {
      name: 'users.details',
      url: '/:id',
      templateUrl: 'app/admin/users/details/user.tpl.html',
      controller: 'UserDetailsCtrl'
    }

    var resourcesState = {
      name: 'resources',
      url: '/admin/resources',
      templateUrl: 'app/admin/resources/resources.tpl.html',
      controller: 'ResourceCtrl',
      controllerAs: 'vm'

    }
    var resourcesCreateState = {
      name: 'resources.create',
      url: '/create',
      controller: 'ResourceCreateCtrl',
      controllerAs: 'vm',
      templateUrl: 'app/admin/resources/create/create.tpl.html'
    }

    var resourcesEditState = {
      name: 'resources.edit',
      url: '/:resourceId',
      templateUrl: 'app/admin/resources/edit/edit.tpl.html',
      controller: function($stateParams) {
        console.log($stateParams);
      }
    }

    var mediaState = {
      name: 'media',
      url: '/admin/media',
      templateUrl: 'app/admin/media/media.tpl.html',
      controller: 'MediaCtrl',
      controllerAs: 'vm'
    }

    $stateProvider
        .state(adminState)
        .state(newsState)
        .state(newsCreateState)
        .state(newsEditState)
        .state(carouselState)
        .state(recruitingState)
        .state(adminUsersState)
        .state(adminUserDetails)
        .state(mediaState)
        .state(resourcesState)
        .state(resourcesCreateState)
        .state(resourcesEditState)
  }
}());
