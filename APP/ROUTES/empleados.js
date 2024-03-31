let controllerbd=require('../CONTROLLERS/ctrl_empleados');//se establece conexion con los controladores para hacer uso de ellos
var router=require('express').Router();//se define router para que una pagina pueda accedere a la ruta

//esta ruta tipo "post" permite usar el controlador "agregar_empleados"
router.post('/',function(req,res){

    controllerbd.agregar_empleados(req,res);
    
})

//esta ruta de tipo "get" puede usar el controlador "listar_empleados"
router.get('/',function(req,res){

    controllerbd.listar_empleados(req,res);

})

//esta ruta de tipo "get" necesita de un "id" para usar el controlador "listar_empleados_areas"
router.get('/:area',function(req,res){

    controllerbd.listar_empleados_area(req,res);

})

//esta ruta de tipo "get" necesita de un "id" para usar el controlador "buscar_disponibilidad"
router.get('/dipo_em/:id_em',function(req,res){

    controllerbd.buscar_disponiblidad(req,res);

})

//esta ruta de tipo "get" necesita de un "id" para usar el controlador "buscar_id_empleado"
router.get('/edit_search/:id',function(req,res){

    controllerbd.buscar_id_empleado(req,res);

})

//esta ruta de tipo "put" usa el controlador "editar_empleado"
router.put('/edit/',function(req,res){

    controllerbd.editar_empleado(req,res);

})

//esta ruta de tipo "delete" necesita de un "id" para usar el controlador "eliminar_empleado"
router.delete('/:id',function(req,res){

    controllerbd.eliminar_empleado(req,res);

})


//exportamos la rutas para que puedan ser usadas
module.exports=router