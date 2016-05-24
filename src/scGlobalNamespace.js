var SurfCrew = SurfCrew || {};
SurfCrew.events = {
    latestRawDataLoadedEvent: "latestRawDataLoadedEvent",
    latestLocationDataChangedEvent: "latestLocationDataChangedEvent"
};
SurfCrew.windDirectionParams = {
    D: {
        units: "degrees",
        name: "Wind direction",
        intervals: {
            N: 360,
            NNE: 22.5,
            NE: 45,
            ENE: 67.5,
            E: 90,
            ESE: 112.5,
            SE: 135,
            SSE: 157.5,
            S: 180,
            SSW: 202.5,
            SW: 225,
            WSW: 247.5,
            W: 270,
            WNW: 292.5,
            NW: 315,
            NNW: 337.5
        }
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
    },
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