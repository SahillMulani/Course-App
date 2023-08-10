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
  const admin = USERS.find( a => a.username === username && a.password === password)
  if(admin)
  {
    next();
  }
  else{
    res.status(403).json({message : 'Admin Authetication Failed'})
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
});

app.put('/admin/courses/:courseId', adminAuthentication (req, res) => {
  // logic to edit a course
});

app.get('/admin/courses', adminAuthentication, (req, res) => {
  // logic to get all courses
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const user = req.body;
  const existingUser = USERS.find(a => a.username === USERS.username);
  if (existingUser)
  {
    res.status(403).json({ message : "User already exists"});
  }
  else {
    USERS.push(admin);
    res.json({message : "User created successfully"});
  }
});

app.post('/users/login', userAuthentication, (req, res) => {
  // logic to log in user
  res.status(201).json({message : "User logged in successfully"});
});

app.get('/users/courses', userAuthentication , (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', userAuthentication , (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', userAuthentication , (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});