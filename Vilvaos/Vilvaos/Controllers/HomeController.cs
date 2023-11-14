using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using Vilvaos.Models;
using System.Security.Cryptography;
using System.Text;

namespace Vilvaos.Controllers
{
    public class HomeController : Controller
    {

        Producto product = new Producto();
        Login count = new Login();

        public ActionResult Index()
        {
            return View();
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ActionResult IniciarSesion(string user, string psw)
        {
            string hashedpws = HashString(psw);
            string json = "";
            string login = "";
            DataTable respuesta = count.ConsultaLogin(user, hashedpws);
            if (respuesta.Rows.Count != 0)
            {
                login = "OK";
                Session["User"] = respuesta;
            }
            else 
            {
                login = "Usuario o contraseña incorrectos";
            }
            json = JsonConvert.SerializeObject(login);
            return Json(json);
        }

        public ActionResult Producto() 
        {
            return View();
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ActionResult ConsultarProductos()
        {
            string json = "";
            DataTable respuesta = product.ConsultaProductos();
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        public ActionResult Agregar_ActualizarProducto(int Op, int? id)
        {
            if (Op == 2)
            {
                if (id != null && id != 0)
                {
                    DataTable infoProduct = product.ConsultaProductosConId(id);
                    ViewBag.Script = "document.getElementById('nombreProd').value = '" + infoProduct.Rows[0]["Producto"] + "';" +
                                    "document.getElementById('cantidadProd').value = '" + infoProduct.Rows[0]["Cantidad"] + "';" +
                                    "document.getElementById('PrecioCProd').value = '" + infoProduct.Rows[0]["PrecioCompra"] + "';" +
                                    "document.getElementById('PrecioVProd').value = '" + infoProduct.Rows[0]["PrecioVenta"] + "';" +
                                    "document.getElementById('ProveedorProd').value = '" + infoProduct.Rows[0]["Proveedor"] + "';";
                }
                else 
                {
                    return View("Producto");
                }
                ViewBag.Opcion = "ACTUALIZAR PRODUCTO";
                ViewBag.OpcionBtn = "Actualizar";
                return View();
            }
            else
            {
                ViewBag.Opcion = "NUEVO PRODUCTO";
                ViewBag.OpcionBtn = "Guardar";
                return View();
            }
        }

        public ActionResult Cliente() 
        {
            return View();
        }

        public ActionResult AgregarCliente()
        {
            return View();
        }

        public ActionResult Proveedor() 
        {
            return View();
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ActionResult ConsultarProveedores()
        {
            string json = "";
            DataTable respuesta = product.ConsultaProveedores();
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        public ActionResult AgregarProveedor() 
        {
            return View();
        }

        public ActionResult Login() 
        {
            return View();
        }

        public ActionResult Exit() 
        {
            Session["User"] = null;
            return RedirectToAction("Index");
        }

        static string HashString(string input)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] data = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));

                // Convertir el array de bytes a una cadena hexadecimal
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < data.Length; i++)
                {
                    builder.Append(data[i].ToString("x2"));
                }

                return builder.ToString();
            }
        }
    }
}