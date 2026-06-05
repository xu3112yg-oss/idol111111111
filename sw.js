const CACHE = "idol-v1";
const FILES = [
  "./index.html",
  "./styles.css",
  "./script.js",
  "./icon.svg",
  "./manifest.json",
];

// 安装：预缓存核心文件
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(FILES))
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 请求：缓存优先，网络回退
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
