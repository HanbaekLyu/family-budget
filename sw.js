// Service worker for the Family Card & Benefits Tracker.
// Enables offline loading and lets the app be "installed" (added to home screen),
// which is what allows notifications to show even when the tab isn't in focus.
const CACHE = 'card-tracker-v1';
const ASSETS = ['./credit-card-tracker.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // network-first for the HTML so updates land; cache fallback when offline
  if (e.request.mode === 'navigate' || e.request.url.includes('credit-card-tracker.html')) {
    e.respondWith(fetch(e.request).catch(() => caches.match('./credit-card-tracker.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

// Allows the page to trigger a notification through the SW (shows even if tab is unfocused).
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'notify') {
    self.registration.showNotification(e.data.title || 'Card Tracker', {
      body: e.data.body || '',
      tag: e.data.tag || undefined,
      icon: './icon.png'
    });
  }
});