let controllerbd=require('../CONTROLLERS/ctrl_areas_h');//se establece conexion con los controladores para hacer uso de ellos
var router=require('express').Router();//se define router para que una pagina pueda accedere a la ruta


//esta ruta es de tipo get y usa el controlador "listar_areas_hotel"
router.get('/',function(req,res){

    controllerbd.listar_areas_hotel(req,res);

})

//esta ruta necesita un "id" para usar el controlador "disponibilidad"
router.get('/dipo_area/:id',function(req,res){

    controllerbd.disponibilidad(req,res);

})

//esta ruta de tipo "post" usa el controlador "agregar_areas"
router.post('/',function(req,res){

    controllerbd.agregar_areas(req,res);
    
})

//esta ruta de tipo "put" usa el controlador "edit_areas"
router.put('/',function(req,res){

    controllerbd.edit_areas(req,res);
    
})

//esta ruta de tipo "delete" necesita un "id" para usar el controlador "eliminar_areas"
router.delete('/:id_area_delete',function(req,res){

    controllerbd.eliminar_areas(req,res);
    
})

//exportamos la rutas para que puedan ser usadas
module.exports=router