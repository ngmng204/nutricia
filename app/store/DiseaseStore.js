Ext.define('sencha.store.DiseaseStore', {
  
  extend: 'Ext.data.Store',
  
  requires: ['sencha.model.DiseaseModel'],
  
  config: {
    model: 'sencha.model.DiseaseModel',
    autoLoad: true,
    storeId: 'DiseaseStore',
    pageSize: 1000
  }
});
