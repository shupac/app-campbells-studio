function ProfileController($scope, $stateParams, $timeout, firebaseFactory) {
    'ngInject'

    $scope.userId = $stateParams.userId;
    $scope.user = {};
    $scope.editable = false;
    $scope.saved = false;
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
            return {abbrev: state};
          });
    
    if (!$scope.userId) {
        $scope.newUser = true;
        $scope.editable = true;
    } else {
        firebaseFactory.db.ref().child('users').child($scope.userId).once('value', function(snapshot) {
            console.log(snapshot.val());
            $scope.$apply(function() {
                $scope.userData = snapshot.val();
            });
        });
    }

    console.log('userId', $scope.userId);
    
    $scope.getData = function(modelId) {
        if ($scope.userData && $scope.userData[modelId]) return $scope.userData[modelId];
    };

    $scope.edit = function() {
        $scope.editable = true;
    };

    $scope.saveInfo = function() {
        $scope.editable = false;
        console.log($scope.userData);
        if (confirm) firebaseFactory.db.ref().child('users').child($scope.userId)
            .set($scope.userData, function() {
                $scope.showSaved();
            });
    };

    $scope.showSaved = function() {
        $scope.saved = true;
        $timeout(function() {
            $scope.saved = false;
            // window.location.reload();
        }, 500);
    }
}

export default ProfileController;
