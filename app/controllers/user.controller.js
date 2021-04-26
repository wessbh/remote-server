const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
var jwt = require("jsonwebtoken");
var crypto = require("crypto");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
exports.roomName = (req, res) => {
  let randomString = crypto.randomBytes(8).toString('hex');
  res.status(200).send({
    status: 'success',
    code: 200,
    data: randomString
  });
};


exports.updateUserToken = (req, res) => {
  var id = req.body.id;
  var newToken = req.body.token;

  var criteria = { _id: id }
  var newValue = { firebase_token: newToken }

  User.updateOne(criteria, newValue, function (err, res) {
    if (err)
      throw err;
  })
  res.status(200).send({ message: "Token updated successfully" });
}
exports.allUsers = (req, res) => {
  User.find({}, function (err, users) {
    const token = req.headers.authorization;
    var usersList = new Array();
    User.findOne({ _id: getUser(token) }).then(function (userDb) {
      users.forEach(user => {
        if (user._id.toString() != userDb._id.toString()) {
          usersList.push(user)
        }
      })
      res.status(200).send({
        status: 'success',
        code: 200,
        data: {
          usersList
        }
      }
      );
    });
  });
};
function getUser(token) {
  try {
    var decoded = jwt.verify(token, config.secret);
    return decoded.id;

  } catch (e) {
    return "";
  }
}
exports.idFromToken = (req, res) => {
  const token = req.headers.authorization;
  User.findOne({ _id: this.getUser(token) }).then(function (userDb) {
    res.status(200).send({ user: userDb })
  });
}
