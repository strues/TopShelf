(function() {

  /* jshint latedef: nofunc */
  /** @ngdoc controller
   * @name app.admin.AdminDashboardCtrl
   * @description
   * Controller
   */
  angular
    .module('app.admin')
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['User', 'endpoints', 'toastr'];
  /* @ngInject */
  function UserCtrl(User, endpoints, toastr) {
    var vm = this;

    User.query(function(data) {
      vm.users = data;
    });

    var server = {
      roles: new endpoints('roles'),
      users: new endpoints('users')
    };

    // Get all roles and their permissions and set the roles panel selected role to the first one
    server.roles.find({}).success(function(roles) {
      vm.roles = roles;
      vm.selectedRole = vm.roles[0];
    });

    // Get all users
    server.users.find({}).success(function(users) {
      vm.users = users;
    });

    // Create a new role
	  vm.createRole = function() {
	  	var pass = true;
	  	var roleName = prompt('Role Name?');
	  	if(!roleName || !vm.selectedRole) { return false; }
	  	for(var i = 0; i < vm.roles.length; i++) {
	  		if(vm.roles[i].role === roleName) {
	  			toastr.warning('That role already exists just modify it.');
	  			pass = false;
	  			return false;
	  		}
	  	}
	  	if(!pass) { return false; }

	  	var newRole = {role: roleName, permissions: vm.selectedRole.permissions};
      server.roles.create(newRole).success(function(response) {
  			vm.roles.push({role: roleName, permissions: vm.selectedRole.permissions});
  			vm.selectedRole = newRole;
  			toastr.clear();
  			toastr.success('Created new role: ' + roleName);
  		});
	  };
    // Update a role
   	vm.updateRole = function(roleForm) {
   	  	if(!vm.selectedRole || vm.selectedRole.role === 'admin') { return false; }
     		server.roles.update({_id: vm.selectedRole._id}, {permissions: vm.selectedRole.permissions}).then(function(response) {
     			toastr.clear();
     			toastr.success('Updated ' + vm.selectedRole.role + ' role.');
     		});
   	  };
      // Delete a role and move the users of that role to 'basic'
  	  vm.deleteRole = function() {
  	  	var confirmed = confirm('Are you sure you want to delete ' + vm.selectedRole.role + '? All users currently using this role will be switched to basic.');
  	  	if(!confirmed) return false;
  	  	if(!vm.selectedRole || vm.selectedRole.role === 'basic' || vm.selectedRole.role === 'admin') { return false; }

    		server.users.update({role: vm.selectedRole.role}, {role: 'basic'}).then(function(response) {
    			toastr.clear();
    			toastr.warning('Moved users with ' + vm.selectedRole.role + ' over to basic');
    		}).finally(function(response) {
    			server.roles.delete({role: vm.selectedRole.role}).then(function(response) {
    				toastr.success('Deleted ' + vm.selectedRole.role + ' role.');
    				vm.roles.splice(vm.roles.indexOf(vm.selectedRole), 1);
    				vm.selectedRole = vm.roles[0];
  				});
    		});
  	  };
      // Update a user
  	  vm.updateUser = function(user) {
  	  	var newInfo = {};
  	  	angular.copy(user, newInfo);
  	  	if(!user) return false;
  	  	server.users.update({_id: user._id}, newInfo).then(function(response) {
  	  		toastr.clear();
  	  		toastr.success('Updated user: ' + user.name);
  	  	});
  	  };

  	  // Delete a user
  	  vm.deleteUser = function(user, index) {
  	  	if(!user) return false;
  	  	server.users.deleteOne(user._id).then(function(response) {
  	  		toastr.clear();
  	  		toastr.success('Deleted user: ' + user.name);
  	  		vm.users.splice(index, 1);
  	  	});
  	  };

  	  vm.userFilter = '';
  	  vm.filterUsers = function(user) {
  	  	return (user.username + user.email + user.role + user.lastVisited).toLowerCase().indexOf(vm.userFilter.toLowerCase()) >= 0;
  	  };
  }
})();
