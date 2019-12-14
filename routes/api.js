var express = require("express");
var router = express.Router();
var sqlite3 = require("sqlite3");
const request = require("request");
var db = new sqlite3.Database("db/sqlitedb.db");
const Gpio = require("onoff").Gpio;
var APIEndpoint = "http://localhost:4000/api/";
//Get devices
router.get("/api", function(req, res) {
  processData(res, "SELECT * FROM gpiolist");
});

router.get("/api/id/:id", function(req, res) {
  processData(res, "SELECT * FROM gpiolist where id == " + req.params.id);
});

//Add Device
router.post("/api", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  var pin = req.body.pin;
  var name = req.body.name;
  var type = req.body.type;
  var description = req.body.description;
  var value = req.body.value;

  var sql = `insert into gpiolist (name, description,pin, type, value)
      VALUES
      (?,?,?, ?, ?);`;

  var values = [name, description, pin, type, value];

  db.serialize(function() {
    db.run(sql, values, function(err) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else res.send();
    });
  });
});

function processData(res, sql) {
  db.serialize(function() {
    db.all(sql, function(err, rows) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else sendData(res, rows, err);
    });
  });
}

function sendData(res, data, err) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (data[0]) res.send(data);
  else {
    res.status(404).send("Device not found");
  }
}

//Delete Device
router.delete("/api/delete/", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var name = req.params.name;
  if (!name) {
    res.status(400).send("Name is mandatory");
  } else {
    var sql = `delete from  gpiolist where name = ?;`;
    var values = [name];

    db.serialize(function() {
      db.run(sql, values, function(err) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else res.send();
      });
    });
  }
});

//Update device
router.put("/api/id/:id", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  var pin = req.body.pin;
  var description = req.body.description;
  var name = req.body.name;
  var value = req.body.value;
  var id = req.params.id;

  var sql = `update gpiolist
              set pin = ?, description = ?, name = ?, value = ?
              where id = ?;`;

  var values = [pin, description, name, value, id];

  db.serialize(function() {
    db.run(sql, values, function(err) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else res.send();
    });
  });
});

// GPIO high
router.post("/api/on/:id", function(req, res) {
  request(APIEndpoint, { json: true }, (err, res, gpiodata) => {
    if (err) {
      return console.log(err);
    }
    const led = new Gpio(gpiodata[req.params.id].pin, "out");
    led.writeSync(1);
  });
  res.sendStatus(200);
});

//GPIO Low

router.post("/api/off/:id", function(req, res) {
  request(APIEndpoint, { json: true }, (err, res, gpiodata) => {
    if (err) {
      return console.log(err);
    }
    const led = new Gpio(gpiodata[req.params.id].pin, "out");
    led.writeSync(0);
  });
  res.sendStatus(200);
});

module.exports = router;
