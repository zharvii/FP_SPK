// Fungsi Weighted moving average

exports.wma = (data, bobot) => {
  const isNumber = (subject) =>
    typeof subject === "number" && subject === subject;

  const hasil = [];
  const tertimbang = (bobot * (bobot + 1)) / 2;
  let total = 0;
  let hitung = 0;
  let aktual = 0;
  let i = 0;
  let j = -1;

  for (; i < bobot - 1; i++) {
    aktual = data[i];
    if (isNumber(aktual)) {
      total += aktual;
      hitung += (i + 1) * aktual;
    }
  }

  for (; i < data.length; i++, j++) {
    aktual = data[i];

    if (isNumber(aktual)) {
      total += aktual;
      hitung += bobot * aktual;
    }

    if (j >= 0 && isNumber(data[j])) {
      total -= data[j];
    }

    hasil[i] = hitung / tertimbang;
    hitung -= total;
  }

  return hasil;
};
