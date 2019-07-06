// Import the Dialogflow module from the Actions on Google client library.
import { dialogflow } from 'actions-on-google';
// Import the firebase-functions package for deployment.
import * as functions from 'firebase-functions';

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('favorite color', (conv, { color }) => {
  // @ts-ignore
  const luckyNumber = color.length;
  // Respond with the user's lucky number and end the conversation.
  conv.close(`Your lucky number is ${luckyNumber}`);
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
