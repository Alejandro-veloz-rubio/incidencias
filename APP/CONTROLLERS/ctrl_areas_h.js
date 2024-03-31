let mysql=require('../../BD/mysql')//requerimos el archivo que contiene la conexion a la base de datos

//creamos varios modulos que interactuaran con la base de datos, en donde despues de la sentencia mysql
//se crea una funcion que nos indica si hubo errores o en caso contrario nos devolvera la informacion requerida
module.exports={

    //este controlador trae de vuelta toda la informacion de las areas
    listar_areas_hotel:(req,res)=>{
        mysql.query('select * from areas_hotel', function(err,result,fields){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })
    },

    //este controlador agrega nuevas areas
    agregar_areas:(req,res)=>{

        //recibe por parametro el nombre de la nueva area
        let area_nueva=req.body.area_nombre;
        mysql.query(`insert into areas_hotel(nombre_de_area) values ('${area_nueva}')`,function(err,result,fields){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })
    },

    //este controlador busca cuantas veces un area ha sido usada para la tabla de los reportes de clientes
    disponibilidad:(req,res)=>{

        //recibe el id del area a buscar 
        let id=req.params.id;
        mysql.query(`select count(areas_hotel.id_area) as coincidencias from areas_hotel inner join reportes_clientes on areas_hotel.id_area=reportes_clientes.area where areas_hotel.id_area=${id}`, function(err,result,fields){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })

    },

    //este controlador permite modificar un area

    edit_areas:(req,res)=>{
        
        //recibe por parametro el id y el nuevo nombre del area a editar
        let id_area_edit=req.body.id;
        let new_name=req.body.new_name;
        
        mysql.query(`update areas_hotel set  nombre_de_area='${new_name}' where id_area=${id_area_edit}`,function(err,result,fields){

            if(err){
                res.json(err);
            }else{
                res.json(result);
            }



        })
    },

    //este controlador permite eliminar una area

    eliminar_areas:(req,res)=>{

        //recibe por parametro el id del area a eliminar
        let id_delete=req.params.id_area_delete;

        mysql.query(`delete from areas_hotel where id_area=${id_delete}`,function(err,result,fields){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })
    }
}