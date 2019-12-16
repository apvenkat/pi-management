const jwt = require("jsonwebtoken");
var secret = "This is the secret for signing tokens";

module.exports = function(req, res, next) {
  res.setHeader("Authorization", "Bearer" + req.cookies.token);
  const authorizationheader = req.headers("authorization");
  console.log(authorizationheader);
  const token = authorizationheader.split(" ")[1];
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
