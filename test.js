const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];


app.post('/admin/login', (req, res) => {
    // logic to log in admin\
    const course = req.body;
    console.log(course);
    course.courseid = 123;
    res.status(201).json(course);
  });

  //app.put('/admin/courses/:courseId')

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});