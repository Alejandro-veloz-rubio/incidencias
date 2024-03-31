let mysql=require('../../BD/mysql')//requerimos el archivo que contiene la conexion a la base de datos

//creamos varios modulos que interactuaran con la base de datos, en donde despues de la sentencia mysql
//se crea una funcion que nos indica si hubo errores o en caso contrario nos devolvera la informacion requerida

module.exports={

    //este controlador permite agregar nuevos empleados

    agregar_empleados:(req,res)=>{

        //recibimos como parametros id, apellidos, nombres, area asignada, puesto y num de nomina
        let apellido_pa=req.body.apellido_p;
        let apellido_ma=req.body.apellido_m;
        let nombre_s=req.body.nombres_empleado;
        let area_asign=req.body.area_asignada;
        let puesto_empleado=req.body.puesto;
        let num_nomina=req.body.num_nomina;

        mysql.query(`insert into empleados(apellido_p,apellido_m,nombres,area_h,puesto,num_nomina) values ('${apellido_pa}','${apellido_ma}','${nombre_s}',${area_asign},'${puesto_empleado}',${num_nomina})`, function(err,result,fields){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })
    },

    //este controlador trae todos los empleados de una area especifica

    listar_empleados_area:(req,res)=>{

        //recibimos el area para buscar sus empleados
        let area_empleado=req.params.area;

        mysql.query(`select * from empleados where area_h=${area_empleado}`, function(err,result,fields){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })
        
    },

    //este controlador lista todos los empleados
    listar_empleados:(req,res)=>{

        mysql.query(`select * from empleados`, function(err,result,fields){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })
    },

    //este controlador busca cuantas veces un empleado ha sido registrado en la tabla de los reportes de los clientes

    buscar_disponiblidad:(req,res)=>{

        //recibimos el id del empleado a buscar
        let id_empleado=req.params.id_em;
        mysql.query(`select count(empleados.id_empleado) as coincidencias from empleados inner join reportes_clientes on empleados.id_empleado=reportes_clientes.responsable or  empleados.id_empleado=reportes_clientes.nom_responsable_cierre where empleados.id_empleado=${id_empleado}`, function(err,result,fields){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })
    },

    //este controlador busca un empleado especifico
    buscar_id_empleado:(req,res)=>{

        //recibimos por parametro el id del empleado a buscar

        let id_empleado=req.params.id;

        mysql.query(`select * from empleados where id_empleado=${id_empleado}`,function(err,result,fields){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })

    },

    // este controlador permite editar la informacion de un empleado

    editar_empleado:(req,res)=>{
        
        //recibimos como parametros id, apellidos, nombres, area asignada, puesto y num de nomina
        let id_empleado=req.body.id;
        let apellido_pa=req.body.apellido_p;
        let apellido_ma=req.body.apellido_m;
        let nombre_s=req.body.nombres_empleado;
        let area_asign=req.body.area_asignada;
        let puesto_empleado=req.body.puesto;
        let num_nomina=req.body.num_nomina;

        mysql.query(`update empleados set apellido_p ='${apellido_pa}', apellido_m='${apellido_ma}', nombres='${nombre_s}', area_h=${area_asign},puesto = '${puesto_empleado}',num_nomina=${num_nomina} where id_empleado=${id_empleado}`,function(err,result,fields){
            if(err){
                res.json(err)
            }else{
                res.json(result);
            }
        })

    },

    //este controlador permite eliminar un empleado
    eliminar_empleado:(req,res)=>{
        
        //recibimos por parametros el id del empleado a eliminar
        let id_delete=req.params.id;

        mysql.query(`delete from empleados where id_empleado=${id_delete}`, function(err,result,fields){
            if(err){
                res.json(err)
            }else{
                res.json(result);
            }
        })
    }
    
}