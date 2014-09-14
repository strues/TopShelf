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
  function AdminCtrl($scope) {
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
    series: ['Sales', 'Income', 'Expense', 'Laptops', 'Keyboards'],
    data: [{
      x: 'Laptops',
      y: [100, 500, 0],
      tooltip: 'this is tooltip'
    }, {
      x: 'Desktops',
      y: [300, 100, 100]
    }, {
      x: 'Mobiles',
      y: [351]
    }, {
      x: 'Tablets',
      y: [54, 0, 879]
    }]
  };
  }

  angular
    .module('app')
    .controller('AdminCtrl', AdminCtrl);

})();
