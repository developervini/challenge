
angular.module('poatek')
    .controller('AuthController', function ($scope, $http, $location) {
        $scope.user = {
            username: null,
            password: null
        }
        $scope.login = function () {
            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            if (checkFields($scope.user)) {
                $http.post('http://localhost:3000/login', $scope.user, config).then(
                    function (response) {
                        localStorage.setItem('currentUser', {
                            username: response.data.user.name,
                            token: response.data.token
                        });
                        $location.path('/home');
                    },
                    function (error) {
                        swual('', error, 'danger');

                    });
            }
        }
    });

function checkFields(user) {
    let message = '';
    if (!user.username) {
        message += 'Username is required\n';
    }

    if (!user.password) {
        message += 'Password is required';
    }

    if (message) {
        swal('Warning ', message, { buttons: false, timer: 2500, icon: 'warning' });
        return false;
    } else {
        return true;
    }
}