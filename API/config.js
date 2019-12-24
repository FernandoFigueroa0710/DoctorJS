const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
const compression = require("compression");

const app = express();
const database = require("../database/mysql");
const index = require("./routes/index");
const users = require("./routes/users");
//middleware
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/../client/dist"));

//HTTP Requests go here
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept"
  );
  next();
});
// handle sessions
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

//passsport
app.use(passport.initialize());
app.use(passport.session());

//Validator
app.use(
  expressValidator({
    errorFormatter: (param, msg, value) => {
      let namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

//messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
//Indexing
app.use("/", index);
app.use("/users", users);

//catch 404 errors and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

//error handler
app.use((err, req, res, next) => {
  //set locals providing erros in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render("error");
  next();
});

app.post("/submitLevel", function(req, res) {
  let when_mesuare = req.body.whenMesuare;
  let glucose = req.body.Glucose;
  var created = new Date();
  if (!when_mesuare || !glucose) {
    res.sendStatus(400);
  } else {
    database.insertGlucose(when_mesuare, glucose, created, (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200);
        res.send(JSON.stringify(results));
      }
    });
  }
});

app.post("/carbLevel", function(req, res) {
  let amount_mesuare = req.body.amountMesuare;
  let carbs = req.body.Carbs;
  var carbs_time = new Date();
  if (!amount_mesuare || !carbs) {
    res.sendStatus(400);
  } else {
    database.insertCarbs(amount_mesuare, carbs, carbs_time, (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200);
        res.send(JSON.stringify(results));
      }
    });
  }
});

app.post("/bloodPresure", function(req, res) {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    var when_reading = req.body.whenReading;
    var bloodPresure = req.body.bloodPresure;
    var created = new Date();
    if (!when_reading || !bloodPresure) {
      res.sendStatus(400);
    } else {
      database.insertBloodPressure(
        when_reading,
        bloodPresure,
        created,
        (err, results) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else {
            res.status(200);
            res.send(JSON.stringify(results));
          }
        }
      );
    }
  });
});

app.post("/userData", function(req, res) {
  console.log(res.body);
  var gender = req.body.gender;
  var age = req.body.age;
  var weight = req.body.weight;
  var height = req.body.height;
  if (!gender || !age || !weight || !height) {
    res.sendStatus(400);
  } else {
    database.userData(gender, age, weight, height, (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200);
        res.send(JSON.stringify(results));
      }
    });
  }
});

app.get("/submitLevel", function(req, res) {
  database.displaySugar(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200);
      res.json(data);
    }
  });
});
app.get("/userData", function(req, res) {
  database.displayUserData(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get("/bloodPresure", function(req, res) {
  database.displayPressure(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200);
      res.json(data);
    }
  });
});

app.get("/carbLevel", function(req, res) {
  database.displayCarbs(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.status(200);
      res.json(data);
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = res.headers["authorization"];
  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

var router = express.Router();
//router to our handle user registration
app.use("/api", router);
router.post("/register", database.userRegister);
router.post("/login", database.userLogin);
app.listen(3000, function() {
  console.log("Listening on port 3000!");
});
