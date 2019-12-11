const CACHE_NAME = "Updatebola";
var urlsToCache = [
  "/",
  "/yahya.png",
  "/nav.html",
  "/index.html",
  "/detail.html",
  "/pages/klasemen.html",
  "/pages/favorit.html",
  "/css/materialize.css",
  "/css/materialize.min.css",
  "/js/materialize.js",
  "/js/materialize.min.js",
  "/js/api.js",
  "/js/nav.js",
  "/js/idb.js",
  "/js/db.js",
  "/push.js",
  "/manifest.json"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

// mengambil asset 
// self.addEventListener("fetch", function(event) {
//     event.respondWith(
//       caches
//         .match(event.request, { cacheName: CACHE_NAME })
//         .then(function(response) {
//           if (response) {
//             console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
//             return response;
//           }

//           console.log(
//             "ServiceWorker: Memuat aset dari server: ",
//             event.request.url
//           );
//           return fetch(event.request);
//         })
//     );
//   });
self.addEventListener("fetch", event => {
  let base_url = "https://api.football-data.org/v2";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        const res = await fetch(event.request);
        cache.put(event.request.url, res.clone());
        return res;
      })()
    );
  } else {
    event.respondWith(
      (async () => {
        const res = await caches.match(event.request.url, {
          ignoreSearch: true
        });
        return res || (await fetch(event.request));
      })()
    );
  }
});

//hapus storage
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'push berhasil';
  }
  let options = {
    body: body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
})