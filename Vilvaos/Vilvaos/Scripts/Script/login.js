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
    var data = "{'user':'" + user + "','psw':'" + psw + "'}"
    $.ajax({
        type: 'POST',
        url: "IniciarSesion",
        contentType: "application/json;charset=utf-8",
        datatype: "json",
        data:data,
        success: function (jsondata, stat) {
            var datos = JSON.parse(jsondata);
            if (datos != "OK") {
                alert(datos);
            } else
            {
                window.location.href = "Index";
            }
        }
    });
}