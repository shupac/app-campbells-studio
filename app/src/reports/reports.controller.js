import moment from 'moment';

function ReportsController($scope, studentsData, firebaseFactory) {
    'ngInject'

    $scope.checkinsData = [];
    $scope.studentSearch = '';
    $scope.teacherSearch = '';
    var studentNames = {};

    $scope.$watch(studentsData.getStudents, function(data) {
        if (data) {
            flattenNames(data);
            firebaseFactory.db.ref('checkins').once('value', function(snapshot) {
                $scope.$apply(function() {
                    flattenData(snapshot.val());
                });
            });
        }
    });

    $scope.$watch('studentSearch', filterCheckins);
    $scope.$watch('teacherSearch', filterCheckins);
    $scope.$watch('startDate', filterCheckins);
    $scope.$watch('endDate', filterCheckins);

    function flattenNames(data) {
        data.forEach(function(studentData) {
            studentNames[studentData.id] = studentData.last + ', ' + studentData.first;
        });
    }

    function flattenData(checkinsData) {
        for (var uid in checkinsData) {
            var name = studentNames[uid];
            var checkins = checkinsData[uid];
            for (var id in checkins) {
                var checkin = checkins[id];
                $scope.checkinsData.push({
                    name: name,
                    date: checkin.date,
                    teacher: checkin.teacher
                });
            }
        }
        sortData();
        console.log($scope.checkinsData.length);
    }

    function sortData() {
        $scope.checkinsData = $scope.checkinsData.sort(function(a, b) {
            if (moment(a.date).isAfter(b.date)) return -1;
            return 1;
        });
        $scope.filteredData = $scope.checkinsData;
    }

    function filterCheckins() {
        var studentSearch = $scope.studentSearch.toLowerCase();
        var teacherSearch = $scope.teacherSearch.toLowerCase();
        if (!$scope.checkinsData.length) return;
        var results = $scope.checkinsData.filter(function(checkin) {
            var name = checkin.name.toLowerCase();
            var teacher = checkin.teacher.toLowerCase();
            var date = moment(checkin.date);
            var filterStartDate = $scope.startDate ? date.isAfter(moment($scope.startDate).subtract(1, 'd')) : true;
            var filterEndDate = $scope.endDate ? date.isSameOrBefore(moment($scope.endDate).add(1, 'd')) : true;
            console.log(filterStartDate, filterEndDate);
            return name.indexOf(studentSearch) > -1 && teacher.indexOf(teacherSearch) > -1 && filterStartDate && filterEndDate;
        });
        $scope.filteredData = results;
    }

    $scope.generateReport = function() {
        console.log($scope.startDate, $scope.endDate);
        console.log($scope.data);
    }
}

export default ReportsController;
