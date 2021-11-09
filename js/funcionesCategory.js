// Se envía solo un parámetro que es un diccionario, lee el servicio y carga los datos al diccionario json
//DEBO CAMBIAR LA URL Y LA ESTRUCTURA DEL DICCIONARIO JSON

function autoInicioCostume(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://132.226.163.1:8080/api/Costume/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-costume");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }    
    })
}

function limpiar(){
    document.getElementById("idNombre").value = "";
    document.getElementById("idDescripcion").value = "";
}

function insertar() {

    var nombre= $("#idNombre").val();
    var descripcion= $("#idDescripcion").val();
    
    var elemento;
    elemento = { 
        name:$("#idNombre").val(),
        description:$("#idDescripcion").val(),
    }

    if(nombre.length == 0  || descripcion.length == 0){
        alert('Error, debe completar todos los campos');
        $("#idNombre").focus();
        return;
    }
else{

        console.log(elemento);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(elemento),
        
        url:"http://132.226.163.1:8080/api/Category/save",
    
        
        success:function(response) {
                console.log(response);
                console.log("Se guardo correctamente");
                alert("Se guardo correctamente");
                //window.location.reload()
                traerInformacionCategorias();
                //obtenerItems();
                limpiar();

        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
        });

        }
}

function traerInformacionCategorias(){
  //  console.log("test");
        $.ajax({
        url:"http://132.226.163.1:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    $("#idDivConsulta").empty();
    $("#idDivConsulta").append("<caption>Tabla Categoria</caption>");
    $("#idDivConsulta").append("<tr><th>Nombre</th><th>Descripción</th></tr>");
   
    for(i=0;i<respuesta.length;i++){

        $("#idDivConsulta").append("<tr>");
        $("#idDivConsulta").append("<td>" + respuesta[i].name + "</td>");
        $("#idDivConsulta").append("<td>" + respuesta[i].description + "</td>");       
        $("#idDivConsulta").append('<td><button onclick="borrar('+respuesta[i].id+')">Borrar</button> </td>');
        $("#idDivConsulta").append('<td><button onclick="actualizar('+respuesta[i].id+')">Actualizar</button> </td>');
       
        $("#idDivConsulta").append("</tr>");
    }   
    console.log(respuesta)

}

function borrar(idElemento) {
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://132.226.163.1:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            traerInformacionCategorias();
            alert("Se ha Eliminado.")
        }
    });
}

function actualizar(idElemento) {

    var nombre= $("#idNombre").val();
    var descripcion= $("#idDescripcion").val();
    
    if(nombre.length == 0  || descripcion.length == 0){
        alert('Error, debe completar todos los campos');
        $("#idNombre").focus();
        return;
    }
else{
   
    let elemento = { 
        id: idElemento,
        name: $("#idNombre").val(), 
        description:$("#idDescripcion").val(),
        
    };

    var datatosend = JSON.stringify(elemento);
    console.log(elemento);
    $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(elemento),
            
            url:"http://132.226.163.1:8080/api/Category/update",
            success      :  function(response){
                               
                               console.log(response);
                               obtenerItems();
                               limpiar();
                               alert("se ha Actualizado correctamente la categoria")
                            },
            error       :   function(jqXHR,textStatus,errorThrown){
                            console.log( xhr);

                            }


        }
    );

    }
}

function obtenerItems(){

    console.log("se esta ejecutando")
    $.ajax({
        url:"http://132.226.163.1:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    
    });
}


