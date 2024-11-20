const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function IniciarSesion(ambiente)
{
    if (ambiente === 'PC') {
        var user = document.getElementById("correoLogin").value;
        var psw = document.getElementById("passwordLogin").value;
    } else {
        var user = document.getElementById("correoLoginM").value;
        var psw = document.getElementById("passwordLoginM").value;
    }
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
                    window.location.href = "IndexLog";
                }
            }
        });
    } else
    {
        alert("Ingrese usuario y contraseña")
    }
}

function Registrarse(ambiente)
{
    if (ambiente === 'PC') {
        var NombreEm = document.getElementById("NombreEm").value;
        var CorreoResgistrar = document.getElementById("CorreoResgistrar").value;
        var ContraseñaRegistrar = document.getElementById("ContraseñaRegistrar").value;
    } else {
        var NombreEm = document.getElementById("NombreEmM").value;
        var CorreoResgistrar = document.getElementById("CorreoResgistrarM").value;
        var ContraseñaRegistrar = document.getElementById("ContraseñaRegistrarM").value;
    }
    
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

function CambiarTexto() {
    const formulario = document.getElementById('formulario');
    const login = document.querySelector('.login');
    const registro = document.querySelector('.registro');
    const mostrarLoginCheckbox = document.getElementById('mostrarLogin');
    input = document.getElementById("btn").checked;
    if (input) {
        login.classList.remove('activo');
        registro.classList.add('activo');
        document.getElementById("btnSwitch").innerHTML = "Iniciar";
    } else {
        login.classList.add('activo');
        registro.classList.remove('activo');
        document.getElementById("btnSwitch").innerHTML = "Registrar";
    }
}

function CambiarLoginRegister() {

}