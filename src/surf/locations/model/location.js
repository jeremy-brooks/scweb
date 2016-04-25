/**
 * Created by Jeremy on 22/04/2016.
 */
var Location = function (id, name) {
    this.id = id;
    this.name = name;
    this._latestObs = null;
};
Location.prototype.setLatestObs = function (obs) {
    obs.title = {
        text: this.name + ' buoy data'
    };
    this._latestObs = obs;
    var locationDataChangedEvent = document.createEvent("CustomEvent");
    locationDataChangedEvent.initCustomEvent(SurfCrew.events.latestLocationDataChangedEvent, true, true, this);
    dispatchEvent(locationDataChangedEvent);
};
Location.prototype.getLatestData = function () {
    return this._latestObs;
};