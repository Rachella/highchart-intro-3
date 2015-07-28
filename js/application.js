$(document).ready(function(){
  var Charts = function(){
  this.weeklyGraphData = [];
  monthlyGraphData = [];  
  quarterlyGraphData = [];  
  yearlyGraphData = [];
  };

  // Charts.prototype.calcSMA = function(weeklyGraphPeriod, period) {
  //   for (var i = 0; i < weeklyGraphPeriod.length; i++) {
  //     while (var j = period; j > 0; j++) {
  //       sum += weeklyGraphPeriod[i+j];
  //     }
  //     timePeriod.push({
  //       x: weeklyGraphData[i][0],
  //       y: (sum / period)
  //     });
  //   }
  // };


  Charts.prototype.weeklyGraphPeriod = function () {
    var callbackFunction = function(response){
      var items = response.data;      
      for(var i = 0; i < items.length; i++){
        this.weeklyGraphData.push({
          x:new Date(items[i][0]),
          y:items[i][1]
        });
      }      
    this.graphChart(); 
    }

    $.ajax({
      context:this,
      type: 'GET',
      url: 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?trim_start=1995-01-02&trim_end=2012-10-15&auth_token=E6kNzExHjay2DNP8pKvB',
      success: callbackFunction,
    })
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
      series: [
        {
          name: 'Yearly',
          data: yearlyGraphData.reverse()
        },{
          name: 'Quarterly',
          data: quarterlyGraphData.reverse()
        },
        {
          name: 'Monthly',
          data: monthlyGraphData.reverse()
        },
        {
          name: 'Weekly',
          data: this.weeklyGraphData.reverse()
        }
      ]
    };

    $('#chart').highcharts(highchartConfig);
  }; 

  var chart = new Charts();
  chart.weeklyGraphPeriod();  
  chart.monthlyGraphPeriod();  
  chart.quarterlyGraphPeriod();  
  chart.yearlyGraphPeriod();

})


