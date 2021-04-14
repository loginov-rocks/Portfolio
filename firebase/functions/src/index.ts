import { AssetType } from '@loginov-rocks/portfolio-shared';
import cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { IexAssetProvider } from 'AssetProvider/IexAssetProvider/IexAssetProvider';
import * as C from 'Constants';
import { CreateAsset } from 'CreateAsset/CreateAsset';
import { CreateAssetRequest } from 'CreateAsset/CreateAssetRequest';
import { CreateAssetResponse } from 'CreateAsset/CreateAssetResponse';
import { wrapHttpFunction } from 'Http/wrapHttpFunction';
import { RatesProvider } from 'RatesProvider/RatesProvider';
import { UpdateAssetsFinancials } from 'UpdateAssetsFinancials/UpdateAssetsFinancials';
import { UpdateAssetsLogos } from 'UpdateAssetsLogos/UpdateAssetsLogos';
import { UpdateAssetsPalettes } from 'UpdateAssetsPalettes/UpdateAssetsPalettes';
import { UpdateRates } from 'UpdateRates/UpdateRates';
import { vibrantPalette as vibrantPaletteFunction } from 'vibrantPalette/vibrantPalette';

// Bootstrap.
admin.initializeApp(functions.config().firebase);

const assetsLogosBucket = admin.storage().bucket(C.ASSETS_LOGOS_BUCKET);
const assetsPalettesBucket = admin.storage().bucket(C.ASSETS_PALETTES_BUCKET);
const ratesBucket = admin.storage().bucket(C.RATES_BUCKET);
const corsHandler = cors({ origin: true });
const firestore = admin.firestore();
const { logger } = functions;

// Build asset providers map.
const assetProviders = new Map();
assetProviders.set(AssetType.stock, new IexAssetProvider({
  baseUrl: C.IEX_ASSET_PROVIDER_BASE_URL,
  secretToken: functions.config().iex.secret,
}));

// Configure rates provider.
const ratesProvider = new RatesProvider({
  baseCurrency: C.RATES_PROVIDER_BASE_CURRENCY,
  baseUrl: C.RATES_PROVIDER_BASE_URL,
});

// CreateAsset.
const createAssetFunction = new CreateAsset({
  assetProviders,
  firestore,
});

const createAsset = functions.https.onRequest((req, res) => (
  corsHandler(req, res, () => (
    wrapHttpFunction<CreateAssetRequest, CreateAssetResponse>(
      (request) => createAssetFunction.onRequest(request),
      logger,
    )(req, res)
  ))
));

// UpdateAssetsFinancials.
const updateAssetsFinancialsFunction = new UpdateAssetsFinancials({
  assetProviders,
  delay: C.UPDATE_ASSETS_FINANCIALS_DELAY,
  firestore,
  limit: C.UPDATE_ASSETS_FINANCIALS_LIMIT,
  logger,
});

const updateAssetsFinancials = functions.pubsub
  .schedule(C.UPDATE_ASSETS_FINANCIALS_SCHEDULE)
  .onRun(() => updateAssetsFinancialsFunction.onRun());

// UpdateAssetsLogos.
const updateAssetsLogosFunction = new UpdateAssetsLogos({
  assetProviders,
  bucket: assetsLogosBucket,
  delay: C.UPDATE_ASSETS_LOGOS_DELAY,
  firestore,
  limit: C.UPDATE_ASSETS_LOGOS_LIMIT,
  logger,
  storageBaseUrl: C.STORAGE_BASE_URL,
  storagePrefix: C.ASSETS_LOGOS_STORAGE_PREFIX,
});

const updateAssetsLogos = functions.pubsub
  .schedule(C.UPDATE_ASSETS_LOGOS_SCHEDULE)
  .onRun(() => updateAssetsLogosFunction.onRun());

// UpdateAssetsPalettes.
const updateAssetsPalettesFunction = new UpdateAssetsPalettes({
  bucket: assetsPalettesBucket,
  firestore,
  logger,
  logosStoragePrefix: C.ASSETS_LOGOS_STORAGE_PREFIX,
  storageBaseUrl: C.STORAGE_BASE_URL,
  storagePrefix: C.ASSETS_PALETTES_STORAGE_PREFIX,
});

const updateAssetsPalettes = functions.storage
  .bucket(C.ASSETS_LOGOS_BUCKET)
  .object()
  .onFinalize((object) => updateAssetsPalettesFunction.onFinalize(object));

// UpdateRates.
const updateRatesFunction = new UpdateRates({
  bucket: ratesBucket,
  logger,
  ratesProvider,
  storagePath: C.RATES_STORAGE_PATH,
});

const updateRates = functions.pubsub
  .schedule(C.UPDATE_RATES_SCHEDULE)
  .onRun(() => updateRatesFunction.onRun());

// TODO: Deprecated, remove as migrating to the new architecture.
const vibrantPalette = functions.https.onRequest((req, res) => (
  corsHandler(req, res, () => {
    vibrantPaletteFunction(req)
      .then((palette) => {
        res.send(palette);
      });
  })
));

export {
  createAsset,
  updateAssetsFinancials,
  updateAssetsLogos,
  updateAssetsPalettes,
  updateRates,
  vibrantPalette,
};
