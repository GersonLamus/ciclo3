// Se envía solo un parámetro que es un diccionario, lee el servicio y carga los datos al diccionario json
//DEBO CAMBIAR LA URL Y LA ESTRUCTURA DEL DICCIONARIO JSON
function limpiar(){
    document.getElementById("idCodigo").value = "";
    document.getElementById("idName").value = "";
    document.getElementById("idEmail").value = "";
    document.getElementById("idAge").value = "";
    
}

function insertar() {

    var codigo =$("#idCodigo").val();
    var nombre= $("#idName").val();
    var correo= $("#idEmail").val();
    var edad= $("#idAge").val();
  
    if(codigo.length == 0 || nombre.length==0 || correo.length==0 || edad.length==0){
        alert('Error, debe completar todos los campos');
        $("#idCodigo").focus();
        return false;
    }
    else{
    var elemento;
    elemento = { 
        id: $("#idCodigo").val(), 
        name:$("#idName").val(),
        email: $("#idEmail").val(),
        age: $("#idAge").val(),
 
    }
    var datatosend = JSON.stringify(elemento);
    $.ajax (
        {
            datatype:   'json',
            data    :   elemento,
            url     : 'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client' ,
            type    :   'POST',
            success      :  function(response){
                               
                               console.log(response);
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
    var codigo =$("#idCodigo").val();
    var nombre= $("#idName").val();
  
    if(codigo.length == 0 && nombre.length == 0){
        alert('Error, debe completar todos los campos');
        $("#idCodigo").focus();
        return false;
    }
    else {
    var elemento;
    elemento = { 
        id:idElemento
    };
    var dataToSend   = JSON.stringify(elemento);

    $.ajax (
        {
            datatype    : 'json',
            data        :  dataToSend,
            contentType  : 'application/json', 
            url         :'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
            type        : 'DELETE',
            success      :  function(response){
                                console.log(response);
                                obtenerItems();
                                limpiar();

                            },
            error       :   function(jqXHR,textStatus,errorThrown){
                                console.log(xhr);

                            }
        }
    );
    }
}

function actualizar() {
    var codigo =$("#idCodigo").val();
  
    if(codigo.length == 0 ){
        alert('Error, debe completar todos los campos');
        $("#idCodigo").focus();
        return false;
    }
    else{
    var elemento;
    elemento = { 
        id: $("#idCodigo").val(), 
        name:$("#idName").val(),
        email: $("#idEmail").val(),
        age: $("#idAge").val(),
     };
    var datatosend = JSON.stringify(elemento);
    $.ajax (
        {
            datatype:   'json',
            data    :   datatosend,
            contentType: 'application/json', 
            url     : 'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
            type    :   'PUT',
            success      :  function(response){
                               
                               console.log(response);
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
function obtenerItems(){
    $.ajax (
        {
            dataType     : 'json', 
            url          : 'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
            type         : 'GET',
            success      :  function(response){
                $("#idDivConsulta").empty();
                $("#idDivConsulta").append("<caption>Tabla Cliente</caption>");
                $("#idDivConsulta").append("<tr><th>Codigo</th><th>Nombre</th><th>Correo</th><th>Edad</th><th>Acción</th></tr>");
                var misItems=response.items;
                for(i=0;i<misItems.length;i++){
                    $("#idDivConsulta").append("<tr>");
                    $("#idDivConsulta").append("<td>" + misItems[i].id + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].name + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].email + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].age + "</td>");
                    $("#idDivConsulta").append('<td><button onclick="borrar('+misItems[i].id+')">Borrar</button> </td>');
                    $("#idDivConsulta").append('<td><button onclick="obtenerItemEspecifico('+misItems[i].id+')">Cargar</button> </td>');
                    $("#idDivConsulta").append("</tr>");
                }    
                console.log(response)
            },
            error       :   function(jqXHR,textStatus,errorThrown){
                
            },
        }
    );
}

function obtenerItemEspecifico(idIdItem){
    $.ajax (
        {
            dataType     : 'json', 
            url          : 'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/'+idIdItem,
            type         : 'GET',
            success      :  function(response){
                console.log(response);
                var item=response.items[0];
                $("#idCodigo").val(item.id);
                $("#idName").val(item.name);
                $("#idEmail").val(item.email);
                $("#idAge").val(item.age);
            },
            error       :   function(jqXHR,textStatus,errorThrown){
                console.log( xhr);
            },
        }
    );
}


function obtenerItemEspecifico2(){
    var codigo =$("#idCodigo").val();
 
    if(codigo.length == 0 ){
        alert('Error, debe completar todos los campos');
        $("#idCodigo").focus();
        return false;
    }
    else{
    idIdItem = document.getElementById("idCodigo").value;
    $.ajax (
        {
            dataType     : 'json', 
            url          : 'https://ge5f47e521d3134-db202110011836.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/'+idIdItem,
            type         : 'GET',
            success      :  function(response){
                console.log(response);
                var item=response.items[0];
                $("#idCodigo").val(item.id);
                $("#idName").val(item.name);
                $("#idEmail").val(item.email);
                $("#idAge").val(item.age);

                $("#idDivConsulta").empty();
                $("#idDivConsulta").append("<caption>Tabla Cliente</caption>");
                $("#idDivConsulta").append("<tr><th>Codigo</th><th>Nombre</th><th>Correo</th><th>Edad</th><th>Acción</th></tr>");
                var misItems=response.items;
                for(i=0;i<misItems.length;i++){
                    $("#idDivConsulta").append("<tr>");
                    $("#idDivConsulta").append("<td>" + misItems[i].id + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].name + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].email + "</td>");
                    $("#idDivConsulta").append("<td>" + misItems[i].age + "</td>");
                    $("#idDivConsulta").append('<td><button onclick="borrar('+misItems[i].id+')">Borrar</button> </td>');
                    $("#idDivConsulta").append('<td><button onclick="obtenerItemEspecifico('+misItems[i].id+')">Cargar</button> </td>');
                }
                    $("#idDivConsulta").append("</tr>");
                
            },
            error       :   function(jqXHR,textStatus,errorThrown){
                console.log( xhr);
            },
        }
    );
    }
}
