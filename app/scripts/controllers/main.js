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
  .controller('MainCtrl', function ($scope,$http,sharedProperties) {
    console.log( 'Running get' );
    $http.jsonp('http://' + sharedProperties.getProperty() + '.lighthouseapp.com/projects.json?callback=JSON_CALLBACK').success( function(data) {
      $scope.projects = data.projects;
    });
  })
  .controller('LoadCtrl', function ($scope,sharedProperties) {
  	$scope.setProp = function() {
      sharedProperties.setProperty($scope.account);
      console.log(sharedProperties.getProperty());
  	}
  });


    