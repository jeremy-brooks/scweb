/**
 * Created by Jeremy on 01/05/2016.
 */
var DataPointLocation = function (data, paramKeysToLookFor) {
    this.id = "";
    this.name = "unknown";
    this.type = "unknown";
    this.dataDate = null;
    this.series = null;
    this.weatherParametersAvailable = null;
    this.options = null;
    this.paramKeysToLookFor = paramKeysToLookFor;

    if (this.isDataValid(data)) {
        try {
            this.setId(data);
            this.setName(data);
            this.setDataDate(data);
            this.setLocationType(data);
            this.setWeatherParams(data);
            this.setSeries(data);
            this.setDataInSeries(data);
            this.options = SurfCrew.highcharts.createOptionsWithNameAndSeries(this.name, this.series);
        } catch (error) {
            console.error("Something went wrong getting location detail from data|" + error);
        }
    }
};
DataPointLocation.prototype.setId = function (data) {
    this.id = data.SiteRep.DV.Location.i;
};
DataPointLocation.prototype.setName = function (data) {
    this.name = data.SiteRep.DV.Location.name;
};
DataPointLocation.prototype.setDataDate = function (data) {
    this.dataDate = data.SiteRep.DV.dataDate;
};
DataPointLocation.prototype.setLocationType = function (data) {
    this.type = data.SiteRep.DV.type;
};
DataPointLocation.prototype.setWeatherParams = function (data) {
    this.weatherParametersAvailable = data.SiteRep.Wx.Param;
};
DataPointLocation.prototype.setDataInSeries = function (data) {
    var period = data.SiteRep.DV.Location.Period;
    for (var dataIndex = 0, dataItem = null; dataItem = period[dataIndex]; dataIndex++) {
        if (dataItem.Rep) {
            for (var repIndex = 0, rep = null; rep = dataItem.Rep[repIndex]; repIndex++) {
                var xDate = null;
                for (var seriesIndex = 0, series = null; series = this.series[seriesIndex]; seriesIndex++) {
                    var date = new Date(dataItem.value);
                    if (rep[series.id]) {
                        series.data.push([date.getTime() + (Number(rep.$) * 60 * 1000), Number(rep[series.id])]);
                    }
                }
            }
        }
    }
};
DataPointLocation.prototype.setSeries = function (data) {
    var params = data.SiteRep.Wx.Param;
    this.series = [];
    for (var paramIndex = 0, param = null; param = params[paramIndex]; paramIndex++) {
        if (this.paramKeysToLookFor[param.name]) {
            this._addWeatherParamSeriesToLocation(param);
        }
    }
};
DataPointLocation.prototype._addWeatherParamSeriesToLocation = function (param) {
    this.series.push({
        yAxis: (param.name === "H" || param.name === "Pp") ? 1 : 0,
        units: param.units,
        type: 'scatter',
        id: param.name,
        name: param.$,
        data: []
    });
};
DataPointLocation.prototype.addHoursToDate = function (hours, date) {
    date.setTime(date.getTime() + (hours * 3600));
    return date;
};
DataPointLocation.prototype.isDataValid = function (data) {
    if (data) {
        if (data.SiteRep) {
            if (data.SiteRep.DV && data.SiteRep.Wx && data.SiteRep.Wx.Param && data.SiteRep.DV.Location) {
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
DataPointLocation.prototype.setAdditionalName = function (data) {
    this.name += " | " + data.SiteRep.DV.Location.name;
    this.options.title.text = this.name;
};

DataPointLocation.prototype.pushDataIntoSeries = function (data) {
    var seriesAlreadyExists = false;
    var newWeatherParameters = null;
    if (this.isDataValid(data) && this.series && this.weatherParametersAvailable) {
        newWeatherParameters = data.SiteRep.Wx.Param;
        this.setAdditionalName(data);
        for (var newParamIndex = 0, newParam = null; newParam = newWeatherParameters[newParamIndex]; newParamIndex++) {
            if (this.paramKeysToLookFor[newParam.name]) {
                for (var paramIndex = 0, param = null; param = this.weatherParametersAvailable[paramIndex]; paramIndex++) {
                    if (newParam.name === param.name) {
                        seriesAlreadyExists = true;
                        break;
                    }
                }
                if (!seriesAlreadyExists) {
                    this._addWeatherParamSeriesToLocation(newParam);
                }
            }
            seriesAlreadyExists = false;
        }
        this.setDataInSeries(data);
    } else {
        console.warn("Data was invalid or location has not been constructed with data.");
    }
};