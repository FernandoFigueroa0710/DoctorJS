// If using MySQL, install mysql2 package with npm install -S mysql2
//mysql2 npm package has support for Promises
const mysql = require("mysql2");

//change database credentials as needed
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "almendra.4",
  database: "doctorJS"
});
connection.connect(function(err) {
  if (!err) {
    console.log("Database is is connected...nn");
  } else {
    console.log("Error connecting database....nn");
  }
});

const userRegister = function(req, res) {
  //console.log("req", req.body);
  var today = new Date();
  var users = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today,
    modified: today
  };
  connection.query("INSERT INTO users SET ?", users, function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.log("ERROR OCURRED", error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      console.log("THE SOLUTION IS: ", results);
      res.send({
        code: 200,
        sucess: "user registered sucessfully"
      });
    }
  });
};

const userLogin = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  connection.query("SELECT * FROM users WHERE email = ?", [email], function(
    error,
    results,
    fields
  ) {
    if (error) {
      console.log("ERROR OCCURED", error);
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      console.log("The Solution is: ", results);
      if (results.length > 0) {
        if (results[0].password === password) {
          res.send({
            code: 200,
            success: "login sucessful"
          });
        } else {
          res.send({
            code: 400,
            success: " Email and passord do not match"
          });
        }
      } else {
        res.send({
          code: "Email and password does not exist"
        });
      }
    }
  });
};

module.exports.userRegister = userRegister;
module.exports.userLogin = userLogin;
