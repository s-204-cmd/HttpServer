const net = require('net');
const querystring = require('querystring');

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    try {
      const requestText = data.toString();
      const [headerPart, bodyPart] = requestText.split('\r\n\r\n');
      const lines = headerPart.split('\r\n');
      const [method, fullPath, httpVersion] = lines[0].split(' ');

      const headers = {};
      let keepAlive = false;
      for (let i = 1; i < lines.length; i++) {
        const [key, value] = lines[i].split(': ');
        headers[key.toLowerCase()] = value;

        if (key.toLowerCase() === 'connection' && value.toLowerCase() === 'keep-alive') {
          keepAlive = true;
        }
      }

      // Parse query params
      let path = fullPath;
      let query = {};
      if (fullPath.includes('?')) {
        const [cleanPath, queryString] = fullPath.split('?');
        path = cleanPath;
        query = querystring.parse(queryString);
      }

      // Parse body based on Content-Type
      let parsedBody = bodyPart;
      if (headers['content-type'] === 'application/x-www-form-urlencoded') {
        parsedBody = querystring.parse(bodyPart);
      } else if (headers['content-type'] === 'application/json') {
        try {
          parsedBody = JSON.parse(bodyPart);
        } catch (err) {
          parsedBody = { error: 'Invalid JSON' };
        }
      }

      const request = { method, path, query, headers, body: parsedBody };

      // -------------------------------
      // Routing
      let responseBody = '';
      let statusCode = 200;

      if (method === 'GET' && path === '/') {
        responseBody = 'Welcome to the Home Page!';
      } else if (method === 'GET' && path === '/about') {
        responseBody = 'This is the About Page.';
      } else if (method === 'GET' && path === '/search') {
        responseBody = `Search results for query: ${JSON.stringify(request.query)}`;
      } else if (method === 'POST' && path === '/submit') {
        responseBody = `Received POST data: ${JSON.stringify(request.body)}`;
      } else {
        statusCode = 404;
        responseBody = '404 Not Found';
      }
      // -------------------------------

      const statusMessage = {
        200: 'OK',
        404: 'Not Found'
      }[statusCode] || 'OK';

      const response = 
`HTTP/1.1 ${statusCode} ${statusMessage}
Content-Type: text/plain
Content-Length: ${responseBody.length}
Connection: ${keepAlive ? 'keep-alive' : 'close'}

${responseBody}`;

      socket.write(response);

      if (!keepAlive) {
        socket.end();
      }
    } catch (err) {
      console.error('Error handling request:', err);
      socket.end();
    }
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

server.listen(8080, () => {
  console.log('Server running on port 8080');
});
