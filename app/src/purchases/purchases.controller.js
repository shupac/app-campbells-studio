import moment from 'moment';
var json2csv = require('json2csv');
var fields = ['name', 'date', 'teacher'];

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
            return name.indexOf(studentSearch) > -1 && teacher.indexOf(teacherSearch) > -1 && filterStartDate && filterEndDate;
        });
        $scope.filteredData = results;
    }

    $scope.generateReport = function() {
        console.log($scope.startDate, $scope.endDate);
        console.log($scope.data);
    }

    $scope.download = function() {
        var csvContent = "data:text/csv;charset=utf-8,";

        csvContent += ['Last Name', 'First Name', 'Date', 'Teacher'].join(',') + '\r\n';

        $scope.filteredData.forEach(function(item){
            csvContent += [item.name, moment(item.date).format('M-D-YYYY h:mmA'), item.teacher].join(',') + '\r\n';
        });

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "checkins.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
        document.body.removeChild(link);
    }
}

export default ReportsController;
