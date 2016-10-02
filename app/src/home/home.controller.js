import moment from 'moment';

function HomeController($scope, $state, firebaseFactory) {
    'ngInject'

    firebaseFactory.db.ref().child('students').once('value', function(snapshot) {
        $scope.$apply(function() {
            console.log(snapshot.val());
            $scope.students = snapshot.val();
        }, function(err) {
            console.log(err);
        });
    });

    $scope.viewProfile = function(key, student) {
        $state.go('profile', {studentId: key, studentData: student});
    };

    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    $scope.logout = firebaseFactory.signOut;
}

export default HomeController;
