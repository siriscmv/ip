import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;

import java.sql.ResultSet;

public class ProfileServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            response.setContentType("text/html");
            PrintWriter out = response.getWriter();
            DB db = new DB();

            String token = null;
            Cookie[] cookies = request.getCookies();
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals("token")) {
                    token = cookie.getValue();
                    break;
                }
            }

            if (token == null) {
                out.println("<h2>Not logged in</h2>");
                return;
            }

            int userId = db.validateSession(token);

            if (userId == -1) {
                out.println("<h2>Invalid session</h2>");
                return;
            }

            ResultSet rs = db.getUser(userId);

            out.println("<h2>Profile</h2>");
            out.println("<h5>Username: " + rs.getString("username") + "</h5>");
            out.println("<h5>DOB: " + rs.getDate("dob").toString() + "</h5>");
            out.println("<h5>Gender: " + rs.getString("gender") + "</h5>");
            out.println("<h5>About: " + rs.getString("about") + "</h5>");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}