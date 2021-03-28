/* eslint-disable no-restricted-globals */

self.addEventListener('install', event => {
  // TODO: Fix TS.
  // @ts-ignore
  event.waitUntil(caches.open('static-cache').then(cache => cache.addAll(['index.html'])));
});

self.addEventListener('fetch', event => {
  // TODO: Fix TS.
  // @ts-ignore
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
