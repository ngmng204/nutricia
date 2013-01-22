
var tpl = new Ext.XTemplate(
                            '<tpl for=".">',
                            '<input type="checkbox" onchange="saveStatusOfMineral(this.id)" id="{[values.id]}" {[this.changeStatus(values.choose)]} /> {[values.name]}', //{[this.changeStatus(values.check)]}
                            
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
Ext.define('sencha.view.MineralListView', {
           extend: 'Ext.List',
           xtype: 'minerallistview',
           config: {          
           store: 'MineralStore',
           useTitleAsBackText: true,
           itemTpl: tpl
           }
           });

function saveStatusOfMineral(id){
    var storeName = 'MineralStore';
    sencha.app.storeName = 'MineralStore';
    sencha.app.currentId = id;
    saveByStore(id, storeName)
    
}
