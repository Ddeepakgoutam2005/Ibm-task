const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = '';
  let contentType = 'text/html';

  if (req.url === '/') {
    filePath = path.join(__dirname, 'views', 'index.html');
  } else if (req.url === '/about') {
    filePath = path.join(__dirname, 'views', 'about.html');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
