const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
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
exports.allUsers = (req, res) => {
  User.find({}, function (err, users) {
    usersList = users;
    res.status(200).send({
      status: 'success',
      code: 200,
      data: {
        usersList
      }
    }

    );
  });
};
exports.roomName = (req, res) => {
  let randomString = crypto.randomBytes(8).toString('hex');
  console.log("random", randomString);
  res.status(200).send({
    status: 'success',
    code: 200,
    data: randomString
  });
};
