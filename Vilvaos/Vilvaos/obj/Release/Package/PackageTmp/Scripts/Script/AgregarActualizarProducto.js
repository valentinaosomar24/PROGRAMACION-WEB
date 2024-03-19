$.ajax({
    type: 'POST',
    url: 'ConsultarProveedores',
    contentType: "application/json;charset=utf-8",
    datatype: "json",
    success: function (jsondata, stat) {
        var datos = JSON.parse(jsondata);
        actualizarListaProveedores(datos);
    },
    error: function (error) {
        alert('Error al obtener la lista de proveedores:', error);
        window.location.href = "Proveedor";
    }
});

function actualizarListaProveedores(DatosP) {
    var listProveedor = document.getElementById("ListaProveedor");
    listProveedor.innerHTML = "";
    for (var i = 0; i < DatosP.length; i++) {
        $("#ListaProveedor").append(
            '<option data-id="' + DatosP[i].IdProveedor + '">' + DatosP[i].Nombre+ '</option>'
        );
    }
}

function Guardar() {
    var Nombre = document.getElementById("nombreProd").value;
    var Cantidad = document.getElementById("cantidadProd").value;
    var PrecioC = document.getElementById("PrecioCProd").value;
    var PrecioV = document.getElementById("PrecioVProd").value;
    var IdProveedor = 0;
    let Proveedor = document.getElementById('ProveedorSelect').value;
    if (Proveedor != "" && Proveedor != null) {
        let opciones = document.querySelectorAll('#proveedor option');
        for (let i = 0; i < opciones.length; i++) {
            if (Proveedor.replace(/ /g, '') == opciones[i].innerText.replace(/ /g, '')) {
                IdProveedor = opciones[i].dataset.id;
                break;
            } else {
                IdProveedor = 0;
            }
        }
    }
    if (Nombre.replace(/ /g, '') != "" && Cantidad.replace(/ /g, '') != "" && PrecioC.replace(/ /g, '') != "" &&
        PrecioV.replace(/ /g, '') != "" && IdProveedor != 0 && Proveedor.replace(/ /g, '') != "") {
        var data = "{'Nombre':'" + Nombre + "','Cantidad':'" + Cantidad + "','PrecioC':'" + PrecioC + "','PrecioV':'" + PrecioV + "','IdProveedor':'" + IdProveedor + "'}"
        $.ajax({
            type: 'POST',
            url: 'GuardarProducto',
            contentType: "application/json;charset=utf-8",
            datatype: "json",
            data: data,
            success: function (jsondata, stat) {
                var datos = JSON.parse(jsondata);
                alert(datos);
                window.location.href = "Producto";
            },
            error: function (error) {
                alert('Error al guardar producto Error:'+ error);
                window.location.href = "Producto";
            }
        });
    } else
    {
        alert("Verifique que todos los campos esten llenos y que el nombre del proveedor sea correcto");
    }
}

function Actualizar() {
    var Nombre = document.getElementById("nombreProd").value;
    var Cantidad = document.getElementById("cantidadProd").value;
    var PrecioC = document.getElementById("PrecioCProd").value;
    var PrecioV = document.getElementById("PrecioVProd").value;
    var IdProveedor = 0;
    let Proveedor = document.getElementById('ProveedorSelect').value;
    if (Proveedor != "" && Proveedor != null) {
        let opciones = document.querySelectorAll('#proveedor option');
        for (let i = 0; i < opciones.length; i++) {
            if (Proveedor.replace(/ /g, '') == opciones[i].innerText.replace(/ /g, '')) {
                IdProveedor = opciones[i].dataset.id;
                break;
            } else {
                IdProveedor = 0;
            }
        }
    }
    if (Nombre.replace(/ /g, '') != "" && Cantidad.replace(/ /g, '') != "" && PrecioC.replace(/ /g, '') != "" &&
        PrecioV.replace(/ /g, '') != "" && IdProveedor != 0 && Proveedor.replace(/ /g, '') != "") {
        var Id = document.getElementById('IdProductoGA').value;
        var data = "{'Id':'" + Id + "','Nombre':'" + Nombre + "','Cantidad':'" + Cantidad + "','PrecioC':'" + PrecioC + "','PrecioV':'" + PrecioV + "','IdProveedor':'" + IdProveedor + "'}"
        $.ajax({
            type: 'POST',
            url: 'ActualizarProducto',
            contentType: "application/json;charset=utf-8",
            datatype: "json",
            data: data,
            success: function (jsondata, stat) {
                var datos = JSON.parse(jsondata);
                alert(datos);
                window.location.href = "Producto";
            },
            error: function (error) {
                alert('Error al actualizar producto Error:' + error);
                window.location.href = "Producto";
            }
        });
    } else {
        alert("Verifique que todos los campos esten llenos y que el nombre del proveedor sea correcto");
    }
}
