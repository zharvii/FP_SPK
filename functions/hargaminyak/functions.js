/**
 * @param {Array}
 * @return {Array}
 */
function mapResponse(array = []) {
  return array.map((item) => ({
    date: item[0],
    value: item[1],
    price_open: item[1],
    price_high: item[2],
    price_low: item[3],
    price_close: item[4],
  }));
}

/**
 * @param {*} page 
 * @return {Object} 
 */
async function getJsonContent(page) {
  const content = await page.evaluate(
    () => document.querySelector("body").textContent
  );
  return JSON.parse(content);
}

module.exports = {
  mapResponse,
  getJsonContent,
};
