
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('static')
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell...');
        return cache.addAll([
          '/',
          '/index.html',
          '/about/index.html',
          '/css/fonts.css',
          '/css/main.css',
          '/js/math-code.js',
          '/fonts/lato-v11-latin-regular.woff',
          '/fonts/lato-v11-latin-regular.woff2',
          '/fonts/merriweather-v13-latin-regular.woff',
          '/fonts/merriweather-v13-latin-regular.woff2',
          '/favicon.ico',
          '/images/logo_pfc.png',
          '/images/hugo-logo.png',
          '/about/'            
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request);
        }
      })
  );
});