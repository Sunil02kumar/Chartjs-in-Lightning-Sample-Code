({
	callToServer : function(component, method, callback, params) {
        console.log('Calling helper callToServer function');
		var action = component.get(method);
        if(params){
            action.setParams(params);
        }
        console.log('****param to controller:'+JSON.stringify(params));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                callback.call(this,response.getReturnValue());
            }else if(state === "ERROR"){
                alert('Problem with connection. Please try again.');
            }
        });
		$A.enqueueAction(action);
    },
    loadChart : function(component, chartSection, componentName, params){
        console.log('*****load chart called'+chartSection);
        $A.createComponent(
            componentName, 
            params,
            function(chartBox) {
                //Add the dynamic chart to div
                if (component.isValid()) {
                    console.log('****creating the chart component');
                    var targetCmp = component.find(chartSection);
                    targetCmp.set("v.body",[]);
                    var body = targetCmp.get("v.body");
                    body.push(chartBox);
                    targetCmp.set("v.body", body);
                }
            }
        );
    },
    generateChartData: function (component,chartType,chartDivSectionId){
        
        var cDatask = component.get("v.ltngChartData");
        var cmpAttributes = {
            ltngChartData: cDatask,
            ltngChartType :chartType
        }
        
        if(cDatask.labels){
            this.loadChart(
                component,
                chartDivSectionId,
                "c:SK_ChartJsTemplate",
                cmpAttributes
            );    
        }
    }
})