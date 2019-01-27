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


// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
    {
        if (err)
        {
            console.log(err)
        }
        else
        {
             //queryDatabase()
             //executeStatement1()
             //insertInfo('via',19,12347,"NL");
             getTableTest();
            console.log("YAY");
        }
    }
);

function insertInfo(name, age, HCN, conditions ) {  
    request = new Request(`INSERT INTO Information VALUES('${name}',${age},${HCN},'${conditions}','lol');`, function(err) {  
     if (err) {  
        console.log(err);}  
    });  
  
    connection.execSql(request);  
    
}  

function getTableTest(){
    console.log('getting tables...');
    request = new Request("SELECT * FROM Information", function(err){
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