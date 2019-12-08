const CACHE_NAME = "Updatebola";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/detail.html",
  "/pages/klasemen.html",
  "/pages/jadwal.html",
  "/pages/favorit.html",
  "/css/materialize.min.css",
  "/js/api.js",
  "/js/materialize.min.js",
  "/js/nav.js"
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