/**
 * Created by Jeremy on 13/04/2016.
 */
function whenPageHasLoaded() {
    createHybridChart();
}
function createHybridChart(){
    var url = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/354507?res=3hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848";
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200){
            var parsedData = JSON.parse(http.responseText);
            var location = new DataPointLocation(parsedData);
            var options = {
                chart: {
                    type: 'spline'
                },
                xAxis: {
                    type: "datetime"
                },
                series: location.seriesData
            };
            $("#chart-hybrid").highcharts(options);
        }
    };
    http.open("GET", url, true);
    http.send();
}