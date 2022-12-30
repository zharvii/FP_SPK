const puppeteer = require("puppeteer");
const { mapping } = require("./mapping");
const { getJsonContent, mapResponse } = require("./functions");

const validPeriod = ["P1D", "P1W", "P1M", "P3M", "P6M", "P1Y", "P5Y", "MAX"];
const validInterval = [
  "PT1M",
  "PT5M",
  "PT15M",
  "PT30M",
  "PT1H",
  "PT5H",
  "P1D",
  "P1W",
  "P1M",
];
const validPointscount = [60, 70, 120];

/**
 * @param {String} input
 * @param {String} period
 * @param {String} interval
 * @param {Number} pointscount
 */
function checkParams(input, period, interval, pointscount) {
  if (!input) {
    throw Error("Isi Parameter");
  }
  if (!validPeriod.includes(period)) {
    throw Error(
      "Periode Tidak Valid, Periode : P1D, P1W, P1M, P3M, P6M, P1Y, P5Y, MAX"
    );
  }
  if (!validInterval.includes(interval)) {
    throw Error(
      "Interval Tidak Valid. Interval : PT1M, PT5M, PT15M, PT30M, PT1H, PT5H, P1D, P1W, P1M"
    );
  }
  if (!validPointscount.includes(pointscount)) {
    throw Error("Pointscount Tidak Valid. Pointscount: 60, 70, 120");
  }
}

/**
 * @param {string} pairId
 * @param {string} period  P1D, P1W, P1M, P3M, P6M, P1Y, P5Y, MAX
 * @param {string} interval  PT1M, PT5M, PT15M, PT30M, PT1H, PT5H, P1D, P1W, P1M
 * @param {number} pointscount  60, 70, 120
 * @return {Array} output
 */
async function callInvesting(pairId, period, interval, pointscount) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
  );

  await page.goto(
    `https://api.investing.com/api/financialdata/${pairId}/historical/chart?period=${period}&interval=${interval}&pointscount=${pointscount}`
  );
  const jsonContent = await getJsonContent(page);
  await browser.close();
  return jsonContent;
}

/**
 * @param {string} input
 * @param {string} period P1D, P1W, P1M, P3M, P6M, P1Y, P5Y, MAX
 * @param {string} interval PT1M, PT5M, PT15M, PT30M, PT1H, PT5H, P1D, P1W, P1M
 * @param {number} pointscount 60, 70, 120
 * @return {Array} output
 */
async function investing(
  input,
  period = "P1M",
  interval = "P1D",
  pointscount = 120
) {
  try {
    checkParams(input, period, interval, pointscount);
    const pairId = mapping[input]?.pairId || input;
    const { data } = await callInvesting(pairId, period, interval, pointscount);
    const results = mapResponse(data);
    if (!results.length) {
      throw Error("pairId Salah");
    }
    return results;
  } catch (err) {
    console.error(err.message);
    if (err.response?.data?.["@errors"]?.[0]) {
      console.error(err.response.data["@errors"][0]);
    }
  }
}

exports.investing = investing;
