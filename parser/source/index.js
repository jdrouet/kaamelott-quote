const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const baseUrl = 'https://fr.wikiquote.org';

const fetchPage = (url) => {
  console.log('fetching', url);
  return axios.get(url, {
    responseType: 'document',
  }).then((res) => cheerio.load(res.data));
};

const getCharacterQuotes = async (url) => {
  const $ = await fetchPage(url);
  return $('.citation').map(function() {
    return $(this).text().trim();
  }).toArray();
};

const run = async () => {
  const $ = await fetchPage(`${baseUrl}/wiki/Kaamelott`);
  const elements = $('.mw-parser-output')
    .children()
    .filter(function() {
      const item = $(this);
      return item.is('h3') || item.is('dl') || item.hasClass('citation');
    })
    .map(function() {
      const item = $(this);
      if (item.is('h3')) {
        return {
          type: 'character',
          value: item.find('.mw-headline a').first().text(),
        };
      }
      if (item.is('dl')) {
        return {
          type: 'url',
          value: baseUrl + item.find('a').first().attr('href'),
        };
      }
      return {
        type: 'quote',
        value: item.text(),
      };
    })
    .toArray();
  const characters = [];
  for (let item of elements) {
    if (item.type === 'character') {
      characters.push({
        name: item.value,
        quotes: [],
      });
    } else if (item.type === 'url') {
      characters[characters.length - 1].quotes = await getCharacterQuotes(item.value);
    } else {
      characters[characters.length - 1].quotes.push(item.value.trim());
    }
  }
  const quotes = characters.reduce((res, character) => [
    ...res,
    ...character.quotes.map((content) => ({
      character: character.name,
      content,
    }))
  ], []);
  fs.writeFileSync('database.json', JSON.stringify(quotes));
};

run()
.then(() => process.exit(0))
.catch((err) => {
  console.error(err);
  process.exit(1);
});
