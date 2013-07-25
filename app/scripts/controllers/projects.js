'use strict';

angular.module('stormApp')
  .controller('ProjectsCtrl', function ($scope,$http,sharedProperties) {
    console.log( 'Running get ' + sharedProperties.getProperty() );
    $http.jsonp('http://' + sharedProperties.getProperty() + '.lighthouseapp.com/projects.json?callback=JSON_CALLBACK').success( function(data) {
      $scope.projects = data.projects;
    });
  });