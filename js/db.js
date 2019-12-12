let idbPromise = idb.open('BolaDB', 1, upgradedDb => {
  if (!upgradedDb.objectStoreNames.contains('playerFav')) {
    upgradedDb.createObjectStore("playerFav", {
      keyPath: "id"
    });
  }
});

function DbshowPlayerFav() {
  return new Promise((resolve, reject) => {
    idbPromise.then(db => {
      const transaction = db.transaction("playerFav", `readonly`);
      return transaction.objectStore("playerFav").getAll();
      // console.log(transaction)
    }).then(data => {
      if (data !== undefined) {
        resolve(data)
      } else {
        reject(new Error("Favorite not Found"))
      }
    })
  })
};

const dbinsertfav = player => {
  const title = 'Pemain Favorit berhasil ditambah';
  const options = {
    'body': 'anda bisa melihat pemain favorit anda dihalaman favorit',
  }
  const title2 = 'Pemain Favorit gagal ditambah';
  return new Promise((resolve, reject) => {
    idbPromise.then(db => {
      const transaction = db.transaction("playerFav", `readwrite`);
      transaction.objectStore("playerFav").put(player);
      return transaction;
    }).then(transaction => {
      if (transaction.complete) {
        if (Notification.permission === 'granted') {
          navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title, options);
          })
        } else {
          console.error('FItur notifikasi tidak diijinkan.');
        }
        // console.log('data pemain berhasi di favoritkan')
        resolve(true)
      } else {
        if (Notification.permission === 'granted') {
          navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title2);
          })
        } else {
          console.error('FItur notifikasi tidak diijinkan.');
        }
        reject(new Error(transaction.onerror))
        console.log('data pemain gagal di favoritkan')
      }
    })
  })
};

const dbDeletePlayer = (id) => {
  const title = 'Pemain Favorit berhasil dihapus';
  const title2 = 'Pemain Favorit gagal dihapus';
  return new Promise((resolve, reject) => {
    idbPromise.then(db => {
      const transaction = db.transaction("playerFav", `readwrite`);
      transaction.objectStore("playerFav").delete(id);
      return transaction;
    }).then(transaction => {
      if (transaction.complete) {
        if (Notification.permission === 'granted') {
          navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title);
          })
        } else {
          console.error('FItur notifikasi tidak diijinkan.');
        }
        resolve(true)
      } else {
        if (Notification.permission === 'granted') {
          navigator.serviceWorker.ready.then(function (registration) {
            registration.showNotification(title2);
          })
        } else {
          console.error('FItur notifikasi tidak diijinkan.');
        }
        reject(new Error(transaction.onerror))
      }
    })
  })

}