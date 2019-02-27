const http = require('http');
const dataset = require('../dataset.json');
const port = 80;

const getRandomQuote = () => {
  const index = Math.floor(Math.random() * dataset.length);
  return dataset[index];
};

http.createServer(function (req, res) {
  console.log(Date.now(), 'request a new quote');
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(getRandomQuote()));
  res.end();
}).listen(port);
