import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;

import java.sql.SQLException;

public class LoginServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            response.setContentType("text/html");
            PrintWriter out = response.getWriter();
            DB db = new DB();

            int userId = db.login(request.getParameter("username"), request.getParameter("password"));

            if (userId == -1) {
                out.println("<h2>Invalid username or password</h2>");
                return;
            }

            String token = db.createSession(userId);

            Cookie cookie = new Cookie("token", token);
            cookie.setMaxAge(60 * 60 * 24 * 30);
            cookie.setPath("/");
            response.addCookie(cookie);

            out.println("<h2>Login successful</h2>");
            out.println("<h5>Welcome " + request.getParameter("username") + "</h5>");
            out.println("<a href='/ip-lab/profile'><h5>View Profile in Detail</h5></a>");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}