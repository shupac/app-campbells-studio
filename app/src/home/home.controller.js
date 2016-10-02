import moment from 'moment';

function HomeController($scope, $state, firebaseFactory) {
    'ngInject'

    firebaseFactory.db.ref().child('users').once('value', function(snapshot) {
        $scope.$apply(function() {
            console.log(snapshot.val());
            $scope.students = snapshot.val();
        });
    });

    $scope.viewProfile = function(key, student) {
        $state.go('profile', {studentId: key, studentData: student});
    };
}

export default HomeController;
