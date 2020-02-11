let express = require("express");
let exphbs = require("express-handlebars");
let mongoose = require("mongoose");
let axios = require("axios");
let cheerio = require("cheerio");

let PORT = process.env.PORT || 3000;

let db = require("./models");

let app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/clear", function(req, res) {
    db.Article.remove({})
    .catch(function(err) {
        console.log(err);
    });

    res.send("DB Cleared");
});

app.get("/", function(req, res) {
    db.Article.find({})
    .lean()
    .then(function(dbResult) {
        const hbsObject = {
            results: dbResult
        }
        res.render("index", hbsObject);
    })
    .catch(function(err) {
        res.json(err);
    });
})

app.get("/scrape", function(req, res) {

    let scrapeResults = [];

    axios.get("https://theconversation.com/us/topics/gaming-1806").then(function(response) {
        let $ = cheerio.load(response.data);
        
        $("article").each(function(i, element) {
            let result = {};
            result.title = $(element).find("header div.article--header h2 a").text();
            result.link = "https://theconversation.com/" + $(element).find("header div.article--header h2 a").attr("href");
            result.description = $(element).find("div.content span").text();

            db.Article.create(result)
            .then(function(dbArticle) {
                // console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err);
            });

            scrapeResults.push(result);
        });        
    
        res.send("Articles Scraped");
        location.reload();

        // const hbsObject = {
        //     results: scrapeResults
        // }

        // console.log(hbsObject);
        // res.render("index", hbsObject);
        
    });
    
})

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });