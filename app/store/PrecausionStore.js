Ext.define('sencha.store.PrecausionStore', {
  
  extend: 'Ext.data.Store',
  
  requires: ['sencha.model.PrecausionModel'],
  
  config: {
    model: 'sencha.model.PrecausionModel',
    autoLoad: true,
    storeId: 'PrecausionStore',
    pageSize: 1000
  }
});
