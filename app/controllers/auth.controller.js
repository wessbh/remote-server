const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    firebase_token: req.body.firebase_token
  });

  user.save(err => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({
      status: 'success',
      code: 200,
      message: "User was registered successfully!"
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({
          status: 404,
          message: "User Not found."
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          status: 401,
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        status: 'success',
        code: 200,
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken: token,
          firebase_token: user.firebase_token
        }
      });
    });
};