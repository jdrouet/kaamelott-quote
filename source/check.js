const http = require('http');

http.get({
  host: 'localhost',
  port: 80,
  path: '/',
}, (res) => {
  if (res.statusCode === 200) {
    console.log('success');
    process.exit(0);
  }
  console.error('error', res.statusMessage);
  process.exit(1);
});

