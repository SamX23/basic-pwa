const CACHE_NAME = "pwa_cache";

const urlsToCache = [
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
  "https://upload.wikimedia.org/wikipedia/en/c/c9/Pokemon-mewtwo-strikes-back.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/dd/Pok%C3%A9mon_The_Movie_2000.jpg",
  "https://upload.wikimedia.org/wikipedia/en/4/47/Pokemon-3-japanese-poster.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/37/Pokemon-4ever-poster.jpg",
  "https://upload.wikimedia.org/wikipedia/en/f/f9/Pokemon-heroes-poster-japanese.jpg",
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
