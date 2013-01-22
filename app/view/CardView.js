Ext.define('sencha.view.CardView', {
           extend: 'Ext.Panel',
           xtype: 'cardview',
           id: 'cardview-id',
           config: {
           layout: {
                type: 'card',
                animation: {
                type: 'slide',
                        direction: 'left'
                }
           },
           items: [
                   
                   
                   {
                        xtype: 'launchview',
                   },
                   {
                   xtype: 'configureview'
                   },
                   {
                        xtype: 'productnavigationview',
                        //html: 'test'
                   }
                   ]
           }
           
           });