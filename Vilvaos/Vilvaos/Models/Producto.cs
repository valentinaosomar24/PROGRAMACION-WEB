using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Vilvaos.Models
{
    public class Producto
    {
        public static string Conexion = ConfigurationManager.ConnectionStrings["ConexionBD"].ConnectionString;

        public DataTable ConsultaProductos() 
        {
            DataTable tabla = (DataTable)HttpContext.Current.Session["User"];
            string IdEmpresa = tabla.Rows[0]["IdEmpresa"].ToString();
            DataTable result = new DataTable();
            string sql = (@"SELECT p.*, pr.Nombre as Proveedor FROM producto p, proveedor pr where p.IdProveedor = pr.IdProveedor and p.IdEmpresa = " + IdEmpresa);
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

        public string GuardarProducto(string Nombre, string Cantidad, string PrecioC, string PrecioV, string IdProveedor)
        {
            DataTable tabla = (DataTable)HttpContext.Current.Session["User"];
            string IdEmpresa = tabla.Rows[0]["IdEmpresa"].ToString();
            try
            {
                string insertQuery = "INSERT INTO producto (Producto, Cantidad, PrecioCompra, PrecioVenta, IdProveedor, IdEmpresa) " +
                                     "VALUES ('"+Nombre+"', "+Cantidad+", "+PrecioC+", "+PrecioV+", "+IdProveedor+","+ IdEmpresa + ")";

                using (MySqlConnection connection = new MySqlConnection(Conexion))
                using (MySqlCommand command = new MySqlCommand(insertQuery, connection))
                {
                    command.Parameters.AddWithValue("@Nombre", Nombre);
                    command.Parameters.AddWithValue("@Cantidad", Cantidad);
                    command.Parameters.AddWithValue("@PrecioC", PrecioC);
                    command.Parameters.AddWithValue("@PrecioV", PrecioV);
                    command.Parameters.AddWithValue("@IdProveedor", IdProveedor);
                    command.Parameters.AddWithValue("@IdEmpresa", IdEmpresa);

                    connection.Open();
                    command.ExecuteNonQuery();
                }

                return "Producto guardado exitosamente.";
            }
            catch (Exception ex)
            {
                return "Error al intentar guardar el producto: " + ex.Message;
            }
        }

        public string ActualizarProducto(string Id, string Nombre, string Cantidad, string PrecioC, string PrecioV, string IdProveedor)
        {
            try
            {
                string updateQuery = "UPDATE producto SET Producto = @Nombre, Cantidad = @Cantidad, PrecioCompra = @PrecioC, PrecioVenta = @PrecioV, IdProveedor = @IdProveedor WHERE IdProducto = @Id";

                using (MySqlConnection connection = new MySqlConnection(Conexion))
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@Id", Id);
                    updateCommand.Parameters.AddWithValue("@Nombre", Nombre);
                    updateCommand.Parameters.AddWithValue("@Cantidad", Cantidad);
                    updateCommand.Parameters.AddWithValue("@PrecioC", PrecioC);
                    updateCommand.Parameters.AddWithValue("@PrecioV", PrecioV);
                    updateCommand.Parameters.AddWithValue("@IdProveedor", IdProveedor);

                    connection.Open();
                    updateCommand.ExecuteNonQuery();
                }

                return "Producto actualizado exitosamente.";
            }
            catch (Exception ex)
            {
                return "Error al intentar actualizar el producto: " + ex.Message;
            }
        }

        public string EliminarProducto(int idProducto)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(Conexion))
                using (MySqlCommand command = new MySqlCommand("DELETE FROM Producto WHERE IdProducto = @Id", connection))
                {
                    command.Parameters.AddWithValue("@Id", idProducto);

                    connection.Open();
                    int filasAfectadas = command.ExecuteNonQuery();

                    if (filasAfectadas > 0)
                    {
                        return "Producto eliminado exitosamente.";
                    }
                    else
                    {
                        return "No se encontró un producto con el Id proporcionado.";
                    }
                }
            }
            catch (Exception ex)
            {
                return "Error al intentar eliminar el producto: " + ex.Message;
            }
        }
    }
}