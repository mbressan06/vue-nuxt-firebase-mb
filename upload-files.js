const admin = require('firebase-admin');
const fs = require('fs');
const serviceAccount = require('./admin.json');
const dir = './tmp';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  serviceAccount: serviceAccount,
  storageBucket: 'gs://vue-nuxt-firebase-mb.appspot.com'
});

const bucket = admin.storage().bucket();

const uploadFiles = () => {
  if (fs.existsSync(dir)){
    fs.readdir('./tmp', function (err, files) {
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      } 
      files.forEach(function (file) {
        bucket.upload(`${dir}/${file}`, function(err, file, apiResponse) {
          console.log(apiResponse);
        })
      });
    });
  }
}

uploadFiles();
