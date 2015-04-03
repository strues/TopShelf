(function () {
'use strict';

angular
	.module('app.admin.states')
	.controller('ProgressionCtrl', ProgressionCtrl);

	function ProgressionCtrl(Progression) {
    var vm = this;

    Progression.all().success(function (data) {
        vm.processing = false;
        vm.progressionData = data;

    }).error(function (error) {
            vm.status = 'Unable to retrieve progression data: ' + error.message;
        });
	}

})();
