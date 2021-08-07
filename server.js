let http = require('http');
let fs = require('fs');
let path = require('path');

http.createServer(function (request, response) {

    let filePath = '.' + request.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    let extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html';
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

    fs.readFile(filePath, function(error, content) {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
    });

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');
