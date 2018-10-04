/**
 * Created by CIS1 on 05-02-2015.
 */

var University = angular.module('University', []);
modules.push('University');
University.config(function ($stateProvider) {

    $stateProvider
            .state('app.university', {
                url: '/university',
                templateUrl: 'app/partials/university/university.html',
                controller: 'UniversityCtrl',
                resolve: {
                    Universitys: function (UniversityService) {
                        return UniversityService.getUniversity();
                    },
                }
            })
            .state('app.university.add', {
                url: '/add',
                templateUrl: 'app/partials/university/add.html',
                controller: 'AddUniversityCtrl',
            })
            .state('app.university.course', {
                url: '/:id/course',
                templateUrl: 'app/partials/university/course.html',
                controller: 'AddUniversityCourseCtrl',
            })
});

University.controller('UniversityCtrl', function ($scope, UniversityService, Universitys, $q) {
    $scope.universities = [];

    if (Universitys.data.flag) {
        $scope.universities = Universitys.data.data;
    }

    $scope.updateUniversityFn = function (data, field, id) {
        var obj = {}
        obj[field] = data;
        var d = $q.defer();
        UniversityService.updateUniversity(obj, id).success(function (res) {
            if (res.flag) {
                $scope.setFlash('s', res.message);
                d.resolve();
            } else {
                d.reject(res.message);
            }
        }).error(function (e) {
            d.reject('Server error!');
        });
        return d.promise;
    }

    $scope.deleteUniversityFn = function (id) {
        UniversityService.deleteUniversity(id).success(function (res) {
            if (res.flag) {
                _.each($scope.universities, function (university, index) {
                    if (university.id == id) {
                        $scope.universities.splice(index, 1);
                    }
                })
                $scope.setFlash('s', res.message);
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }



});

University.controller('AddUniversityCtrl', function ($scope, UniversityService, $timeout) {

    $scope.university = {};

    $timeout(function () {
        $(".universityAdd").modal('show');
        $('.universityAdd').on('hidden.bs.modal', function () {
            $scope.goTo('app.university');
        })
    }, true);

    $scope.addUniversityFn = function () {
        var obj = angular.copy($scope.university);
        UniversityService.addUniversity(obj).success(function (res) {
            if (res.flag) {
                $scope.universities.push(res.data);
                $scope.setFlash('s', res.message);
                $(".universityAdd").modal('hide');
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }
});

University.controller('AddUniversityCourseCtrl', function ($scope, UniversityService, $stateParams, $timeout) {

    $scope.course = {
        university_id: $stateParams.id
    };

    $timeout(function () {
        $(".courseAdd").modal('show');
        $('.courseAdd').on('hidden.bs.modal', function () {
            $scope.goTo('app.university');
        })
    }, true);

    $scope.addCourseFn = function () {
        var obj = angular.copy($scope.course);
        UniversityService.addCourse(obj).success(function (res) {
            if (res.flag) {
                $scope.setFlash('s', res.message);
                $(".courseAdd").modal('hide');
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }
});

University.service('UniversityService', function ($http) {
    return{
        getUniversity: function () {
            return $http.get('university');
        },
        addUniversity: function (obj) {
            return $http.post('university', obj);
        },
        addCourse: function (obj) {
            return $http.post('course', obj);
        },
        deleteUniversity: function (id) {
            return $http.delete('university/' + id);
        },
        updateUniversity: function (obj, id) {
            return $http.put('university/' + id, obj);
        },
    }
});