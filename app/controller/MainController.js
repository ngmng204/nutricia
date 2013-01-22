Ext.define("sencha.controller.MainController", {
	extend: "Ext.app.Controller",
	config:{
		refs:{
           vitaminButton: '#vitamin-btn',
           mineralButton: '#mineral-btn',
           precausionButton: '#precausion-btn',
           acidButton: '#acid-btn',
           cardView: 'cardview',
           doneButton: '#done-btn',
           configureView: 'configureview',
           settingButton: '#setting-btn',
           diseaseListView: 'diseaselistview'
		},
		control:{
           'vitaminButton':{
                tap:'onVitaminButtonTap' 
           },
           'acidButton':{
                tap: 'onAcidButtonTap'
           },
           'mineralButton':{
                tap: 'onMineralButtonTap'
           },
           'precausionButton':{
                tap: 'onPrecausionButtonTap'
           },
           'configureView':{
                push: 'onConfigureViewPush',
                pop: 'onConfigureViewPop'
           
           },
           'doneButton':{
                tap: 'onDoneButtonTap'
           },
           'settingButton': {
                tap: 'onSettingButtonTap'    
           },
           'diseaseListView': {
                itemtap: 'onDiseaseItemSelect'   
           }
           
        }
    },
    init: function(){
            console.log("init")
    },
    onConfigureViewPop: function(){
            console.log("onConfigureViewPop")
            this.getAcidButton().show();
            this.getVitaminButton().show();
            this.getDoneButton().show();
    },
    onConfigureViewPush: function(){
           console.log("onConfigureViewPop")
           this.getAcidButton().hide();
           this.getVitaminButton().hide();
           this.getDoneButton().hide();
    },
    onVitaminButtonTap: function(){
           console.log("onVitaminButtonTap")
           this.getConfigureView().push({xtype:'vitaminlistview'})
    },
    onMineralButtonTap: function(){
            this.getConfigureView().push({xtype: 'minerallistview'})
    },
    onAcidButtonTap: function(){
            this.getConfigureView().push({xtype: 'acidlistview'})
    },
    onPrecausionButtonTap: function(){
            this.getConfigureView().push({xtype: 'precausionlistview'})
    },
    onDoneButtonTap: function(){
        console.log("onDoneButtonTap")
           
        var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        db.transaction(updateDoneStatus, error);
        // Then save statement of query products
        db.transaction(saveQueryStatement, error)
        this.getCardView().setActiveItem(2)
    },
    onSettingButtonTap: function(){
        console.log("onSettingButtonTap")
        this.getCardView().setActiveItem(0)
    },
    onDiseaseItemSelect: function(list, index, node, record ){
            console.log(record.data.id)
            //save checked
           sencha.app.currentDiseaseSelected = record.data.id
           var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
           db.transaction(saveCheckedItemOfDisease, error);
    }
})
function saveCheckedItemOfDisease(tx){
        //unselected for all
        tx.executeSql("update diseases set choose=0", [], updateDoneStatusSuccess, error)
        //set selected for current item
        tx.executeSql("update diseases set choose=1 where id=" + sencha.app.currentDiseaseSelected, [], updateDoneStatusSuccess, error)
        
}
function saveQueryStatement(tx){
        //get Disease Selected
        tx.executeSql('select * from diseases where choose=1', [], function(tx, results){
                  sencha.app.queryChekedCurrent = "disease"
                  queryChekedSuccess(sencha.app.queryChekedCurrent, results, tx)
                  tx.executeSql('update query_statement set query_string="'+ sencha.app.conditionStr + '"', [], updateDoneStatusSuccess, error)
        }, error)
        //get checked of vitamins
        tx.executeSql('select * from vitamins where choose=1', [], function(tx, results){
                      sencha.app.queryChekedCurrent = "vitamins"
                      queryChekedSuccess(sencha.app.queryChekedCurrent, results)
                      tx.executeSql('update query_statement set query_string="'+ sencha.app.conditionStr + '"', [], updateDoneStatusSuccess, error)
                  }, error)
        //get checked of acids
        tx.executeSql('select * from acids where choose=1', [], function(tx, results){
                  sencha.app.queryChekedCurrent = "acids"
                  queryChekedSuccess(sencha.app.queryChekedCurrent, results, tx)
                  tx.executeSql('update query_statement set query_string="'+ sencha.app.conditionStr + '"', [], updateDoneStatusSuccess, error)
                  }, error)
        tx.executeSql('select * from minerals where choose=1', [], function(tx, results){
                  sencha.app.queryChekedCurrent = "minerals"
                  queryChekedSuccess(sencha.app.queryChekedCurrent, results, tx)
                  tx.executeSql('update query_statement set query_string="'+ sencha.app.conditionStr + '"', [], updateDoneStatusSuccess, error)
                  }, error)
        tx.executeSql('select * from precausions where choose=1', [], function(tx, results){
                  sencha.app.queryChekedCurrent = "precausions"
                  queryChekedSuccess(sencha.app.queryChekedCurrent, results, tx)
                  tx.executeSql('update query_statement set query_string="'+ sencha.app.conditionStr + '"', [], updateDoneStatusSuccess, error)
        }, error)
        
}
function queryChekedSuccess(current, results, tx){
        var conditionStr =""
        if(current == "disease"){
            if(results.rows.length == 0){
                alert("You have to choose atleaset a disease for filtering")
            }else{
                //save to database disease checked
                //add to condition string
                var diseaseSelected = results.rows.item(0).id
                conditionStr += "select * from products where disease="+diseaseSelected
                sencha.app.conditionStr += conditionStr;
            }
        }
        else if(current == "vitamins"){
            if(results.rows.length == 0){}
            else{
                for(var i=0; i<results.rows.length; i++){
                    if(i==(results.rows.length-1)){
                            conditionStr += "vitamins like '%" + results.rows.item(i).id + "%'";
                    }else{
                            conditionStr += "vitamins like '%" + results.rows.item(i).id + "%' or ";
                    }
                }
                sencha.app.conditionStr += " and (" + conditionStr + ")";
            }
            
        }else if(current == "acids"){
            if(results.rows.length == 0){}
            else{
                for(var i=0; i< results.rows.length; i++){
                    if(i==(results.rows.length-1)){
                        conditionStr += "acids like '%" + results.rows.item(i).id + "%'";
                    }else{
                        conditionStr += "acids like '%" + results.rows.item(i).id + "%' or ";
                    }
                }
                sencha.app.conditionStr += " and (" + conditionStr + ")";
            }
        }else if(current == "minerals"){
            if(results.rows.length == 0){}
            else{
                for(var i=0; i< results.rows.length; i++){
                    if(i==(results.rows.length-1)){
                        conditionStr += "minerals like '%" + results.rows.item(i).id + "%'";
                    }else{
                        conditionStr += "minerals like '%" + results.rows.item(i).id + "%' or ";
                    }
                }
                sencha.app.conditionStr += " and (" + conditionStr + ")";
            }
        }
        else if(current == "precausions"){
            if(results.rows.length == 0){}
            else{
                for(var i=0; i< results.rows.length; i++){
                    if(i==(results.rows.length-1)){
                        conditionStr += "precausions like '%" + results.rows.item(i).id + "%'";
                    }else{
                        conditionStr += "precausions like '%" + results.rows.item(i).id + "%' or ";
                    }
                }
                sencha.app.conditionStr += " and (" + conditionStr + ")";
            }
        }
        //save conditionString
        
        console.log(sencha.app.conditionStr)
        
}

function updateDoneStatus(tx){
        tx.executeSql("update done_status set done_status=1", [], updateDoneStatusSuccess, error)
}
function updateDoneStatusSuccess(tx, results){
    console.log("update done status success")
}