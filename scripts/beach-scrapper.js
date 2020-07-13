const admin = require('firebase-admin');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('https');
const _cliProgress = require('cli-progress');
const serviceAccount = require('../service-account.json');

const url = 'https://guiaviajarmelhor.com.br/melhores-praias-brasil/';

const dir = './tmp';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    serviceAccount: serviceAccount,
    databaseURL: 'https://vue-nuxt-firebase-mb.firebaseio.com',
    storageBucket: 'gs://vue-nuxt-firebase-mb.appspot.com'
});

const databaseRef = admin.app().database().ref();
const beachesRef = databaseRef.child('beaches');

const convert_accented_characters = (str) => {
  let conversions = new Object();
  conversions['ae'] = 'ä|æ|ǽ';
  conversions['oe'] = 'ö|œ';
  conversions['ue'] = 'ü';
  conversions['Ae'] = 'Ä';
  conversions['Ue'] = 'Ü';
  conversions['Oe'] = 'Ö';
  conversions['A'] = 'À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ';
  conversions['a'] = 'à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª';
  conversions['C'] = 'Ç|Ć|Ĉ|Ċ|Č';
  conversions['c'] = 'ç|ć|ĉ|ċ|č';
  conversions['D'] = 'Ð|Ď|Đ';
  conversions['d'] = 'ð|ď|đ';
  conversions['E'] = 'È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě';
  conversions['e'] = 'è|é|ê|ë|ē|ĕ|ė|ę|ě';
  conversions['G'] = 'Ĝ|Ğ|Ġ|Ģ';
  conversions['g'] = 'ĝ|ğ|ġ|ģ';
  conversions['H'] = 'Ĥ|Ħ';
  conversions['h'] = 'ĥ|ħ';
  conversions['I'] = 'Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ';
  conversions['i'] = 'ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı';
  conversions['J'] = 'Ĵ';
  conversions['j'] = 'ĵ';
  conversions['K'] = 'Ķ';
  conversions['k'] = 'ķ';
  conversions['L'] = 'Ĺ|Ļ|Ľ|Ŀ|Ł';
  conversions['l'] = 'ĺ|ļ|ľ|ŀ|ł';
  conversions['N'] = 'Ñ|Ń|Ņ|Ň';
  conversions['n'] = 'ñ|ń|ņ|ň|ŉ';
  conversions['O'] = 'Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ';
  conversions['o'] = 'ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º';
  conversions['R'] = 'Ŕ|Ŗ|Ř';
  conversions['r'] = 'ŕ|ŗ|ř';
  conversions['S'] = 'Ś|Ŝ|Ş|Š';
  conversions['s'] = 'ś|ŝ|ş|š|ſ';
  conversions['T'] = 'Ţ|Ť|Ŧ';
  conversions['t'] = 'ţ|ť|ŧ';
  conversions['U'] = 'Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ';
  conversions['u'] = 'ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ';
  conversions['Y'] = 'Ý|Ÿ|Ŷ';
  conversions['y'] = 'ý|ÿ|ŷ';
  conversions['W'] = 'Ŵ';
  conversions['w'] = 'ŵ';
  conversions['Z'] = 'Ź|Ż|Ž';
  conversions['z'] = 'ź|ż|ž';
  conversions['AE'] = 'Æ|Ǽ';
  conversions['ss'] = 'ß';
  conversions['IJ'] = 'Ĳ';
  conversions['ij'] = 'ĳ';
  conversions['OE'] = 'Œ';
  conversions['f'] = 'ƒ';

  for (let i in conversions) {
    const re = new RegExp(conversions[i],"g");
    str = str.replace(re,i);
  }
    
  return str;
}

const progressBar = new _cliProgress.SingleBar({
  format: '{bar} {percentage}% | ETA: {eta}s'
}, _cliProgress.Presets.shades_classic);

const handleFailure = (err) => { 
  throw err; 
};

const downloadImages = (uri, dest, cb) => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  
  let file = fs.createWriteStream(dest);
  return http.get(uri, async (response) => {
    let receivedBytes = 0
    const totalBytes = response.headers['content-length'];
    progressBar.start(totalBytes, 0);
      
    response
      .on('data', (chunk) => {
        receivedBytes += chunk.length;
        progressBar.update(receivedBytes);
      })
      .pipe(file, { end:false })

    file.on('finish', () => {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  })
    .on('error', (err) => { // Handle errors
      console.log(err);
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) {
        file.close(cb);
        handleFailure(err.message)
      };
    })
    .on('end', () => {

    })
};

const addBeaches = (beaches) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      beachesRef.push(beaches)
        .then(resolve, reject);
    }, 1);
  });
};

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const beachTitle = $('.entry-content > h3');
  
    const topBeaches = beachTitle.map((i, element) => {
      const beach = {};
      const title = $(element).text().trim();
      const filename = `${convert_accented_characters(title.substring(0, title.indexOf(' –'))).split(' ').join('_').toLowerCase()}.jpg`;

      beach.title = title;
      beach.beachName = title.substring(0, title.indexOf(' –'));
      beach.city = title.substring(title.indexOf('– ') + 2, title.indexOf(', '));
      beach.region = title.substring(title.indexOf(', ') + 2, title.length);
      beach.description = $(element).next().next().text();
      beach.filename = filename;

      const promise = downloadImages(
        $(element).next().children('img').attr('data-src').toString(), 
        `${dir}/${filename}`, 
        (res) => {
          console.info({ filename }, { res });
        }
      )
      
      console.info({promise});
      
      return beach;
  }).get();
  //TODO: Remove comment before commit
  addBeaches(topBeaches)
    .catch((err) => {
      handleFailure(err)
  });

}).catch((err) => {
  handleFailure(err)
});
