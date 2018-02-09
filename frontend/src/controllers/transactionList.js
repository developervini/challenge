
angular.module('poatek')
    .controller('TransactionListController', function ($scope, $http, $window) {

        $scope.sortType = 'description';
        $scope.sortReverse = false;

        $scope.from = new Date();
        $scope.from.setMonth($scope.from.getMonth() - 1);
        $scope.to = new Date();

        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('currentUser')

            }
        }

        $scope.list = function () {
            $http.get('http://localhost:3000/transaction', config).then(
                function (response) {
                    if (response.data.transactions.length > 0) {
                        $scope.transactions = response.data.transactions;
                    } else {
                        $scope.transactions = 'Not found results';
                    }
                },
                function (error) {
                    swal('Error', error, 'danger');

                });
        }

        $scope.delete = function (id) {
            swal({
                text: "Are you sure?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    if (id) {
                        $http.delete('http://localhost:3000/transaction/' + id, config).then(
                            function (response) {
                                swal('Success', response.data.msg, 'success').then(
                                    function () {
                                        $scope.list();
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
                } else {
                    swal("Canceled", {
                        icon: "info"
                    });
                }
            });
        }

        $scope.list();
    });
