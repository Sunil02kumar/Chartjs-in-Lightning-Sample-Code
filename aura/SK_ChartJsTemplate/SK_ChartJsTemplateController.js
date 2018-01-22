({
    generateChart : function(component, event, helper) {
        //for bar chart
        var pieChartData = component.get("v.ltngChartData");
        console.log('****labels in generatechart in Lego_pieChart:'+JSON.stringify(pieChartData));
        var chartLabel = component.get("v.ltngChartType") + ':Opportunities Grouped By Forcast Category';
        var cdata = {
            labels: pieChartData.labels,
            datasets: [
                {
                    label:chartLabel,
                    data: pieChartData.dataValues,
                    backgroundColor: pieChartData.bgColorValues,
                    borderColor:'rgba(62, 159, 222, 1)',
                    fill: false,
                    pointBackgroundColor: "#FFFFFF",
                	pointBorderWidth: 4,
                	pointHoverRadius: 5,
                	pointRadius: 3,
                	bezierCurve: true,
                	pointHitRadius: 10
                }
            ]
        }
        
        //Get the context of the canvas element we want to select
        var ctx1 = component.find("chartdiv").getElement();
        var lineChart = new Chart(ctx1 ,{
            type: component.get("v.ltngChartType"),
            data: cdata,
            options: {	
                legend: {
                    position: 'bottom'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
     }
})