/**
 * Created by Jeremy on 01/05/2016.
 */
var ForecastLocation = function () {
    this.id = "";
    this.name = "unknown";
    this.type = "unknown";
    this.dataDate = null;
    this.dataSeries = null;

    (function (data) {
        var locationData = null;
        var metaData = null;
        if (data){
            if (data.SiteRep){
                if (data.SiteRep.DV && data.SiteRep.DV.Location){
                    try {
                        metaData = data.SiteRep.DV;
                        locationData = data.SiteRep.DV.Location;
                        this.id = locationData.i;
                        this.name = locationData.name;
                        this.dataDate = metaData.dataDate;
                        this.type = metaData.type;
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