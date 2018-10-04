/**
 * Created by CIS1 on 05-02-2015.
 */

var UserCourse = angular.module('UserCourse', []);
modules.push('UserCourse');
UserCourse.config(function ($stateProvider) {

    $stateProvider
            .state('app.usercourse', {
                url: '/usercourse',
                templateUrl: 'app/partials/usercourse/usercourse.html',
                controller: 'UserCourseCtrl',
                resolve: {
                    UserCourses: function (UserCourseService) {
                        return UserCourseService.getUserCourse();
                    },
                }
            })
            .state('app.usercourse.add', {
                url: '/add',
                templateUrl: 'app/partials/usercourse/add.html',
                controller: 'AddUserCourseCtrl',
                resolve: {
                    Universities: function (UserCourseService) {
                        return UserCourseService.getUniversity();
                    },
                    Users: function (UserCourseService) {
                        return UserCourseService.getUsers();
                    },
                }
            })
            .state('app.usercourse.edit', {
                url: '/:id',
                templateUrl: 'app/partials/usercourse/edit.html',
                controller: 'EditUserCourseCtrl',
                resolve: {
                    Universities: function (UserCourseService) {
                        return UserCourseService.getUniversity();
                    },
                    Users: function (UserCourseService) {
                        return UserCourseService.getUsers();
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

});

UserCourse.controller('AddUserCourseCtrl', function ($scope, UserCourseService, Universities, Users, $timeout) {

    $scope.usercourse = {};
    $scope.universities = [];
    $scope.users = [];

    if (Universities.data.flag) {
        $scope.universities = Universities.data.data;
    }
    if (Users.data.flag) {
        $scope.users = Users.data.data;
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

UserCourse.controller('EditUserCourseCtrl', function ($scope, UserCourseService, UserCourse, Universities, Users, $timeout) {

    $scope.usercourse = UserCourse.data.data;
    $scope.universities = [];
    $scope.users = [];

    if (Universities.data.flag) {
        $scope.universities = Universities.data.data;
    }
    if (Users.data.flag) {
        $scope.users = Users.data.data;
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
        getUsers: function () {
            return $http.get('user');
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
        updateUserCourse: function (obj, id) {
            return $http.put('usercourse/' + id, obj);
        },
    }
});