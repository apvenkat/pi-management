const jwt = require("jsonwebtoken");
var secret = "This is the secret for signing tokens";

module.exports = function(req, res, next) {
  const authorizationHeaader = req.headers.authorization;
  //

  if (authorizationHeaader) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send("Access denied. No JWT provided.");
    }
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid JWT.");
  }
};
