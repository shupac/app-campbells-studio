function LoginController($scope, firebaseFactory) {
    'ngInject'

    $scope.cred = {
        email: 'djshu.us@gmail.com',
        password: 'forrestyoga'
    };

    $scope.login = function() {
        firebaseFactory.auth($scope.cred).then(function() {
        })
    };
}

export default LoginController;
