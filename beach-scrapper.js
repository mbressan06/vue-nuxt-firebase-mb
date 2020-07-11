const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://guiaviajarmelhor.com.br/melhores-praias-brasil/';

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
  
  console.log(topBeaches);
  
}).catch(console.error);
