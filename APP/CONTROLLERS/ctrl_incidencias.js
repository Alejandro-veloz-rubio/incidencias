let mysql=require('../../BD/mysql')//requerimos el archivo que contiene la conexion a la base de datos


//creamos varios modulos que interactuaran con la base de datos, en donde despues de la sentencia mysql
//se crea una funcion que nos indica si hubo errores o en caso contrario nos devolvera la informacion requerida

module.exports={

    //este controlador permite traer toda la informacion de las incidencias catalogadas
    listar_tipos_incidencias:(req,res)=>{
        mysql.query('select * from tipos_incidencias', function(err,result,fields){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })
    },


    //este controlador agrega incidencias

    agregar_tipos_incidencias:(req,res)=>{

        //recibe por parametros nombre, descripcion de la incidencia y el area asignada
        let nom_incidencia=req.body.nombre_incidencia;
        let des_incidencia=req.body.descripcion_incidencia;
        let area_id=req.body.area;

        mysql.query(`insert into tipos_incidencias (tipo_incidencia,descripcion,area) values ('${nom_incidencia}','${des_incidencia}',${area_id})`,function(err,result,fields){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })
    },


    //este controlador permite listar incidencias por area
    listar_tipos_incidencias_por_area:(req,res)=>{

        //recibe como parametro el area 
        let id_area=req.params.id

        mysql.query(`select * from tipos_incidencias where tipos_incidencias.area=${id_area}`,function (err,result,fields){
            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })

    },

    //este controlador busca cuantas veces una incidencia ha sido usada en la tabla reportes clientes

    dispo_tipos_incidencias:(req,res)=>{
        
        //recibe por parametro la incidencia a buscar 
        let value=req.params.incidencia;
        
        mysql.query(`select count(tipos_incidencias.tipo_incidencia) as coincidencias from tipos_incidencias inner join reportes_clientes on tipos_incidencias.tipo_incidencia = reportes_clientes.problema where reportes_clientes.problema='${value}'`,function(err,result,fields){

            if(err){

                res.json(err);

            }else{

                res.json(result);
            }


        })
    },

    //este controlador brinda informacion de una incidencia especifica
    tipos_incidencias_id:(req,res)=>{

        //recibe por parametro la incidencia a buscar 
        let nom=req.params.value_inci;

        mysql.query(`select * from tipos_incidencias where tipos_incidencias.tipo_incidencia='${nom}'`,function(err,result,fields){

            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })


    },

    //este controlador permite editar incidencias
    editar_incidencias:(req,res)=>{

        //recibe por parametros el id, nombre, descripcion de la incidencia y el area a la que pertenece
        let id_incidencia=req.body.id;
        let nom_inci=req.body.nombre;
        let des_inci=req.body.des;
        let area=req.body.area;

        mysql.query(`update tipos_incidencias set tipo_incidencia='${nom_inci}', descripcion='${des_inci}', area=${area} where id_incidencia=${id_incidencia}`,function(err,result,fields){
            if(err){

                res.json(err);

            }else{

                res.json(result);

            }
        })
    },

    //este controlador permite eliminar una incidencia
    eliminar_incidencia:(req,res)=>{

        //recibe por parametro el nombre de la incidencia a eliminar
        let nom_inci=req.params.nom_inci;

        mysql.query(`delete from tipos_incidencias where tipo_incidencia='${nom_inci}'`,function(err,result,fields){

            if(err){
                res.json(err);
            }else{
                res.json(result);
            }
        })
    }


}