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
        Cliente cliente = new Cliente();
        Proveedor proveedor = new Proveedor();
        Empresa empresa = new Empresa();

        public  HomeController()
        {
            ViewData["Barra"] = "false";
        }

        #region cuenta
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

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Exit()
        {
            Session["User"] = null;
            return RedirectToAction("Index");
        }

        public ActionResult RegistrarUsuario(string Nombre, string Correo, string Contraseña)
        {
            string json = "";
            string hashedpws = HashString(Contraseña);
            string respuesta = count.Registrar(Nombre, Correo, hashedpws);
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        #endregion

        #region Index
        public ActionResult Index()
        {
            if (Session["User"] != null)
            {
                ViewData["Barra"] = "true";
            }
            return View();
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ActionResult ConsultaEmpresa()
        {
            DataTable tabla = (DataTable)Session["User"];
            string id = tabla.Rows[0]["IdEmpresa"].ToString();
            string json = "";
            DataTable respuesta = empresa.ConsultaEmpresa(id);
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        public ActionResult GuardarDatosAdEm(string  NitEmpresa ,string CiudadEmpresa,string CategoriaEmpresa,string TelefonoEmpresa, string DireccionEmpresa, string CorreoEmpresa, string CargoEmpresa)
        {
            DataTable tabla = (DataTable)Session["User"];
            string id = tabla.Rows[0]["IdEmpresa"].ToString();
            string json = "";
            string respuesta = empresa.GuardarDatosAdEm(NitEmpresa, CiudadEmpresa, CategoriaEmpresa, TelefonoEmpresa, DireccionEmpresa, CorreoEmpresa, CargoEmpresa,id);
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        public ActionResult ActuazlizarDatosAdEm(string CiudadEmpresa, string CategoriaEmpresa, string TelefonoEmpresa, string DireccionEmpresa, string CorreoEmpresa, string CargoEmpresa)
        {
            DataTable tabla = (DataTable)Session["User"];
            string id = tabla.Rows[0]["IdEmpresa"].ToString();
            string json = "";
            string respuesta = empresa.ActuazlizarDatosAdEm(CiudadEmpresa, CategoriaEmpresa, TelefonoEmpresa, DireccionEmpresa, CorreoEmpresa, CargoEmpresa, id);
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        #endregion

        #region
        public ActionResult IndexLog()
        {
            return View();
        }

        #endregion

        #region Productos
        public ActionResult Producto() 
        {
            ViewData["Barra"] = "true";
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
                                    "document.getElementById('ProveedorSelect').value = '" + infoProduct.Rows[0]["Proveedor"] + "';"+
                                    "document.getElementById('IdProductoGA').value = '" + infoProduct.Rows[0]["IdProducto"] + "';";
                }
                else 
                {
                    return RedirectToAction("Producto");
                }
                ViewBag.Opcion = "ACTUALIZAR PRODUCTO";
                ViewBag.OpcionAccion = "Actualizar()";
                ViewBag.OpcionBtn = "Actualizar";
                return View();
            }
            else
            {
                ViewBag.Opcion = "NUEVO PRODUCTO";
                ViewBag.OpcionAccion = "Guardar()";
                ViewBag.OpcionBtn = "Guardar";
                return View();
            }
        }

        public ActionResult GuardarProducto(string Nombre, string Cantidad, string PrecioC, string PrecioV, string IdProveedor) {
            string json = "";
            string respuesta = product.GuardarProducto(Nombre, Cantidad, PrecioC, PrecioV, IdProveedor);
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        public ActionResult ActualizarProducto(string Id, string Nombre, string Cantidad, string PrecioC, string PrecioV, string IdProveedor)
        {
            string json = "";
            string respuesta = product.ActualizarProducto(Id, Nombre, Cantidad, PrecioC, PrecioV, IdProveedor);
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        public ActionResult EliminarProducto(int Id)
        {
            string json = "";
            string respuesta = product.EliminarProducto(Id);
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        #endregion
        
        #region cliente
        public ActionResult Cliente() 
        {
            ViewData["Barra"] = "true";
            return View();
        }

        public ActionResult ConsultarClientes()
        {
            string json = "";
            DataTable respuesta = cliente.ConsultaClientes();
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        public ActionResult Agregar_ActualizarCliente(int Op, int? id)
        {
            if (Op == 2)
            {
                if (id != null && id != 0)
                {
                    DataTable infoCliente = cliente.ConsultaClientesConId(id);
                    ViewBag.Script = "document.getElementById('NombreCliente').value = '" + infoCliente.Rows[0]["Nombre"] + "';" +
                                    "document.getElementById('ApellidoCliente').value = '" + infoCliente.Rows[0]["Apellido"] + "';" +
                                    "document.getElementById('DireccionCliente').value = '" + infoCliente.Rows[0]["Direccion"] + "';" +
                                    "document.getElementById('TelefonoCliente').value = '" + infoCliente.Rows[0]["Telefono"] + "';" +
                                    "document.getElementById('CiudadCliente').value = '" + infoCliente.Rows[0]["Ciudad"] + "';" +
                                    "document.getElementById('IdClienteGA').value = '" + infoCliente.Rows[0]["IdCliente"] + "';";
                }
                else
                {
                    return RedirectToAction("Cliente");
                }
                ViewBag.Opcion = "ACTUALIZAR CLIENTE";
                ViewBag.OpcionAccion = "Actualizar()";
                ViewBag.OpcionBtn = "Actualizar";
                return View();
            }
            else
            {
                ViewBag.Opcion = "NUEVO CLIENTE";
                ViewBag.OpcionAccion = "Guardar()";
                ViewBag.OpcionBtn = "Guardar";
                return View();
            }
        }

        public ActionResult GuardarCliente(string NombreCliente,string ApellidoCliente,string DireccionCliente,string TelefonoCliente,string CiudadCliente)
        {
            string json = "";
            string respuesta = cliente.GuardarClientes(NombreCliente, ApellidoCliente, DireccionCliente, TelefonoCliente, CiudadCliente);
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        public ActionResult ActualizarCliente(string Id, string NombreCliente, string ApellidoCliente, string DireccionCliente, string TelefonoCliente, string CiudadCliente)
        {
            string json = "";
            string respuesta = cliente.ActualizarClientes(Id, NombreCliente, ApellidoCliente, DireccionCliente, TelefonoCliente, CiudadCliente);
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        public ActionResult EliminarCliente(int Id)
        {
            string json = "";
            string respuesta = cliente.EliminarClientes(Id);
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        #endregion

        #region Proveedor

        public ActionResult Proveedor() 
        {
            ViewData["Barra"] = "true";
            return View();
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ActionResult ConsultarProveedores()
        {
            string json = "";
            DataTable respuesta = proveedor.ConsultaProveedores();
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        public ActionResult Agregar_ActualizarProveedor(int Op, int? id)
        {
            if (Op == 2)
            {
                if (id != null && id != 0)
                {
                    DataTable infoCliente = proveedor.ConsultaProveedorConId(id);
                    ViewBag.Script = "document.getElementById('NombreProveedor').value = '" + infoCliente.Rows[0]["Nombre"] + "';" +
                                    "document.getElementById('TelefonoProveedor').value = '" + infoCliente.Rows[0]["Telefono"] + "';" +
                                    "document.getElementById('CiudadProveedor').value = '" + infoCliente.Rows[0]["Ciudad"] + "';" +
                                    "document.getElementById('IdProveedorGA').value = '" + infoCliente.Rows[0]["IdProveedor"] + "';";
                }
                else
                {
                    return RedirectToAction("Proveedor");
                }
                ViewBag.Opcion = "ACTUALIZAR PROVEEDOR";
                ViewBag.OpcionAccion = "Actualizar()";
                ViewBag.OpcionBtn = "Actualizar";
                return View();
            }
            else
            {
                ViewBag.Opcion = "NUEVO PROVEEDOR";
                ViewBag.OpcionAccion = "Guardar()";
                ViewBag.OpcionBtn = "Guardar";
                return View();
            }
        }

        public ActionResult GuardarProveedor(string NombreProveedor ,string TelefonoProveedor, string CiudadProveedor)
        {
            string json = "";
            string respuesta = proveedor.GuardarProveedor(NombreProveedor, TelefonoProveedor,  CiudadProveedor);
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        public ActionResult ActualizarProveedor(string Id, string NombreProveedor, string TelefonoProveedor, string CiudadProveedor)
        {
            string json = "";
            string respuesta = proveedor.ActualizarProveedor(Id, NombreProveedor, TelefonoProveedor, CiudadProveedor);
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        public ActionResult EliminarProveedor(int Id)
        {
            string json = "";
            string respuesta = proveedor.EliminarProveedor(Id);
            json = JsonConvert.SerializeObject(respuesta);
            return Json(json);
        }

        #endregion  

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

        public ActionResult Memoriza()
        {
            return View();
        }

    }
}