Ext.define('sencha.view.CardView', {
           extend: 'Ext.Panel',
           xtype: 'cardview',
           id: 'cardview-id',
           config: {
           layout: {
           type: 'card'
           },
           items: [
                   
                   {
                        xtype: 'configureview'
                   },
                   {
                        xtype: 'launchview',
                   },
                   {
                        xtype: 'productnavigationview',
                        //html: 'test'
                   }
                   ]
           }
           
           });