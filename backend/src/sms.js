require('dotenv').config({ path: '.env' });
const smsClient= require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

function sendMessage(phone, message) {
  smsClient.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone
  }).then(message => console.log(message.sid))
  .done();
}

exports.sendMessage = sendMessage;
