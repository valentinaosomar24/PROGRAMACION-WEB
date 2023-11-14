function AgregarActualizar()
{

}

function obtenerProveedores(inputValue) {
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
            window.location.href = "Index";
        }
    });
}
