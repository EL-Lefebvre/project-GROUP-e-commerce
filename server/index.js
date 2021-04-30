"use strict";
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const PORT = `${process.env.REACT_APP_API_URL}`;
const handlers = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/bacon", (req, res) => res.status(200).json("🥓"))

  .get("/items", handlers.getItems)

  .get("/items/categories/:category", handlers.getItemsCategory)

  .get("/companies", handlers.getCompagnies)

  .get("/item/:id", handlers.getSingleItem)

  .get("/company/:id/", handlers.getCompanyById)

  //unused endpoint for searching
  // .get("/search/:searchstring", handlers.getItemBySearch)

  .post("/purchase", handlers.addPurchase)

  .listen(process.env.PORT || 4000, () =>
    console.info(`Listening on port ${process.env.PORT || 4000}`)
  );
