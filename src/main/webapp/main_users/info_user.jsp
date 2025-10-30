<%-- 
    Document   : info_user
    Created on : Oct 28, 2025, 1:02:37 AM
    Author     : PC (Đã được chỉnh sửa)
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="model.User" %> <%-- Import class User để ép kiểu --%>

<%-- Lấy đối tượng User từ session --%>
<c:set var="user" value="${sessionScope.user}" />

<%-- Kiểm tra nếu chưa đăng nhập thì chuyển về trang login --%>
<c:if test="${empty user}">
    <% response.sendRedirect(request.getContextPath() + "/dangnhap");%>
</c:if>

<!DOCTYPE html>
<html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thông Tin Cá Nhân</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <!-- Link CSS chính của bạn -->
        <link rel="stylesheet" href="<%= request.getContextPath()%>/main_users/css/style_user.css">
        <!-- Link file CSS MỚI cho trang này -->
        <link rel="stylesheet" href="<%= request.getContextPath()%>/main_users/css/profile_page.css">
    </head>
    <body class="min-h-screen flex flex-col bg-gray-100">

        <!-- HEADER & NAVIGATION -->
        <%@include file="layout/header.jsp" %>

        <!-- MAIN CONTENT - THÔNG TIN CÁ NHÂN -->
        <main class="flex-grow w-full max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="bg-white rounded-xl shadow-xl overflow-hidden">
                <div class="p-6 sm:p-8 border-b border-gray-200">
                    <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Thông Tin Cá Nhân</h1>
                </div>

                <form action="${pageContext.request.contextPath}/info-user" method="POST" class="p-6 sm:p-8 space-y-6">
                    <input type="hidden" name="action" value="update">

                    <%-- Phần hiển thị thông tin không đổi --%>
                    <div class="flex items-center space-x-6">
                        <img class="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover border-4 border-primary"
                             src="https://placehold.co/150x150/E2E8F0/4A5568?text=User" alt="Avatar">
                        <div>
                            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">${user.ten != null && !user.ten.trim().isEmpty() ? user.ten : user.tenDangNhap}</h2>
                            <p class="text-sm text-gray-500">Tên đăng nhập: <span class="font-medium">${user.tenDangNhap}</span></p>
                            <p class="text-sm text-gray-500 capitalize">Vai trò: <span class="font-medium">${user.vaiTro}</span></p>
                                <%-- Sửa lỗi biên dịch JSP bằng cách ép kiểu --%>
                            <p class="text-sm text-green-600 font-semibold">Số dư: <span class="font-medium"><%= String.format("%,d", ((User) session.getAttribute("user")).getTien())%>đ</span></p>
                        </div>
                    </div>

                    <hr class="border-gray-200">

                    <%-- Phần cập nhật thông tin (ĐÃ THÊM LẠI CÁC TRƯỜNG) --%>
                    <h3 class="text-lg font-medium text-gray-900">Cập nhật thông tin</h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <!-- IdNguoiDung -->
                        <input type="hidden" name="IdNguoiDung" value="${user.idNguoiDung}" >

                        <!-- Tên -->
                        <div>
                            <label for="ten" class="block text-sm font-medium text-gray-700 mb-1">Tên hiển thị</label>
                            <div class="input-group">
                                <span class="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                </span>
                                <input type="text" id="ten" name="Ten" value="${user.ten}" class="input-with-icon" placeholder="Nhập tên của bạn">
                            </div>
                        </div>

                        <!-- Giới Tính -->
                        <div>
                            <label for="gioiTinh" class="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                            <div class="input-group">
                                <span class="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                </span>
                                <select id="gioiTinh" name="GioiTinh" class="input-with-icon">
                                    <option value="" ${empty user.gioiTinh ? 'selected' : ''}>-- Chọn giới tính --</option>
                                    <option value="Nam" ${user.gioiTinh == 'Nam' ? 'selected' : ''}>Nam</option>
                                    <option value="Nữ" ${user.gioiTinh == 'Nữ' ? 'selected' : ''}>Nữ</option>
                                </select>
                            </div>
                        </div>

                        <!-- Email -->
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div class="input-group">
                                <span class="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                </span>
                                <input type="email" id="email" name="Email" value="${user.email}" class="input-with-icon" placeholder="Nhập địa chỉ email">
                            </div>
                        </div>

                        <!-- Số điện thoại -->
                        <div> 
                            <label for="sdt" class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                            <div class="input-group">
                                <span class="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                </span>
                                <input type="tel" id="sdt" name="SDT" value="${user.sdt}" class="input-with-icon" placeholder="Nhập số điện thoại">
                            </div>
                        </div>

                        <!-- Địa Chỉ (ĐÃ THÊM) -->
                        <div class="md:col-span-2"> <%-- Cho ô này chiếm cả hàng --%>
                            <label for="diaChi" class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                            <div class="input-group">
                                <span class="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="m9.5 22.5 1.5-1.5 1.5 1.5"/><path d="M9.5 19.5 12 17l2.5 2.5"/><path d="m2 9 10-7 10 7"/></svg>
                                </span>
                                <input type="text" id="diaChi" name="DiaChi" value="${user.diaChi}" class="input-with-icon" placeholder="Nhập địa chỉ của bạn">
                            </div>
                        </div>
                    </div>

                    <%-- Nút Lưu thay đổi --%>
                    <div class="flex justify-end pt-4">
                        <button type="submit"
                                class="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md hover-primary transition duration-150 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                            Lưu Thay Đổi
                        </button>
                    </div>
                </form>

                <%-- Phần đổi mật khẩu --%>
                <div class="p-6 sm:p-8 border-t border-gray-200 bg-gray-50">
                    <h3 class="text-lg font-medium text-gray-900 mb-2">Bảo mật</h3>
                    <a href="#" class="text-primary font-medium hover:underline">
                        Bạn muốn thay đổi mật khẩu?
                    </a>
                </div>
            </div>
        </main>

        <jsp:include page="layout/footer.jsp" />
        <%@include file="../alert/alert.jsp" %>
    </body>
</html>