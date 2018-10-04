/**
 * Created by CIS1 on 05-02-2015.
 */

var Course = angular.module('Course', []);
modules.push('Course');
Course.config(function ($stateProvider) {

    $stateProvider
            .state('app.course', {
                url: '/course',
                templateUrl: 'app/partials/course/course.html',
                controller: 'CourseCtrl',
                resolve: {
                    Courses: function (CourseService) {
                        return CourseService.getCourse();
                    },
                }
            })
            .state('app.course.add', {
                url: '/add',
                templateUrl: 'app/partials/course/add.html',
                controller: 'AddCourseCtrl',
                resolve: {
                    Universities: function (CourseService) {
                        return CourseService.getUniversity();
                    },
                }
            })
            .state('app.course.edit', {
                url: '/:id',
                templateUrl: 'app/partials/course/edit.html',
                controller: 'EditCourseCtrl',
                resolve: {
                    Universities: function (CourseService) {
                        return CourseService.getUniversity();
                    },
                    Course: function (CourseService, $stateParams) {
                        return CourseService.editCourse($stateParams.id);
                    },
                }
            })
});

Course.controller('CourseCtrl', function ($scope, CourseService, Courses) {
    $scope.courses = [];

    if (Courses.data.flag) {
        $scope.courses = Courses.data.data;
    }

    $scope.getCourseFn = function () {
        CourseService.getCourse().success(function (res) {
            if (res.flag) {
                $scope.courses = res.data;
            } else {
                $scope.courses = [];
            }
        })
    }

    $scope.deleteCourseFn = function (id) {
        CourseService.deleteCourse(id).success(function (res) {
            if (res.flag) {
                _.each($scope.courses, function (course, index) {
                    if (course.id == id) {
                        $scope.courses.splice(index, 1);
                    }
                })
                $scope.setFlash('s', res.message);
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }



});

Course.controller('AddCourseCtrl', function ($scope, CourseService, Universities, $timeout) {

    $scope.course = {};
    $scope.universities = [];
    if (Universities.data.flag) {
        $scope.universities = Universities.data.data;
    }

    $timeout(function () {
        $(".courseAdd").modal('show');
        $('.courseAdd').on('hidden.bs.modal', function () {
            $scope.goTo('app.course');
        })
    }, true);

    $scope.addCourseFn = function () {
        var obj = angular.copy($scope.course);
        CourseService.addCourse(obj).success(function (res) {
            if (res.flag) {
                $scope.getCourseFn();
                $scope.setFlash('s', res.message);
                $(".courseAdd").modal('hide');
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }
});

Course.controller('EditCourseCtrl', function ($scope, CourseService, Course, Universities, $timeout) {

    $scope.course = Course.data.data;
    $scope.universities = [];
    if (Universities.data.flag) {
        $scope.universities = Universities.data.data;
    }
    $timeout(function () {
        $(".courseEdit").modal('show');
        $('.courseEdit').on('hidden.bs.modal', function () {
            $scope.goTo('app.course');
        })
    }, true);

    $scope.updateCourseFn = function () {
        var obj = angular.copy($scope.course);
        CourseService.updateCourse(obj,obj.id).success(function (res) {
            if (res.flag) {
                $scope.getCourseFn();
                $scope.setFlash('s', res.message);
                $(".courseEdit").modal('hide');
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }
});

Course.service('CourseService', function ($http) {
    return{
        getCourse: function () {
            return $http.get('course');
        },
        getUniversity: function () {
            return $http.get('university');
        },
        addCourse: function (obj) {
            return $http.post('course', obj);
        },
        editCourse: function (id) {
            return $http.get('course/' + id);
        },
        deleteCourse: function (id) {
            return $http.delete('course/' + id);
        },
        updateCourse: function (obj, id) {
            return $http.put('course/' + id, obj);
        },
    }
});