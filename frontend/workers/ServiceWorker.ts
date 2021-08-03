/// <reference lib="webworker" />

import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { skipWaiting, clientsClaim } from 'workbox-core';

skipWaiting();
clientsClaim();

const precacheManifest = [].concat(self['__WB_MANIFEST'] || []);
console.log('precacheManifest', precacheManifest)
precacheAndRoute(precacheManifest);

const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler, {
  denylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
});
registerRoute(navigationRoute);

console.log('Working....')