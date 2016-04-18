/**
 * Created by Jeremy on 13/04/2016.
 */
var SurfLocationsLoader = function (surfLocationsUri) {
    this.surfLocationUri = "";
    this.locationsLoadedEventType = "locationsLoadedEvent";
    
    (function _init (scope) {
        scope.surfLocationUri = surfLocationsUri;
    })(this);
};
SurfLocationsLoader.prototype.load = function () {
    var http = new XMLHttpRequest();
    http.customEventType = this.locationsLoadedEventType;
    var loadedData = null;
    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200){
            loadedData = JSON.parse(http.responseText);
            var dataLoadedEvent = document.createEvent("CustomEvent");
            dataLoadedEvent.initCustomEvent(http.customEventType, true, true, loadedData);
            dispatchEvent(dataLoadedEvent);
        }
    };
    http.open("GET", this.surfLocationUri, true);
    http.send();
};