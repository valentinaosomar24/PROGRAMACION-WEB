using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Vilvaos.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Producto() 
        {
            return View();
        }

        public ActionResult AgregarProducto()
        {
            return View();
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

        public ActionResult AgregarProveedor() 
        {
            return View();
        }

        public ActionResult Login() 
        {
            return View();
        }
    }
}