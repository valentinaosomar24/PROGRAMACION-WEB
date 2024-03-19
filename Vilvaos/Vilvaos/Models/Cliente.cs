using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace Vilvaos.Models
{
    public class Cliente
    {
        public static string Conexion = ConfigurationManager.ConnectionStrings["ConexionBD"].ConnectionString;

        public DataTable ConsultaClientes()
        {
            DataTable result = new DataTable();
            string sql = (@"SELECT * FROM CLIENTE");
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

        public DataTable ConsultaClientesConId(int? id)
        {
            DataTable result = new DataTable();
            string sql = (@"SELECT * FROM cliente WHERE IdCliente = " + id);
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

        public string GuardarClientes(string NombreCliente, string ApellidoCliente, string DireccionCliente, string TelefonoCliente, string CiudadCliente)
        {
            try
            {
                string insertQuery = "INSERT INTO cliente (Nombre, Apellido, Direccion, Telefono, Ciudad) " +
                                     "VALUES ('" + NombreCliente + "', '" + ApellidoCliente + "', '" + DireccionCliente + "', " + TelefonoCliente + ", '" + CiudadCliente + "')";

                using (MySqlConnection connection = new MySqlConnection(Conexion))
                using (MySqlCommand command = new MySqlCommand(insertQuery, connection))
                {
                    command.Parameters.AddWithValue("@Nombre", NombreCliente);
                    command.Parameters.AddWithValue("@Apellido", ApellidoCliente);
                    command.Parameters.AddWithValue("@Direccion", DireccionCliente);
                    command.Parameters.AddWithValue("@Telefono", TelefonoCliente);
                    command.Parameters.AddWithValue("@Ciudad", CiudadCliente);

                    connection.Open();
                    command.ExecuteNonQuery();
                }

                return "Cliente guardado exitosamente.";
            }
            catch (Exception ex)
            {
                return "Error al intentar guardar el cliente: " + ex.Message;
            }
        }

        public string ActualizarClientes(string Id, string NombreCliente, string ApellidoCliente, string DireccionCliente, string TelefonoCliente, string CiudadCliente)
        {
            try
            {
                string updateQuery = "UPDATE cliente SET Nombre = @NombreCliente, Apellido = @ApellidoCliente, Direccion = @DireccionCliente, Telefono = @TelefonoCliente, Ciudad = @CiudadCliente WHERE IdCliente = @Id";

                using (MySqlConnection connection = new MySqlConnection(Conexion))
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@Id", Id);
                    updateCommand.Parameters.AddWithValue("@NombreCliente", NombreCliente);
                    updateCommand.Parameters.AddWithValue("@ApellidoCliente", ApellidoCliente);
                    updateCommand.Parameters.AddWithValue("@DireccionCliente", DireccionCliente);
                    updateCommand.Parameters.AddWithValue("@TelefonoCliente", TelefonoCliente);
                    updateCommand.Parameters.AddWithValue("@CiudadCliente", CiudadCliente);

                    connection.Open();
                    updateCommand.ExecuteNonQuery();
                }

                return "Cliente actualizado exitosamente.";
            }
            catch (Exception ex)
            {
                return "Error al intentar actualizar el cliente: " + ex.Message;
            }
        }

        public string EliminarClientes(int idProducto)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(Conexion))
                using (MySqlCommand command = new MySqlCommand("DELETE FROM cliente WHERE IdCliente = @Id", connection))
                {
                    command.Parameters.AddWithValue("@Id", idProducto);

                    connection.Open();
                    int filasAfectadas = command.ExecuteNonQuery();

                    if (filasAfectadas > 0)
                    {
                        return "Cliente eliminado exitosamente.";
                    }
                    else
                    {
                        return "No se encontró un cliente con el Id proporcionado.";
                    }
                }
            }
            catch (Exception ex)
            {
                return "Error al intentar eliminar el cliente: " + ex.Message;
            }
        }
    }
}