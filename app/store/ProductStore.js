Ext.define('sencha.store.ProductStore', {
  
  extend: 'Ext.data.Store',
  
  requires: ['sencha.model.ProductModel'],
  
  config: {
    model: 'sencha.model.ProductModel',
    autoLoad: true,
    storeId: 'ProductStore',
    pageSize: 1000
  }
});
