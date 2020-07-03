const FILES_TO_CACHE = [
    "./",
    "./index.html", 
    "./assets/css/styles.css",
    "./assets/images/icons/icon-192x192.png",
    "./assets/images/icons/icon-512x512.png",
    "./service-worker.js",
    "./assets/js/db.js",
    "./assets/js/index.js",
    "./assets/js/installServiceWorker.js",
    "./manifest.webmanifest"

  ];
  
  
  const PRECACHE = "precache-v1";
  const RUNTIME = "runtime";
  
  self.addEventListener("install", event => {
    event.waitUntil(
      caches.open(PRECACHE)
        .then(cache => cache.addAll(FILES_TO_CACHE))
        .then(self.skipWaiting())
    );
  });
  
  // The activate handler takes care of cleaning up old caches.
  self.addEventListener("activate", event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
      }).then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);
        }));
      }).then(() => self.clients.claim())
    );
  });
  
  self.addEventListener("fetch", event => {
    /* if (event.request.url.startsWith(self.location.origin)) */ {
      event.respondWith(
        caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
  
          return caches.open(RUNTIME).then(cache => {
            return fetch(event.request).then(response => {
              return cache.put(event.request, response.clone()).then(() => {
                return response;
              });
            });
          });
        })
      );
    }
  });