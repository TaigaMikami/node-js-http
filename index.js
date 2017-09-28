'use strict';
const http = require('http');
const server = http.createServer((req, res) => {
  // console.info('[' + new Date() + '] Requested by ' + req.connection.remoteAddress);
  const now = new Date();
  console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);
  res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
  });
  // res.write(req.headers['user-agent']);
  switch (req.method) {
    case 'GET':
      res.write('GET ' + req.url + '\n');
      break;
    case 'POST':
      res.write('POST ' + req.url + '\n');
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.info('[' + now + '] Data posted:' + body);
      });
      break;
    case 'DELETE':
      res.write('DELETE' + req.url);
      break;
    default:
      break;
  }
  res.end();
}).on('error', (e) => {
    console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
    console.error('[' + new Date() + '] Client Error', e);
});
const port = 8000;
server.listen(port, () => {
  console.info('[' + new Date() + ']Listening on ' + port);
});
