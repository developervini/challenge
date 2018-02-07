
angular.module('poatek')
    .controller('TransactionFormController', function ($scope, $http, $window, $routeParams) {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('currentUser')

            }
        };

        $scope.save = function () {
            if ($routeParams.id) {
                $http.put('http://localhost:3000/transaction/' + $scope.transaction._id, $scope.transaction, config).then(
                    function (response) {
                        swal('Success', response.data.msg, 'success').then(
                            function () {
                                $scope.transaction = {};
                                $window.location.href = '/#!/transaction-list';
                            });
                    },
                    function (error) {
                        swal('Error', error, 'error').then(
                            function () {
                                $scope.transaction = {};
                                $window.location.href = '/#!/transaction-list';
                            });
                    });
            }
            else {
                $http.post('http://localhost:3000/transaction', $scope.transaction, config).then(
                    function (response) {
                        swal('Success', response.data.msg, 'success').then(
                            function () {
                                $scope.transaction = {};
                                $window.location.href = '/#!/transaction-list';
                            });
                    },
                    function (error) {
                        swal('Error', error, 'error').then(
                            function () {
                                $scope.transaction = {};
                                $window.location.href = '/#!/transaction-list';
                            });
                    });
            }
        };

        $scope.find = function (id) {
            $http.get('http://localhost:3000/transaction/' + id, config).then(
                function (response) {
                    if (response.data.transaction) {
                        $scope.transaction = response.data.transaction;
                    } else {
                        swal('Information', response.data.msg, 'info').then(
                            function () {
                                $window.location.href = '/#!/transaction-list';
                            });
                    }
                },
                function (error) {
                    swal('Error', 'Mongo error', 'error').then(
                        function () {
                            $scope.transaction = {};
                            $window.location.href = '/#!/transaction-list';
                        });
                });
        };

        $scope.cancel = function () {
            $scope.transaction = {};
            $window.location.href = '/#!/transaction-list';
        };

        if ($routeParams.id) {
            $scope.message = 'Edit Transaction';
            $scope.find($routeParams.id);
        } else {
            $scope.message = 'Add Transaction';
        }
    });
