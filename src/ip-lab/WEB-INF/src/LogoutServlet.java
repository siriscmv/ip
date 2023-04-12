import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;

public class LogoutServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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

            db.deleteSession(token);
            Cookie cookie = new Cookie("token", "");
            cookie.setMaxAge(60 * 60 * 24 * 30);
            cookie.setPath("/");
            response.addCookie(cookie);

            out.println("<h2>Logout successful</h2>");
            out.println("<a href='/ip-lab'><h5>Go back</h5></a>");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}