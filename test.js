const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];


app.post('/admin/login', (req, res) => {
    // logic to log in admin\
    const { username , password} = req.headers;
    console.log(req.headers.username);
    console.log("username : "+ username);
    console.log("password : "+ password);
  });
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});