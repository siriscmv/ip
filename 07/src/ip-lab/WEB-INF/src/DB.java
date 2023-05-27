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

    public ResultSet getUser(int id) throws SQLException {
        PreparedStatement pst = con.prepareStatement("""
            SELECT * FROM users
            WHERE id = ?
        """);

        pst.setInt(1, id);

        ResultSet rs = pst.executeQuery();
        rs.next();
        return rs;
    }

    public void createUser(String username, String password, java.sql.Date dob, String gender, String about) throws SQLException {
        PreparedStatement pst = con.prepareStatement("""
            INSERT INTO users
            (username, password, dob, gender, about)
            VALUES (?, ?, ?, ?, ?)
            """);

            pst.setString(1, username);
            pst.setString(2, password);
            pst.setDate(3, dob);
            pst.setString(4, gender);
            pst.setString(5, about);

            pst.executeUpdate();
    }

    public int login(String username, String password) throws SQLException {
        PreparedStatement pst = con.prepareStatement("""
            SELECT * FROM users
            WHERE username = ? AND password = ?
        """);

        pst.setString(1, username);
        pst.setString(2, password);

        ResultSet rs = pst.executeQuery();
        if (rs.next()) {
            return rs.getInt("id");
        } else {
            return -1;
        }
    }

    public String createSession(int userId) throws SQLException {
        String token = UUID.randomUUID().toString();
        PreparedStatement pst = con.prepareStatement("""
            INSERT INTO sessions
            (user_id, token)
            VALUES (?, ?)
        """);

        pst.setInt(1, userId);
        pst.setString(2, token);

        pst.executeUpdate();
        return token;
    }

    public int validateSession(String token) throws SQLException {
        PreparedStatement pst = con.prepareStatement("""
            SELECT * FROM sessions
            WHERE token = ?
        """);

        pst.setString(1, token);

        ResultSet rs = pst.executeQuery();
        if (rs.next()) {
            return rs.getInt("user_id");
        } else {
            return -1;
        }
    }

    public void deleteSession(String token) throws SQLException {
        PreparedStatement pst = con.prepareStatement("""
            DELETE FROM sessions
            WHERE token = ?
        """);

        pst.setString(1, token);
        pst.executeUpdate();
    }
}
