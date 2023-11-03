$(document).ready(function () {
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
            Grafico.innerHTML = "<div class='d-flex justify-content-around'><div style='width: 300px; height: 300px;'><canvas id='Grafico1'></canvas></div><div style='width: 300px; height: 300px;'><canvas id='Grafico2'></canvas></div></div>";
            document.querySelector('.tablaProductos').style.display = 'none';
            document.querySelector('.GraficoProductos').style.display = 'block';
            document.querySelector('.btnAgregarProductodiv').style.display = 'none';
            var data = {
                labels: ['Opción A', 'Opción B', 'Opción C'],
                datasets: [{
                    data: [30, 40, 30], // Porcentajes
                    backgroundColor: ['red', 'green', 'blue']
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
});