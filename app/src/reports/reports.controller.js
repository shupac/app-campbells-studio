function ReportsController($scope, $stateParams, $timeout, $mdDialog, $state, firebaseFactory) {
    'ngInject'

    var dataCopy;
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
            return {abbrev: state};
          });
    $scope.editable = true;

    $scope.save = function() {
        $scope.startProgress();
        $scope.studentData.classes = {
            remaining: 0
        };
        var newRef = firebaseFactory.db.ref().child('students').push($scope.studentData, function(err) {
            $scope.$apply(function() {
                $scope.stopProgress();
                $scope.editable = false;
            });
            if (err) console.log(err);
            $state.go('profile', {studentId: newRef.key});
        });
    };
}

export default ReportsController;
