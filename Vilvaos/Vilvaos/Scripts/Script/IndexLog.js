$(document).ready(function () {
    var infoUser = document.getElementById("userInfo");
    document.getElementById("loader-container").style.display = "flex";
    infoUser.innerHTML = "";
    var bienvenida = "";
    $.ajax({
        type: 'POST',
        url: 'ConsultaEmpresa',
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        success: function (jsondata, stat) {
            var datos = JSON.parse(jsondata);
            if (datos[0].Gerente != null && datos[0].Gerente != undefined) {
                bienvenida = `<h2><b>Bienvenido ${datos[0].Gerente}</b></h2>`
            }
            infoUser.innerHTML = `<h1 class="NombreEmpresa">${datos[0].Nombre}<h1>${bienvenida}`;

            document.getElementById("loader-container").style.display = "none";
        },
        error: function (error) {
            alert('Error al traer datos de empresa:', error);
            document.getElementById("loader-container").style.display = "none";
        }
    });
});