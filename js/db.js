// // let db;
// // let dbReq = indexedDB.open('Updatebola', 1);
// // dbReq.onupgradeneeded = function(event) {
// //   db = event.target.result;
// //   let bola = db.createObjectStore('Db_Bola', {autoIncrement: true});
// // }
// // dbReq.onsuccess = function(event) {
// //   db = event.target.result;
// // }
// // dbReq.onerror = function(event) {
// //   alert('error opening database ' + event.target.errorCode);
// // }
// // function buatDB() {
// //   let dbReq = indexedDB.open('Updatebola', 1);
// //   dbReq.onupgradeneeded = function (e) {
// //     let db;
// //     let bola;
// //     db = event.target.result;
// //     bola = db.createObjectStore('Db_Bola', {
// //       keyPath: "id"
// //     });
// //   }
// // }
// // buatDB();
// const dbReq = indexedDB.open('Updatebola', 1, upgradedDb => {
//   if (!upgradedDb.objectStoreNames.contains('Db_Bola')) {
//       upgradedDb.createObjectStore("Db_Bola", {keyPath: "id"});
//   }
// });


// const dbInsertFav = pemain => {
//   return new Promise((resolve, reject) => {
//     dbReq.then(db => {
//       const transaction = db.transaction("Db_Bola", `readwrite`);
//       transaction.objectStore("Db_Bola").add(pemain);
//       return transaction;
//     }).then(transaction => {
//       if (transaction.complete) {
//         resolve(true)
//       } else {
//         reject(new Error(transaction.onerror))
//       }
//     })
//   })
// }

// const dbShowPlayer = Db_Bola => {
//   return new Promise((resolve, reject) => {
//     dbReq.then(db => {
//       const transaction = db.transaction("Db_Bola", `readonly`);
//       return transaction.objectStore("Db_Bola").getAll();
//     }).then(data => {
//       if (data !== undefined) {
//         resolve(data)
//       } else {
//         reject(new Error("Pemain favorit tidak ditemukan"))
//       }
//     })
//   })
// }
// // function checkData(storeName, id) {
// //   return new Promise(function(resolve, reject) {
// //     db(idb)
// //       .then(function(db) {
// //         var tx = db.transaction(storeName, "readonly");
// //         var store = tx.objectStore(storeName);
// //         return store.get(id);
// //       })
// //       .then(function(data) {
// //         if (data !== undefined) {
// //           resolve("data favorit");
// //         } else {
// //           reject("bukan data favorit");
// //         }
// //       });
// //   });
// // }

// function showPlayerFav() {
//   dbShowPlayer().then(Db_Bola => {
//     let listPlayer = "";
//     Db_Bola.forEach(pemain => {
//       listPlayer +=
//         `
//           <tr>
//        <td>${pemain.id}</td>
//        <td>${pemain.name}</td>
//        <td>${pemain.position}</td>
//        <td>${pemain.dateOfBirth}</td>
//        <td>${pemain.countryOfBirth}</td>
//        <td>${pemain.nationality}</td>
//        <td>${pemain.role}</td>
//        <td><button id="${pemain.id}" class="removeButton">Remove</button></td>
//      </tr>
//           `
//     })
//     document.getElementById("playerFav").innerHTML = listPlayer
//   })
// }
// let idb;
let idbPromise = idb.open('BolaDB', 1, upgradedDb => {
  if (!upgradedDb.objectStoreNames.contains('playerFav')) {
    upgradedDb.createObjectStore("playerFav", {
      keyPath: "playerId"
    });
  }
});

const DbshowPlayerFav = () => {
  return new Promise((resolve, reject) => {
    idbPromised.then(db => {
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

const dbinsertfav = idPemain => {
  return new Promise((resolve, reject) => {
      idbPromise.then(db => {
          const transaction = db.transaction("playerFav",`readwrite`);
          transaction.objectStore("playerFav").add(idPemain);
          return transaction;
      }).then(transaction => {
          if (transaction.complete) {
              resolve(true)
          } else {
              reject(new Error(transaction.onerror))
          }
      })
  })
};