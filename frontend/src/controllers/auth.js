
angular.module('poatek')
    .controller('AuthController', function ($scope, $cookies, httpPoatek, $window) {
        $scope.user = {
            username: null,
            password: null
        }

        $scope.login = () => {
            if (checkFields($scope.user)) {
                httpPoatek.post('login', $scope.user, (data) => {
                    if (data.token) {
                        localStorage.setItem('currentToken', data.token);
                        $cookies.putObject('currentUser', data.user);
                        $window.location.href = '/#!/home';
                    } else {
                        swal('Warning', data.msg, 'warning');
                    }
                })
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