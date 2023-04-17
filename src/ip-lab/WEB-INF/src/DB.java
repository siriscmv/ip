import java.sql.*;
import java.util.UUID;

public class DB {
    private Connection con;

    public DB() throws ClassNotFoundException, SQLException {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://host.docker.internal:3306/test", "test", "test");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected void destroy() throws SQLException {
        if (con != null) {
            con.close();
        }
    }

    public ResultSet search(String query) throws SQLException {
        PreparedStatement pst = con.prepareStatement("""
            SELECT * FROM countries
            WHERE name LIKE CONCAT(?, '%')
        """);

        pst.setString(1, query);

        ResultSet rs = pst.executeQuery();
        return rs;
    }

}
