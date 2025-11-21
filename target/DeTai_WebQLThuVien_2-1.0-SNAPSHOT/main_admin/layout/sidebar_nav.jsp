<%-- 
    Document   : sidebar_nav
    Created on : Nov 17, 2025, 4:20:01?PM
    Author     : PC
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<aside class="sidebar-custom text-white d-flex flex-column shadow-lg">
    <div class="p-4">
        <h1 class="fs-3 fw-bolder text-light-blue d-flex align-items-center">
            <i data-lucide="book-open-text" class="me-2" style="width: 28px; height: 28px;"></i>
            ADMIN
        </h1>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-grow-1 p-3 space-y-2">
        <!-- 1. Dashboard -->
        <a href="#" onclick="showSection('dashboard', this)" id="nav-dashboard"
           class="sidebar-link-item active d-flex align-items-center p-3 rounded">
            <i data-lucide="layout-dashboard" class="me-3" style="width: 20px; height: 20px;"></i>
            <span>Dashboard</span>
        </a>
        <!-- 2. Quản lý sách -->
        <a href="#" onclick="showSection('book-management', this)" id="nav-books"
           class="sidebar-link-item d-flex align-items-center p-3 rounded">
            <i data-lucide="book-open-text" class="me-3" style="width: 20px; height: 20px;"></i>
            <span>Quản Lý Sách</span>
        </a>
        <!-- 3. Thể loại -->
        <a href="#" onclick="showSection('category-management', this)" id="nav-categories"
           class="sidebar-link-item d-flex align-items-center p-3 rounded">
            <i data-lucide="grid" class="me-3" style="width: 20px; height: 20px;"></i>
            <span>Thể loại</span>
        </a>
        <!-- 4. Tác giả / NXB (Thêm chức năng CRUD) -->
        <a href="#" onclick="showSection('author-publisher-management', this)" id="nav-authors"
           class="sidebar-link-item d-flex align-items-center p-3 rounded">
            <i data-lucide="feather" class="me-3" style="width: 20px; height: 20px;"></i>
            <span>Tác giả / NXB</span>
        </a>

        <hr class="border-secondary my-2">

        <!-- 5. Người dùng -->
        <a href="#" onclick="showSection('user-management', this)" id="nav-users"
           class="sidebar-link-item d-flex align-items-center p-3 rounded">
            <i data-lucide="users-2" class="me-3" style="width: 20px; height: 20px;"></i>
            <span>Người dùng</span>
        </a>
        <!-- 6. Bình luận -->
        <a href="#" onclick="showSection('comment-management', this)" id="nav-comments"
           class="sidebar-link-item d-flex align-items-center p-3 rounded">
            <i data-lucide="message-square" class="me-3" style="width: 20px; height: 20px;"></i>
            <span>Bình luận</span>
        </a>
        <!-- 7. Cài đặt -->
        <a href="#" onclick="showSection('settings', this)" id="nav-settings"
           class="sidebar-link-item d-flex align-items-center p-3 rounded">
            <i data-lucide="settings" class="me-3" style="width: 20px; height: 20px;"></i>
            <span>Cài đặt</span>
        </a>
    </nav>

    <!-- Admin Info -->
    <div class="p-4 border-top border-blue-700">
        <p class="small text-gray-300">ID người dùng hiện tại (MOCK):</p>
        <p id="auth-status" class="text-warning fw-bold mb-3 break-all">Đã bị ngắt kết nối.</p>
        <button onclick="showToast('Bạn đang ở chế độ Mock Data', 'bg-warning')" class="btn btn-danger w-100 fw-bold small">
            Đăng Xuất (MOCK)
        </button>
    </div>
</aside>