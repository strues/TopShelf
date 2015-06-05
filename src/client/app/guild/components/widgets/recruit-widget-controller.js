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
