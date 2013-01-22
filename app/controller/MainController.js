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
           settingButton: '#setting-btn'
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
        db.transaction(updateDoneStatus, error)
        this.getCardView().setActiveItem(2)
    },
    onSettingButtonTap: function(){
        console.log("onSettingButtonTap")
        this.getCardView().setActiveItem(0)
    }
})




function updateDoneStatus(tx){
        tx.executeSql("update done_status set done_status=1", [], updateDoneStatusSuccess, error)
}
function updateDoneStatusSuccess(tx, results){
    console.log("update done status success")
}