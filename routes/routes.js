var express = require("express");
var router = express.Router();
var request = require("request");
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
    res.json(sensorlist);
  }
});

router.get("/settings", function(req, res, next) {
  if (req.accepts("html")) {
    res.render("settings");
  } else {
    res.json(sensorlist);
  }
});

module.exports = router;
