var SurfCrew = SurfCrew || {};
SurfCrew.events = {
    latestRawDataLoadedEvent: "latestRawDataLoadedEvent",
    latestLocationDataChangedEvent: "latestLocationDataChangedEvent"
};
SurfCrew.highcharts = {
    data: {
        transformMarineObs: function (data) {
            /*
             xAxis: {
             categories: ['Apples', 'Bananas', 'Oranges']
             }

             series: [{
             type: 'column',
             name: 'Swell height',
             data: [1, 2, 4]
             }
             */
            var dateNow = new Date();

            var xAxis = {
                categories: [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
                ]
            };
            var series = [];

            var weatherParams = data.SiteRep.Wx.Param;

            var obs = data.SiteRep.DV.Location.Period;
            
            var siteId = data.SiteRep.DV.Location.i;

            var waveHeight = {
                type: 'spline',
                name: 'Wave height (m)',
                data: []
            };
            var wavePeriod = {
                type: 'spline',
                name: 'Wave period (s)',
                data: []
            };
            var windSpeed = {
                type: 'spline',
                name: 'Wind speed (kn)',
                data: []
            };
            var windDirection = {
                type: 'column',
                name: 'Wind direction',
                data: []
            };
            series.push(windSpeed);
            //series.push(windDirection);
            series.push(waveHeight);
            series.push(wavePeriod);

            for (var periodIndex = 0, period = null; period = obs[periodIndex]; periodIndex++) {
                var reportForDate = period.value;
                var reportData = period.Rep;
                for (var dataIndex = 0, data = null; data = reportData[dataIndex]; dataIndex++) {
                    waveHeight.data.push(Number(data.Wh));
                    wavePeriod.data.push(Number(data.Wp));
                    windSpeed.data.push(Number(data.S));
                    windDirection.data.push(data.D);
                }
            }
            return {
                siteId: siteId, 
                //xAxis: xAxis,
                series: series
            }
        }
    }
};