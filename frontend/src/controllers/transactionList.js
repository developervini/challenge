
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
                if (response.data.msg) {
                    $scope.message = response.data.msg;
                } else {
                    swal('Warning', response.data.msg, 'warning');
                }
            },
            function (error) {
                swal('Error', error, 'danger');

            });
    });
