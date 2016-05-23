/**
 * Created by Jeremy on 23/05/2016.
 */
function whenPageHasLoaded() {
    getWindData("http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/354507?res=3hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
}
function getWindData(url) {
    var http = new XMLHttpRequest();
    var dataUrl = url;

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var parsedData = JSON.parse(http.responseText);
            var dataToPlot = parseWindDirection(parsedData);
            drawWindChart(dataToPlot);
        }
    };
    http.open("GET", dataUrl, true);
    http.send();
}
function parseWindDirection(data) {
    var period = data.SiteRep.DV.Location.Period;
    var chartDataToReturn = [];
    for (var dataIndex = 0, dataItem = null; dataItem = period[dataIndex]; dataIndex++) {
        if (dataItem.Rep) {
            for (var repIndex = 0, rep = null; rep = dataItem.Rep[repIndex]; repIndex++) {
                if (rep["D"] && rep["S"]) {
                    var x = SurfCrew.windDirectionParams.D.intervals[rep.D];
                    var y = Number(rep.S);
                    chartDataToReturn.push([x, y]);
                }
            }
        }
    }
    return chartDataToReturn;
}
function drawWindChart(data) {
    var windChart = new Highcharts.Chart({
        chart: {
            renderTo: 'chart1',
            polar: true
        },

        title: {
            text: 'Wind direction'
        },

        pane: {
            startAngle: 0,
            endAngle: 360
        },

        xAxis: {
            tickInterval: 22.5,
            min: 0,
            max: 360,
            labels: {
                formatter: function () {
                    return this.value + '°';
                }
            }
        },

        yAxis: {
            min: 0
        },

        plotOptions: {
            series: {
                pointStart: 0,
                pointInterval: 45
            },
            column: {
                pointPadding: 0,
                groupPadding: 0
            }
        },

        series: [{
            type: 'column',
            name: 'Column',
            data: data,
            pointPlacement: 'between'
        }]
    });
}