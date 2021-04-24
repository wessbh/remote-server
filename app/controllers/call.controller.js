const config = require("../config/auth.config");
const fireBaseConfig = require("../config/firebase.config");

const db = require("../models");
const User = db.user;
var FCM = require('fcm-node');
var fcm = new FCM(fireBaseConfig.serverKey);

exports.callSingleUser = (req, res) => {
    var token = req.body.token;
    var roomName = req.body.roomName;
    var userName = req.body.username
    console.log("Token is: " + token);
    console.log("Room is: " + roomName);
    sendPushNotification(token, roomName, userName);
    res.send({ message: 'Sending push notification' })
};
function sendPushNotification(token, roomName, username) {
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: token,

        notification: {
        },

        data: {  //you can send only notification or only data(or include both)
            title: 'Call',
            body: 'You received a call from: ' + username,
            "roomName": roomName
        }
    };
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something went wrong!");
            console.log({error: err});
        } else {
            console.log('device_token: ' + token);
            console.log("Successfully sent with response: ", response);
        }
    });
}
exports.groupCall = (req, res) => {
    var userName = req.body.username;
    var roomName = req.body.roomName;
    var tokensList = req.body.tokensList;
    tokensList.forEach(token => {
    sendPushNotification(token, roomName, userName);
    });
    res.status(200).send("Group call sent");
};

