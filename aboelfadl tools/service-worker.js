const CACHE_NAME = 'aboelfadl-tools-v1'; // قم بتغيير رقم الإصدار إذا قمت بتحديث ملفات الـ PWA
const urlsToCache = [
  '/index.html',
  '/temp_mail_visa.html',
  '/vodafone_cash.html',
  '/calculator.html',
  '/profile_links.html',
  '/qr_generator.html',
  '/social_media_links.html',
  '/fake_reward_form.html',
  '/fake_facebook_login.html',
  '/image_editor.html', // <--- تم إضافة هذا السطر الجديد
  // أضف هنا أي ملفات CSS أو JavaScript إضافية إذا كانت منفصلة عن ملفات الـ HTML
  // `/css/style.css`,
  // `/js/script.js`,
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/maskable_icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
