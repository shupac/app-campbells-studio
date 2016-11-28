import moment from 'moment';
import angular from 'angular';

function HomeController($scope, $state, firebaseFactory, studentsData) {
    'ngInject'

    $scope.$watch(function() {
        $scope.students = studentsData.getStudents();
    });

    $scope.viewProfile = function(student) {
        $state.go('profile', {studentId: student.id, studentData: student});
    };

    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    $scope.logout = firebaseFactory.signOut;
}

export default HomeController;
