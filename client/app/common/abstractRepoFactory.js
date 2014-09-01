'use strict';

angular.module('app')

.factory('AbstractRepository', [

  function () {

    function AbstractRepository(Restangular, route) {
      this.Restangular = Restangular;
      this.route = route;
    }

    AbstractRepository.prototype = {
      getList: function (params) {
        return this.Restangular.all(this.route).getList(params).$object;
      },
      get: function (id) {
        return this.Restangular.one(this.route, id).get();
      },
      getView: function (id) {
        return this.Restangular.one(this.route, id).one(this.route + 'view').get();
      },
      update: function (updatedResource) {
        return updatedResource.put().$object;
      },
      create: function (newResource) {
        return this.Restangular.all(this.route).post(newResource);
      },
      remove: function (object) {
        return this.Restangular.one(this.route, object._id).remove();
      }
    };

    AbstractRepository.extend = function (repository) {
      repository.prototype = Object.create(AbstractRepository.prototype);
      repository.prototype.constructor = repository;
    };

    return AbstractRepository;
  }
]);