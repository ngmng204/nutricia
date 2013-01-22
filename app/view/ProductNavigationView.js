Ext.define('sencha.view.ProductNavigationView', {
           extend: 'Ext.navigation.View',
           xtype: 'productnavigationview',
           config: {
               navigationBar: {
                   modal: false,
                   androidAnimation: false,
                   items: [
                           {
                           xtype: 'button',
                           align: 'right',
                           ui: 'action',
                           iconCls: 'settings',
                           iconMask: true,
                           text: '',
                           id: 'setting-btn'
                           }
                           ]
               },
               items: [
                       {
                           xtype: 'productlistview',
                           layout: {
                                type: 'default'
                           }
                       }
               ]
    }
           
});