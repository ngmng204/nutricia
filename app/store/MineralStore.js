Ext.define('sencha.store.MineralStore', {
  
  extend: 'Ext.data.Store',
  
  requires: ['sencha.model.MineralModel'],
  
  config: {
    model: 'sencha.model.MineralModel',
    autoLoad: true,
    storeId: 'MineralStore',
    pageSize: 1000
  }
});
