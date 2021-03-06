'use strict';

angular.module('stormApp')
  .controller('ProjectCtrl', function ($scope,$routeParams,$http,sharedProperties) {
    $scope.project_id = $routeParams.id;

    $scope.project = {};
    $scope.tickets = {};
    $scope.hide = {};

    $scope.toggle = function( state ) {
      console.log( 'Toggle ' + state );
      $scope.hide[state] = !$scope.hide[state];
    }

    $scope.showLightbox = function( url, event ) {
      console.log( "show lightbox " + url );

      $('body').append('<div class="iframe_container"><iframe seamless="seamless" height="425px" width="700px" src=\"' + url + '\"' + '</iframe></div>');
      $('.iframe_container').click( function(e) {
        var $el = $(event.srcElement);
        console.log( "Remove lightbox" );
        $(".iframe_container").remove();
        var $el2 = $el.parents('.ticket_base');
        $http.jsonp(url + '.json?callback=JSON_CALLBACK').success(function(data){
          $el.parents('.ticket_body').siblings('.last_comment').text(data.ticket.versions[data.ticket.versions["length"] - 1].body);
          console.log("***" + data.ticket.assigned_user_name)
          $el2.attr('data-name', data.ticket.assigned_user_name);

            if (data.ticket.assigned_user_name !== $el2.siblings('.name').text() ) {
              $('.name').each(function(index, element){
                if ($el2.data("name") == $(element).text()) {
                  $(element).after($el2);
                }
              })
            } else {
              console.log($el2.data("name") + " *** " + $el2.siblings('.name').text() )
            };
            
        })


        

      });
    }

    ;

    $http.jsonp('http://'+sharedProperties.getProperty()+'.lighthouseapp.com/projects/' + $scope.project_id + '.json?callback=JSON_CALLBACK').success( function(data) {
      // console.log( 'Project Info' );
      $scope.project = data.project;

      $scope.openstates = data.project.open_states_list.split( ',' );
      $scope.closedstates = data.project.closed_states_list.split( ',' );
      $scope.closedstates.map( function(state) { $scope.hide[state] = true; } )
    });

    $http.jsonp('http://'+sharedProperties.getProperty()+'.lighthouseapp.com/projects/' + $scope.project_id + '/memberships.json?callback=JSON_CALLBACK').success( function(data) {
      // console.log( 'users' );

      $scope.users = [];
      $scope.$watch( 'users' );

      for( var i = 0; i < data.memberships.length; i++ ) {
        var user = data.memberships[i].membership.user;
        var r = {};
        r.name = user.name;
        r.user_id = user.id;

        $scope.users.push( r );
      }
    });

  });

angular.module('stormApp').controller( 'UserCtrl', function ( $scope, $http, sharedProperties ) {
  console.log( 'User ctl' + $scope.user.name );
  $scope.loading = true;
  $scope.display = true;

   $http.jsonp('http://'+sharedProperties.getProperty()+'.lighthouseapp.com/projects/' + $scope.project_id + '/tickets.json?q=responsible%3A%27' + $scope.user.name + '%27&callback=JSON_CALLBACK').success( function(data) {
    console.log( 'Got tickets for ' + $scope.user.name );
    $scope.loading = false;
    if( data.tickets ) {
      $scope.tickets = data.tickets;
    } else {
      $scope.display = false;
    }
  });

})
.controller( 'TicketCtrl', function ($scope, $http){
  $scope.grab_comment_and_expand = function(url, event){
    $scope.expand = $scope.expand ? false : true;
    $http.jsonp(url + '.json?callback=JSON_CALLBACK').success(function(data){
      console.log($(event.srcElement))
      $(event.srcElement).siblings('.last_comment').text(data.ticket.versions[data.ticket.versions["length"] - 1].body);
    })
  }
})


setInterval( function() {
  $(".users").width( $(".users > li:first").outerWidth() * ($(".users > li").size() - $(".users > li[style='display: none;']").size() + 1) );
}, 1000 );
