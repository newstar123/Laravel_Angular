/**
 * Created by CIS1 on 05-02-2015.
 */

var Profile = angular.module('Profile', []);
modules.push('Profile');


Profile.config(function ($stateProvider) {


    $stateProvider
            .state('app.profile', {
                url: '/profile',
                templateUrl: 'app/partials/profile/profile.html',
                controller: 'ProfileCtrl',
                resolve: {
                    Profile: function (ProfileService) {
                        return ProfileService.profile();
                    },
                }
            })
});


Profile.controller('ProfileCtrl', function ($scope, $rootScope, ProfileService, Profile) {
    $scope.profile = {};
    $scope.passowrd = {};

    if (Profile.data.flag) {
        $scope.profile = Profile.data.data;
    }

    $scope.updatePasswordFn = function () {
        var obj = angular.copy($scope.passowrd);
        ProfileService.updatePassword(obj).success(function (res) {
            if (res.flag) {
                $scope.passowrd = {};
                $scope.confirmpassword = '';
                $scope.setFlash('s', res.message);
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }

    $scope.updateProfileFn = function () {
        var obj = angular.copy($scope.profile);
        console.log(obj);
        ProfileService.updateProfile(obj).success(function (res) {
            if (res.flag) {
                $rootScope.me = res.data;
                $scope.setFlash('s', res.message);
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }

});

Profile.service('ProfileService', function ($http) {
    return{
        profile: function (obj) {
            return $http.get('/loggedinuser');
        },
        updatePassword: function (obj) {
            return $http.post('update-password', obj);
        },
        updateProfile: function (obj) {
            return $http.post('update-profile', obj);
        },
    }
});