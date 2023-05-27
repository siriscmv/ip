import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FormServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String title = "Form Submission";

        out.println( 
            "<html>" +
            "<head>" + 
            "<title>" + title + "</title>" +
            "<link rel=\"stylesheet\" href=\"styles/form-table.css\" />" +
            "</head>" +
            "<body>" +
            "<h1>" + title + "</h1>" +
            "<table>" +
            "<tr>" +
            "<th>Param Name</th>" + 
            "<th>Param Value(s)</th>"+
            "</tr>"
        );

        Enumeration paramNames = request.getParameterNames();

        while(paramNames.hasMoreElements()) {
            String paramName = (String)paramNames.nextElement();
            out.print("<tr><td>" + paramName + "</td><td>");
            String[] paramValues = request.getParameterValues(paramName);

            if (paramValues[0].length() == 0) out.println("<i>No Value</i>");
            else out.println(String.join(", ", paramValues));
        }
        
        out.println("</tr></table></body></html>");
    }
}