let controllerbd=require('../CONTROLLERS/ctrl_reportes');//se establece conexion con los controladores para hacer uso de ellos
var router=require('express').Router();//se define router para que una pagina pueda accedere a la ruta

//esta ruta de tipo "get" necesita el area para usar el controlador "listar_reportes_areas"
router.get('/:area',function(req,res){

    controllerbd.listar_reportes_area(req,res);

})

//esta ruta de tipo "get" necesita una "sentencia (res)" para usar el controlador "listar_reportes_areas"
router.get('/monitoreo_reportes/:res',function(req,res){

    controllerbd.listar_reportes_areas(req,res);

})

//esta ruta de tipo "get" necesita un "empleado(id)" para usar el controlador "listar_reportes_empelado"
router.get('/Empleados_report/:empleado', function(req,res){

    controllerbd.listar_reportes_empleado(req,res);

})

//esta ruta de tipo "post" usa el controlador "agregar_reportes"
router.post('/',function(req,res){

    controllerbd.agregar_reportes(req,res);
    
})

//esta ruta de tipo "put" usa el controlador "agregar_empleado_reporte"
router.put('/',function(req,res){
    controllerbd.agregar_empleado_reporte(req,res);
})

//esta ruta de tipo "put" usa el controlador "cierre_reportes"
router.put('/Cierre_reportes/final',function(req,res){
    controllerbd.cierre_reportes(req,res);
})

//exportamos la rutas para que puedan ser usadas
module.exports=router