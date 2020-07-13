# vue-nuxt-firebase-mb

> A Vue.js/Nuxt and Firebase App Scaffold

## Build Setup

### Firebase Config

> Go to Firebase console

- Create a project

> Navigate to:

- Project Setting → Service accounts → Firebase Admin SDK → Choose Node.js → Click on generate new private key

This will download a JSON file required for Firebase. Paste it in the root directory and rename as `admin.json`

### Seeding the database

> Then run the following command for scrapping the all Beaches data listed in this [Url](https://guiaviajarmelhor.com.br/melhores-praias-brasil/) and populate the Firebase Realtime Database.

```bash
# seed database
$ npm run seed
```

### Running the Application

> Run the following commands:

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

### Firebase Hosting Deploy

> After generating a static project just connect to FirebaseCLI and run the deploy command.

```bash
# firebase login
$ firebase login

# firebase deploy
$ firebase deploy
```
