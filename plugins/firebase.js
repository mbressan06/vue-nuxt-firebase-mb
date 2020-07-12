import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  serviceAccount: '../admin.json',
  databaseURL: 'https://vue-nuxt-firebase-mb.firebaseio.com',
  storageBucket: 'gs://vue-nuxt-firebase-mb.appspot.com/'
};

let app = null;

if(!firebase.app.length){
  app = firebase.initializeApp(firebaseConfig);
}

export default firebase;
