/**
 * Created by Jeremy on 23/05/2016.
 */
var HybridChart = function (elementId, url, locationToUpdate){
    var http = new XMLHttpRequest();
    var dataUrl = url;
    var location = locationToUpdate;

    if (url instanceof Array){
        dataUrl = url[0];
    }

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200){
            var parsedData = JSON.parse(http.responseText);
            if (location instanceof DataPointLocation){
                location.pushDataIntoSeries(parsedData);
            } else {
                location = new DataPointLocation(parsedData, SurfCrew.standardParams);
            }
            $(elementId).highcharts(location.options);

            if (url instanceof Array){
                for (var urlIndex = 1, otherDataUrl = null; otherDataUrl = url[urlIndex]; urlIndex++){
                    new HybridChart(elementId, otherDataUrl, location);
                }
            }
        }
    };
    http.open("GET", dataUrl, true);
    http.send();
};