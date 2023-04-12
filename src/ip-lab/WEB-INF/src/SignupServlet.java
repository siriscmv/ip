import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;

public class SignupServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            response.setContentType("text/html");
            PrintWriter out = response.getWriter();
            DB db = new DB();

            String username = request.getParameter("username");
            String password = request.getParameter("password");
            java.sql.Date dob = java.sql.Date.valueOf(request.getParameter("dob"));
            String gender = request.getParameter("gender");
            String about = request.getParameter("about");

            db.createUser(username, password, dob, gender, about);
            int userId = db.login(username, password);

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