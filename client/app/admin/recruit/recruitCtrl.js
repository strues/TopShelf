(function () {
'use strict';
  /**
  * Displays a list of all the applications
  * Provides delete functioonality
  * 
  * @param
  * @returns Angular:Controller
  */

  /* @ngInject */
  function RecruitCtrl () {
    var vm = this;
    

vm.recruits = Restangular.all('Recruits').getList().$object;
  }

angular
  .module('app')
  .controller('RecruitCtrl', RecruitCtrl);
})();