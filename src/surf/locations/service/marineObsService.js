/**
 * Created by Jeremy on 22/04/2016.
 */
var MarineObsService = function (dataTranformer) {
};
MarineObsService.prototype.getLatestObs = function (url) {
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
    http.open("GET", url, true);
    http.send();
};