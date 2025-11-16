const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('authorization') || req.header('x-auth-token');

  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const realToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    const decoded = jwt.verify(realToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};