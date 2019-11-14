var express = require("express");
var reload = require("reload");
var app = express();

// var dataFile = require('./data/data.json');
// var io = require('socket.io')();

app.set("port", process.env.PORT || 3000);
// app.set('appData', dataFile);
app.set("view engine", "ejs");
app.set("views", "views");
var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("db/sqlitedb.db");
var bodyParser = require("body-parser");

var fs = require("fs");
var sqlSchema = fs.readFileSync("db/gpio-config.sql").toString();

db.serialize(function() {
  db.run(sqlSchema);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("./routes/api"));
app.use(require("./routes/routes"));
app.use(require("./routes/users"));

// app.use(require('./routes/routes'));
app.use(express.static(__dirname + "/public"));
app.get("/", function(req, res, next) {
  if (req.accepts("html")) {
    res.render("login");
  } else {
    res.send("Welcome to Riyasaa's data river project");
  }
});
// app.locals.siteTitle = 'Roux Meetups';
// app.locals.allSpeakers = dataFile.speakers;

// app.use(express.static('app/public'));
// app.use(require('./routes/index'));
// app.use(require('./routes/speakers'));
// app.use(require('./routes/feedback'));
// app.use(require('./routes/api'));
// app.use(require('./routes/chat'));

var server = app.listen(app.get("port"), function() {
  console.log("Listening on port " + app.get("port"));
});

// io.attach(server);
// io.on('connection', function(socket) {
//   socket.on('postMessage', function(data) {
//     io.emit('updateMessages', data);
//   });
// });

reload(app);
