var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES
var readline = require('readline-sync');

// Create connection to database
var config =
{
    userName: 'solowing', // update me
    password: 'Enkike007', // update me
    server: 'lookinggood.database.windows.net', // update me
    options:
    {
        database: 'Patients', //update me
        encrypt: true
    }
}
var connection = new Connection(config);


function pullInfo(name,num){ //Pulling info from the database
    connection.on('connect', function(err)
{
    if (err)
    {
        console.log(err)
    }
    else
    {
    
         getTableTest(name,num);
        console.log("YAY");
    }
}
);
    

}
// Attempt to connect and execute queries if connection goes through
function pushInfo(name,age,HCN,notes,medList){
connection.on('connect', function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
             
             insertInfo(name,age,HCN,notes,medList);
            
            console.log("YAY Created!!!");
        }
    }
);
}

function insertInfo(name, age, HCN, conditions,medList, DB ) {  //putting info from the database
    request = new Request(`INSERT INTO ${DB} VALUES('${name}',${age},${HCN},'${conditions}','${medList}','${DB}');`, function(err) {  
     if (err) {  
        console.log(err);}  
    });  
  
    connection.execSql(request);  
    
}  

function getTableTest(name ,HCN, DB){
    console.log('getting tables...');
    request = new Request(`SELECT * FROM ${DB} WHERE  HealthCareNum = ${HCN} ;`, function(err){
        if(err){
            console.log(err);

        }
    });

    var result = "";
    request.on('row',function(columns){
        columns.forEach(function(column){
            if(column.value === null){
                console.log("NULL MOFO");
            }
            else{
                result+= column.value + " ";

            }
        });
        console.log(result);
        
    });
    request.on('done', function(rowCount,more){
        console.log(rowCount+ "Returned");
    });
    connection.execSql(request);
    return result;
}

function editTable(HCN,DB,medList,conditions){
    request = new Request(`UPDATE ${DB} SET MedList  = '${medList}', Conditions = '${conditions}' WHERE Name ='${HCN}';`,function(err){
        if(err){
            console.log(err);

        }
    });
    connection.execSql(request);
    console.log("Table edited");
 

    
}
console.log("1: Pull patient 2:Push patient 3: Edit Patient Med and Notes");
var ans = readline.question("EXIT TO QUIT");
while (ans!='exit'){
if (ans == 1){
    var name= readline.question("Name");
    var num = readline.question("healthcare");

    pullInfo(name,num);

}else if(ans == 2){

    var name= readline.question("Name");
    var age = readline.question("Age");
    var HCN = readline.question("HCN");
    var conditions = readline.question("Conditions");
    var medList = readline.question("Medlist");
    var DB = readline.question("Database");

    insertInfo(name, age, HCN, conditions,medList, DB )
}else if(ans == 3 )
{
  
    var HCN = readline.question("HCN");
    var conditions = readline.question("Conditions");
    var medList = readline.question("Medlist");
    var DB = readline.question("Database");

    editTable(HCN,DB,medList,conditions)
}else {
    console.log("Invalid input");
}
}
