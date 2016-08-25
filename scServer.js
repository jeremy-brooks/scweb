var express = require("express");
var path = require("path");

var port = 3000;
var app = express();
var webSiteRoot = path.join(__dirname, "/");

app.use(express.static(webSiteRoot));

app.listen(port);

console.log("started on port %s", port);
ouygtfouygtfouy
ougfutfo