let idbPromise = idb.open('BolaDB', 1, upgradedDb => {
  if (!upgradedDb.objectStoreNames.contains('playerFav')) {
    upgradedDb.createObjectStore("playerFav", {
      keyPath: "id"
    });
  }
});

function DbshowPlayerFav(){
  return new Promise((resolve, reject) => {
    idbPromise.then(db => {
      const transaction = db.transaction("playerFav", `readonly`);
      return transaction.objectStore("playerFav").getAll();
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
  return new Promise((resolve, reject) => {
      idbPromise.then(db => {
          const transaction = db.transaction("playerFav",`readwrite`);
          transaction.objectStore("playerFav").add(player);
          return transaction;
      }).then(transaction => {
          if (transaction.complete) {
            console.log('data pemain berhasi di favoritkan')
              resolve(true)
          } else {
              reject(new Error(transaction.onerror))
              console.log('data pemain gagal di favoritkan')
          }
      })
  })
};