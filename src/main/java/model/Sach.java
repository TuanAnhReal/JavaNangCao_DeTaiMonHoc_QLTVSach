/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author PC
 */
import java.time.LocalDateTime;

public class Sach {
    // Thuộc tính trực tiếp từ bảng Sach
    private int idSach; // Từ IdSach
    private String tieuDe;
    private int gia;
    private String anh; // Đường dẫn tới file ảnh
    private String tep; // Đường dẫn tới file sách (PDF, EPUB...)
    private LocalDateTime ngayDang;

    private User nguoiDang; // Thay cho IdNguoiDang

    private TheLoai theLoai; // Thay cho IdTheLoai

    public Sach() {
    }

    public Sach(int id, String tieuDe, int gia, String anh, String tep, LocalDateTime ngayDang, User nguoiDang, TheLoai theLoai) {
        this.idSach = id;
        this.tieuDe = tieuDe;
        this.gia = gia;
        this.anh = anh;
        this.tep = tep;
        this.ngayDang = ngayDang;
        this.nguoiDang = nguoiDang;
        this.theLoai = theLoai;
    }

    public Sach(int id, String tieuDe, int gia, String anh, LocalDateTime ngayDang, TheLoai theLoai) {
        this.idSach = id;
        this.tieuDe = tieuDe;
        this.gia = gia;
        this.anh = anh;
        this.ngayDang = ngayDang;
        this.theLoai = theLoai;
    }

    public int getIdSach() {
        return idSach;
    }

    public void setIdSach(int idSach) {
        this.idSach = idSach;
    }


    public String getTieuDe() {
        return tieuDe;
    }

    public void setTieuDe(String tieuDe) {
        this.tieuDe = tieuDe;
    }

    public int getGia() {
        return gia;
    }

    public void setGia(int gia) {
        this.gia = gia;
    }

    public String getAnh() {
        return anh;
    }

    public void setAnh(String anh) {
        this.anh = anh;
    }

    public String getTep() {
        return tep;
    }

    public void setTep(String tep) {
        this.tep = tep;
    }

    public LocalDateTime getNgayDang() {
        return ngayDang;
    }

    public void setNgayDang(LocalDateTime ngayDang) {
        this.ngayDang = ngayDang;
    }

    public User getNguoiDang() {
        return nguoiDang;
    }

    public void setNguoiDang(User nguoiDang) {
        this.nguoiDang = nguoiDang;
    }

    public TheLoai getTheLoai() {
        return theLoai;
    }

    public void setTheLoai(TheLoai theLoai) {
        this.theLoai = theLoai;
    }

  
}
