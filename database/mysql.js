const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//change database credentials as needed
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
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
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      var today = new Date();
      var users = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash,
        created: today,
        modified: today
      };
      connection.query("INSERT INTO users SET ?", users, function(
        error,
        results
      ) {
        if (error) {
          res.send({
            code: 400,
            failed: "error ocurred"
          });
        } else {
          res.send({
            code: 200,
            sucess: "user registered sucessfully"
          });
        }
      });
    });
  });
};

const userLogin = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  connection.query("SELECT * FROM users WHERE email = ?", [email], function(
    error,
    results
  ) {
    if (error) {
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, function(err, bcryptRes) {
          if (!bcryptRes) {
            res.send({
              code: 400,
              success: " Email and passord do not match"
            });
          } else {
            jwt.sign(
              { email: email, password: password },
              "secretkey",
              (err, token) => {
                res.send({
                  code: 200,
                  success: "login sucessful",
                  token: token
                });
              }
            );
          }

        });
      }
    }
  });
};

const insertGlucose = function(when_mesuare, glucose, created, callback) {
  connection.query(
    "INSERT INTO glucose (when_mesuare, glucose, created) VALUES (?, ?, ?)",
    [when_mesuare, glucose, created],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const insertBloodPressure = function(
  when_reading,
  bloodPresure,
  created,
  callback
) {
  connection.query(
    "INSERT INTO bloodPressure(when_reading, bloodPresure, created) VALUES (?, ?, ?)",
    [when_reading, bloodPresure, created],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const insertCarbs = function(amount_mesuare, carbs, carbs_time, callback) {
  connection.query(
    "INSERT INTO carbs (amount_mesuare, carbs, carbs_time) VALUES (?, ?, ?)",
    [amount_mesuare, carbs, carbs_time],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        console.log(results);
        callback(null, results);
      }
    }
  );
};

const userData = function(gender, age, weight, height, callback) {
  connection.query(
    "INSERT INTO userData (gender, age, weight, height) VALUES (?, ?, ?, ?)",
    [gender, age, weight, height],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        console.log(results);
        callback(null, results);
      }
    }
  );
};

const displayUserData = function(callback, gender, age, weight, height) {
  connection.query(
    "SELECT * FROM userData",
    [gender, age, weight, height],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const displaySugar = function(callback, when_mesuare, glucose, created) {
  connection.query(
    "SELECT * FROM glucose",
    [when_mesuare, glucose, created],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const displayPressure = function(
  callback,
  when_reading,
  bloodPresure,
  created
) {
  connection.query(
    "SELECT * FROM bloodPressure",
    [when_reading, bloodPresure, created],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

const displayCarbs = function(callback, amount_mesuare, carbs, carbs_time) {
  connection.query(
    "SELECT * FROM carbs",
    [amount_mesuare, carbs, carbs_time],
    (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    }
  );
};

module.exports.displayCarbs = displayCarbs;
module.exports.displayPressure = displayPressure;
module.exports.displaySugar = displaySugar;
module.exports.userRegister = userRegister;
module.exports.userLogin = userLogin;
module.exports.insertGlucose = insertGlucose;
module.exports.insertBloodPressure = insertBloodPressure;
module.exports.insertCarbs = insertCarbs;
module.exports.userData = userData;
module.exports.displayUserData = displayUserData;
