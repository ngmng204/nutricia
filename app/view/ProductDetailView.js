Ext.define('sencha.view.ProductDetailView', {
           extend: 'Ext.Panel',
           xtype: 'productdetailview',
           config: {
               items: [
                       {
                       xtype: 'toolbar',
                       docked: 'top'
                       }
               ],
               tpl: '<span>{name}</span>'
           }
           
});