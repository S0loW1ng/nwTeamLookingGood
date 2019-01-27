var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES

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

function insertInfo(name, age, HCN, conditions ) {  //putting info from the database
    request = new Request(`INSERT INTO Information VALUES('${name}',${age},${HCN},'${conditions}','lol');`, function(err) {  
     if (err) {  
        console.log(err);}  
    });  
  
    connection.execSql(request);  
    
}  

function getTableTest(name ,HCN){
    console.log('getting tables...');
    request = new Request(`SELECT * FROM Information WHERE  HealthCareNum = ${HCN} ;`, function(err){
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