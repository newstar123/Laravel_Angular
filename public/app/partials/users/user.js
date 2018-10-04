/**
 * Created by CIS1 on 05-02-2015.
 */

var User = angular.module('User', []);
modules.push('User');
User.config(function ($stateProvider) {

    $stateProvider
            .state('app.user', {
                url: '/user',
                templateUrl: 'app/partials/users/user.html',
                controller: 'UserCtrl',
                resolve: {
                    Users: function (UserService) {
                        var obj = {
                            page: 1,
                            limit: 25,
                        };
                        return UserService.getUser(obj);
                    },
                }
            })
            .state('app.user.add', {
                url: '/add',
                templateUrl: 'app/partials/users/add.html',
                controller: 'AddUserCtrl',
            })
});

User.controller('UserCtrl', function ($scope, UserService, Users, $q) {
    $scope.users = [];
    $scope.page = 1;
    $scope.limit = 25;
    $scope.totalCount = 0;

    if (Users.data.flag) {
        $scope.users = Users.data.data.list;
        $scope.totalCount = Users.data.data.count
    }

    $scope.getPaginate = function () {
        var obj = {
            page: $scope.currentPage,
            limit: $scope.limit,
        }
        UserService.getUser(obj).success(function (res) {
            if (res.flag) {
                $scope.users = res.data.list;
                if (res.data.count)
                    $scope.totalCount = res.data.count
            } else {
                $scope.users = [];
                $scope.totalCount = 0;
            }
        })
    }

    $scope.updateUserFn = function (data, field, id) {
        var obj = {}
        obj[field] = data;
        var d = $q.defer();
        UserService.updateUser(obj, id).success(function (res) {
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

    $scope.updateActiveFn = function (status, id) {
        var obj = {
            active: true
        };
        if (status) {
            obj.active = false;
        }
        console.log(obj);
        UserService.updateActive(obj, id).success(function (res) {
            if (res.flag) {
                _.each($scope.users, function (user, index) {

                    if (user.id == id) {
                        user.active = obj.active;
                    }
                })
                $scope.setFlash('s', res.message);
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }

    $scope.deleteUserFn = function (id) {
        UserService.deleteUser(id).success(function (res) {
            if (res.flag) {
                _.each($scope.users, function (user, index) {
                    if (user.id == id) {
                        $scope.users.splice(index, 1);
                    }
                })
                $scope.setFlash('s', res.message);
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }



});

User.controller('AddUserCtrl', function ($scope, UserService, $timeout) {

    $scope.user = {};

    $timeout(function () {
        $(".userAdd").modal('show');
        $('.userAdd').on('hidden.bs.modal', function () {
            $scope.goTo('app.user');
        })
    }, true);

    $scope.addUserFn = function () {
        var obj = angular.copy($scope.user);
        UserService.addUser(obj).success(function (res) {
            if (res.flag) {
                $scope.users.push(res.data);
                $scope.setFlash('s', res.message);
                $(".userAdd").modal('hide');
            } else {
                $scope.setFlash('e', res.message);
            }
        })
    }
});

User.service('UserService', function ($http) {
    return{
        getUser: function (obj) {
            return $http.post('user/paginate', obj);
        },
        addUser: function (obj) {
            return $http.post('user', obj);
        },
        deleteUser: function (id) {
            return $http.delete('user/' + id);
        },
        updateUser: function (obj, id) {
            return $http.put('user/' + id, obj);
        },
        updateActive: function (obj, id) {
            return $http.post('/user/activate/' + id, obj);
        }
    }
});