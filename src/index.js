/**
 * Created by Jeremy on 13/04/2016.
 */
function whenPageHasLoaded () {
    surfLocationLoader = new SurfLocationsLoader("data/favouriteSurfLocations.json");
    addEventListener(surfLocationLoader.locationsLoadedEventType, visualiseLocations);
    surfLocationLoader.load();
}
function visualiseLocations(event) {
    if(event && event.detail && event.detail instanceof Array){
        $("#locations").empty();
        for(var index = 0, location = null; location = event.detail[index]; index++){
            var listItem = document.createElement("li");
            listItem.setAttribute("class", "list-group-item");
            listItem.innerText = location.name;
            document.getElementById("locations").appendChild(listItem);
        }
    }
}