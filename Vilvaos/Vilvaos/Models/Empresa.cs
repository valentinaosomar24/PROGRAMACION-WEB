using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace Vilvaos.Models
{
    public class Empresa
    {
        public static string Conexion = ConfigurationManager.ConnectionStrings["ConexionBD"].ConnectionString;

        public DataTable ConsultaEmpresa(string id)
        {
            DataTable result = new DataTable();
            string sql = (@"SELECT * FROM empresa WHERE IdEmpresa = "+ id);
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

        public string GuardarDatosAdEm(string NitEmpresa, string CiudadEmpresa, string CategoriaEmpresa, string TelefonoEmpresa, string DireccionEmpresa, string CorreoEmpresa, string CargoEmpresa, string id)
        {
            try
            {
                string updateQuery = "UPDATE empresa SET NIT = @NitEmpresa, Telefono= @TelefonoEmpresa,Direccion =@DireccionEmpresa,Ciudad=@CiudadEmpresa,Gerente=@CargoEmpresa,Categoria=@CategoriaEmpresa,Correo=@CorreoEmpresa WHERE IdEmpresa = @id";


                using (MySqlConnection connection = new MySqlConnection(Conexion))
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@Id", id);
                    updateCommand.Parameters.AddWithValue("@NitEmpresa", NitEmpresa);
                    updateCommand.Parameters.AddWithValue("@TelefonoEmpresa", TelefonoEmpresa);
                    updateCommand.Parameters.AddWithValue("@DireccionEmpresa", DireccionEmpresa);
                    updateCommand.Parameters.AddWithValue("@CiudadEmpresa", CiudadEmpresa);
                    updateCommand.Parameters.AddWithValue("@CargoEmpresa", CargoEmpresa);
                    updateCommand.Parameters.AddWithValue("@CategoriaEmpresa", CategoriaEmpresa);
                    updateCommand.Parameters.AddWithValue("@CorreoEmpresa", CorreoEmpresa);

                    connection.Open();
                    updateCommand.ExecuteNonQuery();
                }

                return "Informacion de la empresa guardada exitosamente.";
            }
            catch (Exception ex)
            {
                return "Error al intentar actualizar el producto: " + ex.Message;
            }
        }

        public string ActuazlizarDatosAdEm(string CiudadEmpresa, string CategoriaEmpresa, string TelefonoEmpresa, string DireccionEmpresa, string CorreoEmpresa, string CargoEmpresa, string id)
        {
            try
            {
                string updateQuery = "UPDATE empresa SET Telefono= @TelefonoEmpresa,Direccion =@DireccionEmpresa,Ciudad=@CiudadEmpresa,Gerente=@CargoEmpresa,Categoria=@CategoriaEmpresa,Correo=@CorreoEmpresa WHERE IdEmpresa = @id";

                using (MySqlConnection connection = new MySqlConnection(Conexion))
                using (MySqlCommand updateCommand = new MySqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@Id", id);
                    updateCommand.Parameters.AddWithValue("@TelefonoEmpresa", TelefonoEmpresa);
                    updateCommand.Parameters.AddWithValue("@DireccionEmpresa", DireccionEmpresa);
                    updateCommand.Parameters.AddWithValue("@CiudadEmpresa", CiudadEmpresa);
                    updateCommand.Parameters.AddWithValue("@CargoEmpresa", CargoEmpresa);
                    updateCommand.Parameters.AddWithValue("@CategoriaEmpresa", CategoriaEmpresa);
                    updateCommand.Parameters.AddWithValue("@CorreoEmpresa", CorreoEmpresa);

                    connection.Open();
                    updateCommand.ExecuteNonQuery();
                }

                return "Informacion de la empresa actualizada exitosamente.";
            }
            catch (Exception ex)
            {
                return "Error al intentar actualizar el producto: " + ex.Message;
            }
        }
    }
}