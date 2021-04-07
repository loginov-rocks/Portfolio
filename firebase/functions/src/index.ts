// Import the Dialogflow module from the Actions on Google client library.
import { dialogflow } from 'actions-on-google';
import cors from 'cors';
import admin from 'firebase-admin';
// Import the firebase-functions package for deployment.
import * as functions from 'firebase-functions';

import { AggregateStocksSymbols } from 'AggregateStocksSymbols/AggregateStocksSymbols';
import { AssetType } from 'AssetProvider/AssetType';
import { IexAssetProvider } from 'AssetProvider/IexAssetProvider/IexAssetProvider';
import * as C from 'Constants';
import { GetOutdated } from 'GetOutdated/GetOutdated';
import vibrantPaletteHandler from 'Handlers/vibrantPalette';
import { UpdateAssetsFinancials } from 'UpdateAssetsFinancials/UpdateAssetsFinancials';
import { UpdateAssetsLogos } from 'UpdateAssetsLogos/UpdateAssetsLogos';
import { UpdateAssetsPalettes } from 'UpdateAssetsPalettes/UpdateAssetsPalettes';
import { UpdateLogos } from 'UpdateLogos/UpdateLogos';
import { UpdateQuotes } from 'UpdateQuotes/UpdateQuotes';

admin.initializeApp(functions.config().firebase);

const assetsLogosBucket = admin.storage().bucket(C.ASSETS_LOGOS_BUCKET);
const assetsPalettesBucket = admin.storage().bucket(C.ASSETS_PALETTES_BUCKET);
const firestore = admin.firestore();
const { logger } = functions;

const aggregateStocksSymbolsFunction = new AggregateStocksSymbols({
  firestore,
  pattern: C.AGGREGATE_STOCKS_SYMBOLS_PATTERN,
});

const getOutdatedFunction = new GetOutdated({
  firestore,
  logosDelay: C.GET_OUTDATED_LOGOS_DELAY,
  quotesDelay: C.GET_OUTDATED_QUOTES_DELAY,
});

const iexAssetProvider = new IexAssetProvider({
  baseUrl: C.IEX_ASSET_PROVIDER_BASE_URL,
  secretToken: functions.config().iex.secret,
});

const assetProviders = new Map();
assetProviders.set(AssetType.stock, iexAssetProvider);

const updateAssetsFinancialsFunction = new UpdateAssetsFinancials({
  assetProviders,
  delay: C.GET_OUTDATED_QUOTES_DELAY,
  firestore,
  limit: C.UPDATE_ASSETS_FINANCIALS_LIMIT,
  logger,
});

const updateAssetsLogosFunction = new UpdateAssetsLogos({
  assetProviders,
  bucket: assetsLogosBucket,
  delay: C.GET_OUTDATED_LOGOS_DELAY,
  firestore,
  limit: C.UPDATE_ASSETS_LOGOS_LIMIT,
  logger,
  storageBaseUrl: C.STORAGE_BASE_URL,
  storagePrefix: C.ASSETS_LOGOS_STORAGE_PREFIX,
});

const updateAssetsPalettesFunction = new UpdateAssetsPalettes({
  bucket: assetsPalettesBucket,
  firestore,
  logger,
  logosStoragePrefix: C.ASSETS_LOGOS_STORAGE_PREFIX,
  storageBaseUrl: C.STORAGE_BASE_URL,
  storagePrefix: C.ASSETS_PALETTES_STORAGE_PREFIX,
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

  return getOutdatedFunction.get().then((response) => {
    res.send(response);
  });
}));

const updateAssetsFinancials = functions.pubsub
  .schedule(C.UPDATE_ASSETS_FINANCIALS_SCHEDULE)
  .onRun(() => updateAssetsFinancialsFunction.onRun());

const updateAssetsLogos = functions.pubsub
  .schedule(C.UPDATE_ASSETS_LOGOS_SCHEDULE)
  .onRun(() => updateAssetsLogosFunction.onRun());

const updateAssetsPalettes = functions.storage
  .bucket(C.ASSETS_LOGOS_BUCKET)
  .object()
  .onFinalize((object) => updateAssetsPalettesFunction.onFinalize(object));

// TODO: Remove CORS, check auth.
const updateLogos = functions.https.onRequest((req, res) => corsHandler(req, res, () => {
  if (req.method !== 'PATCH') {
    return res.status(405).send();
  }

  return updateLogosFunction.patch(req.headers, req.rawBody).then((response) => {
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
  vibrantPaletteHandler(req).then((palette) => {
    res.send(palette);
  });
}));

export {
  // aggregateStocksSymbolsOnCreate,
  // aggregateStocksSymbolsOnUpdate,
  // dialogflowFirebaseFulfillment,
  // getOutdated,
  updateAssetsFinancials,
  updateAssetsLogos,
  updateAssetsPalettes,
  // updateLogos,
  // updateQuotes,
  vibrantPalette,
};
