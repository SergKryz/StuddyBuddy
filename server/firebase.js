const admin = require('firebase-admin');
const serviceAccount = require('./key.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get Firestore instance
const db = admin.firestore();

// Export the Firestore instance
module.exports = db;