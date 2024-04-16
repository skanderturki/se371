const http = require('http');

const server = http.createServer(
  (req, res) => {
    if( req.url === '/'){
      res.end("This is the homepage!");
    } else if( req.url === '/about'){
      res.end("This is the ABOUT page!");
    } else 
      res.end(`<h1> Page not Found! <h1>
        <p><a href="/">Homepage</a></p>    
      `);
    return;
  }
);

server.listen(5000);
console.log("Listening on port 5000");