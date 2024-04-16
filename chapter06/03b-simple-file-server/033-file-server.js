const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");


// our HTTP server now returns requested files
const server = http.createServer(function (request, response) {
        // get the filename from the URL
        console.log(`Parsed URL.pathname: ${url.parse(request.url).pathname}`);
        let requestedFile = url.parse(request.url).pathname;
        // now turn that into a file system file name by adding the current
        // local folder path in front of the filename
        let filename = path.join(process.cwd(), requestedFile);
        // check if it exists on the computer
        fs.exists(filename, function(exists) {
              // if it doesn't exist, then return a 404 response
              if (!exists) {
                  response.writeHead(404, {"Content-Type": "text/html"});
                  response.write("<h1>404 Error</h1>\n");
                  response.write("The requested file isn't on this machine\n");
                  response.end();
                  return;
              }  
            // if file exists then read it in and send its contents to requestor
            fs.readFile(filename, "binary", function(err, file) {
                // maybe something went wrong (e.g., permission error)
                if (err) {       
                    response.writeHead(500, {"Content-Type": "text/html"});
                    response.write("<h1>500 Error</h1>\n");             
                    response.write(err + "\n");
                    response.end();
                    return;
                }
    ``          // ... everything is fine so return contents of file
                response.writeHead(200);
                response.write(file, "binary");
                response.end();``
            });
        });        
});

// we don’t have to use port 8080; here we are using 7000
server.listen(7000, "localhost");
console.log("Server running at http://localhost:7000/");