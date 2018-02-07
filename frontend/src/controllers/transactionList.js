
angular.module('poatek')
    .controller('TransactionListController', function ($scope, $http) {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('currentUser')

            }
        }

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
    });
