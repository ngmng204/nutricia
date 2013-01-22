
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
    sencha.app.storeName = 'VitaminStore';
    saveByStore(id, storeName)
    
}
