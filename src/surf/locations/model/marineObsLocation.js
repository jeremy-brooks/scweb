/**
 * Created by Jeremy on 22/04/2016.
 */
var MarineObsLocation = function (id, name) {
    this.id = id;
    this.name = name;
    this._latestObs = null;
};
MarineObsLocation.prototype.setLatestObs = function (obs) {
    this._latestObs = obs;
};
MarineObsLocation.prototype.getLatestObs = function () {
    return this._latestObs;
};