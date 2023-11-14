using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace Vilvaos.Models
{
    public class Producto
    {
        public static string Conexion = ConfigurationManager.ConnectionStrings["ConexionBD"].ConnectionString;

        public DataTable ConsultaProductos() 
        {
            DataTable result = new DataTable();
            string sql = (@"SELECT p.*, pr.Nombre as Proveedor FROM producto p, proveedor pr where p.IdProveedor = pr.IdProveedor;");
            try
            {
                MySqlDataAdapter da = new MySqlDataAdapter(sql, Conexion);
                da.SelectCommand.CommandType = CommandType.Text;
                da.Fill(result);
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }

        public DataTable ConsultaProductosConId(int? id)
        {
            DataTable result = new DataTable();
            string sql = (@"SELECT p.*, pr.Nombre as Proveedor FROM producto p, proveedor pr where p.IdProveedor = pr.IdProveedor and p.IdProducto = "+id);
            try
            {
                MySqlDataAdapter da = new MySqlDataAdapter(sql, Conexion);
                da.SelectCommand.CommandType = CommandType.Text;
                da.Fill(result);
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }

        public DataTable ConsultaProveedores()
        {
            DataTable result = new DataTable();
            string sql = (@"SELECT * from proveedor");
            try
            {
                MySqlDataAdapter da = new MySqlDataAdapter(sql, Conexion);
                da.SelectCommand.CommandType = CommandType.Text;
                da.Fill(result);
            }
            catch (Exception ex)
            {
                throw;
            }
            return result;
        }
    }
}