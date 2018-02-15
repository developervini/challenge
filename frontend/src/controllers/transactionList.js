
angular.module('poatek')
    .controller('TransactionListController', function ($scope, $cookies, httpPoatek, $window) {

        $scope.currentUser = $cookies.getObject('currentUser');

        $scope.sortType = 'date';
        $scope.sortReverse = true;

        $scope.list = () => {
            httpPoatek.get('transaction', (data) => {
                if (data.transactions.length > 0) {
                    $scope.transactions = data.transactions;
                } else {
                    $scope.transactions = 'Not found results';
                }
            })
        }

        $scope.delete = (id) => {
            swal({
                text: "Are you sure?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    if (id) {
                        httpPoatek.delete('transaction/' + id, (data) => {
                            swal('Success', data.msg, 'success').then(
                                () => {
                                    $scope.list();
                                });
                        })
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
