(function() {
    'use strict';

    angular.module('wmsApp')
        .config(config);

    function config($routeProvider) {

        $routeProvider
            .when('/dashboard/', {
                templateUrl: 'app/main/main.html',
                controller: 'mainCtrl',
                title: 'Hello World',
                access: {
                    requiredLogin: false,
                }
                
            })
    }


})();
  // var dt = $scope.date_from.toJSON().split('T')[0];