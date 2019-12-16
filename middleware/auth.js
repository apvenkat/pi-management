const jwt = require("jsonwebtoken");
var secret = "This is the secret for signing tokens";

module.exports = function(req, res, next) {
  if (typeof req.headers.authorization !== "string") {
    res.sendStatus(400);
    return;
  }
  if (tokens.length < 2) {
    res.sendStatus(400);
    return;
  }

  var token = tokens[1];
  console.log(token);

  if (!token) {
    return res.status(401).redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid JWT.");
  }
};
