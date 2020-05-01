[portfolio-firebase](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### Variables

* [app](_index_.md#const-app)
* [corsHandler](_index_.md#const-corshandler)
* [db](_index_.md#const-db)
* [dialogflowFirebaseFulfillment](_index_.md#const-dialogflowfirebasefulfillment)
* [updateStock](_index_.md#const-updatestock)
* [vibrantPalette](_index_.md#const-vibrantpalette)

## Variables

### `Const` app

• **app**: *OmniHandler & BaseApp‹› & DialogflowApp‹unknown, unknown, Contexts, DialogflowConversation‹unknown, unknown, Contexts››* = dialogflow({ debug: true })

*Defined in [src/index.ts:17](https://github.com/loginov-rocks/Portfolio-Firebase/blob/54f5d10/functions/src/index.ts#L17)*

___

### `Const` corsHandler

• **corsHandler**: *RequestHandler‹ParamsDictionary, any, any, Query›* = cors({ origin: true })

*Defined in [src/index.ts:14](https://github.com/loginov-rocks/Portfolio-Firebase/blob/54f5d10/functions/src/index.ts#L14)*

___

### `Const` db

• **db**: *Firestore‹›* = admin.firestore()

*Defined in [src/index.ts:12](https://github.com/loginov-rocks/Portfolio-Firebase/blob/54f5d10/functions/src/index.ts#L12)*

___

### `Const` dialogflowFirebaseFulfillment

• **dialogflowFirebaseFulfillment**: *TriggerAnnotated & function* = functions.https.onRequest(app)

*Defined in [src/index.ts:29](https://github.com/loginov-rocks/Portfolio-Firebase/blob/54f5d10/functions/src/index.ts#L29)*

___

### `Const` updateStock

• **updateStock**: *TriggerAnnotated & function* = functions.https.onRequest((req, res) => {
  updateStockHandler(db, req).then(response => {
    res.send(response);
  });
})

*Defined in [src/index.ts:31](https://github.com/loginov-rocks/Portfolio-Firebase/blob/54f5d10/functions/src/index.ts#L31)*

___

### `Const` vibrantPalette

• **vibrantPalette**: *TriggerAnnotated & function* = functions.https.onRequest((req, res) => corsHandler(req, res, () => {
  vibrantPaletteHandler(req).then(palette => {
    res.send(palette);
  });
}))

*Defined in [src/index.ts:37](https://github.com/loginov-rocks/Portfolio-Firebase/blob/54f5d10/functions/src/index.ts#L37)*
