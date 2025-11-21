<%-- 
    Document   : comfirrm
    Created on : Nov 17, 2025, 4:22:54?PM
    Author     : PC
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-danger fw-bold" id="deleteModalLabel">Xác Nhận Xóa</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p class="text-dark">Bạn có chắc chắn muốn xóa mục có ID **<span id="delete-id" class="fw-bold"></span>** này không? Thao tác này **không thể hoàn tác**.</p>
                <p id="delete-warning-message" class="small text-danger d-none">Lưu ý: Thể loại/Tác giả này có thể đang được sử dụng bởi các mục khác.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary fw-bold" data-bs-dismiss="modal">
                    Hủy
                </button>
                <!-- Cập nhật executeDelete để nhận type từ input hidden -->
                <button type="button" onclick="executeDelete(document.getElementById('item-mode').value.replace('_delete', ''))" class="btn btn-danger fw-bold">
                    Xóa Vĩnh Viễn
                </button>
            </div>
        </div>
    </div>
</div>