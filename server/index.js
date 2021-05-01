"use strict";
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = process.env.PORT || 4000;
const handlers = require("./handlers");
console.log(PORT);
express()
  // .use(function (req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Methods",
  //     "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  //   );
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   next();
  // })
  .use(cors({ origin: "https://weartek.herokuapp.com" }))
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/bacon", (req, res) => {
    res.status(200).json({ greeting: "hello" });
  })

  .get("/items", handlers.getItems)

  .get("/items/categories/:category", handlers.getItemsCategory)

  .get("/companies", handlers.getCompagnies)

  .get("/item/:id", handlers.getSingleItem)

  .get("/company/:id/", handlers.getCompanyById)

  //unused endpoint for searching
  // .get("/search/:searchstring", handlers.getItemBySearch)

  .post("/purchase", handlers.addPurchase)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
