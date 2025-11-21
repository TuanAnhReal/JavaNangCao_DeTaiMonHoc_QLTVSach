<%-- 
    Document   : alert
    Created on : Oct 25, 2025, 4:20:35 PM
    Author     : PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    if (request.getAttribute("success") != null) {
%>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: '${success}',
        showConfirmButton: false,
        timer: 1500
    });
</script>    
<%
    }
    if (request.getAttribute("error") != null) {
%>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
        Swal.fire({
            position: "top-end",
            icon: "error", // Thay đổi icon
            title: '${error}', // Thay đổi biến lấy message
            showConfirmButton: false,
            timer: 2500 // Có thể cho thời gian hiển thị dài hơn cho lỗi
        });
</script>   
<%
// 3. Nếu không có cả hai, kiểm tra thông báo INFO
    }
%>
