<%-- 
    Document   : index_admin
    Created on : Nov 11, 2025, 1:12:19 PM
    Author     : PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@include file="layout/header.jsp" %>

        <!-- 1. SIDEBAR NAVIGATION -->
        <%@include file="layout/sidebar_nav.jsp" %>

        <!-- 2. MAIN CONTENT AREA -->
        <%@include file="layout/content.jsp" %>

        <!-- 3. GENERIC MODAL (Book/User/Author/Category CRUD) -->
        <%@include file="layout/generic_modal.jsp" %>


        <!-- 4. MODAL CONFIRMATION (Xác nhận xóa) -->
        <%@include file="layout/comfirrm.jsp" %>

        <!-- 5. TOAST NOTIFICATION -->
        <%@include file="layout/toast.jsp" %>
        
        <script>
            const SERVER_CATEGORIES_JSON = '${categoriesJson}'; 
            const SERVER_BOOKS_JSON = '${booksJson}';
        </script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        <script src="<%= request.getContextPath()%>/main_admin/js/js_admin.js"></script>
    </body>
</html>

