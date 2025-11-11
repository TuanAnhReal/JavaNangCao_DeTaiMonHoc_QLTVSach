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
        <%@include file="layout/header.jsp" %>

        <!-- MAIN CONTENT -->
        <main class="flex-grow w-full">

            <!-- HERO CAROUSEL / SLIDER -->
            <section class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <!-- Search bar (Desktop/Tablet) -->
                <div class="relative mb-8 shadow-xl rounded-xl hidden md:block">
                    <input type="text" id="desktop-search-input" onkeyup="liveSearch(this.value)"
                           class="w-full py-4 pl-12 pr-4 text-lg border-2 border-primary rounded-xl focus:ring-4 focus:ring-primary/50 focus:border-primary transition duration-200"
                           placeholder="Tìm kiếm sách, tác giả, thể loại...">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                </div>
                <%--<%@include file="../main_users/layout/carousel_slide.jsp" %>--%>
            </section>

            <!-- BOOK LIST SECTION: KẾT QUẢ LỌC / SÁCH MỚI NHẤT -->
            <section id="filtered-section" class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h2 class="text-2xl font-bold mb-6 text-gray-800 flex justify-between items-center">
                    <span id="filtered-title">Sách Mới Nhất</span>
                    <a href="#" onclick="filterBooks('all', 'category'); return false;" class="text-sm font-medium text-primary hover:text-green-600 transition">Xem Tất Cả &rarr;</a>
                </h2>
                <div id="filtered-books-list" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6" name="show-modal-book">
                    <!-- Book Cards sẽ được chèn vào đây bởi JavaScript -->
                </div>
            </section>

        </main>

        <!-- FOOTER -->
        <%@include file="layout/footer.jsp" %>

        <script>
            const SERVER_BOOKS_JSON = '${bookListJson}';
            const APP_CONTEXT_PATH = '${pageContext.request.contextPath}';
        </script>
<!--        <script>
            document.getElementsByName("show-modal-book").addEventListener("click", function(){
                fetch()
            } )
        </script>-->
        <!-- Liên kết đến tệp JavaScript -->
        <script src="<%= request.getContextPath()%>/main_users/js/js_user.js"></script>
    </body>
</html>

