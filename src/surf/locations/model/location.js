/**
 * Created by Jeremy on 01/05/2016.
 */
var DataPointLocation = function () {
    this.id = "";
    this.name = "unknown";
    this.type = "unknown";
    this.dataDate = null;
    this.data = null;
    this.weatherParametersAvailable = null;
    this.dataSeries = null;

    (function (data) {
        var locationData = null;
        var metaData = null;
        var data = null;
        if (data){
            if (data.SiteRep){
                if (data.SiteRep.DV && data.SiteRep.Wx && data.SiteRep.DV.Location){
                    try {
                        metaData = data.SiteRep.DV;
                        locationData = data.SiteRep.DV.Location;
                        data = locationData.Period;
                        this.id = locationData.i;
                        this.name = locationData.name;
                        this.dataDate = metaData.dataDate;
                        this.type = metaData.type;
                        this.weatherParametersAvailable = data.SiteRep.Wx.Param;
                        this.data = [];

                        for (var dataIndex = 0, dataItem = null; dataItem = data[dataIndex]; dataIndex++){
                            if (dataItem.Rep){
                                for (var repIndex = 0, rep = null; rep = dataItem.Rep[repIndex]; repIndex++){
                                    for (var paramIndex = 0, param = null; param = this.weatherParametersAvailable[paramIndex]; paramIndex++){
                                        if (rep[param.name]){
                                            this.data.push({
                                                x: dataItem.value,
                                                y: param.name,
                                                name: param.$
                                            });
                                        }
                                    }
                                    // var dataPoint = {
                                    //     x: dataItem.value,
                                    //     y: rep
                                    // };
                                    // this.data.push[dataPoint];
                                }
                            }
                        }

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