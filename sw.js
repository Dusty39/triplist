// Service Worker for TripList PWA
const CACHE_NAME = 'triplist-v7';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './items-database.js',
    './translations.js',
    './icon-192.png',
    './icon-512.png'
];

// Install event - cache files
self.addEventListener('install', event => {
    // Force this service worker to become the active one, bypassing the waiting state
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Force the service worker to take control of all clients immediately
            return self.clients.claim();
        })
    );
});
