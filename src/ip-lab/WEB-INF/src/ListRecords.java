import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.Date;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;

import java.sql.*;

public class ListRecords extends HttpServlet {
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("text/html");

    if (!this.check_auth(request, response)) {
      return;
    }

    try {

      Class.forName("com.mysql.jdbc.Driver");
      Connection con = DriverManager.getConnection("jdbc:mysql://host.docker.internal:3306/test", "test", "test");

      Statement stmt = con.createStatement();
      ResultSet rs = stmt.executeQuery("SELECT * FROM patient_details");
      PrintWriter writer = response.getWriter();

      writer.println("<html><head><title>Records</title><link rel=\"stylesheet\" href=\"styles/form-table.css\" /></head>");
      writer.println("<body><h1>All records</h1><table><tr><th>Id</th><th>Name</th><th>Age</th><th>Gender</th><th>Address</th><th>Martial status</th><th>Date of visit</th><th>Disease Name</th></tr>");

      while (rs.next()) {
        writer.println("<tr>");
        writer.println("<td>" + rs.getInt("ID") + "</td>");
        writer.println("<td>" + rs.getString("name") + "</td>");
        writer.println("<td>" + rs.getInt("age") + "</td>");
        writer.println("<td>" + rs.getString("gender") + "</td>");
        writer.println("<td>" + rs.getString("address") + "</td>");
        boolean marital_status = rs.getBoolean("marital_status");
        if (marital_status) {
          writer.println("<td>Yes</td>");
        } else {
          writer.println("<td>No</td>");
        }
        writer.println("<td>" + rs.getDate("date_of_visit").toString() + "</td>");
        writer.println("<td>" + rs.getString("disease_name") + "</td>");
        writer.println("</tr>");
      }

      writer.println("</table></body></html>");
      rs.close();

    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public boolean check_auth(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    Cookie[] cookies = request.getCookies();

    for (Cookie cookie: cookies) {
      if (cookie.getName().equals("auth")) {
        if (cookie.getValue().equals("fed290e7355f56b1bee7717e9b58b92c7f39d98cb709d2322dca50327555a291")) {
          return true;
        }
      }
    }

    PrintWriter writer = response.getWriter();
    writer.println("<html><body><h1>Invalid username or password</h1></body></html>");

    return false;
  }
}