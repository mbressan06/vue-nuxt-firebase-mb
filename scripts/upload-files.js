const admin = require('firebase-admin');
const fs = require('fs');
const serviceAccount = require('../service-account.json');

const dir = './tmp';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  serviceAccount: serviceAccount,
  storageBucket: 'gs://vue-nuxt-firebase-mb.appspot.com'
});

const bucket = admin.storage().bucket();

const uploadFiles = () => {
  if (fs.existsSync(dir)){
    fs.readdir(dir, (err, files) => {
      if (err) {
          return console.error('Unable to scan directory: ' + err);
      } 
      files.forEach((file) => {
        bucket.upload(`${dir}/${file}`, (errResponse, fileResponse, apiResponse) => {
          console.info(apiResponse);
        })
      });
    });
  }
}
// TODO: Remove comment before commit
uploadFiles();
