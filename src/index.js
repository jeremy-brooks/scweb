/**
 * Created by Jeremy on 13/04/2016.
 */
function whenPageHasLoaded() {
    $('[data-toggle="popover"]').popover();
    var marineObsModel = new MarineObs();
    var marineObsService = new MarineObsService();
    addEventListener(SurfCrew.events.latestMarineObsUpdatedEvent, bootstrapLatestObs);
    marineObsService.getLatestObs("http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162081?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
    marineObsService.getLatestObs("http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162163?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");

}
function bootstrapLatestObs(event) {
    if (event && event.detail && event.detail instanceof Array) {
        for (var index = 0, loc = null; loc = event.detail[index]; index++) {
            try {
                var chartOptions = {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: loc.name + ' buoy data'
                    },
                    plotOptions: {
                        column: {
                            groupPadding: 0,
                            shadow: false
                        }
                    },
                    xAxis: loc.getLatestObs().xAxis,
                    series: loc.getLatestObs().series
                };
                $("#chart-"+loc.id+"").highcharts(chartOptions);
            } catch (e){
                console.log(e);
            }
        }
    }
}