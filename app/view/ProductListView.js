 
var tpl = new Ext.XTemplate(
            '<tpl for=".">',                         
                          '{name}',                            
            '</tpl>'           
            
                            
);
Ext.define('sencha.view.ProductListView', {
    extend: 'Ext.List',
    xtype: 'productlistview',
    config: {        
        store: 'ProductStore',
        itemTpl: tpl
    }
});

