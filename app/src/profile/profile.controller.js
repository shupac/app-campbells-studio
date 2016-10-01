function ProfileController($scope, $stateParams, $timeout, $mdDialog, firebaseFactory) {
    'ngInject'

    var dataCopy;

    $scope.userId = $stateParams.userId;
    $scope.userData = {};
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
        $scope.startProgress();
        firebaseFactory.db.ref().child('users').child($scope.userId).once('value', function(snapshot) {
            console.log(snapshot.val());
            $scope.$apply(function() {
                $scope.userData = snapshot.val();
                $scope.stopProgress();
            });
        });
    }

    console.log('userId', $scope.userId);
    
    $scope.getData = function(modelId) {
        if ($scope.userData && $scope.userData[modelId]) return $scope.userData[modelId];
    };

    $scope.edit = function() {
        $scope.editable = true;
        dataCopy = angular.merge({}, $scope.userData);
    };

    $scope.cancel = function() {
        $scope.userData = dataCopy;
        $scope.editable = false;
    };

    $scope.save = function() {
        $scope.editable = false;
        console.log($scope.userData);
        firebaseFactory.db.ref().child('users').child($scope.userId)
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
