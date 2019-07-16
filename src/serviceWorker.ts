/* eslint-disable no-restricted-globals */

self.addEventListener('install', event => {
  // @ts-ignore
  event.waitUntil(caches.open('static-cache').then(cache => cache.addAll(['index.html'])));
});

self.addEventListener('fetch', event => {
  // @ts-ignore
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
