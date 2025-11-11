<%-- 
    Document   : header
    Created on : Oct 26, 2025, 6:16:55 PM
    Author     : PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<header class="bg-white shadow-xl sticky top-0 z-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">

            <!-- Logo and Menu Button -->
            <div class="flex items-center space-x-4">
                <button id="menu-toggle-btn" class="text-gray-600 hover:text-primary md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </button>
                <h1 class="text-3xl font-extrabold text-primary flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M4 19.5V15A2.5 2.5 0 0 1 6.5 12.5V5A2.5 2.5 0 0 1 9 2.5h6A2.5 2.5 0 0 1 17.5 5v7.5A2.5 2.5 0 0 1 20 15v4.5"/><path d="M4 19.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V19H4v.5z"/></svg>
                    SÁCH VIỆT
                </h1>
            </div>

            <!-- Desktop Navigation (CLICK event) -->
            <nav class="hidden md:flex space-x-6 text-lg font-medium h-7 items-center"> 

                <!-- 1. Trang Chủ -->
                <a href="<%= request.getContextPath()%>/trang-chu" class="main-nav-link nav-underline-effect text-gray-600 hover:text-primary transition duration-150 active pb-1" 
                   data-format="all" onclick="filterByFormat('all', this); return false;">Trang Chủ</a>

                <!-- 2. Sách Yêu Thích (Gọi đến trang riêng /sach?action=yeuthich) -->
                <a href="#" class="main-nav-link nav-underline-effect text-gray-600 hover:text-primary transition duration-150 pb-1">
                    Sách Yêu Thích
                </a>

                <!-- 3. Sách Đã Tải (Gọi đến trang riêng /sach?action=datai) -->
                <a href="#" class="main-nav-link nav-underline-effect text-gray-600 hover:text-primary transition duration-150 pb-1">
                    Sách Đã Tải
                </a>

                <!-- 4. Thể Loại (Mega Menu - Danh Mục) - CLICK TO OPEN -->
                <div class="relative group h-full flex items-center" id="category-menu-group">
                    <a href="#category-list-section" 
                       class="main-nav-link nav-underline-effect text-gray-600 hover:text-primary transition duration-150 pb-1 flex items-center cursor-pointer" 
                       onclick="event.preventDefault(); toggleMegaMenu('category-menu');">
                        Thể Loại
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 transition-transform" id="category-icon"><path d="m6 9 6 6 6-6"/></svg>
                    </a>
                    <!-- Nội dung Dropdown -->
                    <div id="category-menu" class="mega-menu absolute left-1/2 transform -translate-x-1/2 mt-6 w-[450px] bg-white rounded-xl shadow-2xl overflow-hidden z-20 top-full p-4 border-t-4 border-primary">
                        <p class="px-4 py-2 text-sm font-semibold text-gray-600 border-b mb-1">Các Thể Loại Phổ Biến</p>
                        <div class="grid grid-cols-2 gap-2 text-sm">
                            <a href="#" onclick="filterBooks('Kinh Doanh', 'category', null); closeAllMegaMenus(); return false;" class="mega-menu-item block px-4 py-2 text-gray-700 hover:text-primary transition rounded-lg flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>Kinh Doanh</a>
                            <a href="#" onclick="filterBooks('Kỹ Năng', 'category', null); closeAllMegaMenus(); return false;" class="mega-menu-item block px-4 py-2 text-gray-700 hover:text-primary transition rounded-lg flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M15 22v-4a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v4"/><path d="M7 10a5 5 0 0 1 10 0v1h2v3a1 1 0 0 0 1 1h2"/><path d="M10 10a5 5 0 0 0 10 0v1h-2v3a1 1 0 0 0-1 1h-7v-5h-2v-3z"/><circle cx="12" cy="7" r="4"/></svg>Kỹ Năng Sống</a>
                            <a href="#" onclick="filterBooks('Văn Học', 'category', null); closeAllMegaMenus(); return false;" class="mega-menu-item block px-4 py-2 text-gray-700 hover:text-primary transition rounded-lg flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M10 15h4"/><path d="M10 19h4"/><path d="M10 11h4"/></svg>Văn Học & Tiểu Thuyết</a>
                            <a href="#" onclick="filterBooks('Khoa Học', 'category', null); closeAllMegaMenus(); return false;" class="mega-menu-item block px-4 py-2 text-gray-700 hover:text-primary transition rounded-lg flex items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-6"/></svg>Khoa Học</a>
                        </div>
                        <a href="#" onclick="filterBooks('all', 'category', null); closeAllMegaMenus(); return false;" class="block px-4 py-2 mt-3 text-primary font-bold hover:bg-gray-100 transition border-t rounded-lg">
                            <span class="flex items-center justify-between">Xem Tất Cả Thể Loại <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><path d="m9 18 6-6-6-6"/></svg></span>
                        </a>
                    </div>
                </div>

                <!-- 5. Dịch Vụ & Xem Thêm (Mega Menu Chi Tiết) - CLICK TO OPEN -->
                <div class="relative group h-full flex items-center" id="services-menu-group">
                    <a href="#" class="main-nav-link nav-underline-effect text-gray-600 hover:text-primary transition duration-150 pb-1 flex items-center cursor-pointer" 
                       onclick="event.preventDefault(); toggleMegaMenu('services-menu');">
                        Dịch Vụ & Xem Thêm
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 transition-transform" id="services-icon"><path d="m6 9 6 6 6-6"/></svg>
                    </a>
                    <!-- Nội dung Mega Menu Chi Tiết -->
                    <div id="services-menu" class="mega-menu absolute right-0 mt-6 w-[400px] bg-white rounded-xl shadow-2xl overflow-hidden z-20 top-full p-4 border-t-4 border-red-500">
                        <div class="grid grid-cols-1 gap-2">
                            <!-- Sách Hội Viên -->
                            <a href="#" class="mega-menu-item p-3 rounded-lg flex items-start space-x-3 transition" onclick="filterByFormat('ebook'); closeAllMegaMenus(); return false;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-1 flex-shrink-0"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <div>
                                    <p class="font-bold text-gray-800">Sách Hội Viên (VIP)</p>
                                    <p class="text-xs text-gray-500">Kho sách độc quyền chỉ dành cho thành viên Premium.</p>
                                </div>
                            </a>
                            <!-- Sách Mua Lẻ -->
                            <a href="#" class="mega-menu-item p-3 rounded-lg flex items-start space-x-3 transition" onclick="filterByFormat('ebook'); closeAllMegaMenus(); return false;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-1 flex-shrink-0"><path d="M6 3h12l4 6-4 6H6l-4-6z"/><circle cx="12" cy="9" r="2"/></svg>
                                <div>
                                    <p class="font-bold text-gray-800">Sách Mua Lẻ & Truyện Tranh</p>
                                    <p class="text-xs text-gray-500">Các ấn phẩm mới nhất, mua vĩnh viễn không cần hội viên.</p>
                                </div>
                            </a>
                            <!-- Dịch Vụ Xuất Bản -->
                            <a href="#" class="mega-menu-item p-3 rounded-lg flex items-start space-x-3 transition" onclick="closeAllMegaMenus(); return false;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-1 flex-shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18h.01"/><path d="M7 18h.01"/><path d="M17 18h.01"/></svg>
                                <div>
                                    <p class="font-bold text-gray-800">Dịch Vụ Xuất Bản</p>
                                    <p class="text-xs text-gray-500">Hỗ trợ tác giả phát hành và chuyển đổi sách điện tử.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

            </nav>

            <!-- form user -->
            <%
                Object userObj = session.getAttribute("user");
                if (userObj != null) {
            %>
            <div class="relative">
                <button id="user-menu-button" class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <span class="sr-only">Mở menu người dùng</span>
                    <img class="h-10 w-10 rounded-full object-cover border-2 border-primary" src="https://placehold.co/100x100/E2E8F0/4A5568?text=User" alt="Avatar">
                </button>

                <div id="user-menu" class="hidden absolute right-0 mt-2 w-72 origin-top-right bg-white rounded-xl shadow-2xl z-20 border-t-4 border-primary">
                    <div class="flex items-center p-4 border-b">
                        <img class="h-14 w-14 rounded-full object-cover flex-shrink-0" src="https://placehold.co/100x100/E2E8F0/4A5568?text=User" alt="Avatar">
                            <div class="ml-4">
                                <p class="text-lg font-bold text-gray-800 truncate">${user.ten != null ? user.ten : user.tenDangNhap}</p>
                                <p class="text-sm text-gray-500 capitalize">Vai trò: ${user.vaiTro}</p>
                                <p class="text-sm text-green-600 font-semibold">Số dư: <%= String.format("%,d", ((model.User) userObj).getTien())%>đ</p>
                            </div>
                    </div>
                    <div class="p-2">
                        <a href="<%= request.getContextPath()%>/info-user" class="flex items-center w-full px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 hover:text-primary transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            Thông tin cá nhân
                        </a>
                        <a href="<%= request.getContextPath()%>/logout" class="flex items-center w-full px-4 py-3 text-sm text-red-600 rounded-lg hover:bg-red-50 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                            Đăng xuất
                        </a>
                    </div>
                </div>
            </div>
            <%
            } else {
            %>
            <%-- Nút Đăng nhập (giữ nguyên) --%>
            <a href="<%= request.getContextPath()%>/dangnhap" 
               class="hidden sm:inline-block bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                Đăng Nhập
            </a>
            <%
                }
            %>
        </div>
    </div>
</div>
</header>
