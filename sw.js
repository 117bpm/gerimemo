const CACHE_NAME = 'memo-app-cache-v2';
const urlsToCache = [
  '/gerimemo/memo.html',
  '/gerimemo/icon.png',
  '/gerimemo/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // ★ すぐ新しいSWを有効化
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
});

// ★ 更新検知テスト用
self.addEventListener('message', event => {
  if (event.data === 'CHECK_UPDATE') {
    event.source.postMessage('UPDATED');
  }
});
