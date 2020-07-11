import firebase from 'firebase/app';
import 'firebase/auth';

export const firebaseConfig = {
  serviceAccount: '../admin.json',
  databaseURL: 'https://vue-nuxt-firebase-mb.firebaseio.com'
};

let app = null;

if(!firebase.app.length){
  app = firebase.initializeApp(firebaseConfig);
}

export default firebase;
