const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

exports.callSingleUser = (req, res) => {
    var token = req.body.token;
    var roomName = req.body.roomName;
    console.log("Token is: " + token);
    console.log("Room is: " + roomName);
  };

  