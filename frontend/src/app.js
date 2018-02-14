let poatek = angular.module('poatek', ['ngRoute', 'rw.moneymask', 'ngMessages']);

poatek.config(['$routeProvider',
    ($routeProvider) => {
        $routeProvider.
            when('/', {
                templateUrl: 'src/views/login.html',
                controller: 'AuthController',
                resolve: {
                    check: (auth, $window) => {
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
                    check: (auth, $window) => {
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
                    check: (auth, $window) => {
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
                    check: (auth, $window) => {
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
                    check: (auth, $window) => {
                        if (!auth.auth()) {
                            $window.location.href = '/#!/';
                        }
                    }
                }
            })
            .when('/logoff', {
                resolve: {
                    logoff: ($window) => {
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

poatek.factory('auth', () => {
    return {
        auth: () => {
            if (localStorage.getItem('currentUser')) {
                return true;
            } else {
                return false;
            }
        }
    }

});

// https://stackoverflow.com/questions/34415617/how-to-filter-data-by-date-range-in-angularjs

poatek.filter("dateFilter", () => {
    return function datefilter(items, from, to) {
        let result = [];
        if (from && to) {
            angular.forEach(items, (value) => {
                if (Date.parse(value.date) > Date.parse(from) && Date.parse(to) > Date.parse(value.date)) {
                    result.push(value);
                }
            });
            return result;
        } else {
            return items;
        }

    };
});