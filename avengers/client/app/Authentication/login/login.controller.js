(function() {
    'use strict';
    /* jshint camelcase: false */
    angular.module('wmsApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'loginService', '$location', '$rootScope'];

    function LoginCtrl($scope, loginService, $location, $rootScope) {
         console.log("hi");
         /*$rootScope.$on('event:social-sign-in-success', function(event, userDetails){
            console.log(userDetails);
            window.location.href = '/dashboard';

            //window.location.hash='#/dashboard';
        })*/
        gapi.load('auth2', function()
        {
            gapi.auth2.getAuthInstance() 
        });
        //console.log($scope.userDetails);
        /*var vm = this;

        vm.user = {};
        vm.errMsg = 'LOGIN_PAGE.ERR1';
        vm.isInvalid = false;
        vm.submit = submit;

        /////////////////////////////////

        function handleError(error) {
            vm.isInvalid = true;
            if (error.errors) {
                vm.errMsg = error.errors[0].error_message;
            } else if (error.detail) {
                vm.errMsg = error.detail;
            } else {
                vm.errMsg = error.non_field_errors ? error.non_field_errors[0] : (error.message || 'ERR_MSG.MSG3');
            }
        }

        function submit() {
            vm.user.locale = $scope.locale;

            loginService.login(vm.user)
                .success(OnSuccess)
                .error(handleError);
        }

        function OnSuccess() {
            $location.path('/select/client');
            $rootScope.isLogged = true;
        }*/
    }
})();