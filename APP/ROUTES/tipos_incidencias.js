let controllerbd=require('../CONTROLLERS/ctrl_incidencias');//se establece conexion con los controladores para hacer uso de ellos
var router=require('express').Router();//se define router para que una pagina pueda accedere a la ruta

//esta ruta de tipo "get" usa el controlador "listar_tipos_incidencias"
router.get('/',function(req,res){

    controllerbd.listar_tipos_incidencias(req,res);

})


//esta ruta de tipo "post" usa el controlador "agregar_tipos_incidencias"
router.post('/',function(req,res){

    controllerbd.agregar_tipos_incidencias(req,res);
    
})


//esta ruta de tipo "get" necesita un "id" para usar el controlador "listar_tipos_incidencias_por_area"
router.get('/Areas/:id',function(req,res){

    controllerbd.listar_tipos_incidencias_por_area(req,res);

})


//esta ruta de tipo "get" necesita un "incidencia(nombre)" para usar el controlador "dispo_tipos_incidencias"
router.get('/dispo/:incidencia',function(req,res){

    controllerbd.dispo_tipos_incidencias(req,res);

})

//esta ruta de tipo "get" necesita un "value_inci(nombre de incidencia)" para usar el controlador "tipos_incidencias_id" 
router.get('/espec/:value_inci',function(req,res){

    controllerbd.tipos_incidencias_id(req,res);

})

//esta ruta de tipo "put" usa el controlador "editar_incidencias"
router.put('/edit_inci/',function(req,res){

    controllerbd.editar_incidencias(req,res);

})


//esta ruta de tipo "delete" necesita un "nom_inci(nombre de incidencia)" para usar el controlador "eliminar_incidencia"
router.delete('/:nom_inci',function(req,res){

    controllerbd.eliminar_incidencia(req,res);

})

//exportamos la rutas para que puedan ser usadas
module.exports=router