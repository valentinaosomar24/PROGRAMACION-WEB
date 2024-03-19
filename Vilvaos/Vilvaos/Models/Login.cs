using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace Vilvaos.Models
{
    public class Login
    {
        public static string Conexion = ConfigurationManager.ConnectionStrings["ConexionBD"].ConnectionString;

        public DataTable ConsultaLogin(string user, string correo)
        {
            DataTable result = new DataTable();
            string sql = (@"SELECT * FROM empresa WHERE Correo = '"+ user + "' and Pwd ='"+correo+"'");
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

        public string Registrar(string Nombre, string correo, string contraseña)
        {
            DataTable result = new DataTable();
            string sql = (@"INSERT INTO empresa (Nombre,Correo,Pwd) VALUES('"+ Nombre + "','"+ correo + "','"+ contraseña + "')");
            try
            {
                string insertQuery = (@"INSERT INTO empresa (Nombre,Correo,Pwd) VALUES('" + Nombre + "','" + correo + "','" + contraseña + "')");

                using (MySqlConnection connection = new MySqlConnection(Conexion))
                using (MySqlCommand command = new MySqlCommand(insertQuery, connection))
                {
                    command.Parameters.AddWithValue("@Nombre", Nombre);
                    command.Parameters.AddWithValue("@correo", correo);
                    command.Parameters.AddWithValue("@contraseña", contraseña);

                    connection.Open();
                    command.ExecuteNonQuery();
                }

                return "Usuario registrado exitosamente, inicie sesion.";
            }
            catch (Exception ex)
            {
                return "Error al registrar nuevo usuario: " + ex.Message;
            }
        }
    }
}