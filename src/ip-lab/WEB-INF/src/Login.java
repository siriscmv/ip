import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;

public class Login extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if (username.equals("root") && password.equals("ssn")) {
            Cookie cookie = new Cookie("auth", "fed290e7355f56b1bee7717e9b58b92c7f39d98cb709d2322dca50327555a291");
            cookie.setMaxAge(60 * 60 * 24 * 30);
            cookie.setPath("/");
            response.addCookie(cookie);

            response.sendRedirect("/ip-lab/homepage.html");
        } else {
            PrintWriter writer = response.getWriter();
            writer.println("<html><body><h1>Invalid username or password</h1></body></html>");
        }
    }
}