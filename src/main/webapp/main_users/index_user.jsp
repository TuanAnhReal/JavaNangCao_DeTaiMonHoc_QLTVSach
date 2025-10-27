<%-- 
    Document   : index_user
    Created on : Oct 23, 2025, 3:36:48 PM
    Author     : PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thư Viện Sách</title>
        <!-- Tải Tailwind CSS để tạo giao diện hiện đại và responsive -->
        <script src="https://cdn.tailwindcss.com"></script>
        <!-- Tải thư viện Lucide Icons cho các biểu tượng -->
        <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
        <!-- Liên kết đến tệp CSS tùy chỉnh -->
        <link rel="stylesheet" href="<%= request.getContextPath()%>/main_users/css/style_user.css">
    </head>
    <body class="min-h-screen flex flex-col">

        <!-- HEADER & NAVIGATION -->
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
                        <a href="#" class="main-nav-link nav-underline-effect text-gray-600 hover:text-primary transition duration-150 active pb-1" 
                           data-format="all" onclick="filterByFormat('all', this); return false;">Trang Chủ</a>

                        <!-- 2. Sách Điện Tử (Lọc trực tiếp) -->
                        <a href="#" class="main-nav-link nav-underline-effect text-gray-600 hover:text-primary transition duration-150 pb-1" 
                           data-format="ebook" onclick="filterByFormat('ebook', this); return false;">Sách Điện Tử</a>

                        <!-- 3. Sách Nói (Lọc trực tiếp) -->
                        <a href="#" class="main-nav-link nav-underline-effect text-gray-600 hover:text-primary transition duration-150 pb-1" 
                           data-format="audio" onclick="filterByFormat('audio', this); return false;">Sách Nói</a>

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

                    <!-- Action Buttons -->
                    <div class="flex items-center space-x-4">
                        <!-- Icon Tìm kiếm chỉ hiển thị trên di động -->
                        <button id="search-toggle-btn-mobile" class="text-gray-600 hover:text-primary p-2 rounded-full transition duration-150 md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </button>

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
                                            <p class="text-sm text-green-600 font-semibold">Số dư: <%= String.format("%,d", ((model.User)userObj).getTien()) %>đ</p>
                                        </div>
                                    </div>
                                    <div class="p-2">
                                        <a href="<%= request.getContextPath() %>/trang-chu?action=infoUser" class="flex items-center w-full px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 hover:text-primary transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                            Thông tin cá nhân
                                        </a>
                                        <a href="<%= request.getContextPath()%>/trang-chu?action=logout" class="flex items-center w-full px-4 py-3 text-sm text-red-600 rounded-lg hover:bg-red-50 transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                                            Đăng xuất
                                        </a>
                                    </div>
                                </div>
                            </div>
                        <%
                            }
                        %>

                    </div>
                </div>
            </div>
        </header>

        <!-- MOBILE MENU (Sliding Sidebar) -->
        <div id="mobile-menu" class="fixed inset-y-0 left-0 w-64 bg-dark-bg z-30 shadow-xl p-6 md:hidden">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-2xl font-bold text-white">Menu</h2>
                <button onclick="toggleMenu()" class="text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
            <nav class="space-y-4 text-white font-medium">
                <a href="#" class="mobile-nav-link block p-3 rounded-lg hover:bg-gray-700 transition flex items-center active" onclick="filterByFormat('all'); toggleMenu(); return false;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="m3 9 9 5 9-5-9-5-9 5"/><path d="M22 13v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6"/><path d="M5 13.5v5"/><path d="M19 13.5v5"/></svg>Trang Chủ</a>
                <a href="#" class="mobile-nav-link block p-3 rounded-lg hover:bg-gray-700 transition flex items-center" onclick="filterByFormat('ebook'); toggleMenu(); return false;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M4 19.5V15A2.5 2.5 0 0 1 6.5 12.5V5A2.5 2.5 0 0 1 9 2.5h6A2.5 2.5 0 0 1 17.5 5v7.5A2.5 2.5 0 0 1 20 15v4.5"/><path d="M4 19.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V19H4v.5z"/></svg>Sách Điện Tử</a>
                <a href="#" class="mobile-nav-link block p-3 rounded-lg hover:bg-gray-700 transition flex items-center" onclick="filterByFormat('audio'); toggleMenu(); return false;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M12 2a9 9 0 0 0-9 9v1a10 10 0 0 1 10 10"/><path d="M16 16h-3a4 4 0 0 0-4 4v2"/><circle cx="17" cy="11" r="5"/></svg>Sách Nói</a>
                <a href="#category-list-section" class="mobile-nav-link block p-3 rounded-lg hover:bg-gray-700 transition flex items-center" onclick="scrollToElement('category-list-section'); toggleMenu(); return false;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>Danh Mục</a>
                <a href="#" class="mobile-nav-link block p-3 rounded-lg hover:bg-gray-700 transition flex items-center" onclick="toggleMenu(); return false;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-3"><path d="M15 12H9"/><path d="M12 9v6"/></svg>Xem Thêm</a>
                <hr class="border-gray-700">
                <p id="user-id-display" class="text-xs text-gray-400 p-3 break-all">ID: Đang tải...</p>
                <a href="#" class="block p-3 rounded-lg bg-primary hover-primary text-center font-bold">Đăng Nhập</a>
            </nav>
        </div>
        <!-- Overlay for Mobile Menu -->
        <div id="mobile-menu-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-20 hidden" onclick="toggleMenu()"></div>

        <!-- MAIN CONTENT -->
        <main class="flex-grow w-full">

            <!-- HERO CAROUSEL / SLIDER -->
            <%@include file="../main_users/layout/carousel_slide.jsp" %>

            <!-- Search bar Mobile - Hiển thị khi nhấn icon search trên header -->
            <section id="mobile-search-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:hidden hidden">
                <div class="relative shadow-lg rounded-xl">
                    <input type="text" id="mobile-search-input" onkeyup="liveSearch(this.value)"
                           class="w-full py-3 pl-12 pr-4 text-base border-2 border-primary rounded-xl focus:ring-4 focus:ring-primary/50 focus:border-primary transition duration-200"
                           placeholder="Tìm kiếm sách...">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                </div>
            </section>

            <!-- BOOK CATEGORIES / DANH MỤC SÁCH -->
            <section id="category-list-section" class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <h2 class="text-2xl font-bold mb-6 text-gray-800 flex justify-between items-center">
                    Danh Mục Nổi Bật
                    <a href="#" onclick="filterBooks('all', 'category'); return false;" class="text-sm font-medium text-primary hover:text-green-600 transition cursor-pointer">Xem Tất Cả &rarr;</a>
                </h2>
                <div id="category-list" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <!-- Thêm sự kiện onclick và data-category cho các thẻ danh mục -->
                    <div class="category-item bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300 text-center border-t-4 border-red-500 cursor-pointer" 
                         data-category="Kinh Doanh" onclick="filterBooks('Kinh Doanh', 'category', this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2"><path d="M7 10h12"/><path d="M12 2v20"/><path d="m3 5 4 4-4 4"/></svg>
                        <p class="font-semibold text-sm">Kinh Doanh</p>
                    </div>
                    <div class="category-item bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300 text-center border-t-4 border-blue-500 cursor-pointer" 
                         data-category="Văn Học" onclick="filterBooks('Văn Học', 'category', this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M10 15h4"/><path d="M10 19h4"/><path d="M10 11h4"/></svg>
                        <p class="font-semibold text-sm">Văn Học</p>
                    </div>
                    <div class="category-item bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300 text-center border-t-4 border-yellow-500 cursor-pointer" 
                         data-category="Sách Nói" onclick="filterBooks('Sách Nói', 'category', this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2"><path d="M12 2a9 9 0 0 0-9 9v1a10 10 0 0 1 10 10"/><path d="M16 16h-3a4 4 0 0 0-4 4v2"/><circle cx="17" cy="11" r="5"/></svg>
                        <p class="font-semibold text-sm">Sách Nói</p>
                    </div>
                    <div class="category-item bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300 text-center border-t-4 border-green-500 cursor-pointer" 
                         data-category="Kỹ Năng" onclick="filterBooks('Kỹ Năng', 'category', this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2"><path d="M15 22v-4a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v4"/><path d="M7 10a5 5 0 0 1 10 0v1h2v3a1 1 0 0 0 1 1h2"/><path d="M10 10a5 5 0 0 0 10 0v1h-2v3a1 1 0 0 0-1 1h-7v-5h-2v-3z"/><circle cx="12" cy="7" r="4"/></svg>
                        <p class="font-semibold text-sm">Kỹ Năng</p>
                    </div>
                    <div class="category-item bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300 text-center border-t-4 border-purple-500 hidden lg:block cursor-pointer" 
                         data-category="Khoa Học" onclick="filterBooks('Khoa Học', 'category', this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-6"/></svg>
                        <p class="font-semibold text-sm">Khoa Học</p>
                    </div>
                    <div class="category-item bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300 text-center border-t-4 border-pink-500 hidden lg:block cursor-pointer" 
                         data-category="Tình Cảm" onclick="filterBooks('Tình Cảm', 'category', this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ec4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        <p class="font-semibold text-sm">Tình Cảm</p>
                    </div>
                </div>
            </section>

            <!-- BOOK LIST SECTION: KẾT QUẢ LỌC / SÁCH MỚI NHẤT -->
            <section id="filtered-section" class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h2 class="text-2xl font-bold mb-6 text-gray-800 flex justify-between items-center">
                    <span id="filtered-title">Sách Mới Nhất</span>
                    <a href="#" onclick="filterBooks('all', 'category'); return false;" class="text-sm font-medium text-primary hover:text-green-600 transition">Xem Tất Cả &rarr;</a>
                </h2>
                <div id="filtered-books-list" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    <!-- Book Cards sẽ được chèn vào đây bởi JavaScript -->
                </div>
            </section>

        </main>

        <!-- FOOTER -->
        <%@include file="../main_users/layout/footer.jsp" %>

        <!-- BOOK DETAIL MODAL -->
        <div id="book-detail-modal" class="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 hidden modal-fade-leave-to" onclick="hideBookDetailModal()">
            <div id="modal-content" class="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden transform transition-all scale-95" onclick="event.stopPropagation()">
                <!-- Modal Header -->
                <div class="p-4 border-b flex justify-between items-center">
                    <h3 class="text-xl font-bold text-gray-800">Chi Tiết Sách</h3>
                    <button onclick="hideBookDetailModal()" class="text-gray-500 hover:text-red-500 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </div>
                <!-- Modal Body -->
                <div class="p-6 md:flex md:space-x-6">
                    <!-- Book Cover (Left) -->
                    <div id="modal-cover" class="aspect-[3/4] w-32 md:w-40 flex-shrink-0 rounded-lg shadow-xl mb-4 md:mb-0 bg-gray-200 flex items-center justify-center">
                        <!-- Dynamic content here -->
                    </div>
                    <!-- Book Info (Right) -->
                    <div class="flex-grow">
                        <h4 id="modal-title" class="text-3xl font-extrabold text-primary mb-1">Tên Sách</h4>
                        <p id="modal-author" class="text-lg text-gray-600 mb-3">Tác giả</p>
                        <div class="flex items-center space-x-4 mb-4">
                            <span id="modal-price" class="text-2xl font-bold text-red-600">Giá</span>
                            <span id="modal-category" class="text-sm font-medium bg-gray-200 text-gray-700 px-3 py-1 rounded-full">Thể loại</span>
                        </div>
                        <p id="modal-description" class="text-gray-700 leading-relaxed max-h-40 overflow-y-auto">Mô tả chi tiết sách sẽ được hiển thị ở đây. Đây là nơi bạn thuyết phục người dùng đọc/nghe cuốn sách này.</p>
                        <!-- Action Buttons -->
                        <div class="mt-6 flex space-x-3">
                            <button id="modal-read-btn" class="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-lg hover-primary transition flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M4 19.5V15A2.5 2.5 0 0 1 6.5 12.5V5A2.5 2.5 0 0 1 9 2.5h6A2.5 2.5 0 0 1 17.5 5v7.5A2.5 2.5 0 0 1 20 15v4.5"/><path d="M4 19.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V19H4v.5z"/></svg>
                                Đọc Ngay
                            </button>
                            <button id="modal-audio-btn" class="flex-1 bg-accent-color text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                                Nghe Sách
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Liên kết đến tệp JavaScript -->
        <script src="<%= request.getContextPath()%>/main_users/js/js_user.js"></script>
    </body>
</html>

