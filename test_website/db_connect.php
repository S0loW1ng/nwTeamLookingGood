<?php

$serverName = "lookinggood.database.windows.net\\sql, 3306";
$connectionInfo = array("Patients"=>"dbName", "solowing"=>"username", "Enkike007"=>"password");
$conn = sqlsrv_connect($serverName, $connectionInfo);

if($conn){
  echo "conenction established";
}else{
  echo "No connection to db";
}


?>



