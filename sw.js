/* 入口页的离线缓存。
   应用清单是静态的（六个卡片写死在 index.html 里），那些 app 各有自己的 SW，
   这里只管入口页自己的资源。

   ⚠️ 换了卡片图标/配色后必须把这个版本号 +1：
   静态资源是缓存优先，不升版本的话已经打开过的人会一直看旧图。 */
var CACHE = 'apps-home-v3';

var ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/favicon.png',
  './icons/apple-touch-icon.png',
  './icons/launcher-192.png',
  './icons/launcher-512.png',
  './icons/chishenme.png',
  './icons/jianchi.png',
  './icons/digital-shelf.png',
  './icons/lazy-ledger.png',
  './icons/xiongji.png',
  './icons/motion-catalog.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(ASSETS);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) {
        /* 只清自己前缀的缓存。不能写成"清掉所有非当前版本"——
           六个 app 部署在同一个域的不同子目录，那样会把兄弟 app 的缓存一起删掉。 */
        return k.indexOf('apps-home-') === 0 && k !== CACHE;
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* 导航请求：网络优先，离线回退到缓存里的入口页 */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put('./index.html', copy); });
        return res;
      }).catch(function () {
        return caches.match('./index.html');
      })
    );
    return;
  }

  /* 静态资源：缓存优先，回源后补进缓存 */
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
