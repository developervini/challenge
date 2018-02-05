'use strict';

var poatek = angular.module('poatek', ['ngRoute']);

poatek.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'src/views/login.html',
                controller: 'AuthController',
                resolve: {
                    "check": function (auth, $window) {
                        if (auth) {
                            $window.location.href = '/#!/home';
                        }
                    }
                }
            })
            .when('/home', {
                templateUrl: 'src/views/home.html',
                controller: 'HomeController',
                resolve: {
                    "check": function (auth, $window) {
                        if (!auth) {
                            $window.location.href = '/';
                        }
                    }
                }
            })
            .when('/transaction-list', {
                templateUrl: 'src/views/transactionList.html',
                controller: 'TransactionListController',
                resolve: {
                    "check": function (auth, $window) {
                        if (!auth) {
                            $window.location.href = '/';
                        }
                    }
                }
            })
            .when('/transaction-new', {
                templateUrl: 'src/views/transactionNew.html',
                controller: 'TransactionNewController',
                resolve: {
                    "check": function (auth, $window) {
                        if (!auth) {
                            $window.location.href = '/';
                        }
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
    if (localStorage.getItem('currentUser')) {
        return true;
    } else {
        return false;
    }
});