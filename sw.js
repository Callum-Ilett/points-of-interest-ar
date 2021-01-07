const CACHE_NAME = "V1";

const urlsToCache = [
  "/index.html",
  "/assets/images/beer-icon.png",
  "/assets/images/coffee-icon.png",
  "/assets/images/pub-icon.png",
  "/assets/images/restaurant-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", () => self.clients.claim());

self.addEventListener("fetch", function (event) {
  event.respondWith(
    (async function () {
      const cache = await caches.open(CACHE_NAME);
      const cachedFiles = await cache.match(event.request);
      if (cachedFiles) {
        return cachedFiles;
      } else {
        try {
          const response = await fetch(event.request);
          await cache.put(event.request, response.clone());
          return response;
        } catch (e) {
          console.log(e);
        }
      }
    })()
  );
});
