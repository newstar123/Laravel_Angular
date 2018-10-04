var Auth = angular.module('Auth', ['ui.router'])

Auth.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
            .otherwise('/signin');

    $stateProvider
            .state('signin', {
                url: '/signin',
                templateUrl: 'app/partials/auth/login.html',
                controller: 'LoginCtrl'
            })
            .state('forgotpwd', {
                url: '/forgotpwd',
                templateUrl: 'app/partials/auth/forgotpwd.html',
                controller: 'ForgotPwdCtrl'
            })
            .state('reset', {
                url: '/reset/:key',
                templateUrl: 'app/partials/auth/reset.html',
                controller: 'ResetPwdCtrl',
            })
});

Auth.controller('AppCtrl', function ($scope) {
    $scope.setFlash = function (mtype, msg, time) {

        var type;
        switch (mtype) {

            case 's' :
                type = 'success';
                break;
            case 'e' :
                type = 'error';
                break;
            case 'w' :
                type = 'warning';
                break;
            case 'n' :
                type = 'notice';
                break;
        }

        var notification = new NotificationFx({
            message: '<i class="glyphicon"></i><p>' + msg + '</p>',
            layout: 'attached',
            effect: 'bouncyflip',
            type: type,
            ttl: time || 10000
        });
        notification.show();
    }
})

Auth.controller('LoginCtrl', function ($scope, AuthServices, $timeout) {
    $scope.login = {};
    $scope.doLoginFn = function () {
        AuthServices.doLogin($scope.login).success(function (res) {
            if (res.flag) {
                $timeout(function () {
                    window.location.reload();
                }, 200);
            }
            else {
                $scope.setFlash('e', res.message)
            }
        })
    }


})

Auth.controller('ForgotPwdCtrl', function ($scope, AuthServices) {
    $scope.forgetPwdFn = function () {
        if ($scope.email) {
            AuthServices.forgetPwd($scope.email).success(function (res) {
                if (res.flag) {
                    $scope.setFlash('s', res.message)
                }
                else {
                    $scope.setFlash('e', res.message)
                }
            })
        } else {
            $scope.setFlash('e', 'Enter Email address')
        }
    }

})


Auth.controller('ResetPwdCtrl', function ($scope, AuthServices, $stateParams, $state) {
    $scope.reset = {
        code: $stateParams.key
    }
    $scope.resetPwdFn = function () {
        AuthServices.resetPwd($scope.reset).success(function (res) {
            if (res.flag) {
                $scope.reset = {}
                $scope.setFlash('s', res.message)
                $state.go('signin');
            }
            else {
                $scope.setFlash('e', res.message)
            }
        })
    }

})

Auth.factory('AuthServices', function ($http) {
    return{
        doLogin: function (obj) {
            return $http.post('auth/login', obj);
        },
        forgetPwd: function (email) {
            var obj = {email: email}
            return $http.post('auth/forgotpassword', obj);
        },
        resetPwd: function (obj) {
            return $http.post('auth/resetpassword', obj);
        },
    }
});