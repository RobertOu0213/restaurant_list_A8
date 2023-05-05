const express = require("express");
const app = express();
const port = 3000;

const exphbs = require("express-handlebars");
const methodOverride = require("method-override");

const routes = require("./routes");
const Restaurants = require("./models/restaurants");

require("./config/mongoose");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//connect 靜態資料
app.use(express.static("public"));

//body parser
app.use(express.urlencoded({ extended: true }));

//method-override
app.use(methodOverride("_method"));

app.use(routes);

//搜尋keyword
app.get("/search", (req, res) => {
  Restaurants.find()
    .lean()
    .then((restaurant) => {
      const restaurantFilter = restaurant.name
        .toLowerCase()
        .trim()
        .includes(req.query.keyword.toLowerCase().trim());
      res.render("index", { restaurants: restaurantFilter });
    });
});

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`);
});
