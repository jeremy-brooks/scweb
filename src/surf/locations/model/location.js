/**
 * Created by Jeremy on 01/05/2016.
 */
var DataPointLocation = function () {
    this.id = "";
    this.name = "unknown";
    this.type = "unknown";
    this.dataDate = null;
    this.seriesData = null;
    this.weatherParametersAvailable = null;

    (function (data) {
        var locationData = null;
        var metaData = null;
        var period = null;

        if (this.isDataValid(data)){
            try {
                metaData = data.SiteRep.DV;
                locationData = data.SiteRep.DV.Location;
                period = locationData.Period;
                this.id = locationData.i;
                this.name = locationData.name;
                this.dataDate = metaData.dataDate;
                this.type = metaData.type;
                this.weatherParametersAvailable = data.SiteRep.Wx.Param;
                this.seriesData = [];

                for (var paramIndex = 0, param = null; param = this.weatherParametersAvailable[paramIndex]; paramIndex++){
                    if (param.name !== "V" && param.name !== "D"){
                        this.seriesData.push({
                            units: param.units,
                            type: 'spline',
                            name: param.name,
                            data: []
                        });
                    }
                }

                for (var dataIndex = 0, dataItem = null; dataItem = period[dataIndex]; dataIndex++){

                    if (dataItem.Rep){
                        for (var repIndex = 0, rep = null; rep = dataItem.Rep[repIndex]; repIndex++){
                            var xDate = null;
                            for (var seriesIndex = 0, series = null; series = this.seriesData[seriesIndex]; seriesIndex++){
                                xDate = Date.parse(dataItem.value);
                                var xTime = Number(rep.$)*3600*1000;
                                xDate += xTime;
                                if (rep[series.name]){
                                    series.data.push(Number(rep[series.name]));
                                }
                            }
                        }
                    }

                }

                var a = null;

            } catch (error) {
                console.error("Something went wrong getting location detail from data|" + error);
            }
        }
    }).apply(this, arguments);
};
DataPointLocation.prototype.isDataValid = function (data) {
    if (data){
        if (data.SiteRep){
            if (data.SiteRep.DV && data.SiteRep.Wx && data.SiteRep.Wx.Param && data.SiteRep.DV.Location){
                return true;
            } else {
                console.warn("No location found in DV");
            }
        } else {
            console.warn("No SiteRep found in data to set new location");
        }
    } else {
        console.warn("No data found to set new location");
    }
    return false;
};