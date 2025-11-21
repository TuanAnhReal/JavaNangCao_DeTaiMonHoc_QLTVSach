/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import util.DBConnection;

/**
 *
 * @author PC
 */
public class UserDAO {

    //các sự kiện từ admin
    //lấy danh sách các user trong NguoiDung
    public List<User> getAll() {
        List<User> list = new ArrayList();
        String sql = "select idnguoidung, ten, email, sdt, tien from ThongTinNguoiDung";

        try (Connection conn = DBConnection.getConnection(); Statement stm = conn.createStatement(); ResultSet rs = stm.executeQuery(sql)) {
            while (rs.next()) {
                User u = new User(
                        rs.getInt("idNguoiDung"),
                        rs.getString("ten"),
                        rs.getString("email"),
                        rs.getString("sdt"),
                        rs.getInt("tien")
                );
                list.add(u);
            }
        } catch (Exception e) {
            System.out.println("Lỗi: " + e.toString());
        }
        return list;
    }

    //các sự kiện từ client
    //lấy ra thông tin tài khoản để so sánh từ client
    public User checkLogin(String tenDangNhap, String matKhau) {
        String sql = "SELECT tk.IdTK, tk.TenDangNhap, tk.MatKhau, tk.VaiTro, "
                + "tt.IdNguoiDung, tt.Ten, tt.GioiTinh, tt.DiaChi, tt.Email, tt.SDT, tt.Tien "
                + "FROM TaiKhoan tk JOIN ThongTinNguoiDung tt ON tk.IdTK = tt.IdTK "
                + "WHERE tk.TenDangNhap = ? AND tk.MatKhau = ?";

        // Sử dụng try-with-resources để tự động đóng kết nối
        try (Connection conn = DBConnection.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

            // Gán giá trị vào các dấu ? để tránh lỗi SQL Injection
            ps.setString(1, tenDangNhap);
            ps.setString(2, matKhau);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    User u = new User();
                    // Lấy dữ liệu từ cả 2 bảng và set cho đối tượng User
                    u.setIdNguoiDung(rs.getInt("IdNguoiDung")); // ID chính để thao tác
                    u.setTenDangNhap(rs.getString("TenDangNhap"));
                    u.setMatKhau(rs.getString("MatKhau")); // Thường không set mật khẩu vào đối tượng session
                    u.setVaiTro(rs.getString("VaiTro"));
                    u.setTen(rs.getString("Ten"));
                    u.setGioiTinh(rs.getString("GioiTinh"));
                    u.setDiaChi(rs.getString("DiaChi"));
                    u.setEmail(rs.getString("Email"));
                    u.setSdt(rs.getString("SDT"));
                    u.setTien(rs.getInt("Tien"));
                    return u;
                }
            }
        } catch (Exception e) {
            System.out.println("Lỗi checkLogin: " + e.toString());
        }
        // Nếu không tìm thấy user hoặc có lỗi, trả về null
        return null;
    }

    //đăng ký user
    public boolean register(String tenDangNhap, String matKhau) {
        String sqlInsertTaiKhoan = "INSERT INTO TaiKhoan (TenDangNhap, MatKhau, VaiTro) VALUES (?, ?, 'user')";
        String sqlInsertThongTin = "INSERT INTO ThongTinNguoiDung (IdTK) VALUES (?)";
        Connection conn = null;

        try {
            conn = DBConnection.getConnection();
            // Bắt đầu transaction, tắt chế độ tự động commit
            conn.setAutoCommit(false);

            int newIdTK = 0;

            // ---- BƯỚC 1: THÊM VÀO BẢNG TAIKHOAN ----
            // Thêm Statement.RETURN_GENERATED_KEYS để lấy ID vừa tạo
            try (PreparedStatement psTaiKhoan = conn.prepareStatement(sqlInsertTaiKhoan, Statement.RETURN_GENERATED_KEYS)) {
                psTaiKhoan.setString(1, tenDangNhap);
                psTaiKhoan.setString(2, matKhau); // !!! Cảnh báo: Mật khẩu nên được băm (hash) bằng BCrypt
                int affectedRows = psTaiKhoan.executeUpdate();

                // Lấy ID vừa được sinh ra
                if (affectedRows > 0) {
                    try (ResultSet generatedKeys = psTaiKhoan.getGeneratedKeys()) {
                        if (generatedKeys.next()) {
                            newIdTK = generatedKeys.getInt(1);
                        } else {
                            throw new SQLException("Tạo tài khoản thất bại, không lấy được ID.");
                        }
                    }
                }
            }

            // ---- BƯỚC 2: THÊM VÀO BẢNG THONGTINNGUOIDUNG ----
            try (PreparedStatement psThongTin = conn.prepareStatement(sqlInsertThongTin)) {
                psThongTin.setInt(1, newIdTK);
                psThongTin.executeUpdate();
            }

            // Nếu tất cả các lệnh đều thành công, commit transaction
            conn.commit();
            return true;

        } catch (SQLException e) {
            // Nếu có bất kỳ lỗi nào (VD: Tên đăng nhập đã tồn tại), rollback tất cả thay đổi
            System.out.println("Lỗi khi đăng ký: " + e.getMessage());
            if (conn != null) {
                try {
                    conn.rollback();
                } catch (SQLException ex) {
                    System.out.println("Lỗi khi rollback: " + ex.getMessage());
                }
            }
            return false;
        } finally {
            // Luôn luôn trả lại chế độ auto-commit và đóng kết nối
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException e) {
                    System.out.println("Lỗi khi đóng kết nối: " + e.getMessage());
                }
            }
        }
    }

    //đổi mật khảu cho user
    
    //lấy lại mật khẩu khi quên: dùng tạm SDT làm khóa cho việc lấy lại mk
    
    //sửa thông tin cho Người Dùng
     public boolean updateUser(User u) {
        String sql = "UPDATE ThongTinNguoiDung SET Ten = ?, GioiTinh = ?, DiaChi = ?, Email = ?, SDT = ?  WHERE IdNguoiDung = ?";

        try (Connection conn = DBConnection.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, u.getTen());
            ps.setString(2, u.getGioiTinh());
            ps.setString(3, u.getDiaChi());
            ps.setString(4, u.getEmail());
            ps.setString(5, u.getSdt());
            ps.setInt(6, u.getIdNguoiDung());

            return ps.executeUpdate() > 0;

        } catch (SQLException e) {
            System.err.println("Lỗi khi cập nhật người dùng:");
            e.printStackTrace();
            return false;
        }
    }
}
