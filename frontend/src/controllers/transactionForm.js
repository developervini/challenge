
angular.module('poatek')
    .controller('TransactionFormController', function ($scope, httpPoatek, $window, $routeParams) {
        $scope.save = () => {
            if ($routeParams.id) {
                httpPoatek.put('transaction/' + $scope.transaction._id, $scope.transaction, (data) => {
                    swal('Success', data.msg, 'success').then(
                        () => {
                            $scope.transaction = {};
                            $window.location.href = '/#!/transaction-list';
                        });
                })
            }
            else {
                httpPoatek.post('transaction', $scope.transaction, (data) => {
                    swal('Success', data.msg, 'success').then(
                        () => {
                            $scope.transaction = {};
                            $window.location.href = '/#!/transaction-list';
                        });
                })
            }
        };

        $scope.find = (id) => {
            httpPoatek.get('transaction/' + id, (data) => {
                if (data.transaction) {
                    $scope.transaction = data.transaction;
                } else {
                    swal('Information', data.msg, 'info').then(
                        () => {
                            $window.location.href = '/#!/transaction-list';
                        });
                }
            })
        };

        $scope.cancel = () => {
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
