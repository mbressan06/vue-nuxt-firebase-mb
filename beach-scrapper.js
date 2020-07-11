const axios = require('axios');
const cheerio = require('cheerio');
const firebase = require('firebase');

firebase.initializeApp({
    serviceAccount: './admin.json',
    databaseURL: 'https://vue-nuxt-firebase-mb.firebaseio.com'
});

const ref = firebase.app().database().ref();
const beachesRef = ref.child('beaches');

const url = 'https://guiaviajarmelhor.com.br/melhores-praias-brasil/';

const addBeaches = (user) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      beachesRef.push(user)
        .then(resolve, reject);
    }, 1);
  });
};

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html)
    const beachTitle = $('.entry-content > h3');
  
    const topBeaches = beachTitle.map((i, element) => {

      const title = $(element).text().trim();
      const beach = {};
      
      beach.title = title;
      beach.beachName = title.substring(0, title.indexOf(' –'));
      beach.city = title.substring(title.indexOf('– ') + 2, title.indexOf(', '));
      beach.region = title.substring(title.indexOf(', ') + 2, title.length);
      beach.image = $(element).next().children('img').attr('data-src');
      beach.description = $(element).next().next().text();
  
      return beach;
  }).get();

  addBeaches(topBeaches)
    .then((res) => {
      return process.exit(0);
    })
    .catch((err) => {
      console.log('error', err);
      return process.exit(1);
    });

}).catch(console.error);
