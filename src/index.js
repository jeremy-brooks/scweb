/**
 * Created by Jeremy on 13/04/2016.
 */
function whenPageHasLoaded() {
    $('[data-toggle="popover"]').popover();
    new Locations();
    var locationDataService = new LocationDataService();
    addEventListener(SurfCrew.events.latestLocationDataChangedEvent, bootstrapLocationDataWithChart);
    locationDataService.getLatestData("http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162081?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
    locationDataService.getLatestData("http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162163?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
    locationDataService.getLatestData("http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/354507?res=3hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
    locationDataService.getLatestData("http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/354533?res=3hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
}
function bootstrapLocationDataWithChart(event) {
    if (event && event.detail && event.detail instanceof OldLocation) {
        var location = event.detail;
        $("#chart-"+location.id).highcharts(location.getLatestData());
    }
}
function createHybridChart(){
    var url = "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/354507?res=3hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848";
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200){
            var parsedData = JSON.parse(http.responseText);
            var location = new DataPointLocation(parsedData);
        }
    };
    http.open("GET", url, true);
    http.send();
}