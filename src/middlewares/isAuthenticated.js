const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isAuthenticated = (req, res, next) => {
  //
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    //
    if (err) return res.sendStatus(403);

    const { _id } = decodedToken;

    const user = await User.findOne({ _id });

    req.user = user;

    next();
  });
};

module.exports = isAuthenticated;
