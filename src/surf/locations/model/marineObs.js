/**
 * Created by Jeremy on 22/04/2016.
 */
var MarineObs = function () {
    this.locations = [new MarineObsLocation("162081", "K2")];
    this.listenForLatestObsData(window, this);
};
MarineObs.prototype.getLocationById = function (locId) {
    for (var locIndex = 0, location = null; location = this.locations[locIndex]; locIndex++){
        if (location.id === locId){
            return location;
        }
    }
};
MarineObs.prototype.setAllLocationsLatestObs = function (locationObservations) {
    this.getLocationById(locationObservations.i).setLatestObs(locationObservations.Period);
    var dataLoadedEvent = document.createEvent("CustomEvent");
    dataLoadedEvent.initCustomEvent(SurfCrew.events.latestMarineObsUpdatedEvent, true, true, this.locations);
    dispatchEvent(dataLoadedEvent);
};
MarineObs.prototype.listenForLatestObsData = function (listener, responder) {
    listener.addEventListener(SurfCrew.events.latestMarineObsLoadedEvent, function (data) {
        responder.setAllLocationsLatestObs(data.detail.SiteRep.DV.Location);
    });
};