var SurfCrew = SurfCrew || {};
SurfCrew.events = {
    latestRawDataLoadedEvent: "latestRawDataLoadedEvent",
    latestLocationDataChangedEvent: "latestLocationDataChangedEvent"
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