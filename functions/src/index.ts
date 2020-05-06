// Import the Dialogflow module from the Actions on Google client library.
import { dialogflow } from 'actions-on-google';
import cors from 'cors';
import admin from 'firebase-admin';
// Import the firebase-functions package for deployment.
import * as functions from 'firebase-functions';

import * as C from './constants';
import { AggregateStocksSymbols } from './aggregateStocksSymbols/AggregateStocksSymbols';
import { GetOutdated } from './getOutdated/GetOutdated';
import { UpdateLogos } from './updateLogos/UpdateLogos';
import { UpdateQuotes } from './updateQuotes/UpdateQuotes';

import vibrantPaletteHandler from './handlers/vibrantPalette';

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

const aggregateStocksSymbolsFunction = new AggregateStocksSymbols({
  firestore,
  pattern: C.AGGREGATE_STOCKS_SYMBOLS_PATTERN,
});

const getOutdatedFunction = new GetOutdated({
  firestore,
  logosDelay: C.GET_OUTDATED_LOGOS_DELAY,
  quotesDelay: C.GET_OUTDATED_QUOTES_DELAY,
});

const updateLogosFunction = new UpdateLogos();

const updateQuotesFunction = new UpdateQuotes({
  firestore,
});

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
  .document(aggregateStocksSymbolsFunction.getPattern())
  .onCreate(aggregateStocksSymbolsFunction.onCreate);

const aggregateStocksSymbolsOnUpdate = functions.firestore
  .document(aggregateStocksSymbolsFunction.getPattern())
  .onUpdate(aggregateStocksSymbolsFunction.onUpdate);

// TODO: Remove CORS, check auth.
const getOutdated = functions.https.onRequest((req, res) => corsHandler(req, res, () => {
  if (req.method !== 'GET') {
    return res.status(405).send();
  }

  return getOutdatedFunction.get().then(response => {
    res.send(response);
  });
}));

// TODO: Remove CORS, check auth.
const updateLogos = functions.https.onRequest((req, res) => corsHandler(req, res, () => {
  if (req.method !== 'PATCH') {
    return res.status(405).send();
  }

  return updateLogosFunction.patch(req.headers, req.rawBody).then(response => {
    // TODO: Send 204 No Content instead of response.
    res.send(response);
  });
}));

// TODO: Remove CORS, check auth.
const updateQuotes = functions.https.onRequest((req, res) => corsHandler(req, res, () => {
  if (req.method !== 'PATCH') {
    return res.status(405).send();
  }

  return updateQuotesFunction.patch(req.body).then(() => {
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
  getOutdated,
  updateLogos,
  updateQuotes,
  vibrantPalette,
};
