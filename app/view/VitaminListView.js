
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
Ext.define('sencha.view.VitaminListView', {
           extend: 'Ext.List',
           xtype: 'vitaminlistview',
           config: {
           //title: 'Acid List View',
          // iconCls: 'user',
           store: 'VitaminStore',
           useTitleAsBackText: true,
           itemTpl: tpl
           }
           });

function saveStatusOfVitamin(id){
    var storeName = 'VitaminStore';
    sencha.app.currentId = id;
    saveByStore(id, storeName)
    
}
function saveByStore(id, storeName){
    sencha.app.storeName = storeName
    var store = Ext.getStore(sencha.app.storeName);
    var currentRecord = store.findRecord('id', id)
    
    
    var check = currentRecord.get("choose");
    if(check == 1) currentRecord.set('choose', 0)
    else currentRecord.set('choose', 1);    
    
    var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(saveWhenCheck, error);
    
}
function saveWhenCheck(tx){
    
    if(sencha.app.storeName == 'MineralStore')
        tx.executeSql("select * from minerals where id=" + sencha.app.currentId, [],updateCheck , error)
    
    if(sencha.app.storeName == 'AcidStore') tx.executeSql("select * from acids where id=" + sencha.app.currentId, [],updateCheck , error)
    
    if(sencha.app.storeName == 'VitaminStore') tx.executeSql("select * from vitamins where id=" + sencha.app.currentId, [],updateCheck , error)
    
    if(sencha.app.storeName == 'PrecausionStore') tx.executeSql("select * from precausions where id=" + sencha.app.currentId, [],updateCheck , error)
                
    
}

function updateCheck(tx, results){
    
    var check = results.rows.item(0).choose;
    var status = !check;
    
    if(sencha.app.storeName == 'MineralStore')
            tx.executeSql("update minerals set choose=1 where id=" + results.rows.item(0).id, [], updateSuccess, error)
    if(sencha.app.storeName == 'AcidStore')
            tx.executeSql("update acids set choose=1 where id=" + results.rows.item(0).id, [], updateSuccess, error)
    if(sencha.app.storeName == 'VitaminStore')
            tx.executeSql("update vitamins set choose=1 where id=" + results.rows.item(0).id, [], updateSuccess, error)
    if(sencha.app.storeName == 'PrecausionStore')
            tx.executeSql("update precausions set choose=1 where id=" + results.rows.item(0).id, [], updateSuccess, error)
                   
}
function updateSuccess(){
    console.log("success ---update")
}