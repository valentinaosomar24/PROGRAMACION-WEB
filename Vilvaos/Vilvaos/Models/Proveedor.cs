using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace Vilvaos.Models
{
    public class Proveedor
    {

        public static string Conexion = ConfigurationManager.ConnectionStrings["ConexionBD"].ConnectionString;

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

        public DataTable ConsultaProveedorConId(int? id)
        {
            DataTable result = new DataTable();
            string sql = (@"SELECT * FROM proveedor WHERE IdProveedor = " + id);
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

        public string GuardarProveedor(string NombreProveedor, string TelefonoProveedor, string CiudadProveedor)
        {
            try
            {
                string insertQuery = "INSERT INTO proveedor (Nombre, Telefono, Ciudad) " +
                                     "VALUES ('" + NombreProveedor + "', " + TelefonoProveedor + ", '" + CiudadProveedor+ "')";

                using (MySqlConnection connection = new MySqlConnection(Conexion))
                using (MySqlCommand command = new MySqlCommand(insertQuery, connection))
                {
                    command.Parameters.AddWithValue("@Nombre", NombreProveedor);
                    command.Parameters.AddWithValue("@Telefono", TelefonoProveedor);
                    command.Parameters.AddWithValue("@Ciudad", CiudadProveedor);

                    connection.Open();
                    command.ExecuteNonQuery();
                }

                return "Proveedor guardado exitosamente.";
            }
            catch (Exception ex)
            {
                return "Error al intentar guardar el proveedor: " + ex.Message;
            }
        }

        public string ActualizarProveedor(string Id, string NombreProveedor, string TelefonoProveedor, string CiudadProveedor)
        {
            try
            {
                string updateQuery = "UPDATE proveedor SET Nombre = @NombreProveedor, Telefono = @TelefonoProveedor, Ciudad = @CiudadProveedor WHERE IdProveedor = @Id";

                using (MySqlConnection connection = new MySqlConnection(Conexion))
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@Id", Id);
                    updateCommand.Parameters.AddWithValue("@NombreProveedor", NombreProveedor);
                    updateCommand.Parameters.AddWithValue("@TelefonoProveedor", TelefonoProveedor);
                    updateCommand.Parameters.AddWithValue("@CiudadProveedor", CiudadProveedor);

                    connection.Open();
                    updateCommand.ExecuteNonQuery();
                }

                return "Proveedor actualizado exitosamente.";
            }
            catch (Exception ex)
            {
                return "Error al intentar actualizar el proveedor: " + ex.Message;
            }
        }

        public string EliminarProveedor(int idProducto)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(Conexion))
                using (MySqlCommand command = new MySqlCommand("DELETE FROM proveedor WHERE IdProveedor = @Id", connection))
                {
                    command.Parameters.AddWithValue("@Id", idProducto);

                    connection.Open();
                    int filasAfectadas = command.ExecuteNonQuery();

                    if (filasAfectadas > 0)
                    {
                        return "Proveedor eliminado exitosamente.";
                    }
                    else
                    {
                        return "No se encontró un proveedor con el Id proporcionado.";
                    }
                }
            }
            catch (Exception ex)
            {
                return "Error al intentar eliminar el proveedor: " + ex.Message;
            }
        }
    }
}