const {TWILLIO_ACC_SID, TWILLIO_AUTH_TOKEN} = process.env;

const accountSid = TWILLIO_ACC_SID;
const authToken = TWILLIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const smsDetails = {
  body: 'message',
  from: '+19382532343',
  to: '+639082657587',
};

const sendSMS = (client: { messages: { create: (arg0: { body: any; from: any; to: any; }) => Promise<any>; }; }, smsDetails: { body: any; from: any; to: any; }) => {
  const { body, from, to } = smsDetails;

  return client.messages
    .create({
      body,
      from,
      to,
    })
    .then((message) => {
      console.log(message.sid);
      console.log('Message sent!');
      return message;
    })
    .catch((error) => {
      console.error(`Error sending SMS: ${error.message}`);
      console.log('Message not sent!');
      throw error;
    });
};

// sendSMS(client, smsDetails);

module.exports = { sendSMS };
