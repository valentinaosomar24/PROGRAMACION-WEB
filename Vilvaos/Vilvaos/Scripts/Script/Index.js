
function MostrarDatos()
{
    document.getElementById("loader-container").style.display = "flex";
    var NombreEmpresa = document.getElementById("NombreEmpresa");
    var NitEmpresa = document.getElementById("NitEmpresa");
    var CiudadEmpresa = document.getElementById("CiudadEmpresa");
    var CategoriaEmpresa = document.getElementById("CategoriaEmpresa");
    var TelefonoEmpresa = document.getElementById("TelefonoEmpresa");
    var DireccionEmpresa = document.getElementById("DireccionEmpresa");
    var CorreoEmpresa = document.getElementById("CorreoEmpresa");
    var CargoEmpresa = document.getElementById("CargoEmpresa");
    var btn = document.getElementById("btnIndexForm");
    btn.innerHTML = "";
    $.ajax({
        type: 'POST',
        url: 'ConsultaEmpresa',
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (jsondata, stat) {
            var datos = JSON.parse(jsondata);
            if (datos[0].NIT == null) {
                NombreEmpresa.value = datos[0].Nombre;
                CorreoEmpresa.value = datos[0].Correo;
                btn.innerHTML = "<button class='button' type='button' onclick='GuardarEmpresa()'>Guardar</button>"
            } else
            {
                NombreEmpresa.innerHTML = datos[0].Nombre;
                NitEmpresa.innerHTML = "NIT: "+datos[0].NIT;
                CiudadEmpresa.value = datos[0].Ciudad;
                CategoriaEmpresa.value = datos[0].Categoria;
                CorreoEmpresa.value = datos[0].Correo;
                TelefonoEmpresa.value = datos[0].Telefono;
                DireccionEmpresa.value = datos[0].Direccion;
                CargoEmpresa.value = datos[0].Gerente;
                btn.innerHTML = "<button class='button' type='button' onclick='ActualizarEmpresa()'>Actualizar</button>"
            }
            document.getElementById("loader-container").style.display = "none";
        },
        error: function (error) {
            alert('Error al traer datos de empresa:', error);
            document.getElementById("loader-container").style.display = "none";
        }
    });
}

function GuardarEmpresa()
{
    var NitEmpresa = document.getElementById("NitEmpresa").value;
    var CiudadEmpresa = document.getElementById("CiudadEmpresa").value;
    var CategoriaEmpresa = document.getElementById("CategoriaEmpresa").value;
    var TelefonoEmpresa = document.getElementById("TelefonoEmpresa").value;
    var DireccionEmpresa = document.getElementById("DireccionEmpresa").value;
    var CorreoEmpresa = document.getElementById("CorreoEmpresa").value;
    var CargoEmpresa = document.getElementById("CargoEmpresa").value;

    if (NitEmpresa.replace(/ /g, '') != "" && CiudadEmpresa.replace(/ /g, '') != "" && CategoriaEmpresa.replace(/ /g, '') != "" && TelefonoEmpresa.replace(/ /g, '') != "" &&
        DireccionEmpresa.replace(/ /g, '') != "" && CorreoEmpresa.replace(/ /g, '') != "" && CargoEmpresa.replace(/ /g, '') != "") {
        var data = "{'NitEmpresa':'" + NitEmpresa + "','CiudadEmpresa':'" + CiudadEmpresa + "','CategoriaEmpresa':'" + CategoriaEmpresa + "','TelefonoEmpresa':'" + TelefonoEmpresa + "','DireccionEmpresa':'" + DireccionEmpresa + "','CorreoEmpresa':'" + CorreoEmpresa + "','CargoEmpresa':'" + CargoEmpresa + "'}"
        $.ajax({
            type: 'POST',
            url: 'GuardarDatosAdEm',
            contentType: "application/json;charset=utf-8",
            datatype: "json",
            data:data,
            success: function (jsondata, stat) {
                var datos = JSON.parse(jsondata);
                alert(datos)
                window.location.href = "Index";
            },
            error: function (error) {
                alert('Error al guardar datos de empresa:', error);
                document.getElementById("loader-container").style.display = "none";
                window.location.href = "Index";
            }
        });
    } else {
        alert("Ingrese todos los datos para poder guardarlos")
    }
}

function ActualizarEmpresa()
{
    var CiudadEmpresa = document.getElementById("CiudadEmpresa").value;
    var CategoriaEmpresa = document.getElementById("CategoriaEmpresa").value;
    var TelefonoEmpresa = document.getElementById("TelefonoEmpresa").value;
    var DireccionEmpresa = document.getElementById("DireccionEmpresa").value;
    var CorreoEmpresa = document.getElementById("CorreoEmpresa").value;
    var CargoEmpresa = document.getElementById("CargoEmpresa").value;

    if (CiudadEmpresa.replace(/ /g, '') != "" && CategoriaEmpresa.replace(/ /g, '') != "" && TelefonoEmpresa.replace(/ /g, '') != "" &&
        DireccionEmpresa.replace(/ /g, '') != "" && CorreoEmpresa.replace(/ /g, '') != "" && CargoEmpresa.replace(/ /g, '') != "") {
        var data = "{'CiudadEmpresa':'" + CiudadEmpresa + "','CategoriaEmpresa':'" + CategoriaEmpresa + "','TelefonoEmpresa':'" + TelefonoEmpresa + "','DireccionEmpresa':'" + DireccionEmpresa + "','CorreoEmpresa':'" + CorreoEmpresa + "','CargoEmpresa':'" + CargoEmpresa + "'}"
        $.ajax({
            type: 'POST',
            url: 'ActuazlizarDatosAdEm',
            contentType: "application/json;charset=utf-8",
            datatype: "json",
            data:data,
            success: function (jsondata, stat) {
                var datos = JSON.parse(jsondata);
                alert(datos)
                window.location.href = "Index";
            },
            error: function (error) {
                alert('Error al actualizar datos de empresa:', error);
                document.getElementById("loader-container").style.display = "none";
                window.location.href = "Index";
            }
        });
    } else {
        alert("Ingrese todos los datos para poder guardarlos")
    }
}