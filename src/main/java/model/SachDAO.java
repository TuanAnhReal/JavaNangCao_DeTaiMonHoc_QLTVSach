/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import util.DBConnection;

/**
 *
 * @author PC
 */
public class SachDAO {

    //lấy dữ liệu các sách
    public List<Sach> getAllBooks() {
        List<Sach> allBooks = new ArrayList<>();
        // Câu SQL tương tự getFeaturedBooks nhưng không có TOP (?)
        String sql = "SELECT "
                + "s.IdSach, s.TieuDe, s.Gia, s.Anh, s.NgayDang, "
                + "tt.IdNguoiDung, tt.Ten AS TenNguoiDang, "
                + "tl.IdTheLoai, tl.Ten AS TenTheLoai "
                + "FROM Sach s "
                + "JOIN ThongTinNguoiDung tt ON s.IdNguoiDang = tt.IdNguoiDung "
                + "LEFT JOIN TheLoai tl ON s.IdTheLoai = tl.IdTheLoai "
                + "JOIN TrangThaiSach tts ON s.IdSach = tts.IdSach "
                + "WHERE tts.TrangThai = N'đang bán' "
                + "ORDER BY s.NgayDang DESC"; // Vẫn sắp xếp theo ngày đăng mới nhất

        try (Connection conn = DBConnection.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Sach sach = new Sach();
                    sach.setIdSach(rs.getInt("IdSach"));
                    sach.setTieuDe(rs.getString("TieuDe"));
                    sach.setGia(rs.getInt("Gia"));
                    sach.setAnh(rs.getString("Anh"));

                    Timestamp ts = rs.getTimestamp("NgayDang");
                    if (ts != null) {
                        sach.setNgayDang(ts.toLocalDateTime());
                    }

                    User nguoiDang = new User();
                    nguoiDang.setIdNguoiDung(rs.getInt("IdNguoiDung"));
                    nguoiDang.setTen(rs.getString("TenNguoiDang"));
                    sach.setNguoiDang(nguoiDang);

                    TheLoai theLoai = new TheLoai();
                    theLoai.setIdTheLoai(rs.getInt("IdTheLoai"));
                    theLoai.setTenTheLoai(rs.getString("TenTheLoai"));
                    sach.setTheLoai(theLoai);

                    // (Lưu ý: Cột MoTaNgan chưa có, tạm thời để null)
                    // sach.setMoTaNgan(rs.getString("MoTaNgan")); 
                    allBooks.add(sach);
                    System.out.println("Đã truyền dữ liệu!!!!!" + allBooks);
                }
            }
        } catch (Exception e) {
            System.err.println("Lỗi khi lấy tất cả sách (getAllBooks): " + e.getMessage());
        }
        return allBooks;
    }

    //thêm sách mới
    public boolean addBook(Sach sach) {

        // Câu lệnh SQL để gọi Stored Procedure
        String sql = "{call sp_ThemSachMoi(?, ?, ?, ?, ?, ?)}";

        // Kiểm tra điều kiện bắt buộc: Sách phải có người đăng
        if (sach.getNguoiDang() == null) {
            System.err.println("Lỗi addBook: Người đăng (User) không được là null.");
            return false;
        }

        try (Connection conn = DBConnection.getConnection(); CallableStatement cs = conn.prepareCall(sql)) {
            cs.setInt(1, sach.getNguoiDang().getIdNguoiDung());

            // 2. @TieuDe (NVARCHAR)
            cs.setString(2, sach.getTieuDe());

            // 3. @Gia (INT)
            cs.setInt(3, sach.getGia());

            // 4. @IdTheLoai (INT - Lấy từ đối tượng TheLoai, có thể null)
            if (sach.getTheLoai() != null) {
                // *** Giả định quan trọng ***:
                // Chúng ta giả định class TheLoai của bạn có phương thức .getIdTheLoai()
                cs.setInt(4, sach.getTheLoai().getIdTheLoai());
            } else {
                // Nếu đối tượng TheLoai là null, truyền giá trị NULL cho SQL
                cs.setNull(4, Types.INTEGER);
            }

            // 5. @Anh (VARCHAR - Có thể null)
            if (sach.getAnh() != null && !sach.getAnh().isEmpty()) {
                cs.setString(5, sach.getAnh());
            } else {
                cs.setNull(5, Types.VARCHAR);
            }

            // 6. @Tep (VARCHAR - Có thể null)
            if (sach.getTep() != null && !sach.getTep().isEmpty()) {
                cs.setString(6, sach.getTep());
            } else {
                cs.setNull(6, Types.VARCHAR);
            }
            boolean hasResultSet = cs.execute();

            if (hasResultSet) {
                try (ResultSet rs = cs.getResultSet()) {
                    if (rs.next()) {
                        int newBookId = rs.getInt("NewBookID");
                        System.out.println("Thêm sách thành công. ID sách mới là: " + newBookId);
                    }
                }
            }
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //Lấy ra các cuốn sách hay
    public List<Sach> getFeaturedBooks(int limit) {
        List<Sach> list = new ArrayList<>();

        // Câu SQL này JOIN 4 bảng: Sach, ThongTinNguoiDung, TheLoai, và TrangThaiSach
        // Nó lấy TOP (limit) sách mới nhất (ORDER BY NgayDang DESC)
        // và chỉ lấy sách có trạng thái "đang bán"
        // LƯU Ý: s.Anh phải là ảnh banner (ảnh rộng)
        String sql = "SELECT TOP (?) "
                + "    s.IdSach, s.TieuDe, s.Anh, s.Gia, s.Tep, s.NgayDang, "
                + "    tt.IdNguoiDung, tt.Ten AS TenNguoiDang, "
                + "    tl.IdTheLoai, tl.Ten AS TenTheLoai "
                + "FROM Sach s "
                + "JOIN ThongTinNguoiDung tt ON s.IdNguoiDang = tt.IdNguoiDung "
                + "LEFT JOIN TheLoai tl ON s.IdTheLoai = tl.IdTheLoai "
                + "JOIN TrangThaiSach tts ON s.IdSach = tts.IdSach "
                + "WHERE tts.TrangThai = N'đang bán' "
                + // N'...' cho chuỗi Unicode (NVARCHAR)
                "ORDER BY s.NgayDang DESC";

        try (Connection conn = DBConnection.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, limit); // Gán giá trị cho TOP (?)

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    // 1. Tạo đối tượng User (Người đăng)
                    User nguoiDang = new User();
                    nguoiDang.setIdNguoiDung(rs.getInt("IdNguoiDung"));
                    nguoiDang.setTen(rs.getString("TenNguoiDang"));

                    // 2. Tạo đối tượng TheLoai
                    TheLoai theLoai = new TheLoai();
                    theLoai.setIdTheLoai(rs.getInt("IdTheLoai"));
                    theLoai.setTenTheLoai(rs.getString("TenTheLoai"));
                    // (Kiểm tra null nếu IdTheLoai có thể là NULL)
                    if (rs.wasNull()) {
                        theLoai = null;
                    }

                    // 3. Tạo đối tượng Sach chính
                    Sach sach = new Sach();
                    sach.setIdSach(rs.getInt("IdSach"));
                    sach.setTieuDe(rs.getString("TieuDe"));
                    sach.setGia(rs.getInt("Gia"));
                    sach.setAnh(rs.getString("Anh"));
                    sach.setTep(rs.getString("Tep"));
                    sach.setNgayDang(rs.getTimestamp("NgayDang").toLocalDateTime());

                    // 4. Gán các đối tượng lồng nhau
                    sach.setNguoiDang(nguoiDang);
                    sach.setTheLoai(theLoai);

                    list.add(sach);
                }
            }
        } catch (Exception e) {
            e.printStackTrace(); // In lỗi ra console để debug
        }
        return list;
    }

    public List<Sach> getAllBooksForAdmin() {
        List<Sach> allBooks = new ArrayList<>();
        // Lấy các cột chính + TenNguoiDang + TenTheLoai + TrangThai
        String sql = "SELECT s.IdSach, s.TieuDe, s.Gia, s.Anh, s.Tep, s.NgayDang, "
                + "tt.IdNguoiDung, tt.Ten AS TenNguoiDang, "
                + "tl.IdTheLoai, tl.Ten AS TenTheLoai, "
                + "tts.TrangThai AS TrangThaiSach " // Lấy trạng thái từ TrangThaiSach
                + "FROM Sach s "
                + "JOIN ThongTinNguoiDung tt ON s.IdNguoiDang = tt.IdNguoiDung "
                + "LEFT JOIN TheLoai tl ON s.IdTheLoai = tl.IdTheLoai "
                + "LEFT JOIN TrangThaiSach tts ON s.IdSach = tts.IdSach "
                + "ORDER BY s.IdSach DESC";

        try (Connection conn = DBConnection.getConnection(); PreparedStatement ps = conn.prepareStatement(sql); ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Sach sach = new Sach();
                sach.setIdSach(rs.getInt("IdSach"));
                sach.setTieuDe(rs.getString("TieuDe"));
                sach.setGia(rs.getInt("Gia"));
                sach.setAnh(rs.getString("Anh"));
                sach.setTep(rs.getString("Tep"));

                Timestamp ts = rs.getTimestamp("NgayDang");
                if (ts != null) {
                    sach.setNgayDang(ts.toLocalDateTime());
                }

                User nguoiDang = new User();
                nguoiDang.setIdNguoiDung(rs.getInt("IdNguoiDung"));
                nguoiDang.setTen(rs.getString("TenNguoiDang"));
                sach.setNguoiDang(nguoiDang);

                TheLoai theLoai = new TheLoai();
                theLoai.setIdTheLoai(rs.getInt("IdTheLoai"));
                theLoai.setTenTheLoai(rs.getString("TenTheLoai"));
                if (rs.wasNull()) {
                    sach.setTheLoai(null);
                } else {
                    sach.setTheLoai(theLoai);
                }

                // *** THÊM DỮ LIỆU TỪ TRANGTHAISACH ***
                // Gán trực tiếp vào Sach object (giả định bạn đã thêm getter/setter status và moTa vào Sach.java)
                // Ví dụ: sach.setTrangThai(rs.getString("TrangThaiSach"));
                // Vì không có model cập nhật, ta sẽ gửi raw object và dựa vào mapping trong JS.
                allBooks.add(sach);
            }
        } catch (Exception e) {
            System.err.println("Lỗi khi lấy tất cả sách cho Admin: " + e.getMessage());
        }
        return allBooks;
    }
}
