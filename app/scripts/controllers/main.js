'use strict';

angular.module('stormApp')
  .controller('MainCtrl', function ($scope,$http) {
    console.log( 'Running get' );
    $http.jsonp('http://happyfun.lighthouseapp.com/projects.json?callback=JSON_CALLBACK').success( function(data) {
      $scope.projects = data.projects;
    });
  });
