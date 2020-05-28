const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

bodyParser.urlencoded({ extended: true });

app.set("view engine", "ejs");

app.use(express.static("public"));

const articleSchema = {
  title: String,
  content: String,
};

app.get("/articles", function (req, res) {
  Article.find({}, function (err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

const Article = mongoose.model("Article", articleSchema);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server has started");
});
