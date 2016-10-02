function LoginController($scope, firebaseFactory) {
    'ngInject'

    $scope.cred = {
        email: 'djshu.us@gmail.com',
        password: 'forrestyoga'
    };

    $scope.login = function() {
        firebaseFactory.auth($scope.cred).then(function(result) {
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    };
}

export default LoginController;
