public class SK_ChartJsCmpController {
    public static List<string> bgColorCodesForChart = new List<string>{'#FF6384','#36A2EB','#bed2ce','#0abc70','#f5b022','#e85e7f'};
    @AuraEnabled
    public static ChartDataWrapper findDataSetForChart(){
        ChartDataWrapper cdataSet = new ChartDataWrapper();
        string queryString = 'SELECT ForecastCategoryName, SUM(Amount) FROM Opportunity GROUP BY ForecastCategoryName ';
        AggregateResult[] groupedResults =  database.query(queryString);
        
        integer count =0;
        for (AggregateResult ar : groupedResults)  
        {
            
            string clabel = string.valueof(ar.get('ForecastCategoryName'));
            string categorylabel = string.valueof(ar.get('ForecastCategoryName'));
            decimal amount = (decimal)ar.get('expr0');
            amount = amount != null ? (amount/1000000).setScale(2) : 0;
            cdataSet.labels.add(clabel + '('+string.valueof(amount)+')');
            cdataSet.dataValues.add(string.valueof(amount));
            if(bgColorCodesForChart[count] != null){
                cdataSet.bgColorValues.add(bgColorCodesForChart[count]);
                count++;
            }
            System.debug('ForecastCategoryName:' + clabel);
            System.debug('Sum amount' + string.valueof(amount));
        }
        return cdataSet;
    }
    
    public class ChartDataWrapper{
        @AuraEnabled
        public list<string> labels{get;set;}
        @AuraEnabled
        public list<string> dataValues{get;set;}
        @AuraEnabled
        public list<string> bgColorValues{get;set;}
        public ChartDataWrapper(){
            labels =new list<string> ();
            dataValues = new list<string> ();
            bgColorValues = new list<string> ();
        }
    }

}