Ext.define('sencha.store.AcidStore', {
  
  extend: 'Ext.data.Store',
  
  requires: ['sencha.model.AcidModel'],
  
  config: {
    model: 'sencha.model.AcidModel',
    autoLoad: true,
    storeId: 'AcidStore',
    pageSize: 1000
  }
});
