# vue-nuxt-firebase-mb

> A Vue.js/Nuxt and Firebase App Scaffold

## Build Setup

### Firebase Config

> Create a `firebase.js` file inside `/plugins` folder with the firebase configuration params

```js
import * as firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "application-apiKey",
  authDomain: "application-authDomain",
  databaseURL: "application-databaseURL",
  projectId: "application-projectId",
  storageBucket: "application-storageBucket",
  messagingSenderId: "application-messagingSenderId",
  appId: "application-appId"
};

let app = null;

if(!firebase.app.length){
  app = firebase.initializeApp(firebaseConfig);
}

export default firebase;

```

Then run the following commands:

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
