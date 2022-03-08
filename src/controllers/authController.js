const User = require("../models/User");

const { getUserByEmail } = require("./userController");
const {
  LOGIN_ERROR_MSG,
  TOKEN_ERROR_MSG,
} = require("../constants/authConstant");

let oeoe;

const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user) return res.status(400).json({ msg: LOGIN_ERROR_MSG });

  const isValidPassword = bcryptjs.compareSync(password, user.password);

  if (!isValidPassword) return res.status(400).json({ msg: LOGIN_ERROR_MSG });

  const { _id } = user;

  generateToken({ _id })
    .then((token) => res.json({ token, user }))
    .catch(() => res.status(400).json({ msg: TOKEN_ERROR_MSG }));
};

const generateToken = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      { ...payload },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) reject(null);
        resolve(token);
      }
    );
  });

module.exports = { login, generateToken };
