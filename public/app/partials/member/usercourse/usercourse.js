/**
 * Created by CIS1 on 05-02-2015.
 */

var UserCourse = angular.module('UserCourse', []);
modules.push('UserCourse');
UserCourse.config(function ($stateProvider) {

    $stateProvider
            .state('app.usercourse', {
                url: '/usercourse',
                templateUrl: 'app/partials/member/usercourse/usercourse.html',
                controller: 'UserCourseCtrl',
                resolve: {
                    UserCourses: function (UserCourseService) {
                        return UserCourseService.getUserCourse();
                    },
                }
            })
            .state('app.usercourse.add', {
                url: '/add',
                templateUrl: 'app/partials/member/usercourse/add.html',
                controller: 'AddUserCourseCtrl',
                resolve: {
                    Universities: function (UserCourseService) {
                        return UserCourseService.getUniversity();
                    },
                }
            })
            .state('app.usercourse.edit', {
                url: '/:id',
                templateUrl: 'app/partials/member/usercourse/edit.html',
                controller: 'EditUserCourseCtrl',
                resolve: {
                    Universities: function (UserCourseService) {
                        return UserCourseService.getUniversity();
                    },
                    UserCourse: function (UserCourseService, $stateParams) {
                        return UserCourseService.editUserCourse($stateParams.id);
                    },
                }
            })
});

UserCourse.controller('UserCourseCtrl', function ($scope, UserCourseService, UserCourses) {
    $scope.usercourses = [];
    $scope.courses = [];

    if (UserCourses.data.flag) {
        $scope.usercourses = UserCourses.data.data;
    }

    $scope.getCoursesFn = function (uni_id) {
        if (uni_id) {
            UserCourseService.getCourses(uni_id).success(function (res) {
                if (res) {
                    $scope.courses = res.data;
                } else {
                    $scope.courses = [];
                }
            })
        } else {
            $scope.courses = [];
        }
    }

    $scope.getUserCourseFn = function () {
        UserCourseService.getUserCourse().success(function (res) {
            if (res.flag) {
                $scope.usercourses = res.data;
            } else {
                $scope.usercourses = [];
            }
        })
    }

    $scope.deleteUserCourseFn = function (id) {
        UserCourseService.deleteUserCourse(id).success(function (res) {
            if (res.flag) {
                _.each($scope.usercourses, function (usercourse, index) {
                    if (usercourse.id == id) {
                        $scope.usercourses.splice(index, 1);
                    }
                })
                $scope.setFlash('s', res.message);
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }



});

UserCourse.controller('AddUserCourseCtrl', function ($scope, UserCourseService, Universities, $timeout) {

    $scope.usercourse = {};
    $scope.universities = [];
    if (Universities.data.flag) {
        $scope.universities = Universities.data.data;
    }


    $timeout(function () {
        $(".usercourseAdd").modal('show');
        $('.usercourseAdd').on('hidden.bs.modal', function () {
            $scope.goTo('app.usercourse');
        })
    }, true);

    $scope.addUserCourseFn = function () {
        var obj = angular.copy($scope.usercourse);
        UserCourseService.addUserCourse(obj).success(function (res) {
            if (res.flag) {
                $scope.getUserCourseFn();
                $scope.setFlash('s', res.message);
                $(".usercourseAdd").modal('hide');
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }

});

UserCourse.controller('EditUserCourseCtrl', function ($scope, UserCourseService, UserCourse, Universities, $timeout) {

    $scope.usercourse = UserCourse.data.data;
    $scope.universities = [];

    if (Universities.data.flag) {
        $scope.universities = Universities.data.data;
    }

    $scope.getCoursesFn($scope.usercourse.university_id);

    $timeout(function () {
        $(".usercourseEdit").modal('show');
        $('.usercourseEdit').on('hidden.bs.modal', function () {
            $scope.goTo('app.usercourse');
        })
    }, true);

    $scope.updateUserCourseFn = function () {
        var obj = angular.copy($scope.usercourse);
        UserCourseService.updateUserCourse(obj, obj.id).success(function (res) {
            if (res.flag) {
                $scope.getUserCourseFn();
                $scope.setFlash('s', res.message);
                $(".usercourseEdit").modal('hide');
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }
});

UserCourse.service('UserCourseService', function ($http) {
    return{
        getUserCourse: function () {
            return $http.get('usercourse');
        },
        getUniversity: function () {
            return $http.get('university');
        },
        getCourses: function (id) {
            return $http.get('university-course/' + id);
        },
        addUserCourse: function (obj) {
            return $http.post('usercourse', obj);
        },
        editUserCourse: function (id) {
            return $http.get('usercourse/' + id);
        },
        deleteUserCourse: function (id) {
            return $http.delete('usercourse/' + id);
        },
        updateUserCourse: function (obj, id) {
            return $http.put('usercourse/' + id, obj);
        },
    }
});