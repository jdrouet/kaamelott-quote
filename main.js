const http = require('http');
const dataset = require('./dataset.json');
const port = 8080;

const getRandomQuote = () => {
  const index = Math.floor(Math.random() * dataset.length);
  return dataset[index];
};

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(getRandomQuote()));
  res.end();
}).listen(port);

