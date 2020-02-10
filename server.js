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

    let scrapeResults = [];

    axios.get("https://theconversation.com/us/topics/gaming-1806").then(function(response) {
        let $ = cheerio.load(response.data);
        
        $("article").each(function(i, element) {
            let result = {};
            result.title = $(element).find("header div.article--header h2 a").text();
            result.description = $(element).find("div.content span").text();

            scrapeResults.push(result);
        });

        const hbsObject = {
            results: scrapeResults
        }

        res.render("index", hbsObject);
        
    });
    
})

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });