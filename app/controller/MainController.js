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
           configureView: 'configureview'
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
        this.getCardView().setActiveItem(2)
   }
})
  