
var express = require("express");

var app = express();

app.use( express.static('public') );   // the public folder can contain css, images, etc…
app.listen(5000, () => { console.log("Listening on port 5000...") });
