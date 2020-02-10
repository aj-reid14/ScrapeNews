let express = require("express");
let exphbs = require("express-handlebars");
let mongoose = require("mongoose");
let axios = require("axios");
let cheerio = require("cheerio");

let PORT = 3000;

let app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
    res.render("index");
})

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });