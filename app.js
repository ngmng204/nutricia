Ext.application({
    name: 'sencha',

    requires: [
        'Ext.MessageBox'
    ],
                stores: ['DiseaseStore',
                         'VitaminStore',
                         'AcidStore',
                         'MineralStore',
                         'PrecausionStore'
                ],
                models:['DiseaseModel',
                        'VitaminModel',
                        'AcidModel',
                        'MineralModel',
                        'PrecausionModel'
                        
                ],
    views: ['Main', 'LaunchView', 'CardView', 'ConfigureView', 'DiseaseListView', 'VitaminListView', 'MineralListView', 'AcidListView', 'PrecausionListView', 'ProductNavigationView'],
                controllers: ['MainController'],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
        //db.transaction(populateDB, error);
        db.transaction(queryDB, error)
        db.transaction(checkDoneStatus, error)
        
        
    },
    current: "",
    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});


function checkDoneStatus(tx){
    tx.executeSql('select done_status from done_status where id=1', [], checkDoneStatusSuccess, error)
}
function checkDoneStatusSuccess(tx, results){
    console.log(results.rows.item(0).done_status)
    var doneStatus = results.rows.item(0).done_status;
    if(doneStatus == 1){
        var indexPanel = Ext.create('sencha.view.CardView');
        Ext.Viewport.add(indexPanel)
        Ext.getCmp('cardview-id').setActiveItem(2);
    }else{      
        var indexPanel = Ext.create('sencha.view.CardView');
        Ext.Viewport.add(indexPanel)
        Ext.getCmp('cardview-id').setActiveItem(0);
    }
}
function queryDB(tx){
    sencha.app.current = "Disease";
    tx.executeSql('select * from diseases', [], function(tx, results){ sencha.app.current = "Disease"; bindStore(sencha.app.current, results); }, error)
    tx.executeSql('select * from vitamins', [], function(tx, results){ sencha.app.current = "Vitamin"; bindStore(sencha.app.current, results); }, error)
    tx.executeSql('select * from acids', [], function(tx, results){ sencha.app.current = "Acid"; bindStore(sencha.app.current, results); }, error)
    tx.executeSql('select * from minerals', [], function(tx, results){ sencha.app.current = "Mineral"; bindStore(sencha.app.current, results); }, error)
    tx.executeSql('select * from precausions', [], function(tx, results){ sencha.app.current = "Precausion"; bindStore(sencha.app.current, results); }, error)
}
function querySuccess(tx, results){
    bindStore(sencha.app.current, results)
    console.log(results.rows)
}
function bindStore(name, results){
    console.log(name);
    var storeName = name+"Store";
    var store = Ext.getStore(storeName)
    var modelName = "sencha.model."+name+"Model";
    console.log(modelName);
    for(var i =0; i<results.rows.length; i++){
        var object = new Object();
        object.id = results.rows.item(i).id;
        object.name = results.rows.item(i).name;
        object.choose = results.rows.item(i).choose;
        var model = Ext.create(modelName, object)
        store.add(model)
    }
    console.log(store)
}
function populateDB(tx){
    console.log("pop pulate")
    tx.executeSql('DROP TABLE IF EXISTS done_status');
    tx.executeSql('CREATE TABLE IF NOT EXISTS done_status(id INTEGER NOT NULL, done_status INTEGER(1), PRIMARY KEY(id))');
    tx.executeSql('INSERT INTO done_status (id, done_status) VALUES (1,0)');
    
    tx.executeSql('DROP TABLE IF EXISTS DEMO');
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "Premier enregistrement")');
    tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Seconde enregistrement")');
    
    tx.executeSql('DROP TABLE IF EXISTS diseases');
    tx.executeSql('CREATE TABLE IF NOT EXISTS diseases (id INTEGER NOT NULL, name VARCHAR(25),  choose INTEGER(1), PRIMARY KEY (id))');
    tx.executeSql('INSERT INTO diseases (id, name, choose) VALUES (1, "Premier diseases", 0)');
    tx.executeSql('INSERT INTO diseases (id, name, choose) VALUES (2, "Seconde diseases", 0)');
    tx.executeSql('INSERT INTO diseases (id, name, choose) VALUES (3, "Seconde diseases", 0)');
    tx.executeSql('INSERT INTO diseases (id, name, choose) VALUES (4, "Seconde diseases", 0)');
    tx.executeSql('INSERT INTO diseases (id, name, choose) VALUES (5, "Seconde diseases", 0)');
    tx.executeSql('INSERT INTO diseases (id, name, choose) VALUES (6, "Seconde diseases", 0)');
    
    
    tx.executeSql('DROP TABLE IF EXISTS vitamins');
    tx.executeSql('CREATE TABLE if not exists vitamins(id INTEGER NOT NULL, name VARCHAR(25),  choose INTEGER(1), PRIMARY KEY (id))');
    tx.executeSql('INSERT INTO vitamins (id, name, choose) VALUES (1, "Premier vitamins", 0)');
    tx.executeSql('INSERT INTO vitamins (id, name, choose) VALUES (2, "Seconde vitamins", 0)');
    tx.executeSql('INSERT INTO vitamins (id, name, choose) VALUES (3, "Seconde vitamins", 0)');
    tx.executeSql('INSERT INTO vitamins (id, name, choose) VALUES (4, "Seconde vitamins", 0)');
    tx.executeSql('INSERT INTO vitamins (id, name, choose) VALUES (5, "Seconde vitamins", 0)');
    tx.executeSql('INSERT INTO vitamins (id, name, choose) VALUES (6, "Seconde vitamins", 0)');
    
    
    tx.executeSql('DROP TABLE IF EXISTS minerals');
    tx.executeSql('CREATE TABLE IF NOT EXISTS minerals (id INTEGER NOT NULL, name VARCHAR(25),  choose INTEGER(1), PRIMARY KEY (id))');
    tx.executeSql('INSERT INTO minerals (id, name, choose) VALUES (1, "Premier minerals",0)');
    tx.executeSql('INSERT INTO minerals (id, name, choose) VALUES (2, "Seconde minerals",0)');
    tx.executeSql('INSERT INTO minerals (id, name, choose) VALUES (3, "Seconde minerals",0)');
    tx.executeSql('INSERT INTO minerals (id, name, choose) VALUES (4, "Seconde minerals",0)');
    tx.executeSql('INSERT INTO minerals (id, name, choose) VALUES (5, "Seconde minerals",0)');
    tx.executeSql('INSERT INTO minerals (id, name, choose) VALUES (6, "Seconde minerals",0)');
    
    
    tx.executeSql('DROP TABLE IF EXISTS acids');
    
    //tx.executeSql('CREATE TABLE if not exists  acids(id INTEGER(11) PRIMARY KEY, name VARCHAR(255), check varchar(1))');
    tx.executeSql('CREATE TABLE if not exists acids(id INTEGER NOT NULL, name VARCHAR(25),  choose INTEGER(1), PRIMARY KEY (id))');
    
    
    tx.executeSql('INSERT INTO acids (id, name, choose) VALUES (1, "Premier acids", 1)');
    tx.executeSql('INSERT INTO acids (id, name, choose) VALUES (2, "Premier acids", 1)');
    tx.executeSql('INSERT INTO acids (id, name, choose) VALUES (3, "Seconde acids", 1)');
    tx.executeSql('INSERT INTO acids (id, name, choose) VALUES (4, "Seconde acids", 0)');
    tx.executeSql('INSERT INTO acids (id, name, choose) VALUES (5, "Seconde acids", 0)');
    tx.executeSql('INSERT INTO acids (id, name, choose) VALUES (6, "Seconde acids", 0)');
    
    tx.executeSql('DROP TABLE IF EXISTS precausions');
    tx.executeSql('CREATE TABLE IF NOT EXISTS precausions (id INTEGER NOT NULL, name VARCHAR(25),  choose INTEGER(1), PRIMARY KEY (id))');
    tx.executeSql('INSERT INTO precausions (id, name, choose) VALUES (1, "Premier precausions", 0)');
    tx.executeSql('INSERT INTO precausions (id, name, choose) VALUES (2, "Seconde precausions", 0)');
    tx.executeSql('INSERT INTO precausions (id, name, choose) VALUES (3, "Seconde precausions", 0)');
    tx.executeSql('INSERT INTO precausions (id, name, choose) VALUES (4, "Seconde precausions", 0)');
    tx.executeSql('INSERT INTO precausions (id, name, choose) VALUES (5, "Seconde precausions", 0)');
    tx.executeSql('INSERT INTO precausions (id, name, choose) VALUES (6, "Seconde precausions", 0)');
    
    
    //create product list
    tx.executeSql('DROP TABLE IF EXISTS products');
    tx.executeSql('CREATE TABLE IF NOT EXISTS products (id INTEGER NOT NULL, name VARCHAR(255),  disease INTEGER(11), vitamins VARCHAR(255), acids VARCHAR(255), minerals VARCHAR(255), precausions VARCHAR(255), PRIMARY KEY (id))');
    
    
    tx.executeSql('INSERT INTO products (id, name, disease, vitamins, acids, minerals, precausions) VALUES (1, "Product 1",1, "[1,2]", "[1]", "[2]", "[3]")');
    tx.executeSql('INSERT INTO products (id, name, disease, vitamins, acids, minerals, precausions) VALUES (2, "Product 2",1, "[1,3]", "[1]", "[2]", "[3]")');
    tx.executeSql('INSERT INTO products (id, name, disease, vitamins, acids, minerals, precausions) VALUES (3, "Product 3",1, "[1]", "[1]", "[2]", "[3]")');
    tx.executeSql('INSERT INTO products (id, name, disease, vitamins, acids, minerals, precausions) VALUES (4, "Product 4",1, "[]", "[1]", "[]", "[1]")');
    tx.executeSql('INSERT INTO products (id, name, disease, vitamins, acids, minerals, precausions) VALUES (5, "Product 5",4, "[]", "[2]", "[]", "[3]")');
    tx.executeSql('INSERT INTO products (id, name, disease, vitamins, acids, minerals, precausions) VALUES (6, "Product 6",4, "[0]", "[1]", "[2]", "[4]")');
}

function error(err){
    console.log("error: " + err.code)
}