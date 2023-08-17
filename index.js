const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];


const adminAuthentication = (req,res,next) => {
  const { username , password} = req.headers;
  const admin = ADMINS.find( a => a.username === username && a.password === password)
  if(admin)
  {
    next();
  }
  else{
    res.status(403).json({message : 'Admin Authetication Failed'})
  }
}

const userAuthentication = (req,res,next) => {
  const { username , password} = req.headers;
  const admin = USERS.find( u => u.username === username && a.password === password)
  if(admin)
  {
    next();
  }
  else{
    res.status(403).json({message : 'User Authetication Failed'})
  } 
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const admin = req.body;
  const existingAdmin = ADMINS.find(a => a.username === admin.username);
  if (existingAdmin)
  {
    res.status(403).json({ message : "Admin already exists"});
  }
  else {
    ADMINS.push(admin);
    res.json({message : "Admin created successfully"});
  }
});

app.post('/admin/login', adminAuthentication, (req, res) => {
  // logic to log in admin\
  res.status(200).json({message : "Admin logged in successfully"})
});

app.post('/admin/courses', adminAuthentication, (req, res) => {
  // logic to create a course
const course = req.body;
course.id = Math.floor(Math.random() * 100);
COURSES.push(course);
res.status(201).json({message: 'Course Created Succuessfully'});
});

app.put('/admin/courses/:courseId', adminAuthentication , (req, res) => {
  // logic to edit a course
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find(f => f.id == courseId);
  if(course)
  {
    Object.assign(course, req.body);
  }
  else{
    res.status(404).json({message : "Course not found"});
  }
});

app.get('/admin/courses', adminAuthentication, (req, res) => {
  // logic to get all courses
  res.json({courses : COURSES })
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const user = req.body;
  const existingUser = USERS.find(u => u.username === user.username);
  console.log(existingUser);
  if (existingUser)
  {
    res.status(403).json({ message : "User already exists"});
  }
  else {
    USERS.push(user);
    res.json({message : "User created successfully"});
  }
});

app.post('/users/login', userAuthentication, (req, res) => {
  // logic to log in user
  res.status(201).json({message : "User logged in successfully"});
});

app.get('/users/courses', userAuthentication , (req, res) => {
  // logic to list all courses
  let filteredCourses = [];
  for (let i = 0; i<COURSES.length; i++) {
    if (COURSES[i].published) {
      filteredCourses.push(COURSES[i]);
    }
  }
  res.json({ courses: filteredCourses });

});

app.post('/users/courses/:courseId', userAuthentication , (req, res) => {
  // logic to purchase a course
  const courseId = Number(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId && c.published);
  if (course) {
    req.user.purchasedCourses.push(courseId);
    res.json({ message: 'Course purchased successfully' });
  } else {
    res.status(404).json({ message: 'Course not found or not available' });
  }
});

app.get('/users/purchasedCourses', userAuthentication , (req, res) => {
  // logic to view purchased courses
  var purchasedCourseIds = req.user.purchasedCourses; [1, 4];
  var purchasedCourses = [];
  for (let i = 0; i<COURSES.length; i++) {
    if (purchasedCourseIds.indexOf(COURSES[i].id) !== -1) {
      purchasedCourses.push(COURSES[i]);
    }
  }

  res.json({ purchasedCourses });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});