var global;
var bajoStock = [];
var medioStock = [];
var altoStock = [];
var proveedoresDatos = [];  // Variable global para almacenar los proveedores

$(document).ready(function () {

    $('.tabla-contenedor').hide();
    document.getElementById("loader-container").style.display = "flex";
    $.ajax({
        type: 'POST',
        url: "ConsultarProductos",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (jsondata, stat) {
            var listaProductos = JSON.parse(jsondata);
            cargarProveedores(listaProductos);
            global = listaProductos;
            var tabla = document.getElementById("TablaBodyProduct");
            tabla.innerHTML = "";
            var contenidoTabla = ""; // Variable para acumular el contenido
            var bg = "";
            var dato1 = 0;
            var dato2 = 0;
            var dato3 = 0;
            for (var i = 0; i < listaProductos.length; i++) {
                if (listaProductos[i].Cantidad <= 10) {
                    bg = "class= 'table-danger'";
                    dato1++;;
                    bajoStock.push(listaProductos[i]);
                } else if (listaProductos[i].Cantidad <= 30) {
                    bg = "class= 'table-warning'";
                    dato2++;
                    medioStock.push(listaProductos[i]);
                } else if (listaProductos[i].Cantidad > 30) {
                    bg = "class= 'table-success'";
                    dato3++;
                    altoStock.push(listaProductos[i]);
                }
                contenidoTabla += "<tr " + bg + ">" +
                    "<th scope='row'>" + listaProductos[i].IdProducto + "</th>" +
                    "<td>" + listaProductos[i].Producto + "</td>" +
                    "<td>" + listaProductos[i].Cantidad + "</td>" +
                    "<td>$" + listaProductos[i].PrecioCompra + "</td>" +
                    "<td>" + listaProductos[i].PrecioVenta + "</td>" +
                    "<td>" + listaProductos[i].Proveedor + "</td>" +
                    "<td>" +
                    "<button class='btnTablaP btn btn-info' onclick='redirectToAction(" + 2 + "," + listaProductos[i].IdProducto + ")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></button>" +
                    "<button class='btnTablaP btn btn-danger' onclick='EliminarProducto(" + listaProductos[i].IdProducto + ")'><i class='fa fa-trash-o' aria-hidden='true'></i></button>" +
                    "</td>" +
                    "</tr>";
            }
            tabla.innerHTML = contenidoTabla;

            ManejaFunciones(dato1, dato2, dato3);
            document.getElementById("loader-container").style.display = "none";
            var tituloGanancias = document.getElementById('tituloProductosGanancias');
            tituloGanancias.innerText = 'Top 5 productos con mayores ganancias';
            tituloGanancias.style.backgroundColor = '#ADD8E6'; // Azul claro

            var tituloMenorGanancias = document.getElementById('tituloProductosMenorGanancias');
            tituloMenorGanancias.innerText = 'Top 5 productos con menores ganancias';
            tituloMenorGanancias.style.backgroundColor = '#ADD8E6'; // Azul claro
        },
        error: function (xhr, status) {
            alert("Error: " + xhr + "-" + status);
            document.getElementById("loader-container").style.display = "none";
        },
    });
    
});
function cargarProveedores(productosDatos) {
    $.ajax({
        type: 'POST',
        url: "ConsultarProveedores",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (proveedores) {
            proveedoresDatos = JSON.parse(proveedores);

            // Función para combinar productos y proveedores
           //combinarDatos(productosDatos, proveedoresDatos);
            console.log("Datos de proveedores:", proveedoresDatos);
            document.getElementById("loader-container").style.display = "none";
        },
        error: function (xhr, status) {
            alert("Error al obtener proveedores: " + xhr + "-" + status);
            document.getElementById("loader-container").style.display = "none";
        }
    });
}
function ManejaFunciones(dato1, dato2, dato3) {
    // Configurar DataTable
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

    // Ocultar gráfico por defecto y mostrar tabla
    document.querySelector('.GraficoProductos').style.display = 'none';
    document.querySelector('.tablaProductos').style.display = 'block';
    document.querySelector('.btnAgregarProductodiv').style.display = 'block';

    // Referencia al contenedor de gráficos
    var Grafico = document.getElementById("GraficoProductos");
    
   
    // Función para mostrar los detalles del producto
    //inicial
   function mostrarDetallesProductos(label) {
       var productos;
       //var tabla1 = document.getElementById('tabla1');
        var tituloProductos = document.getElementById('tituloProductos');
       var detallesDiv = document.getElementById('detallesProductos');

       var tituloProductosProv = document.getElementById('tituloProductosProv');
       var detallesDivProv = document.getElementById('detallesProductoProv');
       tituloProductosProv.innerText = 'Seleccione un elemento de la tabla del que desea saber mayor información';
       tituloProductosProv.style.backgroundColor = '#ffffff';
       detallesDivProv.innerHTML = "";

       var tituloGanancias = document.getElementById('tituloProductosGanancias');

       var tituloMenorGanancias = document.getElementById('tituloProductosMenorGanancias');

       

        if (label === 'Menos de 10') {
            productos = bajoStock;  // Productos con menos de 10 unidades
            tituloProductos.style.backgroundColor = '#FF4C4C';  // Color rojo para menos de 10 en Producto
            tituloProductos.innerText = 'Productos con cantidad menor a 10';
            tituloGanancias.style.backgroundColor = '#FF4C4C'; // Rojo claro
            tituloMenorGanancias.style.backgroundColor = '#FF4C4C'; // Rojo claro
        } else if (label === 'Menos de 30') {
            productos = medioStock; // Productos con menos de 30 unidades
            tituloProductos.style.backgroundColor = '#FFD700';  // Color amarillo para menos de 30 Producto
            tituloProductos.innerText = 'Productos con cantidad menor a 30';
            tituloGanancias.style.backgroundColor = '#FFD700';
            tituloMenorGanancias.style.backgroundColor = '#FFD700';
        } else if (label === 'Más de 30') {
            productos = altoStock;  // Productos con más de 30 unidades
            tituloProductos.style.backgroundColor = '#32CD32';  // Color verde para más de 30 Producto
            tituloProductos.innerText = 'Productos con cantidad mayor a 30';
            tituloGanancias.style.backgroundColor = '#32CD32';
            tituloMenorGanancias.style.backgroundColor = '#32CD32';
        } else {
            tituloProductos.innerText = 'Seleccione la sección de la gráfica de la que desea saber mayor información';
            detallesDiv.innerHTML = "";  // Limpiar el contenido si no hay selección
            mostrarTopGanancias();
            mostrarTopMenorGanancias();
            return;
        }

        // Limpiar el contenido anterior
       detallesDiv.innerHTML = "";

       // Ordenar los productos por cantidad de menor a mayor
       productos.forEach(function (prod) {
           prod.Cantidad = parseInt(prod.Cantidad, 10);  // Asegurar que Cantidad sea un número
       });

       // Ordenar los productos por cantidad de menor a mayor
       productos.sort(function (a, b) {
           return a.Cantidad - b.Cantidad;
       });

        // Crear el encabezado de la tabla
        var encabezado = document.createElement('div');
        encabezado.className = 'encabezado';
        encabezado.innerHTML = "<div>Producto</div><div>Cantidad</div>";
        detallesDiv.appendChild(encabezado);

        // Crear las filas de productos
        productos.forEach(function (prod) {
            var fila = document.createElement('div');
            fila.className = 'productoFila';
            fila.style.cursor = 'pointer';
            fila.innerHTML = "<div>" + prod.Producto + "</div><div>" + prod.Cantidad + "</div>";

            fila.onclick = function () {
                mostrarDetallesProv(prod.IdProducto);
            };
            detallesDiv.appendChild(fila);
        });
       mostrarTopGanancias(productos);
       mostrarTopMenorGanancias(productos);
    }
   
    // Función para mostrar el top 5 de productos con mayores ganancias en una tabla separada

    function mostrarTopGanancias(productos = global) {
        var tituloGanancias = document.getElementById('tituloProductosGanancias');
        var detallesDivGanancias = document.getElementById('detallesProductosGanancias');

        // Limpiar el contenido anterior
        detallesDivGanancias.innerHTML = "";
        tituloGanancias.innerText = 'Top 5 productos con mayores ganancias';
        

        // Crear el botón de limpiar filtro
        var limpiarFiltroBtn = document.createElement('button');
        limpiarFiltroBtn.innerText = 'Limpiar Filtro';
        limpiarFiltroBtn.className = 'boton-limpiar';
        limpiarFiltroBtn.onclick = function () {
            tituloGanancias.innerText = 'Top 5 de todos los productos con mayores ganancias';
            tituloGanancias.style.backgroundColor = '#ADD8E6'; // Azul claro
       
            mostrarTopGanancias();  // Mostrar el top 5 general al limpiar el filtro
        };
        detallesDivGanancias.appendChild(limpiarFiltroBtn);

        // Calcular la ganancia y ordenar productos de mayor a menor
        var productosConGanancias = productos
            .map(function (prod) {
                return {
                    Producto: prod.Producto,
                    Ganancia: prod.PrecioVenta - prod.PrecioCompra,
                    IdProducto: prod.IdProducto
                };
            })
            .sort(function (a, b) {
                return b.Ganancia - a.Ganancia;
            })
            .slice(0, 5);  // Tomar los primeros 5 productos con mayor ganancia

        // Crear el encabezado de la tabla
        var encabezado = document.createElement('div');
        encabezado.className = 'encabezado';
        encabezado.innerHTML = "<div>Producto</div><div>Ganancia</div>";
        detallesDivGanancias.appendChild(encabezado);

        // Crear las filas de productos con mayores ganancias
        productosConGanancias.forEach(function (prod) {
            var fila = document.createElement('div');
            fila.className = 'productoFila';
            fila.style.cursor = 'pointer';
            fila.innerHTML = "<div>" + prod.Producto + "</div><div>" + prod.Ganancia.toFixed(2) + "</div>";

            fila.onclick = function () {
                mostrarDetallesProv(prod.IdProducto);
            };
            detallesDivGanancias.appendChild(fila);
        });
    }
    
    // Llamada inicial para mostrar el top 5 de productos con mayores ganancias al cargar la página
    mostrarTopGanancias();
    function mostrarTopMenorGanancias(productos = global) {
        var tituloMenorGanancias = document.getElementById('tituloProductosMenorGanancias');
        var detallesDivMenorGanancias = document.getElementById('detallesProductosMenorGanancias');

        // Limpiar el contenido anterior
        detallesDivMenorGanancias.innerHTML = "";
        tituloMenorGanancias.innerText = 'Top 5 productos con menores ganancias';


        // Crear el botón de limpiar filtro
        var limpiarMenorFiltroBtn = document.createElement('button');
        limpiarMenorFiltroBtn.innerText = 'Limpiar Filtro';
        limpiarMenorFiltroBtn.className = 'boton-limpiar';
        limpiarMenorFiltroBtn.onclick = function () {
            tituloMenorGanancias.innerText = 'Top 5 de todos los productos con menores ganancias';
            tituloMenorGanancias.style.backgroundColor = '#ADD8E6'; // Azul claro

            mostrarTopMenorGanancias();  // Mostrar el top 5 general al limpiar el filtro
        };
        detallesDivMenorGanancias.appendChild(limpiarMenorFiltroBtn);

        // Calcular la ganancia y ordenar productos de mayor a menor
        var productosConGanancias = productos
            .map(function (prod) {
                return {
                    Producto: prod.Producto,
                    Ganancia: prod.PrecioVenta - prod.PrecioCompra,
                    IdProducto: prod.IdProducto
                };
            })
            .sort(function (a, b) {
                return a.Ganancia - b.Ganancia;
            })
            .slice(0, 5);  // Tomar los primeros 5 productos con mayor ganancia

        // Crear el encabezado de la tabla
        var encabezado = document.createElement('div');
        encabezado.className = 'encabezado';
        encabezado.innerHTML = "<div>Producto</div><div>Ganancia</div>";
        detallesDivMenorGanancias.appendChild(encabezado);

        // Crear las filas de productos con mayores ganancias
        productosConGanancias.forEach(function (prod) {
            var fila = document.createElement('div');
            fila.className = 'productoFila';
            fila.style.cursor = 'pointer';
            fila.innerHTML = "<div>" + prod.Producto + "</div><div>" + prod.Ganancia.toFixed(2) + "</div>";

            fila.onclick = function () {
                mostrarDetallesProv(prod.IdProducto);
            };
            detallesDivMenorGanancias.appendChild(fila);
        });
    }

    // Llamada inicial para mostrar el top 5 de productos con mayores ganancias al cargar la página
    mostrarTopMenorGanancias();
    function mostrarDetallesProv(IdProducto) {
        var detallesDivProv = document.getElementById('detallesProductoProv');
        var tituloProductosProv = document.getElementById('tituloProductosProv');
       
        // Obtener el producto seleccionado
        var producto = global.find(prod => prod.IdProducto === IdProducto);
        var proveedor = proveedoresDatos.find(prov => prov.IdProveedor === producto.IdProveedor); // Buscar proveedor con el IdProveedor del producto
        
        // Limpiar el contenido anterior
        detallesDivProv.innerHTML = "";

        // Actualizar el título con el nombre del producto y cantidad
        tituloProductosProv.innerHTML = producto.Producto + " - Cantidad: " + producto.Cantidad;
        if (producto.Cantidad < 10) {
            tituloProductosProv.style.backgroundColor = '#FF4C4C'; // Rojo para menos de 10
        } else if (producto.Cantidad <= 30) {
            tituloProductosProv.style.backgroundColor = '#FFD700'; // Amarillo para menos de 30
        } else {
            tituloProductosProv.style.backgroundColor = '#32CD32'; // Verde para 30 o más
        }
        // Crear una fila para cada detalle y añadirla a tablaDetalles
        var filaNombreProveedor = document.createElement('div');
        filaNombreProveedor.className = 'productoFila';
        filaNombreProveedor.innerHTML = "<div style='background-color: #f0f0f0; font-weight: bold;'>Nombre Proveedor</div><div>" + proveedor.Nombre + "</div>";
        detallesDivProv.appendChild(filaNombreProveedor);

        var filaTelefonoProveedor = document.createElement('div');
        filaTelefonoProveedor.className = 'productoFila';
        filaTelefonoProveedor.innerHTML = "<div style='background-color: #f0f0f0; font-weight: bold;'>Teléfono Proveedor</div><div>" + proveedor.Telefono + "</div>";
        detallesDivProv.appendChild(filaTelefonoProveedor);

        var filaCiudadProveedor = document.createElement('div');
        filaCiudadProveedor.className = 'productoFila';
        filaCiudadProveedor.innerHTML = "<div style='background-color: #f0f0f0; font-weight: bold;'>Ciudad Proveedor</div><div>" + proveedor.Ciudad + "</div>";
        detallesDivProv.appendChild(filaCiudadProveedor);

        var filaPrecioCompra = document.createElement('div');
        filaPrecioCompra.className = 'productoFila';
        filaPrecioCompra.innerHTML = "<div style='background-color: #f0f0f0; font-weight: bold;'>Precio Compra</div><div>" + producto.PrecioCompra + "</div>";
        detallesDivProv.appendChild(filaPrecioCompra);

        var filaPrecioVenta = document.createElement('div');
        filaPrecioVenta.className = 'productoFila';
        filaPrecioVenta.innerHTML = "<div style='background-color: #f0f0f0; font-weight: bold;'>Precio Venta</div><div>" + producto.PrecioVenta + "</div>";
        detallesDivProv.appendChild(filaPrecioVenta);

    }
 
    


    // Manejo del cambio entre tabla y gráfico
    $('input[type="radio"][name="options"]').change(function () {
        if ($('#opcTablaP').is(':checked')) {
            // Mostrar la tabla, ocultar el gráfico
            Grafico.innerHTML = "";
            document.querySelector('.GraficoProductos').style.display = 'none';
            //document.querySelector('.productoDetalles').style.display = 'none';
            document.querySelector('.GraficoProductos').style.display = 'none';
            document.querySelector('.tablaProductos').style.display = 'block';
            document.querySelector('.btnAgregarProductodiv').style.display = 'block';
            $('.tabla-contenedor').hide();
        } else {
            // Mostrar gráfico, ocultar la tabla
            Grafico.innerHTML =
                "<div class='containerEstadistica d-flex justify-content-between align-items-center'>" +
                "<div class='GraficoProductos' style='max-width: 100%; height: 400px;'>" +
                "<div class='grafico-container' style='max-width: 100%; height: 100%;'>" +
                "<canvas id='Grafico2' style='width: 100%; height: 100%;'></canvas>" +
                "</div>" +
                "</div>";




            $('.tabla-contenedor').show();
            document.querySelector('.tablaProductos').style.display = 'none';
            document.querySelector('.GraficoProductos').style.display = 'block';
            
            document.querySelector('.btnAgregarProductodiv').style.display = 'none';

            // Datos para los gráficos
            var data = {
                labels: ['Menos de 10', 'Menos de 30', 'Más de 30'],
                datasets: [{
                    data: [dato1, dato2, dato3], // Valores para los gráficos
                    backgroundColor: ['#f5c6cb', '#ffeeba', '#c3e6cb'] // Colores de las barras y la torta
                }]
            };


            // Opciones del gráfico de torta
            var options2 = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            };



            // Crear gráfico de torta
            var ctx2 = document.getElementById('Grafico2').getContext('2d');
            var myPieChart = new Chart(ctx2, {
                type: 'pie',
                data: data,
                options: options2
            });

            // Evento 'click' en la gráfica de torta para filtrar productos por color
            ctx2.canvas.onclick = function (evt) {
                var activePoints = myPieChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
                if (activePoints.length) {
                    var index = activePoints[0].index;
                    var label = data.labels[index];
                    mostrarDetallesProductos(label); // Muestra la lista de productos en esa categoría
                }
            };
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