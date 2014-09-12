(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name admin.controller:AdminCtrl
   * @function
   *
   * @description
   *
   *
   * @ngInject
   *
   */
  function AdminCtrl($scope, RosterRepository) {

     $scope.config = {
    title: 'Products',
    tooltips: true,
    labels: false,
    mouseover: function() {},
    mouseout: function() {},
    click: function() {},
    legend: {
      display: true,
      //could be 'left, right'
      position: 'right'
    }
  };

  $scope.data = {
    series: ['Main', 'Alt'],
    data: [{
      x: "DK",
      y: [100, 500, 0],
      tooltip: "this is tooltip"
    }, {
      x: "Druid",
      y: [300, 100, 100]
    }, {
      x: "Hunter",
      y: [351]
    }, {
      x: "Mage",
      y: [54, 0, 879]
    }]
  };
  }

  angular
    .module('app')
    .controller('AdminCtrl', AdminCtrl);

})();
