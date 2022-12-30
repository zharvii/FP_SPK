const express = require("express");
let router = express.Router();

const brent = require("../models/Brent");

router.get("/", async function (req, res) {
  let hargabrent = await brent.hargaTerbaru();
  let forecastBulanDepan = await brent.ramal();
  let hargaBulanDepan =
    forecastBulanDepan.forecast[forecastBulanDepan.forecast.length - 1].toFixed(
      2
    );

  let page = "peramalanBrent";
  let js = "brent.js";

  let nav = [
    {
      page: "Home",
      URL: "/home",
    },
    {
      page: "Peramalan Brent",
      URL: "#",
    },
  ];

  let data = {
    nav,
    hargabrent,
    hargaBulanDepan,
  };

  res.render("template", {
    page,
    js,
    data,
  });
});

router.get("/perjam", async function (req, res) {
  let hargaBrentPerjam = await brent.hargaPerjam();

  res.json(hargaBrentPerjam);
});

router.get("/perhari", async function (req, res) {
  let hargaBrentPerhari = await brent.hargaPerhari();

  res.json(hargaBrentPerhari);
});

router.get("/ramal", async function (req, res) {
  let forecastBulanDepan = await brent.ramal();

  res.json(forecastBulanDepan);
});

module.exports = router;
