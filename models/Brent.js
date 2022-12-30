const { investing } = require("../functions/hargaminyak");
const { wma } = require("../functions/wma");

async function hargaTerbaru() {
  const data = await investing("commodities/brent-oil", "P1D", "PT1M");
  var r = data[data.length - 1].date;
  var d = new Date(r); //
  return {
    harga: data[data.length - 1].price_close,
    tanggal: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(),
  };
}

async function hargaPerjam() {
  const data = await investing("commodities/brent-oil", "P1D", "PT1H");
  return data;
}

async function hargaPerhari() {
  const data = await investing("commodities/brent-oil", "P1M", "PT5H");
  return data;
}

async function ramal() {
  const data = await investing("commodities/brent-oil", "P1Y", "P1M");
  let harga = [];
  data.forEach((obj) => {
    harga.push(obj.price_close);
  });
  let forecast = await wma(harga, 3);
  return {
    data: data,
    forecast: forecast,
  };
}

module.exports = {
  hargaTerbaru,
  hargaPerjam,
  hargaPerhari,
  ramal,
};
