$(document).ready(function(){
  var Charts = function(){
    this.graphData = [];
  };

  Charts.prototype.graphChart = function () {
    var highchartConfig = {
      title: {
        text: 'Historical Gasoline Prices',
      },
      subtitle: {
        text: 'Bureau of Transportation Statistics (Multimodal)'
      },
      legend:{
        layout: "vertical",
        align: "right",
        verticalAlign: "middle"
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        max: 4.5,
        endOnTick: false,
        minorTickLength: 5,
        minorTickWidth: 1,
        minorGridLineColor: '#C5EEFA',
        minorTickInterval: 'auto',
        title: {
          text: 'Price (US$)'
        }
      },
      series: [{
        name: 'Weekly',
        data: this.graphData.reverse()
      }]
    };

    $('#chart').highcharts(highchartConfig);
  }

  Charts.prototype.getDataForOneTimePeriod = function () {
    $.ajax({
      context:this,
      type: 'GET',
      url: 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?trim_start=1995-01-02&trim_end=2012-10-15&auth_token=E6kNzExHjay2DNP8pKvB',
      success: function(response) {
        var items = response.data;
        for(var i = 0; i < items.length; i++){
          this.graphData.push({
            x:new Date(items[i][0]),
            y:items[i][1]
          });
        }
        this.graphChart();
      }
    })
  }

  var chart = new Charts();
  chart.getDataForOneTimePeriod()
})