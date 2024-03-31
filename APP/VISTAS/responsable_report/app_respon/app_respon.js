//se crea una variable que guardara los empleados
let empleados;
//se crea una varible que hace referencia a la tabla donde se mostrara los reportes de los empleados
let lista=document.getElementById('tabla_reportes');

 //se hace referencia donde se mostraran los reportes
 let div=document.getElementById('empleados');

//esta funcion manda llamar las areas del hotel
function areas_empleados(){

    //se usa la peticion fetch para mandar llamar a las areas
    fetch('http://10.200.4.242:1339/api/Areas_h',{
        method:'GET',
        body:JSON.stringify(),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(json=>{

        //se crea una variable que ahce referencia la select areas
        let areas_hotel=document.getElementById('areas_empleados');

        //en esta variable se guardar las areas a traves de un ciclo for
        let lista_areas_hotel='<option value="">*</option>';


        for(let i=0;i<json.length;i++){

            lista_areas_hotel+=`<option value="${json[i].id_area}">${json[i].nombre_de_area}</option>`;
        }

        //se inserta las areas en el select
        areas_hotel.innerHTML=lista_areas_hotel;
        
 
})

}


function buscar_empleados(){

     //se obtiene el area seleccionada
     let area=document.getElementById('areas_empleados').value;

     if(area==""){

        alert('Seleccione un area')
        div.innerHTML=" ";
        
     }else{

 
     //en esta variable se guardan los empleados
     empleados=' ';
 
     //se hace la peticion para buscar empleados en base al area
     fetch(`http://10.200.4.242:1339/api/Empleados/${area}`,{
         method:'GET',
         body:JSON.stringify(),
         headers:{
             'Content-Type':'application/json'
         }
     })
     .then(res=>res.json())
     .then(json=>{
 
         //se alamacena los empleados encontrados a traves de un ciclo for
 
         for(let i=0;i<json.length;i++){
 
             empleados+=`<option value="${json[i].id_empleado}">${json[i].apellido_p} ${json[i].apellido_m} ${json[i].nombres}</option>`;
         }
 
         //se crea una variable que crea elemntos html donde se adiciona los empleados para su seleccion
         let empleados_reportes=`
             <label >Identifique y seleccione su nombre para buscar sus reportes asignados: </label><br><br>
             <select name="empleados_areas" id="empleados_areas">
             <option value="">*</option>
             ${empleados}
             </select>
             
             <button id="btn_buscar_reportes" onclick="buscar_reportes()">Buscar reportes</button>`;
 
         //se inserta la variable al div correspondiente
         div.innerHTML=empleados_reportes;
 
 
     })

     }

     
    
}


//esta fucnion busca reportes en base al empleado
function buscar_reportes(){

    //se obtiene al empleado seleccionado
    let id_empleado=document.getElementById('empleados_areas').value;

   
    //se hace un peticion para buscar los reportes asignadas
    fetch( `http://10.200.4.242:1339/api/Reporte/Empleados_report/${id_empleado}`,{
            method:'GET',
            body:JSON.stringify(),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(json=>{

            //si la repuesta es 0 mostrara un mensaje y limpiara el div lista
            if(json.length==0){

                alert('Sin pendientes');
                lista.innerHTML=" ";
                div.innerHTML=" ";
                areas_empleados();

            }else{

                //en caso contrario se crea una variable
                //donde se crearan los titulos de la tabla
                let titulos=`
            <thead>
            <tr>
                <th>Numero de habitacion</th>
                <th>Problema</th>
                <th>Empleado Asignado</th>
                <th>Estado del reporte</th>
                <th>Comentarios</th>
                <th>Nombre del empleado que cerro el reporte</th>
            </tr>
            </thead>
            `
            //se crea una variable para guardar todas los reportes asignados a cada empleado a traves de 
            //un ciclo for
            let rest='';
            
            for(let i=0;i<json.length;i++){
                rest+=`
                <tbody>
                <tr>
                    <td>${json[i].numero_habitacion}</td>
                    <td>${json[i].problema}</td>  
                    <td>${json[i].apellido_p} ${json[i].apellido_m} ${json[i].nombres}</td>      
                    
                    <td>
                    <select id="${json[i].id_report}estados">
                    <option value="Cerrado">Cerrado</option>
                    <option value="Inconcluso">Inconcluso</option>
                    </select>
                    </td>          
                    
                    <td><textarea id="${json[i].id_report}comentarios"></textarea></td>  
                    <td>
                    <select id="${json[i].id_report}empleados">
                    ${empleados}
                    </select>
                    </td>    
                    <td><button onclick="Empleado_asignado(${json[i].id_report})">Terminar reporte</button></td> 
                </tr>
                </tbody>
                `;
            }
            //se inserta los valores en la tabla
            lista.innerHTML=titulos+rest;

            }

    })
}

//esta funcion registra la finalizacion del reporte
function Empleado_asignado(id_reporte){

    //se obtinen los valores de cada reporte como id del reporte, estado, comentarios y el empleado que cerro
    //fecha y hora 
    let id=id_reporte;

    let estado=document.getElementById(id_reporte+"estados").value;

    let empleado=document.getElementById(id_reporte+"empleados").value;

    let comentarios=document.getElementById(id_reporte+"comentarios").value;

    let date = new Date();
    let options = {timeZone: 'America/Mexico_City'};
    let time = date.toLocaleString('es-MX', options);

    //todos los datos obtenidos se crean en un JSON
    let datos=
    {
        id_report:id,
        estado:estado,
        empleado:parseInt(empleado),
        comentarios:comentarios,
        time:time
    }


    //se hace una peticion fetch donde se manda los datos JSON
    fetch('http://10.200.4.242:1339/api/Reporte/Cierre_reportes/final',{
        method:'PUT',
        body:JSON.stringify(datos),//se mandan los datos
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(json=>{
        //si todo sale bien se muestra el mensaje
        // se actualiza los reportes
        alert('Atendio un reporte')
        buscar_reportes();
    })

}

//hacemos llamar a las areas de empleados
areas_empleados()