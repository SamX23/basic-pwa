const CACHE_NAME = "pwa_cache";

let urlsToCache = [
  "/",
  "/favicon.png",
  "/icon.png",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/films.html",
  "/pages/videogames.html",
  "/pages/about.html",
  "/images/",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
];

self.addEventListener("install", function (event) {
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
