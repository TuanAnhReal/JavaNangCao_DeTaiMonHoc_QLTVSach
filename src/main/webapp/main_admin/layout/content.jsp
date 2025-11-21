<%-- 
    Document   : content
    Created on : Nov 17, 2025, 4:20:58?PM
    Author     : PC
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<main class="flex-grow-1 p-4 main-content">

    <header class="mb-4">
        <h2 id="main-title" class="fs-3 fw-bold text-dark">Dashboard Tổng Quan</h2>
        <p id="main-subtitle" class="text-secondary">Thống kê hoạt động và báo cáo nhanh.</p>
    </header>

    <!-- DASHBOARD SECTION (Mặc định hiển thị, đã gộp Thống kê) -->
    <section id="dashboard" class="content-section">
        <div class="row g-4 mb-4">
            <!-- Stat Card 1 -->
            <div class="col-md-3">
                <div class="card p-3 shadow-sm border-start border-4 border-medium-blue h-100">
                    <p class="small text-muted mb-1">Tổng Số Sách</p>
                    <p id="total-books-stat" class="fs-2 fw-bold text-dark mb-0">...</p>
                    <p class="small text-success mt-1">Sách đang hoạt động</p>
                </div>
            </div>

            <!-- Stat Card 2 -->
            <div class="col-md-3">
                <div class="card p-3 shadow-sm border-start border-4 border-pink-500 h-100">
                    <p class="small text-muted mb-1">Sách Nói (Audio)</p>
                    <p id="audio-books-stat" class="fs-2 fw-bold text-dark mb-0">...</p>
                    <p class="small text-muted mt-1">Tổng số sách nói</p>
                </div>
            </div>

            <!-- Stat Card 3 -->
            <div class="col-md-3">
                <div class="card p-3 shadow-sm border-start border-4 border-warning h-100">
                    <p class="small text-muted mb-1">Người Dùng</p>
                    <p id="total-users-stat" class="fs-2 fw-bold text-dark mb-0">...</p>
                    <p class="small text-success mt-1">Tổng số tài khoản</p>
                </div>
            </div>

            <!-- Stat Card 4 -->
            <div class="col-md-3">
                <div class="card p-3 shadow-sm border-start border-4 border-success h-100">
                    <p class="small text-muted mb-1">Doanh Thu (Mô phỏng)</p>
                    <p class="fs-2 fw-bold text-dark mb-0">45.000.000₫</p>
                    <p class="small text-danger mt-1">-5% so với tháng trước</p>
                </div>
            </div>
        </div>

        <!-- Quick Actions -->
        <div class="card p-4 shadow-sm mb-4">
            <h3 class="fs-5 fw-bold text-dark border-bottom pb-2 mb-3">Hành Động Nhanh</h3>
            <button onclick="showBookModal('add')"
                    class="btn btn-medium-blue fw-bold py-2 px-4 shadow d-inline-flex align-items-center" style="width: auto;">
                <i data-lucide="plus" class="me-2" style="width: 20px; height: 20px;"></i>
                <span>Thêm Sách Mới</span>
            </button>
        </div>

        <!-- REPORTS / STATISTICS SECTION (ĐÃ GỘP) -->
        <div class="card p-4 shadow-sm border-top border-4 border-medium-blue">
            <h4 class="fs-5 fw-bold mb-3">Báo Cáo & Phân Tích Tổng Hợp (Mô Phỏng)</h4>
            <div class="row g-4">
                <!-- Biểu đồ cột -->
                <div class="col-md-6">
                    <div class="p-3 bg-light rounded shadow-sm h-100">
                        <p class="fs-6 fw-bold">Thống kê Sách theo Thể loại</p>
                        <canvas id="categoryBarChart" style="max-height: 300px;"></canvas>
                    </div>
                </div>
                <!-- Biểu đồ tròn -->
                <div class="col-md-6">
                    <div class="p-3 bg-light rounded shadow-sm h-100">
                        <p class="fs-6 fw-bold">Tỉ lệ Người Dùng (Premium/Free)</p>
                        <canvas id="userDoughnutChart" style="max-height: 300px;"></canvas>
                    </div>
                </div>

                <!-- Báo cáo chi tiết -->
                <div class="col-md-12">
                    <div class="card p-4 shadow-sm">
                        <h5 class="fw-bold mb-3">Báo Cáo Chi Tiết</h5>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <div class="p-3 bg-white rounded border">
                                    <p class="fs-6 fw-bold">Thống kê Sách</p>
                                    <ul class="list-unstyled small mt-2 space-y-1">
                                        <li>- Tổng số sách Active: <span id="report-active-books" class="fw-bold"></span></li>
                                        <li>- Tỷ lệ Sách Nói: <span id="report-audio-ratio" class="fw-bold"></span></li>
                                        <li>- Danh mục phổ biến nhất: **Kinh Doanh**</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="p-3 bg-white rounded border">
                                    <p class="fs-6 fw-bold">Thống kê Người Dùng</p>
                                    <ul class="list-unstyled small mt-2 space-y-1">
                                        <li>- Tổng người dùng: <span id="report-total-users" class="fw-bold"></span></li>
                                        <li>- Tài khoản Premium: <span id="report-premium-users" class="fw-bold"></span></li>
                                        <li>- Người dùng mới (Tháng này): **+50**</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <!-- BOOK MANAGEMENT SECTION (MOCK CRUD) -->
    <section id="book-management" class="content-section d-none">
        <!-- Tool Bar: Search, Filter, Add New -->
        <div class="card p-4 shadow-sm mb-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">

            <!-- Search Bar -->
            <div class="position-relative w-100 w-md-33 mb-3 mb-md-0">
                <input type="text" id="book-search-input" onkeyup="filterTable(this.value, 'book')"
                       placeholder="Tìm kiếm theo tên sách, tác giả..." 
                       class="form-control ps-5 py-2">
                <i data-lucide="search" class="text-secondary position-absolute top-50 start-0 translate-middle-y ms-3" style="width: 20px; height: 20px;"></i>
            </div>

            <!-- Action/Filter -->
            <button onclick="showBookModal('add')" 
                    class="btn btn-medium-blue fw-bold py-2 px-4 shadow d-flex align-items-center justify-content-center w-100 w-md-auto">
                <i data-lucide="plus" class="me-2" style="width: 20px; height: 20px;"></i>
                <span>Thêm Sách Mới</span>
            </button>
        </div>

        <!-- Book List Table -->
        <div class="card p-4 shadow-sm overflow-auto">
            <table class="table table-hover table-striped">
                <thead class="table-light">
                    <tr>
                        <th class="px-3 py-3 small text-muted text-uppercase">Mã Sách</th>
                        <th class="px-3 py-3 small text-muted text-uppercase">Tên Sách</th>
                        <th class="px-3 py-3 small text-muted text-uppercase">Tác Giả</th>
                        <th class="px-3 py-3 small text-muted text-uppercase">Thể Loại</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Định Dạng</th>
                        <th class="px-3 py-3 small text-muted text-uppercase">Giá Bán</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Trạng Thái</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Thao Tác</th>
                    </tr>
                </thead>
                <tbody id="books-table-body" class="small">
                    <tr><td colspan="8" class="text-center p-3 text-secondary">Đang tải dữ liệu sách...</td></tr>
                </tbody>
            </table>
            <div id="no-books-results-message" class="text-center p-4 text-secondary d-none">
                Không tìm thấy kết quả nào.
            </div>
        </div>

        <!-- Pagination Controls -->
        <div id="books-pagination-controls" class="d-flex justify-content-center mt-3">
            <nav aria-label="Book Pagination">
                <ul class="pagination" id="books-pagination">
                    <!-- Nút phân trang sẽ được chèn ở đây bằng JavaScript -->
                </ul>
            </nav>
        </div>
    </section>

    <!-- CATEGORY MANAGEMENT SECTION (THÊM CRUD VÀ THANH TÁC VỤ) -->
    <section id="category-management" class="content-section d-none">
        <h3 class="fs-3 fw-bold text-dark mb-4">Quản Lý Thể Loại</h3>
        <!-- Tool Bar: Search, Filter, Add New -->
        <div class="card p-4 shadow-sm mb-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <!-- Search Bar -->
            <div class="position-relative w-100 w-md-33 mb-3 mb-md-0">
                <input type="text" id="category-search-input" onkeyup="filterTable(this.value, 'category')"
                       placeholder="Tìm kiếm theo tên Thể loại..." 
                       class="form-control ps-5 py-2">
                <i data-lucide="search" class="text-secondary position-absolute top-50 start-0 translate-middle-y ms-3" style="width: 20px; height: 20px;"></i>
            </div>
            <!-- Action/Filter -->
            <button onclick="showCategoryModal('add')" 
                    class="btn btn-medium-blue fw-bold py-2 px-4 shadow d-flex align-items-center justify-content-center w-100 w-md-auto">
                <i data-lucide="plus" class="me-2" style="width: 20px; height: 20px;"></i>
                <span>Thêm Thể Loại Mới</span>
            </button>
        </div>

        <div class="card p-4 shadow-sm overflow-auto">
            <table class="table table-hover table-striped">
                <thead class="table-light">
                    <tr>
                        <th class="px-3 py-3 small text-muted text-uppercase">ID</th>
                        <th class="px-3 py-3 small text-muted text-uppercase">Tên Thể Loại</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Số lượng Sách</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Trạng Thái</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Thao Tác</th>
                    </tr>
                </thead>
                <tbody id="categories-table-body" class="small">
                    <tr><td colspan="5" class="text-center p-3 text-secondary">Đang tải dữ liệu thể loại...</td></tr>
                </tbody>
            </table>
            <div id="no-categories-results-message" class="text-center p-4 text-secondary d-none">
                Không tìm thấy kết quả nào.
            </div>
        </div>
        <!-- Pagination Controls -->
        <div id="categories-pagination-controls" class="d-flex justify-content-center mt-3">
            <nav aria-label="Category Pagination">
                <ul class="pagination" id="categories-pagination"></ul>
            </nav>
        </div>
    </section>

    <!-- AUTHOR / PUBLISHER MANAGEMENT SECTION (THÊM CRUD VÀ THANH TÁC VỤ) -->
    <section id="author-publisher-management" class="content-section d-none">
        <h3 class="fs-3 fw-bold text-dark mb-4">Quản Lý Tác Giả & NXB</h3>
        <!-- Tool Bar: Search, Filter, Add New -->
        <div class="card p-4 shadow-sm mb-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <!-- Search Bar -->
            <div class="position-relative w-100 w-md-33 mb-3 mb-md-0">
                <input type="text" id="author-search-input" onkeyup="filterTable(this.value, 'author')"
                       placeholder="Tìm kiếm theo tên Tác giả/NXB..." 
                       class="form-control ps-5 py-2">
                <i data-lucide="search" class="text-secondary position-absolute top-50 start-0 translate-middle-y ms-3" style="width: 20px; height: 20px;"></i>
            </div>
            <!-- Action/Filter -->
            <button onclick="showAuthorPublisherModal('add')" 
                    class="btn btn-medium-blue fw-bold py-2 px-4 shadow d-flex align-items-center justify-content-center w-100 w-md-auto">
                <i data-lucide="plus" class="me-2" style="width: 20px; height: 20px;"></i>
                <span>Thêm Tác giả / NXB</span>
            </button>
        </div>

        <div class="card p-4 shadow-sm overflow-auto">
            <table class="table table-hover table-striped">
                <thead class="table-light">
                    <tr>
                        <th class="px-3 py-3 small text-muted text-uppercase">ID</th>
                        <th class="px-3 py-3 small text-muted text-uppercase">Loại</th> <!-- THÊM CỘT LOẠI -->
                        <th class="px-3 py-3 small text-muted text-uppercase">Tên</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Số lượng Sách</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Trạng Thái</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Thao Tác</th>
                    </tr>
                </thead>
                <tbody id="authors-table-body" class="small">
                    <tr><td colspan="6" class="text-center p-3 text-secondary">Đang tải dữ liệu tác giả/NXB...</td></tr>
                </tbody>
            </table>
            <div id="no-authors-results-message" class="text-center p-4 text-secondary d-none">
                Không tìm thấy kết quả nào.
            </div>
        </div>
        <!-- Pagination Controls -->
        <div id="authors-pagination-controls" class="d-flex justify-content-center mt-3">
            <nav aria-label="Author Pagination">
                <ul class="pagination" id="authors-pagination"></ul>
            </nav>
        </div>
    </section>

    <!-- USER MANAGEMENT SECTION (MOCK CRUD) -->
    <section id="user-management" class="content-section d-none">
        <h3 class="fs-3 fw-bold text-dark mb-4">Quản Lý Người Dùng</h3>
        <div class="card p-4 shadow-sm mb-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <div class="position-relative w-100 w-md-33 mb-3 mb-md-0">
                <input type="text" id="user-search-input" onkeyup="filterTable(this.value, 'user')"
                       placeholder="Tìm kiếm theo email, ID..." 
                       class="form-control ps-5 py-2">
                <i data-lucide="search" class="text-secondary position-absolute top-50 start-0 translate-middle-y ms-3" style="width: 20px; height: 20px;"></i>
            </div>
            <button onclick="showUserModal('add')" 
                    class="btn btn-medium-blue fw-bold py-2 px-4 shadow d-flex align-items-center justify-content-center w-100 w-md-auto">
                <i data-lucide="plus" class="me-2" style="width: 20px; height: 20px;"></i>
                <span>Thêm Người Dùng</span>
            </button>
        </div>

        <div class="card p-4 shadow-sm overflow-auto">
            <table class="table table-hover table-striped">
                <thead class="table-light">
                    <tr>
                        <th class="px-3 py-3 small text-muted text-uppercase">ID</th>
                        <th class="px-3 py-3 small text-muted text-uppercase">Email</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Trạng Thái</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Gói TV</th>
                        <th class="px-3 py-3 small text-muted text-uppercase">Ngày ĐK</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Thao Tác</th>
                    </tr>
                </thead>
                <tbody id="users-table-body" class="small">
                    <tr><td colspan="6" class="text-center p-3 text-secondary">Đang tải dữ liệu người dùng...</td></tr>
                </tbody>
            </table>
            <div id="no-user-results-message" class="text-center p-4 text-secondary d-none">
                Không tìm thấy kết quả nào.
            </div>
        </div>
        <!-- Pagination Controls -->
        <div id="users-pagination-controls" class="d-flex justify-content-center mt-3">
            <nav aria-label="User Pagination">
                <ul class="pagination" id="users-pagination"></ul>
            </nav>
        </div>
    </section>

    <!-- COMMENT MANAGEMENT SECTION (Placeholder Mới) -->
    <section id="comment-management" class="content-section d-none">
        <h3 class="fs-3 fw-bold text-dark mb-4">Quản Lý Bình Luận</h3>
        <div class="card p-4 shadow-sm overflow-auto">
            <table class="table table-hover table-striped">
                <thead class="table-light">
                    <tr>
                        <th class="px-3 py-3 small text-muted text-uppercase">ID</th>
                        <th class="px-3 py-3 small text-muted text-uppercase">Sách</th>
                        <th class="px-3 py-3 small text-muted text-uppercase">Người Dùng</th>
                        <th class="px-3 py-3 small text-muted text-uppercase">Nội dung</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Trạng Thái</th>
                        <th class="px-3 py-3 small text-muted text-uppercase text-center">Thao Tác</th>
                    </tr>
                </thead>
                <tbody id="comments-table-body" class="small">
                    <tr><td colspan="6" class="text-center p-3 text-secondary">Đang tải dữ liệu bình luận...</td></tr>
                </tbody>
            </table>
            <div id="no-comments-results-message" class="text-center p-4 text-secondary d-none">
                Không tìm thấy kết quả nào.
            </div>
        </div>
        <!-- Pagination Controls -->
        <div id="comments-pagination-controls" class="d-flex justify-content-center mt-3">
            <nav aria-label="Comment Pagination">
                <ul class="pagination" id="comments-pagination"></ul>
            </nav>
        </div>
    </section>


    <!-- SETTINGS SECTION (TÁI CẤU TRÚC VỚI COLLAPSE) -->
    <section id="settings" class="content-section d-none">
        <h3 class="fs-3 fw-bold text-dark mb-4">Cài đặt Hệ Thống</h3>

        <div class="accordion" id="settingsAccordion">

            <!-- 1. Cài Đặt Chung -->
            <div class="card shadow-sm mb-3">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button fs-5 fw-bold bg-medium-blue text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <i data-lucide="globe" class="me-2" style="width: 20px; height: 20px;"></i> Cấu Hình Chung
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#settingsAccordion">
                    <div class="accordion-body bg-light">
                        <form onsubmit="event.preventDefault(); saveSettings()" class="space-y-4" style="max-width: 600px;">
                            <div class="mb-3">
                                <label for="setting-site-name" class="form-label small fw-bold">Tên Website</label>
                                <input type="text" id="setting-site-name" class="form-control p-3">
                            </div>
                            <div class="mb-3">
                                <label for="setting-tax-rate" class="form-label small fw-bold">Thuế Mặc Định (%)</label>
                                <input type="number" id="setting-tax-rate" class="form-control p-3">
                            </div>
                            <div class="mb-3">
                                <label for="setting-max-upload" class="form-label small fw-bold">Kích thước tải lên tối đa (MB)</label>
                                <input type="number" id="setting-max-upload" class="form-control p-3">
                            </div>
                            <button type="submit" class="btn btn-medium-blue fw-bold">
                                <i data-lucide="check" class="me-1" style="width: 18px; height: 18px;"></i> Lưu Cấu Hình
                            </button>
                            <p id="settings-save-message" class="small text-success mt-2 d-none">Đã lưu thành công!</p>
                        </form>
                    </div>
                </div>
            </div>

            <!-- 2. Cài Đặt Bảo Mật -->
            <div class="card shadow-sm mb-3">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed fs-5 fw-bold bg-light-blue text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <i data-lucide="shield" class="me-2" style="width: 20px; height: 20px;"></i> Cài Đặt Bảo Mật
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#settingsAccordion">
                    <div class="accordion-body bg-light">
                        <h5 class="fw-bold mb-3">Tùy chọn đăng nhập</h5>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="setting-two-factor" checked>
                            <label class="form-check-label" for="setting-two-factor">Bật Xác thực hai yếu tố (2FA)</label>
                        </div>
                        <div class="form-check form-switch mb-4">
                            <input class="form-check-input" type="checkbox" id="setting-anonymous-access">
                            <label class="form-check-label" for="setting-anonymous-access">Cho phép truy cập ẩn danh</label>
                        </div>
                        <button onclick="showToast('Đã lưu Cài đặt Bảo mật (Mock)', 'bg-info')" class="btn btn-sm btn-outline-dark fw-bold">
                            Lưu Bảo Mật
                        </button>
                    </div>
                </div>
            </div>

            <!-- 3. Cài Đặt Quản Trị Viên -->
            <div class="card shadow-sm">
                <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button collapsed fs-5 fw-bold bg-dark-blue text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <i data-lucide="user-cog" class="me-2" style="width: 20px; height: 20px;"></i> Cài Đặt Quản Trị Viên
                    </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#settingsAccordion">
                    <div class="accordion-body bg-light">
                        <h5 class="fw-bold mb-3">Quản lý phiên làm việc</h5>
                        <p class="small text-secondary">Thời gian hết hạn phiên làm việc (phút):</p>
                        <input type="number" value="60" class="form-control mb-3" style="max-width: 150px;">
                        <button onclick="showToast('Đã lưu Cài đặt Quản trị (Mock)', 'bg-info')" class="btn btn-sm btn-outline-dark fw-bold">
                            Lưu Quản Trị
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </section>


</main>
