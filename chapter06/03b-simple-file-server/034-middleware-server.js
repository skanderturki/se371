const http = require('http');
const { writeFileSync } = require('fs')

const middleware_1_LOG = (err, req, res, next) => {
  // Do the middleware task (log incomig request)
  const { rawHeaders, httpVersion, method, socket, url } = req;
  const { remoteAddress, remoteFamily } = socket;
  writeFileSync('./content/log.txt', JSON.stringify({
    timestamp: Date.now(),
    rawHeaders,
    httpVersion,
    method,
    remoteAddress,
    remoteFamily,
    url
  }) + "\n", { flag: 'a' });

  // Call next middleware in sequence
  next(err, req, res, middleware_2_CONSOLE);
  return;
}

const middleware_2_CONSOLE = (err, req, res, next) => {
  // Do the middleware task (console log request)
  console.log(req);

  // Call next middleware in sequence
  next(err, req, res, finalware_RESPOND);
  return;
}

const finalware_RESPOND = (err, req, res, next) => {
  // Do the final task which is responding to the request.
  res.write("This is my response to your request!");
  res.end();
  return;
}

const server = http.createServer((req, res) => {
  // Create a server and call first middleware of the sequence
  // Sequence: request -> middleware1 -> middleware2 -> finalware -> response
  middleware_1_LOG(null, req, res, middleware_2_CONSOLE);
  return;
});

server.listen(5000);
console.log("Listening on port 5000");