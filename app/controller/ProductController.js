Ext.define("sencha.controller.ProductController", {
	extend: "Ext.app.Controller",
	config:{
		refs:{
           productListView: 'productlistview',
           productNavigationView: 'productnavigationview',
           productDetailView: 'productdetailview'
		},
		control:{
           'productListView':{
                itemtap:'onProductItemTap'
            },
                      
        }
    },
    
    onProductItemTap: function(list, index, node, record ){
           
           
           var tpl = new Ext.XTemplate(
                                       '<tpl for=".">',
                                            '<div>{name}</div>',
                                       '</tpl>'
                                       
                                       );
           
           var productDetail = Ext.create('Ext.Panel',{
                                        xtype: 'productdetail',
                                        id: 'productdetail-view',
                                        tpl: tpl
           });
           productDetail.setRecord(record);
           this.getProductNavigationView().push(productDetail)
    }
})
