$(document).ready(function () {
    document.getElementById("loader-container").style.display = "flex";
    $.ajax({
        type: 'POST',
        url: "ConsultarProductos",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (jsondata, stat) {
            var datos = JSON.parse(jsondata);
            var tabla = document.getElementById("TablaBodyProduct");
            tabla.innerHTML = "";
            var contenidoTabla = ""; // Variable para acumular el contenido
            var bg = "";
            var dato1 = 0;
            var dato2 = 0;
            var dato3 = 0;
            for (var i = 0; i < datos.length; i++) {
                if (datos[i].Cantidad <= 10) {
                    bg = "class= 'table-danger'";
                    dato1 = dato1+1;
                } else if (datos[i].Cantidad <= 30) {
                    bg = "class= 'table-warning'";
                    dato2 = dato2 + 1;
                } else if (datos[i].Cantidad > 30)
                {
                    bg = "class= 'table-success'";
                    dato3 = dato3 + 1;
                }
                contenidoTabla += "<tr "+bg+">" +
                    "<th scope='row'>" + datos[i].IdProducto + "</th>" +
                    "<td>" + datos[i].Producto + "</td>" +
                    "<td>" + datos[i].Cantidad + "</td>" +
                    "<td>$" + datos[i].PrecioCompra + "</td>" +
                    "<td>" + datos[i].PrecioVenta + "</td>" +
                    "<td>" + datos[i].Proveedor + "</td>" +
                    "<td>" +
                    "<button class='btnTablaP btn btn-info' onclick='redirectToAction("+2+","+ datos[i].IdProducto + ")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button>" +
                    "<button class='btnTablaP btn btn-danger' onclick='EliminarProducto(" + datos[i].IdProducto+")'><i class='fa fa-trash-o' aria-hidden='true'></i></button>" +
                    "</td>" +
                    "</tr>";
            }
            tabla.innerHTML = contenidoTabla;

            ManejaFunciones(dato1, dato2, dato3);
            document.getElementById("loader-container").style.display = "none";
        },
        error: function (xhr, status) {
            alert("Error: " + xhr + "-" + status);
            document.getElementById("loader-container").style.display = "none";
        },
    });
});


function ManejaFunciones(dato1, dato2, dato3)
{
    $('#myTableProducts').DataTable({
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
    document.querySelector('.GraficoProductos').style.display = 'none';
    document.querySelector('.tablaProductos').style.display = 'block';
    document.querySelector('.btnAgregarProductodiv').style.display = 'block';
    var Grafico = document.getElementById("GraficoProductos");
    $('input[type="radio"][name="options"]').change(function () {
        if ($('#opcTablaP').is(':checked')) {
            Grafico.innerHTML = "";
            document.querySelector('.GraficoProductos').style.display = 'none';
            document.querySelector('.tablaProductos').style.display = 'block';
            document.querySelector('.btnAgregarProductodiv').style.display = 'block';
        } else {
            Grafico.innerHTML = "<div class='GraficoProductos' id='GraficoProductos'><div class='d-flex flex-wrap justify-content-center flex-lg-nowrap'><div class='grafico-container' style='max-width: 100%; height: 400px;'><canvas id='Grafico1' style='width: 100%; height: 100%;'></canvas></div><div class='grafico-container' style='max-width: 100%; height: 300px;'><canvas id='Grafico2' style='width: 100%; height: 100%;'></canvas></div></div></div>";
            document.querySelector('.tablaProductos').style.display = 'none';
            document.querySelector('.GraficoProductos').style.display = 'block';
            document.querySelector('.btnAgregarProductodiv').style.display = 'none';
            var data = {
                labels: ['Menos de 10', 'Menos de 30', 'Mas de 30'],
                datasets: [{
                    data: [dato1, dato2, dato3], // Porcentajes
                    backgroundColor: ['#f5c6cb', '#ffeeba', '#c3e6cb']
                }]
            };

            // Opciones del gráfico
            var options1 = {
                indexAxis: 'x', // Cambiar el eje a vertical
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            max: 100, // Máximo porcentaje
                            title: {
                                display: true,
                                text: 'Porcentaje'
                            }
                        }
                    }
                }
            };

            var options2 = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            };

            // Crear el gráfico de barras
            var ctx1 = document.getElementById('Grafico1').getContext('2d');
            var myBarChart = new Chart(ctx1, {
                type: 'bar',
                data: data,
                options: options1
            });

            var ctx2 = document.getElementById('Grafico2').getContext('2d');
            var myPieChart = new Chart(ctx2, {
                type: 'pie',
                data: data,
                options: options2
            });
        }
    });
}

function downloadExcel() {
    var table = document.getElementById('myTableProducts');

    // Obtener las filas y las celdas, excluyendo la última columna
    var rows = table.rows;
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].cells;
        for (var j = 0; j < cells.length - 1; j++) {
            cells[j].classList.add("exclude-excel"); // Marcar las celdas de la última columna
        }
    }

    var wb = XLSX.utils.table_to_book(table);
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    // Eliminar la marca de las celdas excluidas
    var excludedCells = document.querySelectorAll('.exclude-excel');
    for (var k = 0; k < excludedCells.length; k++) {
        excludedCells[k].classList.remove("exclude-excel");
    }

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var currentDate = dd + '-' + mm + '-' + yyyy;

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'Productos_' + currentDate + '.xlsx');
}

function redirectToAction(Op, id) {
    var url = '/Home/Agregar_ActualizarProducto?Op=' + Op + '&id=' + id;
    window.location.href = url;
}

function EliminarProducto(id) {
    var opcion = confirm("¿Esta seguro de ELIMINAR este producto?");
    if (opcion == true) {
        var data = "{'Id':'" + id + "'}"
        $.ajax({
            type: 'POST',
            url: 'EliminarProducto',
            contentType: "application/json;charset=utf-8",
            datatype: "json",
            data: data,
            success: function (jsondata, stat) {
                var datos = JSON.parse(jsondata);
                alert(datos);
                window.location.href = "Producto";
            },
            error: function (error) {
                alert('Error al eliminar:', error);
                window.location.href = "Producto";
            }
        });
    }  
}