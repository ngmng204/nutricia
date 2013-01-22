Ext.define('sencha.view.DiseaseListView', {
    extend: 'Ext.List',
    xtype: 'diseaselistview',

    config: {        
        store: 'DiseaseStore',       
        itemTpl: '{name}'
        
    }
});
