var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('db/sqlitedb.db');
var bodyParser = require('body-parser');
const Gpio = require('onoff').Gpio;
var fs = require('fs');
var gpiodata = require('../config/gpio-config.json');

router.get('/api', function(req, res) {
  res.json(gpiodata);
});




//Add Device
router.post('/api',function(req ,res){
  res.setHeader("Access-Control-Allow-Origin", "*");

var pin = req.body.pin;
var name = req.body.name;
var type = req.body.type;
var description = req.body.description;
var value = req.body.value;

var sql = `insert into gpiolist (name, description,pin, type, value)
      VALUES
      (?,?,?, ?, ?);`;

var values = [name,description,pin,type, value];

db.serialize(function () {
  db.run(sql, values, function (err) {
      if (err){
          console.error(err);
          res.status(500).send(err);
      }

      else
          res.send();
  });
});
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// router.post('/api', function(req, res) {
//   gpiodata.unshift(req.body);
//   fs.writeFile('config/gpio-config.json', JSON.stringify(gpiodata), 'utf8', function(err) {
//     if (err) {
//       console.log(err);
//     }
//   });
//   res.json(gpiodata);
// });
//Delete Device
router.delete('/api/delete/:id',function(req ,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
  var id=req.params.id;
  if(!id){
          res.status(400).send("ID is mandatory");
      }
      else{
      var sql = `delete from  gpiolist where id = ?;`;
      var values = [id];
  
      db.serialize(function () {
          db.run(sql, values, function (err) {
              if (err){
                  console.error(err);
                  res.status(500).send(err);
              }
              else
                  res.send();
          });
      });
  }
  });
  
  //Update device
  router.put('/api/id/:id',function(req ,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
  
    var pin = req.body.pin;
    var description = req.body.description;
        var name = req.body.name;
        var value = req.body.value;
        var id = req.params.id;
  
        var sql = `update gpiolist
                set pin = ?, description = ?, name = ?, value = ?
                where id = ?;`;
  
        var values = [pin,description, name, value, id];
  
        db.serialize(function () {
            db.run(sql, values, function (err) {
                if (err){
                    console.error(err);
                    res.status(500).send(err);
                }
                else
                    res.send();
            });
        });
  });
  

//GPIO high

router.post('/api/on/:id', function(req, res) {
  const led = new Gpio(gpiodata[req.params.id].gpio, 'out');
  led.writeSync(1);
res.sendStatus(200);

});

//GPIO low

router.post('/api/off/:id', function(req, res) {
  const led = new Gpio(gpiodata[req.params.id].gpio, 'out');
  led.writeSync(0);
res.sendStatus(200);
  
});





module.exports = router;