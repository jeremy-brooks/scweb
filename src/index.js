/**
 * Created by Jeremy on 13/04/2016.
 */

function whenPageHasLoaded() {
    createHybridChart("#chart1", "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/354533?res=3hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
    createHybridChart("#chart2", [
        "http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162081?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848",
        "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/354507?res=3hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848"
    ]);
    createHybridChart("#chart3", "http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162081?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
    createHybridChart("#chart4", "http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162163?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
}
function createHybridChart(elementId, url, locationToUpdate){
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
                location = new DataPointLocation(parsedData);
            }
            $(elementId).highcharts(location.options);

            if (url instanceof Array){
                for (var urlIndex = 1, otherDataUrl = null; otherDataUrl = url[urlIndex]; urlIndex++){
                    createHybridChart(elementId, otherDataUrl, location);
                }
            }
        }
    };
    http.open("GET", dataUrl, true);
    http.send();
}