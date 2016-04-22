/**
 * Created by Jeremy on 22/04/2016.
 */
var MarineObs = function () {
    this.locations = [];
};
MarineObs.prototype.getLocationById = function (locId) {
    for (var locIndex = 0, location = null; location = this.locations[locIndex]; locIndex++){
        if (location.id === locId){
            return location;
        }
    }
};