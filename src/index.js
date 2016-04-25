/**
 * Created by Jeremy on 13/04/2016.
 */
function whenPageHasLoaded() {
    var marineObsModel = new MarineObs();
    var marineObsService = new MarineObsService();
    addEventListener(SurfCrew.events.latestMarineObsUpdatedEvent, bootstrapLatestObs);
    marineObsService.getLatestObs();
}
function bootstrapLatestObs(event) {
    if (event && event.detail && event.detail instanceof Array) {
        for (var index = 0, loc = null; loc = event.detail[index]; index++) {
            var chartOptions = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'K2 buoy data'
                },
                plotOptions: {
                    column: {
                        groupPadding: 0,
                        shadow: false
                    },
                    spline: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                yAxis: {
                    title: {
                        text: 'K2 buoy observations'
                    }
                },
                xAxis: loc.getLatestObs().xAxis,
                series: loc.getLatestObs().series
            };
            $("#k2chart").highcharts(chartOptions);
        }
    }
}