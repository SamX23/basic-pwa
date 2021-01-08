const CACHE_NAME = "pwa_cache";

const urlsToCache = [
  "/",
  "https://webdev.imgix.net/images/collections/pwa.svg",
  "/maskable_icon.png",
  "/favicon.png",
  "/icon.png",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/capabilities.html",
  "/pages/developer.html",
  "/pages/about.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
];

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          return response;
        }

        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
