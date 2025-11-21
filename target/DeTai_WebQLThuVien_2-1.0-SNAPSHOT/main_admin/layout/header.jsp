<%-- 
    Document   : header
    Created on : Nov 17, 2025, 4:07:57?PM
    Author     : PC
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sách Việt Admin Dashboard - Quản Lý Sách (Bootstrap Mock)</title>

        <!-- Tải Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
        <!-- Tải Bootstrap Icons -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <!-- Tải thư viện Lucide Icons (Giữ lại để sử dụng cho tiện) -->
        <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
        <!-- Tải Chart.js cho biểu đồ -->
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"></script>

        <link rel="stylesheet" href="<%= request.getContextPath()%>/main_admin/css/style_admin.css">
    </head>
    <body class="d-flex">