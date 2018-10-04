/**
 * Created by CIS1 on 05-02-2015.
 */

var Dashboard = angular.module('Dashboard', []);
modules.push('Dashboard');


Dashboard.config(function ($stateProvider) {


    $stateProvider
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/partials/dashboard/dashboard.html',
                controller: 'DashboardCtrl',
            })
});


Dashboard.controller('DashboardCtrl', function ($scope, DashboardService) {
    $scope.dashboard = {};
});

Dashboard.service('DashboardService', function ($http) {
    return{
    }
});