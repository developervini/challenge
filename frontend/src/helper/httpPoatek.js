poatek.factory('httpPoatek', function ($http, $window) {
    let server = 'http://localhost:3000/';
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('currentToken')
        }
    }

    function messageError(error) {
        if (error.status == '401') {
            swal('', error.data.msg, error.data.status);
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentToken');
            $window.location.href = '/#!/';
        } else {
            swal('Error', error, 'danger');
            $window.location.href = '/#!/';
        }
    }

    return {
        get: (url, callback) => {
            $http.get(server + url, config).then(
                (response) => {
                    callback(response.data);
                },
                (error) => {
                    messageError(error);
                });
        },

        post: (url, data, callback) => {
            $http.post(server + url, data, config).then(
                (response) => {
                    callback(response.data);
                },
                (error) => {
                    messageError(error);
                });
        },

        put: (url, data, callback) => {
            $http.put(server + url, data, config).then(
                (response) => {
                    callback(response.data);
                },
                (error) => {
                    messageError(error);
                });
        },

        delete: (url, callback) => {
            $http.delete(server + url, config).then(
                (response) => {
                    callback(response.data);
                },
                (error) => {
                    messageError(error);
                });
        }
    }

});