import moment from 'moment';

function ProfileController($scope, $stateParams, $timeout, $mdDialog, $mdSidenav, $state, firebaseFactory) {
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
    
    var studentRef = firebaseFactory.db.ref('students/' + $scope.studentId);
    if ($scope.studentId && $scope.studentData) {
        console.log('existing data', $scope.studentData);
    } else {
        $scope.startProgress();
        studentRef.once('value', function(snapshot) {
            console.log(snapshot.val());
            $scope.$apply(function() {
                $scope.studentData = snapshot.val();
                $scope.stopProgress();
            });
        });
    }

    function addRemaining(numPasses) {
        $scope.studentData.classes.remaining += numPasses;
        studentRef.child('classes').child('remaining')
            .set($scope.studentData.classes.remaining, function(err) {
                if (err) console.log(err);
            });
    }

    function recordCheckin() {
        addRemaining(-1);
        studentRef.child('classes').child('checkins').push({
            date: moment().format(),
            teacher: firebaseFactory.getUser().email
        });
    }

    function recordPasses(numPasses) {
        numPasses = parseInt(numPasses);
        console.log('num passes', numPasses);
        addRemaining(numPasses);
        studentRef.child('classes').child('passes').push({
            date: moment().format(),
            teacher: firebaseFactory.getUser().email,
            quantity: numPasses
        });
    }

    $scope.checkIn = function(event) {
        var confirm = $mdDialog.confirm()
                .title('Check in ' + $scope.studentData.first + ' for today\'s class?')
                .ariaLabel('Check In')
                .targetEvent(event)
                .ok('Okay')
                .cancel('Cancel');

        $mdDialog.show(confirm).then(recordCheckin);
    };

    $scope.addPasses = function(event) {
        var confirm = $mdDialog.prompt()
                .title('How many passes to add?')
                .textContent('Enter a number')
                .placeholder('10')
                .ariaLabel('Add passes')
                .targetEvent(event)
                .ok('Add')
                .cancel('Cancel');

        $mdDialog.show(confirm).then(recordPasses);
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
            studentRef.set($scope.studentData, function(err) {
                $scope.$apply(function() {
                    $scope.stopProgress();
                    $scope.editable = false;
                });
                if (err) console.log(err);
            });
        }
    };
}

export default ProfileController;
