/**
 * Created by Jeremy on 13/04/2016.
 */
function whenPageHasLoaded() {
    $('[data-toggle="popover"]').popover();
    new Locations();
    var locationDataService = new LocationDataService();
    addEventListener(SurfCrew.events.latestLocationDataChangedEvent, bootstrapLocationDataWithChart);
    locationDataService.getLatestData("http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162081?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
    locationDataService.getLatestData("http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162163?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
}
function bootstrapLocationDataWithChart(event) {
    if (event && event.detail && event.detail instanceof Location) {
        var location = event.detail;
        var chartOptions = {
            chart: {
                type: 'column'
            },
            title: {
                text: location.name + ' buoy data'
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
            xAxis: location.getLatestData().xAxis,
            series: location.getLatestData().series
        };
        $("#chart-"+location.id).highcharts(chartOptions);
    }
}