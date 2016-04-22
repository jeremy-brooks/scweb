/**
 * Created by Jeremy on 13/04/2016.
 */
function whenPageHasLoaded () {
    var marineObsModel = new MarineObs();
    var marineObsService = new MarineObsService();
    addEventListener(SurfCrew.events.latestMarineObsUpdatedEvent, bootstrapLatestObs);
    marineObsService.getLatestObs();
}
function bootstrapLatestObs(event) {
    if(event && event.detail && event.detail instanceof Array){
        for (var index = 0, loc = null; loc = event.detail[index]; index++){
            document.getElementById("k2obs").innerHTML += loc.name;
        }
    }
}