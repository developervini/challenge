
angular.module('poatek')
    .controller('HomeController', function ($scope, httpPoatek) {
        $scope.sortType = 'date';
        $scope.sortReverse = true;

        $scope.message = {
            welcome: 'Welcome to  PoaTek Challenge!',
            description: 'This is a PoaTek programming challenge, evaluating possible new collaborators.'
        };

        let from = new Date();
        from.setMonth(from.getMonth() - 1);
        let to = new Date();

        httpPoatek.post('transaction/filters', { date: { '$gte': from, '$lt': to } }, (data) => {
            if (data.transactions.length > 0) {
                $scope.transactions = data.transactions;
            } else {
                $scope.transactions = 'Not found results';
            }
        })

        $scope.getTotal = () => {
            let total = 0;
            for (let element in $scope.transactions) {
                total += parseFloat($scope.transactions[element].amount);
            }
            return total;
        }
    });
