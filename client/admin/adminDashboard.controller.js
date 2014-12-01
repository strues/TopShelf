(function () {
  'use strict';



 function AdminRaidMainCtrl() {
    var vm = this;
	vm.configM = {
	    title: 'Mains / Alts',
	    tooltips: true,
	    labels: true,
	    mouseover: function() {},
	    mouseout: function() {},
	    click: function() {},
	    isAnimate: true, // run animations while rendering chart
	    legend: {
	      display: true,
	      //could be 'left, right'
	      position: 'left'
	    }
	  };

  vm.dataM = {
    series: ['Main',
    'Alt'],
    data: [{
      x: 'DK',
      y: [2, 1],
      tooltip: 'Death Knights'
    }, {
      x: 'D',
      y: [2, 5],
      tooltip: 'Druids'
    }, {
      x: 'H',
      y: [3, 2],
      tooltip: 'Hunters'
    }, {
      x: 'Mge',
      y: [3, 2],
      tooltip: 'Mages'
    }, {
      x: 'Mnk',
      y: [2, 0],
      tooltip: 'Monks'
    }, {
      x: 'Pal',
      y: [3, 2],
      tooltip: 'Paladins'
    }, {
      x: 'Pr',
      y: [3, 2],
      tooltip: 'Priests'
    },
     {
      x: 'R',
      y: [2, 0],
      tooltip: 'Rogues'
    }, {
      x: 'S',
      y: [1, 3],
      tooltip: 'Shaman'
    },
     {
      x: 'W',
      y: [2, 0],
      tooltip: 'Warlocks'
    },
     {
      x: 'War',
      y: [3, 2],
      tooltip: 'Warriors'
    }
    ]
  };
}
 function AdminDashboardCtrl() {

    var vm = this;
	vm.config = {
	    title: 'Overall Class Distribution',
	    tooltips: true,
	    labels: true,
	    innerRadius: 50,
	    mouseover: function() {},
	    mouseout: function() {},
	    click: function() {},
	    isAnimate: true, // run animations while rendering chart
	    legend: {
	      display: true,
	      //could be 'left, right'
	      position: 'left'
	    }
	  };

  vm.data = {
    series: ['Death Knights',
    'Druids',
    'Hunters',
    'Mages',
    'Monks',
    'Paladins',
    'Priests',
    'Rogues',
    'Shamans',
    'Warlocks',
    'Warriors'],
    data: [{
      x: 'Death Knights',
      y: [2],
      tooltip: 'Death Knights'
    }, {
      x: 'Druids',
      y: [7],
      tooltip: 'Druids'
    }, {
      x: 'Hunters',
      y: [5],
      tooltip: 'Hunters'
    }, {
      x: 'Mages',
      y: [5],
      tooltip: 'Mages'
    }, {
      x: 'Monks',
      y: [2],
      tooltip: 'Monks'
    }, {
      x: 'Paladins',
      y: [3],
      tooltip: 'Paladins'
    }, {
      x: 'Priests',
      y: [5],
      tooltip: 'Priests'
    },
     {
      x: 'Rogues',
      y: [2],
      tooltip: 'Rogues'
    }, {
      x: 'Shamans',
      y: [4],
      tooltip: 'Shaman'
    },
     {
      x: 'Warlocks',
      y: [4],
      tooltip: 'Warlocks'
    },
     {
      x: 'Warriors',
      y: [5],
      tooltip: 'Warriors'
    }
    ]
  };
}
angular
	.module('topshelf.admin')
	.controller('AdminRaidMainCtrl', AdminRaidMainCtrl)
	.controller('AdminDashboardCtrl', AdminDashboardCtrl);
})();
