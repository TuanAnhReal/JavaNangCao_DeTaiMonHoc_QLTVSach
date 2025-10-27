<%-- 
    Document   : info_user
    Created on : Oct 28, 2025, 1:02:37 AM
    Author     : PC
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%-- Lấy đối tượng User từ session --%>
<c:set var="user" value="${sessionScope.user}" />

<%-- Kiểm tra nếu chưa đăng nhập thì chuyển về trang login --%>
<c:if test="${empty user}">
    <% response.sendRedirect(request.getContextPath() + "/dangnhap"); %>
</c:if>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thông Tin Cá Nhân</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="<%= request.getContextPath()%>/main_users/css/style_user.css">
    <style>
        /* Thêm style để input đẹp hơn */
        .form-input {
            @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150;
        }
        .form-label {
            @apply block text-sm font-medium text-gray-700 mb-1;
        }
    </style>
</head>
<body class="min-h-screen flex flex-col bg-gray-100">

    <!-- MAIN CONTENT - THÔNG TIN CÁ NHÂN -->
    <main class="flex-grow w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-xl shadow-xl overflow-hidden">
            <div class="p-6 sm:p-8 border-b border-gray-200">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Thông Tin Cá Nhân</h1>
                <p class="mt-1 text-sm text-gray-500">Xem và cập nhật thông tin tài khoản của bạn.</p>
            </div>

            <form action="${pageContext.request.contextPath}/trang-chu" method="POST" class="p-6 sm:p-8 space-y-6">
                <%-- Thêm input ẩn cho action --%>
                <input type="hidden" name="action" value="updateProfile">

                <%-- Phần hiển thị thông tin không đổi --%>
                <div class="flex items-center space-x-6">
                    <img class="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-4 border-primary"
                         src="https://placehold.co/150x150/E2E8F0/4A5568?text=User" alt="Avatar">
                    <div>
                        <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">${user.ten != null && !user.ten.trim().isEmpty() ? user.ten : user.tenDangNhap}</h2>
                        <p class="text-sm text-gray-500">Tên đăng nhập: <span class="font-medium">${user.tenDangNhap}</span></p>
                        <p class="text-sm text-gray-500 capitalize">Vai trò: <span class="font-medium">${user.vaiTro}</span></p>
                        <p class="text-sm text-green-600 font-semibold">Số dư: <span class="font-medium"><%= String.format("%,d", ((model.User)session.getAttribute("user")).getTien()) %>đ</span></p>
                    </div>
                </div>

                <hr class="border-gray-200">

                <%-- Phần cập nhật thông tin --%>
                <h3 class="text-lg font-medium text-gray-900">Cập nhật thông tin</h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="ten" class="form-label">Tên hiển thị</label>
                        <input type="text" id="ten" name="TenHienThi" value="${user.ten}" class="form-input" placeholder="Nhập tên của bạn">
                    </div>
                    <div>
                        <label for="email" class="form-label">Email</label>
                        <input type="email" id="email" name="Email" value="${user.email}" class="form-input" placeholder="Nhập địa chỉ email">
                    </div>
                    <div>
                        <label for="sdt" class="form-label">Số điện thoại</label>
                        <input type="tel" id="sdt" name="SoDienThoai" value="${user.sdt}" class="form-input" placeholder="Nhập số điện thoại">
                    </div>
                </div>

                <%-- Nút Lưu thay đổi --%>
                <div class="flex justify-end pt-4">
                    <button type="submit"
                            class="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md hover-primary transition duration-150">
                        Lưu Thay Đổi
                    </button>
                </div>
            </form>

            <%-- Phần đổi mật khẩu (Tùy chọn) --%>
            <div class="p-6 sm:p-8 border-t border-gray-200">
                 <h3 class="text-lg font-medium text-gray-900 mb-2">Bảo mật</h3>
                 <a href="${pageContext.request.contextPath}/trang-chu?action=viewChangePassword" <%-- Link đến action đổi mật khẩu --%>
                    class="text-primary hover:underline">
                     Đổi mật khẩu
                 </a>
            </div>
        </div>
    </main>

    <%-- BAO GỒM FOOTER --%>
    <jsp:include page="layout/footer.jsp" />

</body>
</html>
