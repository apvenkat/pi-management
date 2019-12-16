var express = require("express");
var router = express.Router();
router.use(require("cookie-parser")());
var request = require("request");
const auth = require("../middleware/auth");
// var options = { method: 'GET',
//             url: 'http://devices.webofthings.io/pi/sensors/',
//             headers:
//             { Accept: 'application/json' } };
//             request(options, function (error, response, body) {
//                 if (error) throw new Error(error);
//                 sensorlist = JSON.parse(body)
//             });

router.get("/signup", function(req, res, next) {
  if (req.accepts("html")) {
    res.render("signup");
  } else {
    res.json(sensorlist);
  }
});

router.get("/login", function(req, res, next) {
  if (req.accepts("html")) {
    res.render("login");
  } else {
    res.json({
      message: "This is a login page"
    });
  }
});

router.get("/config", auth, function(req, res, next) {
  if (req.accepts("html")) {
    res.render("config");
  } else {
    res.json(sensorlist);
  }
});

router.get("/dashboard", auth, function(req, res, next) {
  if (req.accepts("html")) {
    res.render("dashboard");
  } else {
    res.json({
      message: "This is Dashboard page"
    });
  }
});

module.exports = router;
