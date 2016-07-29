/**
 * Created by Jeremy on 13/04/2016.
 */
function whenPageHasLoaded() {
    createHybridCharts();
}
function createHybridCharts() {
    new HybridChart("#chart1", "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/354533?res=3hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
    //new HybridChart("#chart2", "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/354507?res=3hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
    new HybridChart("#chart2", [
        "http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162107?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848",
        "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/354533?res=3hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848"
    ]);
    new HybridChart("#chart3", [
        "http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162107?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848",
        "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/354507?res=3hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848"
    ]);
    new HybridChart("#chart4", "http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162107?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
    new HybridChart("#chart5", "http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162081?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
    new HybridChart("#chart6", "http://datapoint.metoffice.gov.uk/public/data/val/wxmarineobs/all/json/162163?res=hourly&key=27a379e8-5ddf-4f92-9153-d4d2ca731848");
}
