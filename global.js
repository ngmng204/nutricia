
function checkDoneStatus(tx){
    tx.executeSql('select done_status from done_status where id=1', [], checkDoneStatusSuccess, error)
}
function checkDoneStatusSuccess(tx, results){
    console.log(results.rows.item(0).done_status)
    var doneStatus = results.rows.item(0).done_status;
    if(doneStatus == 1){
        //set query string
        tx.executeSql('select query_string from query_statement where id=1',
                      [],
                      function(tx, results){
                      sencha.app.queryString = results.rows.item(0).query_string
                      console.log(sencha.app.queryString)
                      //render productlist
                      renderProductList(tx, sencha.app.queryString)
                      },
                      error)
        
        
        var indexPanel = Ext.create('sencha.view.CardView');
        Ext.Viewport.add(indexPanel)
        Ext.getCmp('cardview-id').setActiveItem(2);
    }else{
        var indexPanel = Ext.create('sencha.view.CardView');
        Ext.Viewport.add(indexPanel)
        Ext.getCmp('cardview-id').setActiveItem(0);
    }
}
function renderProductList(tx, queryString){
    tx.executeSql('select * from products' ,[], function(tx, results){ console.log(results.rows); bindProductStore(results)}, error)
}
function bindProductStore(results){
    console.log(results.rows.item(0))
    var store = Ext.getStore("ProductStore")
    for(var i =0; i<results.rows.length; i++){
        var object = new Object();
        object.id = results.rows.item(i).id;
        object.name = results.rows.item(i).name;
        object.image_url = results.rows.item(i).image_url
        //object.choose = results.rows.item(i).choose;
        var model = Ext.create("sencha.model.ProductModel", object)
        store.add(model)
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
    tx.executeSql('INSERT INTO vitamins (id, name, choose) VALUES (2, "Seconde vitamins", 1)');
    tx.executeSql('INSERT INTO vitamins (id, name, choose) VALUES (3, "Seconde vitamins", 1)');
    tx.executeSql('INSERT INTO vitamins (id, name, choose) VALUES (4, "Seconde vitamins", 1)');
    tx.executeSql('INSERT INTO vitamins (id, name, choose) VALUES (5, "Seconde vitamins", 0)');
    tx.executeSql('INSERT INTO vitamins (id, name, choose) VALUES (6, "Seconde vitamins", 0)');
    
    
    tx.executeSql('DROP TABLE IF EXISTS minerals');
    tx.executeSql('CREATE TABLE IF NOT EXISTS minerals (id INTEGER NOT NULL, name VARCHAR(25),  choose INTEGER(1), PRIMARY KEY (id))');
    tx.executeSql('INSERT INTO minerals (id, name, choose) VALUES (1, "Premier minerals",1)');
    tx.executeSql('INSERT INTO minerals (id, name, choose) VALUES (2, "Seconde minerals",0)');
    tx.executeSql('INSERT INTO minerals (id, name, choose) VALUES (3, "Seconde minerals",0)');
    tx.executeSql('INSERT INTO minerals (id, name, choose) VALUES (4, "Seconde minerals",0)');
    tx.executeSql('INSERT INTO minerals (id, name, choose) VALUES (5, "Seconde minerals",1)');
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
    tx.executeSql('INSERT INTO precausions (id, name, choose) VALUES (3, "Seconde precausions", 1)');
    tx.executeSql('INSERT INTO precausions (id, name, choose) VALUES (4, "Seconde precausions", 0)');
    tx.executeSql('INSERT INTO precausions (id, name, choose) VALUES (5, "Seconde precausions", 0)');
    tx.executeSql('INSERT INTO precausions (id, name, choose) VALUES (6, "Seconde precausions", 0)');
    
    
    //create product list
    tx.executeSql('DROP TABLE IF EXISTS products');
    tx.executeSql('CREATE TABLE IF NOT EXISTS products (id INTEGER NOT NULL, name VARCHAR(255),  disease INTEGER(11), vitamins VARCHAR(255), acids VARCHAR(255), minerals VARCHAR(255), precausions VARCHAR(255), image_url VARCHAR(255), PRIMARY KEY (id))');
    
    
    tx.executeSql('INSERT INTO products (id, name, disease, vitamins, acids, minerals, precausions, image_url) VALUES (1, "Product 1",1, "[1,2]", "[1]", "[2]", "[3]", "resources/images/adele.png")');
    tx.executeSql('INSERT INTO products (id, name, disease, vitamins, acids, minerals, precausions, image_url) VALUES (2, "Product 2",1, "[1,3]", "[1]", "[2]", "[3]", "resources/images/alexi_murdoch.png")');
    tx.executeSql('INSERT INTO products (id, name, disease, vitamins, acids, minerals, precausions, image_url) VALUES (3, "Product 3",1, "[1]", "[1]", "[2]", "[3]", "resources/images/arrehman.png")');
    tx.executeSql('INSERT INTO products (id, name, disease, vitamins, acids, minerals, precausions, image_url) VALUES (4, "Product 4",1, "[]", "[1]", "[]", "[1]", "resources/images/eminem.png")');
    tx.executeSql('INSERT INTO products (id, name, disease, vitamins, acids, minerals, precausions, image_url) VALUES (5, "Product 5",4, "[]", "[2]", "[]", "[3]", "resources/images/mj.png")');
    tx.executeSql('INSERT INTO products (id, name, disease, vitamins, acids, minerals, precausions, image_url) VALUES (6, "Product 6",4, "[0]", "[1]", "[2]", "[4]", "resources/images/rihanna.png")');
    
    tx.executeSql('DROP TABLE IF EXISTS query_statement');
    tx.executeSql('CREATE TABLE IF NOT EXISTS query_statement(id INTEGER NOT NULL, query_string VARCHAR(255), PRIMARY KEY(id))');
    tx.executeSql('INSERT INTO query_statement (id, query_string) VALUES (1,"")');
}

function error(err){
    console.log("error: " + err.code)
}




function saveCheckedItemOfDisease(tx){
    //unselected for all
    tx.executeSql("update diseases set choose=0", [], updateDoneStatusSuccess, error)
    //set selected for current item
    tx.executeSql("update diseases set choose=1 where id=" + sencha.app.currentDiseaseSelected, [], updateDoneStatusSuccess, error)
    
}
function saveQueryStatement(tx){
    //get Disease Selected
    tx.executeSql('select * from diseases where choose=1', [], function(tx, results){
                  sencha.app.queryChekedCurrent = "disease"
                  queryChekedSuccess(sencha.app.queryChekedCurrent, results, tx)
                  tx.executeSql('update query_statement set query_string="'+ sencha.app.conditionStr + '"', [], updateDoneStatusSuccess, error)
                  }, error)
    //get checked of vitamins
    tx.executeSql('select * from vitamins where choose=1', [], function(tx, results){
                  sencha.app.queryChekedCurrent = "vitamins"
                  queryChekedSuccess(sencha.app.queryChekedCurrent, results)
                  tx.executeSql('update query_statement set query_string="'+ sencha.app.conditionStr + '"', [], updateDoneStatusSuccess, error)
                  }, error)
    //get checked of acids
    tx.executeSql('select * from acids where choose=1', [], function(tx, results){
                  sencha.app.queryChekedCurrent = "acids"
                  queryChekedSuccess(sencha.app.queryChekedCurrent, results, tx)
                  tx.executeSql('update query_statement set query_string="'+ sencha.app.conditionStr + '"', [], updateDoneStatusSuccess, error)
                  }, error)
    tx.executeSql('select * from minerals where choose=1', [], function(tx, results){
                  sencha.app.queryChekedCurrent = "minerals"
                  queryChekedSuccess(sencha.app.queryChekedCurrent, results, tx)
                  tx.executeSql('update query_statement set query_string="'+ sencha.app.conditionStr + '"', [], updateDoneStatusSuccess, error)
                  }, error)
    tx.executeSql('select * from precausions where choose=1', [], function(tx, results){
                  sencha.app.queryChekedCurrent = "precausions"
                  queryChekedSuccess(sencha.app.queryChekedCurrent, results, tx)
                  tx.executeSql('update query_statement set query_string="'+ sencha.app.conditionStr + '"', [], updateDoneStatusSuccess, error)
                  }, error)
    
}
function queryChekedSuccess(current, results, tx){
    var conditionStr =""
    if(current == "disease"){
        if(results.rows.length == 0){
            alert("You have to choose atleaset a disease for filtering")
        }else{
            //save to database disease checked
            //add to condition string
            var diseaseSelected = results.rows.item(0).id
            conditionStr += "select * from products where disease="+diseaseSelected
            sencha.app.conditionStr += conditionStr;
        }
    }
    else if(current == "vitamins"){
        if(results.rows.length == 0){}
        else{
            for(var i=0; i<results.rows.length; i++){
                if(i==(results.rows.length-1)){
                    conditionStr += "vitamins like '%" + results.rows.item(i).id + "%'";
                }else{
                    conditionStr += "vitamins like '%" + results.rows.item(i).id + "%' or ";
                }
            }
            sencha.app.conditionStr += " and (" + conditionStr + ")";
        }
        
    }else if(current == "acids"){
        if(results.rows.length == 0){}
        else{
            for(var i=0; i< results.rows.length; i++){
                if(i==(results.rows.length-1)){
                    conditionStr += "acids like '%" + results.rows.item(i).id + "%'";
                }else{
                    conditionStr += "acids like '%" + results.rows.item(i).id + "%' or ";
                }
            }
            sencha.app.conditionStr += " and (" + conditionStr + ")";
        }
    }else if(current == "minerals"){
        if(results.rows.length == 0){}
        else{
            for(var i=0; i< results.rows.length; i++){
                if(i==(results.rows.length-1)){
                    conditionStr += "minerals like '%" + results.rows.item(i).id + "%'";
                }else{
                    conditionStr += "minerals like '%" + results.rows.item(i).id + "%' or ";
                }
            }
            sencha.app.conditionStr += " and (" + conditionStr + ")";
        }
    }
    else if(current == "precausions"){
        if(results.rows.length == 0){}
        else{
            for(var i=0; i< results.rows.length; i++){
                if(i==(results.rows.length-1)){
                    conditionStr += "precausions like '%" + results.rows.item(i).id + "%'";
                }else{
                    conditionStr += "precausions like '%" + results.rows.item(i).id + "%' or ";
                }
            }
            sencha.app.conditionStr += " and (" + conditionStr + ")";
            renderProductList(tx, sencha.app.queryString)
        }
    }
    //save conditionString
    
    console.log(sencha.app.conditionStr)
    
}

function updateDoneStatus(tx){
    tx.executeSql("update done_status set done_status=1", [], updateDoneStatusSuccess, error)
}
function updateDoneStatusSuccess(tx, results){
    console.log("update done status success")
}