const express = require("express");
let router = express.Router();

const wti = require("../models/Wti");

router.get("/", async function (req, res) {
  let hargawti = await wti.hargaTerbaru();
  let forecastBulanDepan = await wti.ramal();
  let hargaBulanDepan =
    forecastBulanDepan.forecast[forecastBulanDepan.forecast.length - 1].toFixed(
      2
    );
 

  let page = "peramalanWti";
  let js = "wti.js";

  let nav = [
    {
      page: "Home",
      URL: "/home",
    },
    {
      page: "Peramalan Wti",
      URL: "#",
    },
  ];

  let data = {
    nav,
    hargawti,
    hargaBulanDepan,
  };

  res.render("template", {
    page,
    js,
    data,
  });
});

router.get("/perjam", async function (req, res) {
  let hargaWtiPerjam = await wti.hargaPerjam();

  res.json(hargaWtiPerjam);
});

router.get("/perhari", async function (req, res) {
  let hargaWtiPerhari = await wti.hargaPerhari();

  res.json(hargaWtiPerhari);
});

router.get("/ramal", async function (req, res) {
  let forecastBulanDepan = await wti.ramal();

  res.json(forecastBulanDepan);
});

module.exports = router;
