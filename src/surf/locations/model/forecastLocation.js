/**
 * Created by Jeremy on 01/05/2016.
 */
var ForecastLocation = function () {
    this.id = "";
    this.name = "none";
    this.dataSeries = null;

    (function (data) {
        var locationData = null;
        if (data){
            if (data.SiteRep){
                if (data.SiteRep.DV && data.SiteRep.DV.Location){
                    try {
                        locationData = data.SiteRep.DV.Location;
                        this.id = locationData.i;
                        this.name = locationData.name;
                    } catch (error) {
                        console.error("Something went wrong getting location detail from data|" + error);
                    }
                } else {
                    console.error("No location found in DV");
                }
            } else {
                console.warning("No SiteRep found in data to set new location");
            }
        } else {
            console.warning("No data found to set new location");
        }
    }).apply(this, arguments);
};