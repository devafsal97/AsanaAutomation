const fs = require("firebase-admin");
const tatCaculator = require("./tatCalculator");
const axios = require("axios");

const serviceAccount = require("../../asanaautomation-c1284-firebase-adminsdk-1uhwe-818835a227.json");

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
});

exports.db = fs.firestore();
