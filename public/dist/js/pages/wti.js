$(async function () {
  $("#example1").DataTable();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // console.log(formatter.format(2500)); /* $2,500.00 */

  await $.ajax({
    type: "GET", // Method pengiriman data bisa dengan GET atau POST
    url: "http://localhost:3000/wti/ramal", // Isi dengan url/path file php yang dituju
    dataType: "json",
    beforeSend: function (e) {
      if (e && e.overrideMimeType) {
        e.overrideMimeType("application/json;charset=UTF-8");
      }
    },
    success: function (response) {
      $("#chartWtiJam").remove(); // this is my <canvas> element
      $("#chartku1").append('<div id="chartWtiJam"></div>');
      // $("#loading").hide();
      var jam = [];
      var harga = [];
      var data = [];
      console.log(response);
      response.data.forEach((t) => {
        data.push([t.date, t.price_close]);
      });

      var r = response.data[response.data.length - 1].date;
      // console.log("daya", response.forecast[response.forecast.length - 1]);
      var d = new Date(r); //

      console.log(r);
      d.setMonth(d.getMonth() + 1);
      console.log(d);
      $("#nextBulan").text(
        "Peramalan Harga Bulan Selanjutnya (" +
          d.getFullYear() +
          "-" +
          parseInt(d.getMonth() + 1)
            .toString()
            .padStart(2, "0") +
          "-" +
          d.getDate().toString().padStart(2, "0") +
          ")"
      );
      const unixTimestamp = Math.floor(d.getTime() / 1000);
      console.log(parseInt(unixTimestamp + "000")); // 👉️ 1655856000
      //   dt.setMonth(dt.getMonth() + 1);
      //   dt.setDate(1);
      console.log(response.forecast[response.forecast.length - 1].toFixed(2));
      data.push([
        parseInt(unixTimestamp + "000"),
        parseFloat(response.forecast[response.forecast.length - 1].toFixed(2)),
      ]);

      // console.log(jam);
      // console.log(harga);
      Highcharts.setOptions({
        time: {
          timezone: "Asia/Jakarta",
        },
      });
      Highcharts.chart("chartWtiJam", {
        chart: {
          zoomType: "x",
        },
        title: {
          text: "Chart",
        },

        xAxis: {
          type: "datetime",
        },
        yAxis: {
          tickInterval: 0.5,

          title: {
            text: "Harga",
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>${point.y}</b>/Barrel</td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [
                  1,
                  Highcharts.color(Highcharts.getOptions().colors[0])
                    .setOpacity(0)
                    .get("rgba"),
                ],
              ],
            },
            marker: {
              radius: 2,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
          },
        },

        series: [
          {
            type: "area",
            name: "Harga",
            data: data,
            pointStart: Date.UTC(2016, 9, 22),
            pointInterval: 24 * 36e5,
          },
        ],
      });
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // Ketika ada error
      alert(xhr.status + "\n" + xhr.responseText + "\n" + thrownError); // Munculkan alert error
    },
  });
});
