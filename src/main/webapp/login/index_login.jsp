<%-- 
    Document   : LoginForm
    Created on : Oct 21, 2025, 12:52:10 PM
    Author     : ADMIN
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng Nhập</title>
    <link rel="stylesheet" href="<%=request.getContextPath() %>/login/css/style_login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>

<body>
    <%@include file="/alert/alert.jsp" %>
    <div class="container" id="container">

        <div class="form-container sign-up-container">
            <form action="dangnhap" method="post">
                <input type="hidden" name="action" value="regist">
                <h1>Đăng Ký</h1>
                <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <span>hoặc sử dụng email để đăng ký</span>
                <input type="text" name="TenTKDK" placeholder="Tên Tài Khoản / Email" />
                <input type="password" name="MatKhauDK" placeholder="Mật Khẩu" />
                <input type="password" name="reMatKhauDK" placeholder="Nhập Lại Mật Khẩu" />
                <button>Đăng Ký</button>
            </form>
        </div>

        <div class="form-container sign-in-container">
            <form action="dangnhap" method="post">
                <h1>Đăng Nhập</h1>
                <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <span>hoặc sử dụng tài khoản của bạn</span>
                <input type="hidden" name="action" value="login">
                <input type="text" placeholder="Tên Tài Khoản / Email" name="TenTK" />
                <input type="password" placeholder="Mật Khẩu" name="MatKhau"/>

                <div class="login-options">
                    <div class="remember-me">
                        <input type="checkbox" id="remember">
                    </div>
                    <div  class="helo">
                        <label for="remember">Ghi Nhớ</label>

                    </div>

                    <a href="#">Quên mật khẩu?</a>
                </div>

                <button id="loginButton">Đăng Nhập</button>
            </form>
        </div>

        <div class="overlay-container">
            <div class="overlay">

                <div class="overlay-panel overlay-left">
                    <h1>Chào bạn!</h1>
                    <p>Nếu bạn đã có tài khoản, vui lòng đăng nhập tại đây.</p>
                    <button class="ghost" id="signIn">Đăng Nhập</button>
                </div>

                <div class="overlay-panel overlay-right">
                    <h1>Bắt đầu hành trình của bạn</h1>
                    <p>Nhập thông tin cá nhân của bạn để mở tài khoản với chúng tôi.</p>
                    <button class="ghost" id="signUp">Đăng Ký</button>
                </div>

            </div>
        </div>
    </div>

    <script src="<%=request.getContextPath() %>/login/javascript/js_login.js"></script>

</body>

</html>
