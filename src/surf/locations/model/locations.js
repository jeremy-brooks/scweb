/**
 * Created by Jeremy on 22/04/2016.
 */
var Locations = function () {
    this.locations = [new MarineObsLocation("162081", "K2"),
        new MarineObsLocation("162163", "Brittany")];
    this.listenForLatestObsData(window, this);
};
Locations.prototype.getLocationById = function (locId) {
    for (var locIndex = 0, location = null; location = this.locations[locIndex]; locIndex++){
        if (location.id === locId){
            return location;
        }
    }
};
Locations.prototype.setAllLocationsLatestObs = function (locationObservations) {
    this.getLocationById(locationObservations.siteId).setLatestObs(locationObservations);
};
Locations.prototype.listenForLatestObsData = function (listener, responder) {
    listener.addEventListener(SurfCrew.events.latestMarineObsLoadedEvent, function (data) {
        responder.setAllLocationsLatestObs(data.detail);
    });
};