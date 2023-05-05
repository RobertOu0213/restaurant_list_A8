const express = require("express");
const router = express.Router();
const Restaurants = require("../../models/restaurants");

//瀏覽全部餐廳
router.get("/", (req, res) => {
  Restaurants.find()
    .lean()
    .then((restaurants) => {
      res.render("index", { restaurants });
    })
    .catch((error) => console.log(error));
});

module.exports = router


