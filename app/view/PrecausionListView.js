
var tpl = new Ext.XTemplate(
                            '<tpl for=".">',
                            '<input type="checkbox" onchange="saveStatusOfPrecausion(this.id)" id="{[values.id]}" {[this.changeStatus(values.choose)]} /> {[values.name]}', //{[this.changeStatus(values.check)]}
                            
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
Ext.define('sencha.view.PrecausionListView', {
           extend: 'Ext.List',
           xtype: 'precausionlistview',
           config: {
          // title: 'Acid List View',
          // iconCls: 'user',
           store: 'PrecausionStore',
           useTitleAsBackText: true,
           itemTpl: tpl
           }
});

function saveStatusOfPrecausion(id){
    var storeName = 'PrecausionStore';
    sencha.app.storeName = 'PrecausionStore';
    saveByStore(id, storeName)
    
}
