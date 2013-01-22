Ext.define('sencha.store.VitaminStore', {
  
  extend: 'Ext.data.Store',
  
  requires: ['sencha.model.VitaminModel'],
  
  config: {
    model: 'sencha.model.VitaminModel',
    autoLoad: true,
    storeId: 'VitaminStore',
    pageSize: 1000
  }
});
