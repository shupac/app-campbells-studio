import firebase from 'firebase';

export default function StudentsDataFactory(firebaseFactory, $rootScope) {
    'ngInject'

    var studentsData;

    firebaseFactory.db.ref().child('students').once('value', function(snapshot) {
        $rootScope.$apply(function() {
            var students = [];
            angular.forEach(snapshot.val(), function(student, key) {
                student.id = key
                students.push(student);
            });
            students = students.sort(function(a, b) {
                if (!a.last || !a.first || !b.first || !b.last) {
                    console.log('name incomplete!!', a, b);
                    return false;
                }
                var a_last = a.last.toLowerCase();
                var b_last = b.last.toLowerCase();
                var a_first = a.first.toLowerCase();
                var b_first = b.first.toLowerCase();

                if (a_last !== b_last) return a_last.localeCompare(b_last);
                return a_first.localeCompare(b_first);
            });
            studentsData = students;
            // console.log('students data', students);
        });
    }, function(err) {
        console.log(err);
    });

    function getStudents() {
        return studentsData;
    }

    return {
        getStudents
    };
};
