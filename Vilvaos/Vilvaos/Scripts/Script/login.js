const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function IniciarSesion()
{
    var user = document.getElementById("correoLogin").value;
    var psw = document.getElementById("passwordLogin").value;
    if (user.replace(/ /g, '') != "" && psw.replace(/ /g, '') != "") {
        var data = "{'user':'" + user + "','psw':'" + psw + "'}"
        $.ajax({
            type: 'POST',
            url: "IniciarSesion",
            contentType: "application/json;charset=utf-8",
            datatype: "json",
            data: data,
            success: function (jsondata, stat) {
                var datos = JSON.parse(jsondata);
                if (datos != "OK") {
                    alert(datos);
                } else {
                    window.location.href = "Index";
                }
            }
        });
    } else
    {
        alert("Ingrese usuario y contraseña")
    }
}

function Registrarse()
{
    var NombreEm = document.getElementById("NombreEm").value;
    var CorreoResgistrar = document.getElementById("CorreoResgistrar").value;
    var ContraseñaRegistrar = document.getElementById("ContraseñaRegistrar").value;
    if (NombreEm.replace(/ /g, '') != "" && CorreoResgistrar.replace(/ /g, '') != "" && ContraseñaRegistrar.replace(/ /g, '') != "") {
        var data = "{'Nombre':'" + NombreEm + "','Correo':'" + CorreoResgistrar + "','Contraseña':'" + ContraseñaRegistrar + "'}"
        $.ajax({
            type: 'POST',
            url: "RegistrarUsuario",
            contentType: "application/json;charset=utf-8",
            datatype: "json",
            data: data,
            success: function (jsondata, stat) {
                var datos = JSON.parse(jsondata);
                alert(datos);
                window.location.href = "Login";
            }
        });
    } else {
        alert("Ingrese usuario y contraseña")
    }
}