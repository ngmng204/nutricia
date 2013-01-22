 
var tpl = new Ext.XTemplate(
            '<tpl for=".">',
                            '<input type="checkbox" onchange="saveStatusOfAcid(this.id)" id="{[values.id]}" {[this.changeStatus(values.choose)]} /> {[values.name]}', //{[this.changeStatus(values.check)]}
                          
                            
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
        //title: 'Acid List View',
		//iconCls: 'user',
        store: 'AcidStore',       
        //useTitleAsBackText: true,
        itemTpl: tpl
    }
});

function saveStatusOfAcid(id){
    var storeName = 'AcidStore';
    sencha.app.storeName = 'AcidStore';
    saveByStore(id, storeName)
    
}
//function queryForSaving(tx){
//    console.log("save")
//    console.log(sencha.app.checkAcid)
//    
//    tx.executeSql("select * from acids where id=" + sencha.app.checkAcid, [],success , error)
//    
//}
//function saveByStore(id, storeName){
//    
//    var acidStore = Ext.getStore(sencha.app.storeName);
//    var currentRecord = acidStore.findRecord('id', id)
//    
//    
//    var check = currentRecord.get("choose");
//    if(check == 1) currentRecord.set('choose', 0)
//        else currentRecord.set('choose', 1);
//    
//    
//    sencha.app.checkAcid = id;
//    var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
//    db.transaction(queryForSaving, error);
//    
//}
