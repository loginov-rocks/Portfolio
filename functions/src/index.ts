// Import the Dialogflow module from the Actions on Google client library.
import { dialogflow } from 'actions-on-google';
import cors from 'cors';
import * as admin from 'firebase-admin';
// Import the firebase-functions package for deployment.
import * as functions from 'firebase-functions';

import getSymbolsHandler from './handlers/getSymbols';
import updateImagesHandler from './handlers/updateImages';
import updateQuotesHandler from './handlers/updateQuotes';

import vibrantPaletteHandler from './handlers/vibrantPalette';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const corsHandler = cors({ origin: true });

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
const dialogflowFirebaseFulfillment = functions.https.onRequest(app);

// TODO: Remove CORS, check auth.
const getSymbols = functions.https.onRequest((req, res) => corsHandler(req, res, () => {
  getSymbolsHandler().then(response => {
    res.send(response);
  });
}));

// TODO: Remove CORS, check auth.
const updateImages = functions.https.onRequest((req, res) => corsHandler(req, res, () => {
  updateImagesHandler().then(() => {
    res.status(204).send();
  });
}));

// TODO: Remove CORS, check auth.
const updateQuotes = functions.https.onRequest((req, res) => corsHandler(req, res, () => {
  updateQuotesHandler(db, req).then(() => {
    res.status(204).send();
  });
}));

const vibrantPalette = functions.https.onRequest((req, res) => corsHandler(req, res, () => {
  vibrantPaletteHandler(req).then(palette => {
    res.send(palette);
  });
}));

export {
  dialogflowFirebaseFulfillment,
  getSymbols,
  updateImages,
  updateQuotes,
  vibrantPalette,
};
