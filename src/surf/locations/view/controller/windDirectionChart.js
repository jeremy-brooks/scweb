/**
 * Created by Jeremy on 23/05/2016.
 */
var chartsLoadedCount = 0;
function whenPageHasLoaded() {
    var chart1 = "croyde";
    var chart2 = "watergate";
    $("#charts").append('<div id="'+chart2+'" class="col-sm-12"></div>');
    $("#charts").append('<div id="'+chart1+'" class="col-sm-12"></div>');
    getWindData("http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/310069?res=3hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848", chart2);
    getWindData("http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/354507?res=3hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848", chart1);

}
function getWindData(url, elementId) {
    var http = new XMLHttpRequest();
    var dataUrl = url;

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var parsedData = JSON.parse(http.responseText);
            var dataToPlot = parseWindDirection(parsedData, elementId);
        }
    };
    http.open("GET", dataUrl, true);
    http.send();
}
function parseWindDirection(data, elementId) {
    var location = data.SiteRep.DV.Location;
    var period = data.SiteRep.DV.Location.Period;
    for (var dataIndex = 0, dataItem = null; dataItem = period[dataIndex]; dataIndex++) {
        if (dataItem.Rep) {
            var windSpeedData = [];
            var windGustData = [];
            for (var repIndex = 0, rep = null; rep = dataItem.Rep[repIndex]; repIndex++) {
                if (rep["D"] && rep["S"] && rep["G"]) {
                    var x = SurfCrew.windDirectionParams.D.intervals[rep.D];
                    var windSpeedValue = Number(rep.S);
                    var windGustValue = Number(rep.G);
                    windSpeedData.push({
                        x: x,
                        y: windSpeedValue,
                        color: highlightColour(windSpeedValue)
                    });
                    windGustData.push({
                        x: x,
                        y: windGustValue,
                        color: "#000000"
                    });
                }
            }
            drawWindChart(windSpeedData, windGustData, location.name + ": " + moment(dataItem.value, "YYYY-MM-DDZ").format("ddd MMM Do"), elementId);
        }
    }
}
function highlightColour(windSpeed){
    windSpeed = Number(windSpeed);
    if (windSpeed >= 0 && windSpeed <= 5){
        return "#00FF00";
    } else if (windSpeed > 5 && windSpeed <= 10) {
        return "#FFCC66";
    } else if (windSpeed > 10 && windSpeed <= 15) {
        return "#FF6600";
    } else {
        return "#FF0800";
    }
}
function drawWindChart(windData, gustData, title, elementId) {
    var chartElementId = "chart" + chartsLoadedCount;
    $("#"+elementId).append('<div id="' + chartElementId + '" class="col-sm-3" style="height:400px;"></div>');
    var windChart = new Highcharts.Chart({
        chart: {
            renderTo: chartElementId,
            polar: true
        },

        title: {
            text: title
        },

        pane: {
            startAngle: 0,
            endAngle: 360
        },

        legend: {
            enabled: false
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
            tickInterval: 5,
            labels: {
                formatter: function () {
                    return this.value + 'mph';
                }
            },
            min: 0,
            max: 20
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
            name: "Wind speed (mph)",
            data: windData,
            pointPlacement: 'between'
        // },{
        //     type: 'column',
        //     name: "Wind gust (mph)",
        //     data: gustData,
        //     pointPlacement: 'between'
        }]
    });
    chartsLoadedCount++;
}