$(async function () {
  $("#example1").DataTable();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // console.log(formatter.format(2500)); /* $2,500.00 */

  await $.ajax({
    type: "GET", // Method pengiriman data bisa dengan GET atau POST
    url: "http://localhost:3000/wti/perjam", // Isi dengan url/path file php yang dituju
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
      response.forEach((t) => {
        var d = new Date(t.date);
        // jam.push(
        //   d.getFullYear() +
        //     "/" +
        //     (parseInt(d.getMonth()) + 1).toString() +
        //     "/" +
        //     d.getDate() +
        //     " " +
        //     d.getHours() +
        //     ":" +
        //     d.getMinutes()
        // );
        data.push([t.date, t.price_close]);
      });

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

  await $.ajax({
    type: "GET", // Method pengiriman data bisa dengan GET atau POST
    url: "http://localhost:3000/wti/perhari", // Isi dengan url/path file php yang dituju
    dataType: "json",
    beforeSend: function (e) {
      if (e && e.overrideMimeType) {
        e.overrideMimeType("application/json;charset=UTF-8");
      }
    },
    success: function (response) {
      $("#chartWtiHari").remove(); // this is my <canvas> element
      $("#chartku2").append('<div id="chartWtiHari"></div>');
      // $("#loading").hide();
      var jam = [];
      var harga = [];
      var data = [];
      response.forEach((t) => {
        var d = new Date(t.date);
        // jam.push(
        //   d.getFullYear() +
        //     "/" +
        //     (parseInt(d.getMonth()) + 1).toString() +
        //     "/" +
        //     d.getDate() +
        //     " " +
        //     d.getHours() +
        //     ":" +
        //     d.getMinutes()
        // );
        data.push([t.date, t.price_close]);
      });

      // console.log(jam);
      // console.log(harga);
      Highcharts.setOptions({
        time: {
          timezone: "Asia/Jakarta",
        },
      });
      Highcharts.chart("chartWtiHari", {
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
            dataLabels: {
              enabled: true,
              format: "{%Y-%m-%d}",
            },
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


   await $.ajax({
     type: "GET", // Method pengiriman data bisa dengan GET atau POST
     url: "http://localhost:3000/brent/perjam", // Isi dengan url/path file php yang dituju
     dataType: "json",
     beforeSend: function (e) {
       if (e && e.overrideMimeType) {
         e.overrideMimeType("application/json;charset=UTF-8");
       }
     },
     success: function (response) {
       $("#chartBrentJam").remove(); // this is my <canvas> element
       $("#chartku3").append('<div id="chartBrentJam"></div>');
       // $("#loading").hide();
       var jam = [];
       var harga = [];
       var data = [];
       response.forEach((t) => {
         var d = new Date(t.date);
         // jam.push(
         //   d.getFullYear() +
         //     "/" +
         //     (parseInt(d.getMonth()) + 1).toString() +
         //     "/" +
         //     d.getDate() +
         //     " " +
         //     d.getHours() +
         //     ":" +
         //     d.getMinutes()
         // );
         data.push([t.date, t.price_close]);
       });

       // console.log(jam);
       // console.log(harga);
       Highcharts.setOptions({
         time: {
           timezone: "Asia/Jakarta",
         },
       });
       Highcharts.chart("chartBrentJam", {
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

   await $.ajax({
     type: "GET", // Method pengiriman data bisa dengan GET atau POST
     url: "http://localhost:3000/brent/perhari", // Isi dengan url/path file php yang dituju
     dataType: "json",
     beforeSend: function (e) {
       if (e && e.overrideMimeType) {
         e.overrideMimeType("application/json;charset=UTF-8");
       }
     },
     success: function (response) {
       $("#chartBrentHari").remove(); // this is my <canvas> element
       $("#chartku4").append('<div id="chartBrentHari"></div>');
       // $("#loading").hide();
       var jam = [];
       var harga = [];
       var data = [];
       response.forEach((t) => {
         var d = new Date(t.date);
         // jam.push(
         //   d.getFullYear() +
         //     "/" +
         //     (parseInt(d.getMonth()) + 1).toString() +
         //     "/" +
         //     d.getDate() +
         //     " " +
         //     d.getHours() +
         //     ":" +
         //     d.getMinutes()
         // );
         data.push([t.date, t.price_close]);
       });

       // console.log(jam);
       // console.log(harga);
       Highcharts.setOptions({
         time: {
           timezone: "Asia/Jakarta",
         },
       });
       Highcharts.chart("chartBrentHari", {
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
             dataLabels: {
               enabled: true,
               format: "{%Y-%m-%d}",
             },
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
