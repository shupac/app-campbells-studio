function RegisterController($scope, $stateParams, $timeout, $mdDialog, $state, firebaseFactory) {
    'ngInject'

    var dataCopy;
    $scope.studentId = $stateParams.studentId;
    $scope.studentData = $stateParams.studentData || null;
    $scope.editable = false;
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
            return {abbrev: state};
          });
    
    if ($scope.studentId && $scope.studentData) {
        console.log('existing data', $scope.studentData);
    } else if (!$scope.studentId) {
        $scope.newUser = true;
        $scope.editable = true;
    } else {
        $scope.startProgress();
        firebaseFactory.db.ref().child('users').child($scope.studentId).once('value', function(snapshot) {
            console.log(snapshot.val());
            $scope.$apply(function() {
                $scope.studentData = snapshot.val();
                $scope.stopProgress();
            });
        });
    }
    
    $scope.getData = function(modelId) {
        if ($scope.studentData && $scope.studentData[modelId]) return $scope.studentData[modelId];
    };

    $scope.edit = function() {
        $scope.editable = true;
        dataCopy = angular.merge({}, $scope.studentData);
    };

    $scope.cancel = function() {
        $scope.studentData = dataCopy;
        $scope.editable = false;
    };

    $scope.save = function() {
        console.log($scope.studentData);
        $scope.startProgress();
        if ($scope.studentId) {
            firebaseFactory.db.ref().child('users').child($scope.studentId).set($scope.studentData, function(err) {
                $scope.$apply(function() {
                    $scope.stopProgress();
                    $scope.editable = false;
                });
                if (err) console.log(err);
            });
        } else {
            var newRef = firebaseFactory.db.ref().child('users').push($scope.studentData, function(err) {
                $scope.$apply(function() {
                    $scope.stopProgress();
                    $scope.editable = false;
                });
                if (err) console.log(err);
                console.log(newRef.key);
                $state.go('profile', {studentId: newRef.key});
            });
        }
    };
}

export default RegisterController;
