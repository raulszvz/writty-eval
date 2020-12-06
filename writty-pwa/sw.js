const cacheName = "writty";
const filesToCache = [
    "/",
    "/index.html",
    "./js/writty.js",
    "./js/writtyautosave.js",
    "./css/writty.css",
    "./icons/writtybottom.svg"
];

self.addEventListener("install", event => {
    console.log("[ServiceWorker**] - Install");
    event.waitUntil(
        caches.open(cacheName)
          .then(cache => {
            console.log("[ServiceWorker**] - Caching app shell");
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );
});