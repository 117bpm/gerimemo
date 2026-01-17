const CACHE_NAME='memo-app-cache-v1';
const urlsToCache=['memo.html','manifest.json','icon.png'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache)));
});

self.addEventListener('fetch',event=>{
  event.respondWith(caches.match(event.request).then(resp=>resp||fetch(event.request)));
});
