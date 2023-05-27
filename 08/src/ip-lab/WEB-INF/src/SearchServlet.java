import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;

import java.sql.SQLException;
import java.sql.ResultSet;

public class SearchServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            response.setContentType("text/xml");
            PrintWriter out = response.getWriter();
            DB db = new DB();

            out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
            out.println("<countries>");

            ResultSet rs = db.search(request.getParameter("query"));

            while (rs.next()) {
                out.println("<country>" + rs.getString("name") + "</country>");
            }
            
            out.println("</countries>");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}