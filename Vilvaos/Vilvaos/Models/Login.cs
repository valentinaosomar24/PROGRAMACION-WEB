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
    }
}