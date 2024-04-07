$(document).ready(function () {
    document.getElementById("loader-container").style.display = "flex";
    $.ajax({
        type: 'POST',
        url: "ConsultarProveedores",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (jsondata, stat) {
            var datos = JSON.parse(jsondata);
            var tabla = document.getElementById("TablaBodyProveedor");
            tabla.innerHTML = "";
            var contenidoTabla = ""; // Variable para acumular el contenido
            for (var i = 0; i < datos.length; i++) {
                contenidoTabla += "<tr>" +
                    "<th scope='row'>" + datos[i].IdProveedor + "</th>" +
                    "<td>" + datos[i].Nombre + "</td>" +
                    "<td>" + datos[i].Telefono + "</td>" +
                    "<td>" + datos[i].Ciudad + "</td>" +
                    "<td>" +
                    "<button class='btnTablaP btn btn-info' onclick='redirectToAction(" + 2 + "," + datos[i].IdProveedor + ")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button>" +
                    "<button class='btnTablaP btn btn-danger' onclick='EliminarProveedor(" + datos[i].IdProveedor +")'><i class='fa fa-trash-o' aria-hidden='true'></i></button>" +
                    "</td>" +
                    "</tr>";
            }
            tabla.innerHTML = contenidoTabla;

            ManejaFunciones();
            document.getElementById("loader-container").style.display = "none";
        },
        error: function (xhr, status) {
            alert("Error: " + xhr + "-" + status);
            document.getElementById("loader-container").style.display = "none";
        },
    });
});

function ManejaFunciones() {
    $('#myTableCliente').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function redirectToAction(Op, id) {
    var url = '/Home/Agregar_ActualizarProveedor?Op=' + Op + '&id=' + id;
    window.location.href = url;
}

function EliminarProveedor(id) {
    var opcion = confirm("¿Esta seguro de ELIMINAR este proveedor?");
    if (opcion == true) {
        var data = "{'Id':'" + id + "'}"
        $.ajax({
            type: 'POST',
            url: 'EliminarProveedor',
            contentType: "application/json;charset=utf-8",
            datatype: "json",
            data: data,
            success: function (jsondata, stat) {
                var datos = JSON.parse(jsondata);
                alert(datos);
                window.location.href = "Proveedor";
            },
            error: function (error) {
                alert('Error al eliminar:', error);
                window.location.href = "Proveedor";
            }
        });
    }
}