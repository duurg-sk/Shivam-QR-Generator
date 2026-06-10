const CACHE_NAME = 'shivam-qr-v2';
const ASSETS = [
  './',
  './QR_code_generator.html',
  './manifest.json',
  'https://images.unsplash.com/photo-1634973357973-f2ed255753e1?w=192&h=192&fit=crop&q=80',
  'https://images.unsplash.com/photo-1634973357973-f2ed255753e1?w=512&h=512&fit=crop&q=80',
  'https://cdn.jsdelivr.net/npm/qr-code-styling@1.5.0/lib/qr-code-styling.js'
];

// Install Lifecycle Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Lifecycle Event
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Interceptor
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
