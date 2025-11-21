<%-- 
    Document   : toast
    Created on : Nov 17, 2025, 4:59:31?PM
    Author     : PC
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div id="toast-message" class="position-fixed bottom-0 end-0 p-3" style="z-index: 1100;">
    <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="me-auto text-dark">Thông báo</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body text-white">
            <!-- Message content here -->
        </div>
    </div>
</div>
