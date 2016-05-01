var SurfCrew = SurfCrew || {};
SurfCrew.events = {
    latestRawDataLoadedEvent: "latestRawDataLoadedEvent",
    latestLocationDataChangedEvent: "latestLocationDataChangedEvent"
};
SurfCrew.highcharts = {
    data: {
        transformMarineObs: function (data) {
            var obs = [];
            var weatherParams = data.SiteRep.Wx.Param;
            var siteId = "unknown";
            var locationRep = data.SiteRep.DV.Location;

            if (locationRep) {
                siteId = locationRep.i;
                obs = locationRep.Period;
                var dateNow = new Date();

                var xAxis = {
                    categories: [
                        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
                    ]
                };

                var yAxis = [{ //--- Secondary yAxis
                    title: {
                        text: 'Wave height'
                    }
                }, { //--- Primary yAxis
                    title: {
                        text: 'Wave period'
                    }
                }, { //--- Secondary yAxis
                    title: {
                        text: 'Wind speed'
                    },
                    opposite: true
                }];

                var series = [];

                var waveHeight = {
                    unit: "m",
                    yAxis: 0,
                    type: 'column',
                    name: 'Wave height (m)',
                    data: []
                };
                var wavePeriod = {
                    unit: "secs",
                    yAxis: 1,
                    type: 'column',
                    name: 'Wave period (s)',
                    data: []
                };
                var windSpeed = {
                    unit: "kn",
                    yAxis: 2,
                    type: 'spline',
                    name: 'Wind speed (kn)',
                    data: []
                };

                var chartOptions = {
                    siteId: siteId,
                    chart: {
                        type: 'column'
                    },
                    plotOptions: {
                        column: {
                            groupPadding: 0,
                            shadow: false
                        },
                        spline: {
                            dataLabels: {
                                enabled: true,
                                formatter: function () {
                                    return this.y + " " + this.series.userOptions.unit;
                                }
                            },
                            enableMouseTracking: false
                        }
                    },
                    yAxis: yAxis,
                    xAxis: xAxis,
                    series: series
                };

                series.push(waveHeight);
                series.push(wavePeriod);
                series.push(windSpeed);

                for (var periodIndex = 0, period = null; period = obs[periodIndex]; periodIndex++) {
                    var reportForDate = period.value;
                    var reportData = period.Rep;
                    for (var dataIndex = 0, locData = null; locData = reportData[dataIndex]; dataIndex++) {
                        waveHeight.data.push(Number(locData.Wh) || NaN);
                        wavePeriod.data.push(Number(locData.Wp) || NaN);
                        windSpeed.data.push(Number(locData.S) || NaN);
                    }
                }

                return chartOptions;
            } else {
                console.warn("No data found for location");
                return null;
            }
        }
    }
};