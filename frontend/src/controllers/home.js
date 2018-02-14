
angular.module('poatek')
    .controller('HomeController', function ($scope, httpPoatek) {
        $scope.message = {
            welcome: 'Welcome to  PoaTek Challenge!',
            description: 'This is a PoaTek programming challenge, evaluating possible new collaborators.'
        };

        httpPoatek.get('transaction', (data) => {
            if (data.transactions.length > 0) {
                $scope.transactions = data.transactions;
            } else {
                $scope.transactions = 'Not found results';
            }
        })
    });
