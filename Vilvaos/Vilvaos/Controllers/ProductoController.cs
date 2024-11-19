using System.Web.Mvc;
using Vilvaos.Models;
using System.Data;

namespace Vilvaos.Controllers
{
    public class ProductosController : Controller
    {
        private Producto productoModel = new Producto(); // Instancia del modelo para interactuar con la BD

        // Método para consultar todos los productos junto con la información del proveedor
        [HttpPost]
        public JsonResult ConsultarProductos()
        {
            DataTable resultado = productoModel.ConsultaProductos();
            return Json(resultado);
        }

        // Método para consultar un producto específico por ID (junto con la info del proveedor)
        [HttpPost]
        public JsonResult ConsultarProductoPorId(int id)
        {
            DataTable resultado = productoModel.ConsultaProductosConId(id);
            return Json(resultado);
        }

        // Método para guardar un nuevo producto
        [HttpPost]
        public JsonResult GuardarProducto(string nombre, string cantidad, string precioC, string precioV, string idProveedor)
        {
            string mensaje = productoModel.GuardarProducto(nombre, cantidad, precioC, precioV, idProveedor);
            return Json(new { mensaje });
        }

        // Método para actualizar un producto existente
        [HttpPost]
        public JsonResult ActualizarProducto(string id, string nombre, string cantidad, string precioC, string precioV, string idProveedor)
        {
            string mensaje = productoModel.ActualizarProducto(id, nombre, cantidad, precioC, precioV, idProveedor);
            return Json(new { mensaje });
        }

        // Método para eliminar un producto por ID
        [HttpPost]
        public JsonResult EliminarProducto(int idProducto)
        {
            string mensaje = productoModel.EliminarProducto(idProducto);
            return Json(new { mensaje });
        }
    }
}
