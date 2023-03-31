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

public class UpdateRecord extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");

        if (!this.check_auth(request, response)) {
            return;
        }

        int id = Integer.parseInt(request.getParameter("id"));
        String address = request.getParameter("address");

        int n = this.update_record(id, address);

        if (n == 0) {
            response.sendRedirect("/ip-lab/result.html?msg=Record+not+updated");
            return;
        }

        response.sendRedirect("/ip-lab/result.html?msg=Record+updated+successfully");
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

    public int update_record(int id, String address) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://host.docker.internal:3306/test", "test", "test");

            PreparedStatement pst = con.prepareStatement("UPDATE patient_details SET address = ? WHERE ID = ?");
            pst.setString(1, address);
            pst.setInt(2, id);

            int n = pst.executeUpdate();
            con.close();

            return n;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return 0;
    }
}