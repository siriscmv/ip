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

public class AddRecord extends HttpServlet {
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("text/html");

    if (!this.check_auth(request, response)) {
      return;
    }

    String name = request.getParameter("name");
    int age = Integer.parseInt(request.getParameter("age"));
    int id = Integer.parseInt(request.getParameter("id"));
    String gender = request.getParameter("gender");
    String address = request.getParameter("address");
    boolean marital_status = request.getParameter("marital_status").equals("true");
    java.sql.Date dov = java.sql.Date.valueOf(request.getParameter("date_of_visit"));
    String disease = request.getParameter("disease_name");

    int n = this.add_record(name, age, id, gender, address, marital_status, dov, disease);

    if (n == 0) {
      response.sendRedirect("/ip-lab/result.html?msg=Record+not+added");
      return;
    }

    response.sendRedirect("/ip-lab/result.html?msg=Record+added+successfully");
  }

  public boolean check_auth(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    Cookie[] cookies = request.getCookies();
    
    if (cookies != null) {
      for (Cookie cookie: cookies) {
      if (cookie.getName().equals("auth")) {
        if (cookie.getValue().equals("fed290e7355f56b1bee7717e9b58b92c7f39d98cb709d2322dca50327555a291")) {
          return true;
        }
      }
    }
    }

    PrintWriter writer = response.getWriter();
    writer.println("<html><body><h1>Invalid username or password</h1></body></html>");

    return false;
  }

  public int add_record(String name, int age, int id, String gender, String address, boolean marital_status, java.sql.Date dov, String disease) {
    try {
      Class.forName("com.mysql.jdbc.Driver");
      Connection con = DriverManager.getConnection("jdbc:mysql://host.docker.internal:3306/test", "test", "test");

      PreparedStatement pst = con.prepareStatement("INSERT INTO patient_details VALUES(?, ?, ?, ?, ?, ?, ?, ?)");
      pst.setString(1, name);
      pst.setInt(2, age);
      pst.setInt(3, id);
      pst.setString(4, gender);
      pst.setString(5, address);
      pst.setBoolean(6, marital_status);
      pst.setDate(7, dov);
      pst.setString(8, disease);

      int n = pst.executeUpdate();
      con.close();

      return n;
    } catch (Exception e) {
      e.printStackTrace();
    }

    return 0;
  }
}