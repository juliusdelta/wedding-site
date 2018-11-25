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
// cron.schedule('30 19 25 11 0', () => {
//   console.log('INITIAL INVITE CRON STARTING');
//   const message = "Jonathan Gonzales and Julie Morrison would like to invite you to their wedding on January 12th at Hidden Pines Chapel in Hurst, Texas. Click here to make your reservation: https://gonzaleswedding.com/" 
//   db.query.persons({ where: { reserved: false } }, `
//   { 
//     phoneNumber
//   }
//   `).then(record => {
//     record.forEach(record => {
//       sendMessage(record.phoneNumber, message)
//     });
//   });
//   console.log('INITIAL INVITE CRON ENDING');
// })

// cron.schedule('30 19 2 12 0', () => {
//   console.log('REMINDER INVITE CRON STARTING');
//   const message = "Reminder to RSVP to Jonathan & Julie's wedding! Click here: https://gonzaleswedding.com" 
//   db.query.persons({ where: { reserved: false } }, `
//   { 
//     phoneNumber
//   }
//   `).then(record => {
//     record.forEach(record => {
//       sendMessage(record.phoneNumber, message)
//     });
//   });
//   console.log('REMINDER INVITE CRON ENDING');
// })

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  }
}, deets => {
  console.log(`Server is now running on port http://localhost:${deets.port}`);
});
