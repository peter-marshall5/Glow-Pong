const cacheName = 'pong-01'
const cachedFiles = [
  '/',
  '/index.html',
  '/bot.js',
  '/button.js',
  '/color.js',
  '/controls.js',
  '/coordinates.js',
  '/game.js',
  '/graphics.js',
  '/sound.js',
  '/sprite.js',
  '/sw.js'
]

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(cachedFiles);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
