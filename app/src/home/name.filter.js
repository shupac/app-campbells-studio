export default function() {
    return function(students, text) {
        if (!text) return students;
        text = text.toLowerCase();
        if (!students) return;
        var results = students.filter(function(student) {
            var first = student.first.toLowerCase();
            var last = student.last.toLowerCase();
            return first.indexOf(text) > -1 || last.indexOf(text) > -1;
        });
        return results;
    };
};
