// Import the Dialogflow module from the Actions on Google client library.
import { dialogflow } from 'actions-on-google';
import cors from 'cors';
import * as admin from 'firebase-admin';
// Import the firebase-functions package for deployment.
import * as functions from 'firebase-functions';

import * as C from './constants';
import { AggregateStocksSymbolsFunction } from './functions/AggregateStocksSymbolsFunction';
import { GetSymbolsFunction } from './functions/GetSymbolsFunction';

import updateImagesHandler from './handlers/updateImages';
import updateQuotesHandler from './handlers/updateQuotes';

import vibrantPaletteHandler from './handlers/vibrantPalette';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const aggregateStocksSymbolsFunction = new AggregateStocksSymbolsFunction({ db });
const getSymbolsFunction = new GetSymbolsFunction({ db, delay: C.GET_SYMBOLS_DELAY });

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

const aggregateStocksSymbolsOnCreate = functions.firestore
  .document(AggregateStocksSymbolsFunction.pattern)
  .onCreate(snapshot => aggregateStocksSymbolsFunction.trigger(snapshot));

const aggregateStocksSymbolsOnUpdate = functions.firestore
  .document(AggregateStocksSymbolsFunction.pattern)
  .onUpdate(change => aggregateStocksSymbolsFunction.trigger(change.after));

// TODO: Remove CORS, check auth.
const getSymbols = functions.https.onRequest((req, res) => corsHandler(req, res, () => {
  getSymbolsFunction.trigger().then(response => {
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
  aggregateStocksSymbolsOnCreate,
  aggregateStocksSymbolsOnUpdate,
  dialogflowFirebaseFulfillment,
  getSymbols,
  updateImages,
  updateQuotes,
  vibrantPalette,
};
