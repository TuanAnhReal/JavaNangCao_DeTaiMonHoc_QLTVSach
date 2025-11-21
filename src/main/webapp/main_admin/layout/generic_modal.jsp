<%-- 
    Document   : modal
    Created on : Nov 17, 2025, 4:21:38?PM
    Author     : PC
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="modal fade" id="itemModal" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header bg-light">
                <h5 class="modal-title fs-5 fw-bold" id="modal-title">Tiêu đề Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal Body: The Form (Cập nhật logic onsubmit) -->
            <form onsubmit="event.preventDefault();
                            const mode = document.getElementById('item-mode').value;
                            if (mode.includes('user')) {
                                saveUser();
                            } else if (mode.includes('author')) {
                                saveAuthorPublisher();
                            } else if (mode.includes('category')) {
                                saveCategory();
                            } else {
                                saveBook();
                            }" 
                  id="item-form">
                <div class="modal-body">
                    <input type="hidden" id="item-mode" value="add">
                    <input type="hidden" id="original-id" value="">

                    <div id="form-fields" class="row g-4">

                        <!-- Trường Tên chính / Email / Tác giả / Thể loại -->
                        <div class="col-12 col-md-8">
                            <label for="input-title" class="form-label small fw-bold" id="input-title-label">Tên <span class="text-danger">*</span></label>
                            <input type="text" id="input-title" placeholder="Nhập tên..."
                                   class="form-control p-3" required>
                        </div>
                        <div class="col-12 col-md-4">
                            <label for="item-id-display" class="form-label small fw-bold">Mã ID</label>
                            <input type="text" id="item-id-display" disabled
                                   class="form-control p-3 bg-light text-secondary cursor-not-allowed">
                        </div>

                        <!-- AUTHOR/PUBLISHER TYPE FIELD (Chỉ hiển thị cho Tác giả/NXB) -->
                        <div class="col-12" id="author-type-field" style="display: none;">
                            <label for="author-type" class="form-label small fw-bold">Loại Đơn Vị</label>
                            <select id="author-type" class="form-select p-3">
                                <option value="Author">Tác Giả</option>
                                <option value="Publisher">Nhà Xuất Bản (NXB)</option>
                            </select>
                        </div>

                        <!-- BOOK FIELDS (Tự động ẩn/hiện) -->
                        <div id="book-fields-row-2" class="row g-4 m-0 p-0">
                            <div class="col-md-4">
                                <label for="author" class="form-label small fw-bold">Tác Giả</label>
                                <input type="text" id="author" placeholder="Tác giả" class="form-control p-3">
                            </div>
                            <div class="col-md-4">
                                <label for="category" class="form-label small fw-bold">Thể Loại</label>
                                <select id="category" class="form-select p-3">
                                    <option value="">Chọn Thể loại</option>
                                    <option value="Kinh Doanh">Kinh Doanh</option>
                                    <option value="Văn Học">Văn Học</option>
                                    <option value="Kỹ Năng">Kỹ Năng</option>
                                    <option value="Khoa Học">Khoa Học</option>
                                    <option value="Tình Cảm">Tình Cảm</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label for="price" class="form-label small fw-bold">Giá Bán (VND)</label>
                                <input type="number" id="price" placeholder="Ví dụ: 75000" class="form-control p-3">
                            </div>
                        </div>

                        <div id="book-description-field" class="col-12">
                            <label for="description" class="form-label small fw-bold">Mô Tả Sách (Tóm tắt)</label>
                            <textarea id="description" rows="3" placeholder="Nhập mô tả chi tiết và tóm tắt cuốn sách..." class="form-control p-3"></textarea>
                        </div>

                        <!-- OPTIONS FIELD (Dùng chung cho isPremium, isAudio, Status) -->
                        <div class="col-12 row g-4 pt-4 border-top">
                            <div class="col-md-4">
                                <p class="small fw-bold mb-2" id="premium-check-title">Quyền Truy Cập / Gói TV</p>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="is-premium">
                                    <label class="form-check-label small text-secondary" for="is-premium" id="is-premium-label">
                                        Chỉ dành cho Hội viên VIP
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-4" id="is-audio-field">
                                <p class="small fw-bold mb-2">Định Dạng</p>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="is-audio">
                                    <label class="form-check-label small text-secondary" for="is-audio">
                                        Là Sách Nói (Audiobook)
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="status" class="form-label small fw-bold">Trạng Thái</label>
                                <select id="status" class="form-select p-3">
                                    <option value="Active">Active (Đang hiển thị)</option>
                                    <option value="Draft">Draft (Bản nháp)</option>
                                    <option value="Archived">Archived (Đã lưu trữ)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="modal-footer bg-light">
                    <button type="button" class="btn btn-secondary fw-bold" data-bs-dismiss="modal">
                        Hủy Bỏ
                    </button>
                    <button type="submit" id="save-btn" class="btn btn-medium-blue fw-bold d-flex align-items-center">
                        <i data-lucide="save" class="me-1" style="width: 18px; height: 18px;"></i>
                        <span>Lưu Thay Đổi</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>