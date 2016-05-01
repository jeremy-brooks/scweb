/**
 * Created by Jeremy on 22/04/2016.
 */
var Locations = function () {
    this.locations = [
        new OldLocation("162081", "K2"),
        new OldLocation("162163", "Brittany"),
        new OldLocation("354507", "Croyde"),
        new OldLocation("354533", "Watergate Bay")
    ];
    this.listenForLatestObsData(window, this);
};
Locations.prototype.getLocationById = function (locId) {
    for (var locIndex = 0, location = null; location = this.locations[locIndex]; locIndex++) {
        if (location.id === locId) {
            return location;
        }
    }
};
Locations.prototype.setLocationData = function (locationData) {
    if (locationData && locationData.siteId){
        this.getLocationById(locationData.siteId).setLatestObs(locationData);
    }
};
Locations.prototype.listenForLatestObsData = function (listener, responder) {
    listener.addEventListener(SurfCrew.events.latestRawDataLoadedEvent, function (data) {
        responder.setLocationData(data.detail);
    });
};