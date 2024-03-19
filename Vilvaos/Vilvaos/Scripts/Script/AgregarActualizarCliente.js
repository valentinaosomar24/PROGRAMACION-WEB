function Guardar() {
    var NombreCliente = document.getElementById("NombreCliente").value;
    var ApellidoCliente = document.getElementById("ApellidoCliente").value;
    var DireccionCliente = document.getElementById("DireccionCliente").value;
    var TelefonoCliente = document.getElementById("TelefonoCliente").value;
    var CiudadCliente = document.getElementById("CiudadCliente").value;
    if (NombreCliente.replace(/ /g, '') != "" && ApellidoCliente.replace(/ /g, '') != "" && DireccionCliente.replace(/ /g, '') != "" &&
        TelefonoCliente.replace(/ /g, '') != "" && CiudadCliente.replace(/ /g, '') != "") {
        var data = "{'NombreCliente':'" + NombreCliente + "','ApellidoCliente':'" + ApellidoCliente + "','DireccionCliente':'" + DireccionCliente + "','TelefonoCliente':'" + TelefonoCliente + "','CiudadCliente':'" + CiudadCliente + "'}"
        $.ajax({
            type: 'POST',
            url: 'GuardarCliente',
            contentType: "application/json;charset=utf-8",
            datatype: "json",
            data: data,
            success: function (jsondata, stat) {
                var datos = JSON.parse(jsondata);
                alert(datos);
                window.location.href = "Cliente";
            },
            error: function (error) {
                alert('Error al guardar cliente Error:' + error);
                window.location.href = "Cliente";
            }
        });
    } else {
        alert("Verifique que todos los campos esten llenos");
    }
}

function Actualizar() {
    var NombreCliente = document.getElementById("NombreCliente").value;
    var ApellidoCliente = document.getElementById("ApellidoCliente").value;
    var DireccionCliente = document.getElementById("DireccionCliente").value;
    var TelefonoCliente = document.getElementById("TelefonoCliente").value;
    var CiudadCliente = document.getElementById("CiudadCliente").value;
    if (NombreCliente.replace(/ /g, '') != "" && ApellidoCliente.replace(/ /g, '') != "" && DireccionCliente.replace(/ /g, '') != "" &&
        TelefonoCliente.replace(/ /g, '') != "" && CiudadCliente.replace(/ /g, '') != "") {
        var Id = document.getElementById('IdClienteGA').value;
        var data = "{'Id':'" + Id + "','NombreCliente':'" + NombreCliente + "','ApellidoCliente':'" + ApellidoCliente + "','DireccionCliente':'" + DireccionCliente + "','TelefonoCliente':'" + TelefonoCliente + "','CiudadCliente':'" + CiudadCliente + "'}"
        $.ajax({
            type: 'POST',
            url: 'ActualizarCliente',
            contentType: "application/json;charset=utf-8",
            datatype: "json",
            data: data,
            success: function (jsondata, stat) {
                var datos = JSON.parse(jsondata);
                alert(datos);
                window.location.href = "Cliente";
            },
            error: function (error) {
                alert('Error al actualizar cliente Error:' + error);
                window.location.href = "Cliente";
            }
        });
    } else {
        alert("Verifique que todos los campos esten llenos");
    }
}