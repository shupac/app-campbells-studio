function LoginController($scope, $mdDialog, firebaseFactory) {
    'ngInject'

    $scope.login = function() {
        firebaseFactory.auth($scope.cred).then(function(result) {
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    };

    function alert(message) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Login Failed')
          .textContent('Incorrect email/password')
          .ariaLabel('Login Alert')
          .ok('Try Again')
      );
    }
}

export default LoginController;
