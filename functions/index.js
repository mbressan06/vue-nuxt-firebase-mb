const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

'use strict';

const firebaseConfig = {
  serviceAccount: serviceAccount,
  databaseURL: 'https://vue-nuxt-firebase-mb.firebaseio.com/',
  storageBucket: 'gs://vue-nuxt-firebase-mb.appspot.com/'
};

admin.initializeApp(firebaseConfig);


exports.loadBeaches = functions.https.onRequest((async (req, res) => {
  const parentRef = admin.database().ref();
  const list = await parentRef.once('value')
  .then((snapshot) => {
    return res.status(200).send(snapshot.val());
  })
  
})
);


const cors = require('cors')({
  origin: true,
});

exports.list = functions.https.onRequest((req, res) => {

  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!');
  }

  return cors(req, res, () => {
    let format = req.query.format;

    if (!format) {
      format = req.body.format;

    }
    

  });
});
