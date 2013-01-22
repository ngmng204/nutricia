Ext.define('sencha.view.LaunchView', {
           extend: 'Ext.Panel',
           xtype: 'launchview',
           config: {
           styleHtmlContent: true,
           items: [
                   {
                   xtype: 'button',
                   id: 'configuration-btn',
                   centered: true,
                   text: 'Configuration'
                   }
                   ]
           }
           
});