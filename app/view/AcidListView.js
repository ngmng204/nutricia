 
var tpl = new Ext.XTemplate(
            '<tpl for=".">',
                            '<input type="checkbox" onchange="saveStatusOfVitamin(this.id)" id="{[values.id]}" {[this.changeStatus(values.choose)]} /> {[values.name]}', //{[this.changeStatus(values.check)]}
                          
                            
            '</tpl>',
            {
                changeStatus: function(check){
                    if(check == 1){
                        console.log("true")
                        return  "checked";
                    }else{
                         console.log("uncheck")
                        return  '';
                    }
                }                      
            
            }
            
                            
);
Ext.define('sencha.view.AcidListView', {
    extend: 'Ext.List',
    xtype: 'acidlistview',
    config: {
        store: 'AcidStore',
        itemTpl: tpl
    }
});

function saveStatusOfVitamin(id){
    var storeName = 'AcidStore';
    sencha.app.currentId = id;
    saveByStore(id, storeName)
    
}