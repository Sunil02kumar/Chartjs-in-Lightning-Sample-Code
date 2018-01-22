({
	doInit : function(component, event, helper) {
        var params ={};
		helper.callToServer(
        	component,
            "c.findDataSetForChart",
            function(response)
            {	
                console.log('apex response :'+JSON.stringify(response));
                component.set("v.ltngChartData",response);
                
                //display line chart
                helper.generateChartData(component,"line","lineChartSection");
                //display horrizontal bar chart
                helper.generateChartData(component,"bar","horrizontalBarChartSection");
                //display Pie chart
                helper.generateChartData(component,"pie","pieChartSection");
            }, 
            params
		);
    }
})