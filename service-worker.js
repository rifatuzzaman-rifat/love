const CACHE_NAME = "my-webapp-cache-v1";
const urlsToCache = [
    "/",
    "/love/index.html",
    "/love/app.js",
    "/love/style.css",
    "/love/test.jpeg",
    "/love/icon-192x192.png"
    "/love/icon-512x512.png"// Replace with your image paths
    "/love/bensound-romantic.mp3", // Replace with your music paths
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Dancing+Script:wght@400;700&display=swap",
];

// Install service worker and cache files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate service worker and clean old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch files from cache or network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
