const http = require('http');

const server = http.createServer(
  (req, res) => {
    console.log(req);
    res.write("This is my response to your request!");
    res.end();
    return;
  }
);

server.listen(5000);
console.log("Listening on port 5000");