var router=require('express').Router();//se requiere el modulo router para establecer conexion con otras rutas

//en caso de que laguien quiere ingresar a una de las siguientes rutas este archivo los redireccionara a la ruta pedida
//funcionando como un administrador o gestor de rutas

//a continuacion se establece las rutas y hacia que carpeta iran
var report_incidents=require('./reportes_incidencias');
var incidencias=require('./tipos_incidencias');
var areas_hotel=require('./areas_hotel');
var empleados=require('./empleados');

//aqui se defina a que carpeta se iran en caso de que teclen las rutas entre comillas simples
router.use('/Incidencias',incidencias);
router.use('/Reporte',report_incidents);
router.use('/Areas_h',areas_hotel);
router.use('/Empleados',empleados);

//se usa una ruta indice que da la bienvenida a la api

router.get('/',function(req,res){
    res.json({mensaje:'Bienvenido a mi api'})
})


//exportamos el modulo router
module.exports=router;
