(function() {
  'use strict';

 /**
  * @ngdoc controller
  * @name app.components.controller:RecruitingWidgetCtrl
  * @description < description placeholder >
  */

  angular
    .module('app.components')
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
          toastr.create('Sorry, unable to retrieve  recruitment status');
        });

  }

})();
