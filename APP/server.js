const express = require('express'); //se llama al modulo express para crear un servidor web
var cors=require('cors') //se llama a cors para permitir la conexion entre servidor y pagina web
const app = express(); //se llama la instacia app para usar funciones de express
var port = process.env.PORT || 1339; //definimos el puerto en el que funcionara la api
var router=require('./ROUTES') //establecemos la ruta por la cual se accedera a la api
app.use(cors()) //usamos cors
app.use(express.json()); //establecemos el uso de formato json para intercambio de informacion entre la api y la pagina
app.use(express.urlencoded({
    extended: true
})); //no recuerdo que hace esto
app.use('/api',router)//si entran a  nuestra api los redireccionaran a la ruta defina
app.listen(port);//el servidor escuchara en el puerto definido