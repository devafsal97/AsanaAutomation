const fs = require("firebase-admin");
const tatCaculator = require("./tatCalculator");
const axios = require("axios");

const serviceAccount = require("../../asana-automation-6fa38-firebase-adminsdk-a1lfm-0067f1ffb4.json");

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});

exports.db = fs.firestore();
