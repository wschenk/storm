'use strict';

angular.module('stormApp')
  .service('sharedProperties', function () {
    var property;
      return {
        getProperty: function () {
          return property;
        },
        setProperty: function(value) {
          property = value;
        }
      };
    })
  .controller('MainCtrl', function ($scope,sharedProperties) {
  	$scope.setProp = function() {
      sharedProperties.setProperty($scope.account);
      console.log(sharedProperties.getProperty());
  	}
  });


    