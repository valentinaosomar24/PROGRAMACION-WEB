function Guardar() {
    var NombreProveedor = document.getElementById("NombreProveedor").value;
    var TelefonoProveedor = document.getElementById("TelefonoProveedor").value;
    var CiudadProveedor = document.getElementById("CiudadProveedor").value;
    if (NombreProveedor.replace(/ /g, '') != "" && TelefonoProveedor.replace(/ /g, '') != "" && CiudadProveedor.replace(/ /g, '') != "") {
        var data = "{'NombreProveedor':'" + NombreProveedor + "','TelefonoProveedor':'" + TelefonoProveedor + "','CiudadProveedor':'" + CiudadProveedor + "'}"
        $.ajax({
            type: 'POST',
            url: 'GuardarProveedor',
            contentType: "application/json;charset=utf-8",
            datatype: "json",
            data: data,
            success: function (jsondata, stat) {
                var datos = JSON.parse(jsondata);
                alert(datos);
                window.location.href = "Proveedor";
            },
            error: function (error) {
                alert('Error al guardar proveedor Error:' + error);
                window.location.href = "Proveedor";
            }
        });
    } else {
        alert("Verifique que todos los campos esten llenos");
    }
}

function Actualizar() {
    var NombreProveedor = document.getElementById("NombreProveedor").value;
    var TelefonoProveedor = document.getElementById("TelefonoProveedor").value;
    var CiudadProveedor = document.getElementById("CiudadProveedor").value;
    if (NombreProveedor.replace(/ /g, '') != "" && TelefonoProveedor.replace(/ /g, '') != "" && CiudadProveedor.replace(/ /g, '') != "") {
        var Id = document.getElementById('IdProveedorGA').value;
        var data = "{'Id':'" + Id + "','NombreProveedor':'" + NombreProveedor + "','TelefonoProveedor':'" + TelefonoProveedor + "','CiudadProveedor':'" + CiudadProveedor + "'}"
        $.ajax({
            type: 'POST',
            url: 'ActualizarProveedor',
            contentType: "application/json;charset=utf-8",
            datatype: "json",
            data: data,
            success: function (jsondata, stat) {
                var datos = JSON.parse(jsondata);
                alert(datos);
                window.location.href = "Proveedor";
            },
            error: function (error) {
                alert('Error al actualizar proveedor Error:' + error);
                window.location.href = "Proveedor";
            }
        });
    } else {
        alert("Verifique que todos los campos esten llenos");
    }
}