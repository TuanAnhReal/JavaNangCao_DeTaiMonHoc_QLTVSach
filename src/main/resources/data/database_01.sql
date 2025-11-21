create database DETAI_QLTHUVIENSACH;
go
use DETAI_QLTHUVIENSACH;
go
/*
Bảng chính
TaiKhoan → login + VaiTro
ThongTinCaNhan → profile user (1:1 với TaiKhoan)
Sach → thông tin sách + người đăng
DanhSachTheLoai → master category

Quan hệ user - sách:
KhoSach → sách đã mua
SachYeuThich → sách yêu thích

Social:
BinhLuanSach → comment
DanhGiaSach → rating 1-5 sao
*/

-- 1. Tài khoản đăng nhập
CREATE TABLE TaiKhoan (
  IdTK INT IDENTITY(1,1) PRIMARY KEY,
  TenDangNhap NVARCHAR(100) NOT NULL UNIQUE,
  MatKhau NVARCHAR(200) NOT NULL,
  VaiTro NVARCHAR(20) NOT NULL,   -- 'Admin' hoặc 'User'
  Tien int DEFAULT 0 check (Tien >= 0)
);

-- 2. Thông tin người dùng (profile)
CREATE TABLE ThongTinNguoiDung (
  IdNguoiDung INT IDENTITY(1,1) PRIMARY KEY,
  IdTK INT NOT NULL,
  Ten NVARCHAR(150) NULL,
  Email NVARCHAR(150) NULL,
  SDT NVARCHAR(12) NULL,
  FOREIGN KEY (IdTK) REFERENCES TaiKhoan(IdTK)
);

-- 3. Thể loại sách
CREATE TABLE TheLoai (
  IdTheLoai INT IDENTITY(1,1) PRIMARY KEY,
  Ten NVARCHAR(100) NOT NULL UNIQUE
);

-- 4. Sách (do user upload)
CREATE TABLE Sach (
  IdSach INT IDENTITY(1,1) PRIMARY KEY,
  IdNguoiDang INT NOT NULL, -- FK tới ThongTinNguoiDung
  TieuDe NVARCHAR(200) NOT NULL,
  Gia INT DEFAULT 0,
  IdTheLoai INT NULL,
  Anh VARCHAR(500) NULL,
  Tep VARCHAR(500) NULL,
  NgayDang DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (IdNguoiDang) REFERENCES ThongTinNguoiDung(IdNguoiDung),
  FOREIGN KEY (IdTheLoai) REFERENCES TheLoai(IdTheLoai)
);

-- 5. Sách đã mua
CREATE TABLE MuaSach (
  IdNguoiDung INT NOT NULL,
  IdSach INT NOT NULL,
  NgayMua DATETIME DEFAULT GETDATE(),
  PRIMARY KEY (IdNguoiDung, IdSach),
  FOREIGN KEY (IdNguoiDung) REFERENCES ThongTinNguoiDung(IdNguoiDung),
  FOREIGN KEY (IdSach) REFERENCES Sach(IdSach)
);

-- 6. Sách yêu thích
CREATE TABLE YeuThich (
  IdNguoiDung INT NOT NULL,
  IdSach INT NOT NULL,
  NgayThich DATETIME DEFAULT GETDATE(),
  PRIMARY KEY (IdNguoiDung, IdSach),
  FOREIGN KEY (IdNguoiDung) REFERENCES ThongTinNguoiDung(IdNguoiDung),
  FOREIGN KEY (IdSach) REFERENCES Sach(IdSach)
);

-- 7. Bình luận sách
CREATE TABLE BinhLuan (
  IdBL INT IDENTITY(1,1) PRIMARY KEY,
  IdNguoiDung INT NOT NULL,
  IdSach INT NOT NULL,
  NoiDung NVARCHAR(1000),
  Ngay DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (IdNguoiDung) REFERENCES ThongTinNguoiDung(IdNguoiDung),
  FOREIGN KEY (IdSach) REFERENCES Sach(IdSach)
);

-- 8. Đánh giá sách (1 → 5 sao)
CREATE TABLE DanhGia (
  IdNguoiDung INT NOT NULL,
  IdSach INT NOT NULL,
  SoSao TINYINT NOT NULL CHECK (SoSao BETWEEN 1 AND 5),
  NoiDung NVARCHAR(1000) NULL,
  Ngay DATETIME DEFAULT GETDATE(),
  PRIMARY KEY (IdNguoiDung, IdSach),
  FOREIGN KEY (IdNguoiDung) REFERENCES ThongTinNguoiDung(IdNguoiDung),
  FOREIGN KEY (IdSach) REFERENCES Sach(IdSach)
);



