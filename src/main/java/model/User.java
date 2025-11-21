/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author PC
 */
public class User {

    // Thuộc tính từ bảng TaiKhoan
    private String tenDangNhap;
    private String matKhau;
    private String vaiTro;

    // Thuộc tính từ bảng ThongTinNguoiDung
    private int idNguoiDung;
    private String ten;
    private String gioiTinh;
    private String diaChi;
    private String email;
    private String sdt;
    private int tien;

    public User() {
    }

    public User(int idNguoiDung, String ten, String gioiTinh, String diaChi, String email, String sdt) {
        this.idNguoiDung = idNguoiDung;
        this.ten = ten;
        this.gioiTinh = gioiTinh;
        this.diaChi = diaChi;
        this.email = email;
        this.sdt = sdt;
    }

    public User(String tenDangNhap, String matKhau, String vaiTro, int idNguoiDung, String ten, String email, String sdt, int tien) {
        this.tenDangNhap = tenDangNhap;
        this.matKhau = matKhau;
        this.vaiTro = vaiTro;
        this.idNguoiDung = idNguoiDung;
        this.ten = ten;
        this.email = email;
        this.sdt = sdt;
        this.tien = tien;
    }

    public User(String tenDangNhap, String matKhau, String vaiTro) {
        this.tenDangNhap = tenDangNhap;
        this.matKhau = matKhau;
        this.vaiTro = vaiTro;
    }

    public User(int idNguoiDung, String ten, String email, String sdt, int tien) {
        this.idNguoiDung = idNguoiDung;
        this.ten = ten;
        this.email = email;
        this.sdt = sdt;
        this.tien = tien;
    }

    @Override
    public String toString() {
        return "User{" + "idNguoiDung=" + idNguoiDung + ", ten=" + ten + ", email=" + email + ", sdt=" + sdt + ", tien=" + tien + '}';
    }

    public String getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(String gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getTenDangNhap() {
        return tenDangNhap;
    }

    public void setTenDangNhap(String tenDangNhap) {
        this.tenDangNhap = tenDangNhap;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public String getVaiTro() {
        return vaiTro;
    }

    public void setVaiTro(String vaiTro) {
        this.vaiTro = vaiTro;
    }

    public int getIdNguoiDung() {
        return idNguoiDung;
    }

    public void setIdNguoiDung(int idNguoiDung) {
        this.idNguoiDung = idNguoiDung;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public int getTien() {
        return tien;
    }

    public void setTien(int tien) {
        this.tien = tien;
    }

}
