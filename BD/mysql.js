var mysql      = require('mysql2');
var hostdb = process.env.HOST || 'localhost';
var userdb = process.env.USER || 'root';
var passdb = process.env.PASSWORD || 'Barcelokp2007';
var datadb = process.env.DATABASE || 'Report_Incidents';
var portdb = process.env.PORT || '3306';

var connection = mysql.createPool({
  waitForConnections: true,
  connectionLimit: 1000,
  queueLimit: 1000,
  host     : hostdb,
  user     : userdb,
  password : passdb,
  database : datadb,
  port: portdb,
  debug: false
}); //establecemos conexion con la base de datos definiendo algunos parametros
 
connection.getConnection(function(err){
    if(err){
        console.log(err);//si hubo un error nos lo mostrara
        return;
    }else{
        console.log('DB is connected')//si la conexion es correcta nos confirmara este suceso 
    }
});

module.exports=connection; //exportamos la funcion "connection"