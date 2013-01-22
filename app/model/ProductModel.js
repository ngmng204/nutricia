Ext.define('sencha.model.ProductModel', {
  extend: 'Ext.data.Model',
  
  config: {
    fields: [
        { name: 'id', type: 'int' }, // Every model must start with an id of type int
        { name: 'name', type: 'string' }, // bools, floats, objects and arrays also supported
     
    ],  
    
    
  }
  
});