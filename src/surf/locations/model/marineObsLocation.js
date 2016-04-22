/**
 * Created by Jeremy on 22/04/2016.
 */
var MarineObsLocation = function (id, name) {
    this.id = id;
    this.name = name;
    this._latestObs = [];
};
MarineObsLocation.prototype.setLatestObs = function (obs) {
    this._latestObs.length = 0;
    for (var obIndex = 0, ob = null; ob = obs[obIndex]; obIndex++){
        this._latestObs.push(ob);
    }
};
MarineObsLocation.prototype.getLatestObs = function () {
    return this._latestObs;
};