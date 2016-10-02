import moment from 'moment';
import angular from 'angular';

function HomeController($scope, $state, firebaseFactory) {
    'ngInject'

    firebaseFactory.db.ref().child('students').once('value', function(snapshot) {
        $scope.$apply(function() {
            var students = [];
            angular.forEach(snapshot.val(), function(student, key) {
                student.id = key
                students.push(student);
            });
            students = students.sort(function(a, b) {
                var a_last = a.last.toLowerCase();
                var b_last = b.last.toLowerCase();
                var a_first = a.first.toLowerCase();
                var b_first = b.first.toLowerCase();

                if (a_last !== b_last) return a_last.localeCompare(b_last);
                return a_first.localeCompare(b_first);
            });
            $scope.students = students;
        }, function(err) {
            console.log(err);
        });
    });

    // $scope.searchText = 'camp';

    $scope.viewProfile = function(student) {
        $state.go('profile', {studentId: student.id, studentData: student});
    };

    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    $scope.$watch('searchText', function(value) {
        console.log(value);
    });

    $scope.logout = firebaseFactory.signOut;
}

export default HomeController;
