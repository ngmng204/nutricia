 
var tpl = new Ext.XTemplate(
            '<tpl for=".">',                         
                            '<div style="position: relative;top: -5px;"><img width="40px" src="{image_url}" /><span style="position: absolute; margin: 10px 1px 0px 19px;">{name}</span></div>',
            '</tpl>'           
            
                            
);
Ext.define('sencha.view.ProductListView', {
    extend: 'Ext.List',
    xtype: 'productlistview',
    config: {        
        store: 'ProductStore',
        onItemDisclosure: true,
        itemTpl: tpl
    }
});

