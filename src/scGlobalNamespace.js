var SurfCrew = SurfCrew || {};
SurfCrew.events = {
    latestRawDataLoadedEvent: "latestRawDataLoadedEvent",
    latestLocationDataChangedEvent: "latestLocationDataChangedEvent"
};
SurfCrew.windDirectionParams = {
    D: {
        units: "degrees",
        name: "Wind direction"
    }
};
SurfCrew.marineParams = {
    Wh: {
        units: "m",
        name: "Wave height"
    },
    Wp: {
        units: "s",
        name: "Wave period"
    },
    St: {
        units: "C",
        name: "Sea temperature"
    }
};
SurfCrew.pressureParams = {
    P: {
        units: "hpa",
        name: "Pressure"
    },
    Pt: {
        units: "Pa/s",
        name: "Pressure tendency"
    }
};
SurfCrew.visibilityParams = {
    V: {
        units: "",
        name: "Visibility"
    }
};
SurfCrew.standardParams = {
    Dp: {
        units: "Dp",
        name: "Dew point"
    },
    F: {
        units: "C",
        name: "Feels like temperature"
    },
    G: {
        units: "mph",
        name: "Wind gust"
    },
    H: {
        units: "%",
        name: "Screen relative humidity"
    },
    T: {
        units: "C",
        name: "Temperature"
    },
    S: {
        units: "mph",
        name: "Wind speed"
    },
    U: {
        units: "",
        name: "Max UV index"
    },
    Pp: {
        units: "%",
        name: "Precipitation probability"
    }
};
SurfCrew.highcharts = {
    createOptionsWithNameAndSeries: function (name, series) {
        return {
            title: {
                text: name
            },
            series: series,
            tooltip: {
                crosshairs: true,
                shared: true,
                formatter: function () {
                    var tooltip = "<b>" + new Date(this.x) + "</b>";
                    for (var pointIndex = 0, point = null; point = this.points[pointIndex]; pointIndex++) {
                        tooltip += '<br/><span style="color: ' + point.color + ';">';
                        tooltip += point.series.name + ": <b>" + point.y + point.series.userOptions.units + "</b>";
                        tooltip += "</span>"
                    }
                    return tooltip;
                }
            },
            yAxis: [{ //--- Primary yAxis
                title: {
                    text: null
                }
            }, { //--- Secondary yAxis
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return this.value + "%";
                    }
                },
                opposite: true,
                max: 100,
                min: 0
            }],
            xAxis: {
                type: "datetime"
            }
        };
    }
}