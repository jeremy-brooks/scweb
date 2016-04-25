/**
 * Created by Jeremy on 13/04/2016.
 */
function whenPageHasLoaded() {
    new Locations();
    var marineObsService = new LocationDataService();
    addEventListener(SurfCrew.events.latestLocationDataChangedEvent, bootstrapLocationDataWithChart);
    marineObsService.getLatestObs();
}
function bootstrapLocationDataWithChart(event) {
    if (event && event.detail && event.detail instanceof Location) {
        var location = event.detail;
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
            xAxis: location.getLatestObs().xAxis,
            series: location.getLatestObs().series
        };
        $("#chart-"+location.id).highcharts(chartOptions);
    }
}