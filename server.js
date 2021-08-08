let http = require('http');
let fs = require('fs');
let path = require('path');

http.createServer(function (request, response) {
  let filePath = '.' + request.url
  let contentType;

  switch (filePath) {
    case './': {
      filePath = './index.html';
      contentType = 'text/html';
      break;
    }
    case './api/data': {
      filePath = './table_data.json';
      contentType = 'application/json';
      break;
    }
    default: {
      let extname = String(path.extname(filePath)).toLowerCase();
      let mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg': 'application/image/svg+xml'
      };
      contentType = mimeTypes[extname] || 'application/octet-stream';
    }
  }

  console.log(filePath);
  console.log(contentType);

  fs.readFile(filePath, function(error, content) {
  if (error) {
    if(error.code === 'ENOENT') {
      fs.readFile('./404.html', function(error, content) {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end(content, 'utf-8');
      });
    }
    else {
      response.writeHead(500);
      response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
    }
  }
  else {
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content, 'utf-8');
  }
});

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');
