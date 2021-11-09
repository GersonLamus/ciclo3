// Se envía solo un parámetro que es un diccionario, lee el servicio y carga los datos al diccionario json
//DEBO CAMBIAR LA URL Y LA ESTRUCTURA DEL DICCIONARIO JSON


function limpiar(){

    document.getElementById("idName").value = "";
    document.getElementById("idEmail").value = "";
    document.getElementById("idPassword").value = "";
    document.getElementById("idAge").value = "";
}

function pintarRespuesta(respuesta){

    $("#idDivConsulta").empty();
    $("#idDivConsulta").append("<caption>Tabla Cliente</caption>");
    $("#idDivConsulta").append("<tr><th>Nombre</th><th>Email</th><th>Password</th><th>Edad</th></tr>");
   
    for(i=0;i<respuesta.length;i++){

        $("#idDivConsulta").append("<tr>");
        $("#idDivConsulta").append("<td>" + respuesta[i].name + "</td>");
        $("#idDivConsulta").append("<td>" + respuesta[i].email + "</td>"); 
        $("#idDivConsulta").append("<td>" + respuesta[i].password + "</td>"); 
        $("#idDivConsulta").append("<td>" + respuesta[i].age + "</td>");        
        $("#idDivConsulta").append('<td><button onclick="borrar('+respuesta[i].idClient+')">Borrar</button> </td>');
        $("#idDivConsulta").append('<td><button onclick="actualizar('+respuesta[i].idClient+')">Actualizar</button> </td>');
       
        $("#idDivConsulta").append("</tr>");
    }   
    console.log(respuesta)

}

function obtenerItems(){
    $.ajax({
        url:"http://132.226.163.1:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function insertar() {

    var name= $("#idName").val();
    var email= $("#idEmail").val();
    var password= $("#idPassword").val();
    var age= $("#idAge").val();
  
    if(name.length==0 || email.length==0 || password.length==0 ||age.length==0){
        alert('Error, debe completar todos los campos');
        $("#idName").focus();
        return false;
    }
    else{
    let elemento;
    elemento = { 
       
        name:$("#idName").val(),
        email: $("#idEmail").val(),
        password:$("#idPassword").val(),
        age: $("#idAge").val()
    }
    var datatosend = JSON.stringify(elemento);
    $.ajax (
        {

            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(elemento),
            url:"http://132.226.163.1:8080/api/Client/save",

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
            url:"http://132.226.163.1:8080/api/Client/"+idElemento,
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
  
    var name= $("#idName").val();
    var email= $("#idEmail").val();
    var password= $("#idPassword").val();
    var age= $("#idAge").val();
  
    if(name.length==0 || email.length==0 || password.length==0 ||age.length==0){
        alert('Error, debe completar todos los campos');
        $("#idName").focus();
        return;
    }
    else{
        let elemento;
        elemento = { 
            idClient: idElemento,
            name:$("#idName").val(),
            email: $("#idEmail").val(),
            password:$("#idPassword").val(),
            age: $("#idAge").val()
        };
        console.log(elemento);
         
        $.ajax (
            {
                url:"http://132.226.163.1:8080/api/Client/update",
                type:"PUT",
                data:JSON.stringify(elemento),
                contentType:"application/JSON",
                datatype:"JSON",
                success      :  function(response){
                                
                                console.log(response);
                                alert("El registro de Cliente fue modificado satisfactoriamente");
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
                                                 
