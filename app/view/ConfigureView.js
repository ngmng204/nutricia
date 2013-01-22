Ext.define('sencha.view.ConfigureView', {
           extend: 'Ext.navigation.View',
           xtype: 'configureview',
           config: {
           navigationBar: {
           modal: false,
           androidAnimation: false,
           items: [
                   {
                   xtype: 'button',
                   text: 'Vitamins',
                   id: 'vitamin-btn'
                   },
                   {
                   xtype: 'button',
                   align: 'right',
                   ui: 'action',
                   iconCls: 'settings',
                   iconMask: true,
                   text: 'Done',
                   id: 'done-btn'
                   },
                   {
                   xtype: 'button',
                   align: 'right',
                   iconAlign: 'right',
                   text: 'Acids',
                   id: 'acid-btn'
                   }
                   ]
           },
           items: [
                   {
                   xtype: 'diseaselistview',
                   layout: {
                   type: 'vbox'
                   },
                   items: [
                           {
                           xtype: 'toolbar',
                           docked: 'bottom',
                           items: [
                                   {
                                   xtype: 'button',
                                   text: 'MInerals',
                                   id: 'mineral-btn'
                                   },
                                   {
                                   xtype: 'button',
                                   iconAlign: 'right',
                                   text: 'Precausion',
                                   id: 'precausion-btn'
                                   }
                                   ]
                           },
                           
                           ]
                   }
                   ]
           }
           
           });