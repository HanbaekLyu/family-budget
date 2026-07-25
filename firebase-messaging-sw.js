// Firebase Cloud Messaging background worker.
// Handles push notifications when the app tab is closed or in the background.
//
// IMPORTANT: paste the SAME values you put in credit-card-tracker.html's
// FIREBASE_CONFIG into the object below (this file can't read them from the page).
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDD39fG2m-8kYHTJ2ZJ_DbicUjOk9y31Aw",
  authDomain: "creditcard-7e0fd.firebaseapp.com",
  databaseURL: "https://creditcard-7e0fd-default-rtdb.firebaseio.com",
  projectId: "creditcard-7e0fd",
  messagingSenderId: "454836236559",
  appId: "1:454836236559:web:dddb83b1b883b58a8b4e7a"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const n = payload.notification || {};
  self.registration.showNotification(n.title || 'Card Tracker', {
    body: n.body || '',
    icon: './icon.png',
    tag: 'card-tracker'
  });
});