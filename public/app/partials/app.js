/**
 * Created by Gaurnag Ghinaiya on 20-07-2015.
 */
var modules = ['ui.router', 'ui.bootstrap', 'Directives', 'Constants', 'blockUI', 'xeditable'];

var App = angular.module('PPO', modules)
        .run(
                ['$rootScope', '$state', '$stateParams', 'editableOptions',
                    function ($rootScope, $state, $stateParams, editableOptions) {
                        $rootScope.$state = $state;
                        $rootScope.$stateParams = $stateParams;
                        editableOptions.theme = 'bs3';
                        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {

                            $rootScope.fromState = fromState;

                        });
                    },
                ])

        .factory('httpInterceptor', function ($q, $rootScope, $window, $log) {
            return {
                request: function (config) {
                    return config || $q.when(config);

                },
                response: function (response) {
                    if (response.data.code == 401) {
                        location.reload();
                    }

                    if (response || $q.when(response)) {
                        return response || $q.when(response);

                    }

                },
                responseError: function (response) {

                    return $q.reject(response);
                }
            };
        })

        .config(function ($stateProvider, $urlRouterProvider, blockUIConfig, $httpProvider) {
            $httpProvider.interceptors.push('httpInterceptor')
            blockUIConfig.message = '';
            $urlRouterProvider
                    .otherwise('/app/dashboard');

            $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'app/partials/app.html',
                    })
        })


App.controller('AppCtrl', function ($scope, $rootScope, userType, AdminServices, $timeout, $interval, $state, $stateParams) {

    $scope.goTo = function (state, params) {

        $timeout(function () {
            if (params) {
                $state.transitionTo(state, angular.extend($stateParams, params));
            } else {
                $state.transitionTo(state, $stateParams);
            }
        }, 600);
    };
    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.format = 'dd-MMMM-yyyy';


    $scope.loggedInUserFn = function () {
        AdminServices.loggedInUser().success(function (res) {
            if (res.flag) {
                $rootScope.me = res.data;
            }
        })
    }
    $scope.loggedInUserFn();
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
            ttl: time || 3000
        });
        notification.show();
    }

    $scope.doLogoutFn = function () {
        AdminServices.doLogout().success(function (res) {
            if (res.flag) {
                location.reload();
            } else {
                $scope.setFlash('e', 'Error while logout, Try again');
            }
        })
    }

    $scope.wcount = function () {
        var watchers, elementsWithScope, scope, i, len;
        watchers = 0;
        elementsWithScope = document.querySelectorAll('.ng-scope');
        for (i = 0, len = elementsWithScope.length; i < len; i++) {
            scope = angular.element(elementsWithScope[i]).scope();
            if (scope.$$watchers != null) {
                watchers += scope.$$watchers.length;
            }
        }
        $scope.watchers = watchers;
    };
    $interval($scope.wcount, 10000);

});

App.factory('AdminServices', function ($http) {
    return {
        loggedInUser: function () {
            return $http.get('loggedinuser');
        },
        doLogout: function () {
            return $http.get('logout');
        },
    };
});

// Filter - Truncate
App.filter('truncate', function () {
    return function (text, length) {

        if (text) {
            if (text.length > length) {
                return text.substr(0, length) + "  ...";
            }
            return text;
        }
    }
});

App.filter('duration', function () {
    return function (date) {
        return moment(parseInt(date)).fromNow();
    };
})