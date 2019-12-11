let webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BNYNz7hRmPpbtIzPdUX_nyk-VZsr8pXrjJDVZ9KBlZs61Dnv0KFjiNzYKO-yciQxsLHd91LAtaVy9VfQsk9bdqk",
    "privateKey": "5ck7xwzI2zI56GQkc5YsWYo6cV6Z5rkmKiEHiPFTY38"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
let pushSubscription = {
    "endpoint":"https://fcm.googleapis.com/fcm/send/eATb789TMPE:APA91bE-ggJLaw1wHbSUWgCV-diXhBsylPJm1-NJlgDbrZQYkeZzJnyZpoCsq12qbo0Nn0pvr0UIWhlqQ2uuGu_J_CSD927PJZwDn8eX_eLZ5DIER2NkLEY2dfbIzw7bcsc6zSgG98CZ",
    "keys": {
        "p256dh":"BMaawi3SHVvwYccLmhrvg26zOLtvNTyQ9PeXT77wKIKj3ML2P3/SF01ZEiQ2JIxUieSBzc+YHNpMtKYWQi26bUk=",
        "auth": "O0gGUiS9dnR0KhnKnZ/G+g=="
    }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

let options = {
    gcmAPIKey: '109931818461',
    TTL: 60
};
webPush.sendNotification(pushSubscription,payload,options);