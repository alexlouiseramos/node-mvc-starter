const studentModel = require('../models/student');

exports.getAllStudents = function(req, res) {
    studentModel.getAll({name: 1}, function(students) {
  
      res.render('students', { title: 'Students', students: students });
    });
};

exports.create = function(req, res) {
    var student ={
      name: req.body.name,
      id: req.body.id,
      img: `img/${req.body.gender}.png`
    };
  
    studentModel.create(student, function(err, student){
        var result;

        if (err) {
        console.log(err.errors);

        result = { success: false, message: "Student was not created!" }
        res.send(result);
        } else {
        console.log("Successfully added student!");
        console.log(student);

        result = { success: true, message: "Student created!" }

        res.send(result);
        }
    });
  }

exports.search = function(req, res) {
  var pattern = {
    name: { $regex: '^' + req.body.name }
   };
    studentModel.query(pattern, {name: 1}, function(err, students) {

        if (err) {
        console.log(err.errors);
        } else {
        console.log("Successfully found student!");
        console.log(students);

        res.send(students);
        }
           
    });
  
}

exports.editStudent = function(req, res) {
  var query = {
    name: req.body.name
  };

  var update = {
    $set: { id: '109' }
  };

  studentModel.updateOne(query, update, function(err, user) {
    if (err) throw err;
    console.log(user);
    res.send(user);
  });
  
}