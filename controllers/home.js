const express = require("express");
let router = express.Router();

const brent = require("../models/Brent");
const wti = require("../models/Wti");

router.get("/", async function (req, res) {
  let hargabrent = await brent.hargaTerbaru();
  let hargawti = await wti.hargaTerbaru();

  let page = "home";
  let js = "home.js";

  let nav = [
    {
      page: "Home",
      URL: "/home",
    },
  ];

  let data = {
    nav,
    hargabrent,
    hargawti,
  };

  res.render("template", {
    page,
    js,
    data,
  });
});

module.exports = router;
