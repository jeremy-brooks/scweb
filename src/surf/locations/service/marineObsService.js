/**
 * Created by Jeremy on 22/04/2016.
 */
var MarineObsService = function () {
    this.url = "data/sampleK2obs.json";
};
MarineObsService.prototype.getLatestObs = function () {
    var http = new XMLHttpRequest();
    var loadedData = null;
    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200){
            loadedData = JSON.parse(http.responseText);
            var dataLoadedEvent = document.createEvent("CustomEvent");
            dataLoadedEvent.initCustomEvent(SurfCrew.events.latestMarineObsLoadedEvent, true, true, loadedData);
            dispatchEvent(dataLoadedEvent);
        }
    };
    http.open("GET", this.url, true);
    http.send();
};