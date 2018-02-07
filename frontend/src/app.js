'use strict';

var poatek = angular.module('poatek', ['ngRoute', 'rw.moneymask']);

poatek.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'src/views/login.html',
                controller: 'AuthController',
                resolve: {
                    check: function (auth, $window) {
                        if (auth.auth()) {
                            $window.location.href = '/#!/home';
                        }
                    }
                }
            })
            .when('/home', {
                templateUrl: 'src/views/home.html',
                controller: 'HomeController',
                resolve: {
                    check: function (auth, $window) {
                        if (!auth.auth()) {
                            $window.location.href = '/#!/';
                        }
                    }
                }
            })
            .when('/transaction-list', {
                templateUrl: 'src/views/transactionList.html',
                controller: 'TransactionListController',
                resolve: {
                    check: function (auth, $window) {
                        if (!auth.auth()) {
                            $window.location.href = '/#!/';
                        }
                    }
                }
            })
            .when('/transaction-new', {
                templateUrl: 'src/views/transactionForm.html',
                controller: 'TransactionFormController',
                resolve: {
                    check: function (auth, $window) {
                        if (!auth.auth()) {
                            $window.location.href = '/#!/';
                        }
                    }
                }
            })
            .when('/transaction-edit/:id', {
                templateUrl: 'src/views/transactionForm.html',
                controller: 'TransactionFormController',
                resolve: {
                    check: function (auth, $window) {
                        if (!auth.auth()) {
                            $window.location.href = '/#!/';
                        }
                    }
                }
            })
            .when('/logoff', {
                resolve: {
                    logoff: function ($window) {
                        localStorage.removeItem('currentUser');
                        $window.location.href = '/#!/home';
                    }
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }]
);

// https://ciphertrick.com/2014/12/14/check-condition-before-loading-route-in-angular-js/

poatek.factory('auth', function () {
    return {
        auth: function () {
            if (localStorage.getItem('currentUser')) {
                return true;
            } else {
                return false;
            }
        }
    }

});