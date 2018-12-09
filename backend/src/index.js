require('dotenv').config({ path: '.env' });
const createServer = require('./createServer');
const db = require('./db');
const cron = require('node-cron');
const { sendMessage } = require( './sms');

const server = createServer();

server.express.post('/sms', (req, res) => {
  console.log('that worked');
});

// CRON JOBS
/*
# ┌────────────── second (optional)
# │ ┌──────────── minute
# │ │ ┌────────── hour
# │ │ │ ┌──────── day of month
# │ │ │ │ ┌────── month
# │ │ │ │ │ ┌──── day of week
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * *
*/

cron.schedule('00 30 21 26 11 *', () => {
  console.log("Sending Test Message");
  sendMessage('8177347453', 'This is a test text with the cron job');
}, {
  timezone: "America/Chicago"
});

cron.schedule('00 30 15 27 11 *', () => {
  console.log('====================================INITIAL INVITE CRON STARTING ====================================');
  const message = "Jonathan Gonzales and Julie Morrison would like to invite you to their wedding on January 12th at Hidden Pines Chapel in Hurst, Texas. Click here to make your reservation: www.gonzaleswedding.com"
  db.query.persons({ where: { reserved: false, submitted: false, phoneNumber_not: "", optedOut: false } }, `
  { 
    phoneNumber
  }
  `).then(record => {
      record.forEach(record => {
        console.log('Sending message to: ' + record.phoneNumber);
        sendMessage(record.phoneNumber, message)
      });
    });
  sendMessage('8177267945', "Your invites have been sent! www.gonzaleswedding.com");
  sendMessage('8177347453', "Your invites have been sent! www.gonzaleswedding.com");
  console.log('====================================INITIAL INVITE CRON ENDING ====================================');
}, {
  timezone: "America/Chicago"
});

cron.schedule('00 30 15 10 12 *', () => {
  console.log('====================================REMINDER CRON STARTING ====================================');
  const message = "Reminder to make your reservation at for Jonathan Gonzales and Julie Morrison's wedding! Click here to make your reservation: www.gonzaleswedding.com"
  db.query.persons({ where: { reserved: false, submitted: false, phoneNumber_not: "", optedOut: false } }, `
  { 
    phoneNumber
  }
  `).then(record => {
      record.forEach(record => {
        console.log('Sending message to: ' + record.phoneNumber);
        sendMessage(record.phoneNumber, message)
      });
    });
  sendMessage('8177347453', "Your reminders have been sent! www.gonzaleswedding.com");
  console.log('====================================REMINDER CRON ENDING ====================================');
}, {
  timezone: "America/Chicago"
});

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, deets => {
  console.log(`Server is now running on port http://localhost:${deets.port}`);
});
