/**
 * Created by Jeremy on 22/04/2016.
 */
var MarineObsService = function (dataTranformer) {
    this.url = "http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162081?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848";
};
MarineObsService.prototype.getLatestObs = function () {
    var http = new XMLHttpRequest();
    var loadedData = null;
    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200){
            loadedData = JSON.parse(http.responseText);
            var highchartsReadyData = SurfCrew.highcharts.data.transformMarineObs(loadedData);
            var dataLoadedEvent = document.createEvent("CustomEvent");
            dataLoadedEvent.initCustomEvent(SurfCrew.events.latestMarineObsLoadedEvent, true, true, highchartsReadyData);
            dispatchEvent(dataLoadedEvent);
        }
    };
    http.open("GET", this.url, true);
    http.send();
};