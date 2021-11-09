// Se envía solo un parámetro que es un diccionario, lee el servicio y carga los datos al diccionario json
//DEBO CAMBIAR LA URL Y LA ESTRUCTURA DEL DICCIONARIO JSON

function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://132.226.163.1:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }    
    })
}

function limpiar(){

    document.getElementById("idBrand").value = "";
    document.getElementById("idModel").value = "";
    document.getElementById("idDescription").value = "";
    document.getElementById("idName").value = "";
}

function pintarRespuesta(respuesta){

    $("#idDivConsulta").empty();
    $("#idDivConsulta").append("<caption>Tabla Disfraz</caption>");
    $("#idDivConsulta").append("<tr><th>Marca</th><th>Modelo</th><th>Descripción</th><th>Categoria</th><th>Nombre</th></tr>");
   
    for(i=0;i<respuesta.length;i++){

        $("#idDivConsulta").append("<tr>");
        $("#idDivConsulta").append("<td>" + respuesta[i].brand + "</td>");
        $("#idDivConsulta").append("<td>" + respuesta[i].year + "</td>"); 
        $("#idDivConsulta").append("<td>" + respuesta[i].description + "</td>"); 
        $("#idDivConsulta").append("<td>" + respuesta[i].category.name + "</td>"); 
        $("#idDivConsulta").append("<td>" + respuesta[i].name + "</td>");        
        $("#idDivConsulta").append('<td><button onclick="borrar('+respuesta[i].id+')">Borrar</button> </td>');
        $("#idDivConsulta").append('<td><button onclick="actualizar('+respuesta[i].id+')">Actualizar</button> </td>');
       
        $("#idDivConsulta").append("</tr>");
    }   
    console.log(respuesta)

}

function obtenerItems(){
    $.ajax({
        url:"http://132.226.163.1:8080/api/Costume/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function insertar() {

    var brand= $("#idBrand").val();
    var modelo= $("#idModel").val();
    var descripcion= $("#idDescription").val();
    var categoria=$("#select-category").val();
    var nombre= $("#idName").val();
  
    if(brand.length==0 || modelo.length==0 || descripcion.length==0 ||categoria.length==0|| nombre.length==0){
        alert('Error, debe completar todos los campos'+categoria);
        $("#idBrand").focus();
        return false;
    }
    else{
    let elemento;
    elemento = { 
       
        brand:$("#idBrand").val(),
        year: $("#idModel").val(),
        description:$("#idDescription").val(),
        category:{id: + categoria},
        name: $("#idName").val()
    }
    var datatosend = JSON.stringify(elemento);
    $.ajax (
        {

            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(elemento),
            url:"http://132.226.163.1:8080/api/Costume/save",

            success      :  function(response){
                               
                               console.log(response);
                               alert("Se guardo correctamente");
                               obtenerItems();
                               limpiar();
                            },
            error       :   function(jqXHR,textStatus,errorThrown){
                            console.log( xhr);

                            }


        }
    );
    }


}

function borrar(idElemento) {
    let elemento;
    elemento = { 
        id:idElemento
    };
    let dataToSend   = JSON.stringify(elemento);
    console.log(dataToSend);
    $.ajax (
        {
            url:"http://132.226.163.1:8080/api/Costume/"+idElemento,
            type:"DELETE",
            data:dataToSend,
            contentType:"application/JSON",
            datatype:"JSON",
            success      :  function(response){
                                console.log(response);
                                alert("Se ha borrado el  Correctamente!")
                                obtenerItems();
                                limpiar();

                            },
            error       :   function(jqXHR,textStatus,errorThrown){
                                console.log(xhr);

                            }
        }
    );
}

function actualizar(idElemento) {
  
    var brand= $("#idBrand").val();
    var modelo= $("#idModel").val();
    var descripcion= $("#idDescription").val();
    var nombre= $("#idName").val();
    
    if(brand.length == 0  || modelo.length == 0 || descripcion.length == 0 ||nombre.length == 0){
        alert('Error, debe completar todos los campos');
        $("#idBrand").focus();
        return;
    }
    else{
        let elemento;
        elemento = { 
            id: idElemento, 
            brand:$("#idBrand").val(),
            year: $("#idModel").val(),
            description:$("#idDescription").val(),
            category:{id: +$("#select-category").val()},
            name: $("#idName").val(),
        };
        console.log(elemento);
         
        $.ajax (
            {
                url:"http://132.226.163.1:8080/api/Costume/update",
                type:"PUT",
                data:JSON.stringify(elemento),
                contentType:"application/JSON",
                datatype:"JSON",
                success      :  function(response){
                                
                                console.log(response);
                                alert("El registro de Disfraz fue modificado satisfactoriamente");
                                obtenerItems();
                                limpiar();
                                },
                error       :   function(jqXHR,textStatus,errorThrown){
                                console.log( xhr);

                                }


            }
        );

    }
}
                                                 
