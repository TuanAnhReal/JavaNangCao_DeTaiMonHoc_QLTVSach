package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import util.DBConnection;

public class TheLoaiDAO {

    /**
     * Lấy tất cả thể loại từ CSDL.
     *
     * @return List<TheLoai>
     */
    public List<TheLoai> getAllTheLoai() {
        List<TheLoai> list = new ArrayList<>();
        // Truy vấn đơn giản chỉ lấy ID và Tên
        String sql = "SELECT IdTheLoai, Ten FROM TheLoai";

        try (Connection conn = DBConnection.getConnection(); PreparedStatement ps = conn.prepareStatement(sql); ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                TheLoai tl = new TheLoai();
                tl.setIdTheLoai(rs.getInt("IdTheLoai"));
                tl.setTenTheLoai(rs.getString("Ten"));
                list.add(tl);
            }
        } catch (SQLException e) {
            System.err.println("Lỗi khi lấy tất cả thể loại: " + e.getMessage());
            // Trả về danh sách rỗng nếu có lỗi
        }
        return list;
    }

    // Thêm chức năng CRUD cơ bản (Cần thiết cho Admin)
    /**
     * Thêm thể loại mới
     */
    public boolean addTheLoai(String tenTheLoai) {
        String sql = "INSERT INTO TheLoai (Ten) VALUES (?)";
        try (Connection conn = DBConnection.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setNString(1, tenTheLoai);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Lỗi khi thêm thể loại: " + e.getMessage());
            return false;
        }
    }

    /**
     * Xóa thể loại theo ID
     */
    public boolean deleteTheLoai(int idTheLoai) {
        // CẢNH BÁO: Phải xóa hết sách thuộc thể loại này (hoặc đặt IdTheLoai=NULL trong bảng Sach)
        // hoặc thiết lập ON DELETE SET NULL trong CSDL.
        // Ở đây, chúng ta giả định DB đã có ràng buộc.
        String sql = "DELETE FROM TheLoai WHERE IdTheLoai = ?";
        try (Connection conn = DBConnection.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, idTheLoai);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println("Lỗi khi xóa thể loại (Có thể do ràng buộc FK): " + e.getMessage());
            return false;
        }
    }
}
