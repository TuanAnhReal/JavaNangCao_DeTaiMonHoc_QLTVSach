/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
// Khởi tạo Icons Lucide
lucide.createIcons();
// --- MOCK DATA ---
let mockBooksData = [
    {id: 'B001', title: 'Nhà Giả Kim', author: 'Paulo Coelho', category: 'Văn Học', price: 95000, description: 'Tóm tắt Nhà Giả Kim.', format: 'ebook', isPremium: false, status: 'Active'},
    {id: 'B002', title: 'Tuần làm việc 4 giờ', author: 'Timothy Ferriss', category: 'Kỹ Năng', price: 120000, description: 'Tóm tắt Tuần làm việc 4 giờ.', format: 'ebook', isPremium: true, status: 'Active'},
    {id: 'B003', title: 'Tư Duy Nhanh và Chậm', author: 'Daniel Kahneman', category: 'Khoa Học', price: 0, description: 'Tóm tắt Tư Duy Nhanh và Chậm.', format: 'audiobook', isPremium: false, status: 'Draft'},
    {id: 'B004', title: 'Bí Mật của sự may mắn', author: 'Álex Rovira & Fernando Trías de Bes', category: 'Kinh Doanh', price: 100000, description: 'Tóm tắt Bí Mật của sự may mắn.', format: 'ebook', isPremium: true, status: 'Active'},
    {id: 'B005', title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', category: 'Kỹ Năng', price: 80000, description: 'Tóm tắt Đắc Nhân Tâm.', format: 'audiobook', isPremium: false, status: 'Active'},
    {id: 'B006', title: 'Văn chương và Nỗi buồn', author: 'Trần Văn X', category: 'Văn Học', price: 70000, description: 'Tóm tắt Văn chương và Nỗi buồn.', format: 'ebook', isPremium: false, status: 'Active'},
    {id: 'B007', title: 'Sách 7', author: 'Tác giả 7', category: 'Kỹ Năng', price: 70000, description: 'Mô tả.', format: 'ebook', isPremium: false, status: 'Active'},
    {id: 'B008', title: 'Sách 8', author: 'Tác giả 8', category: 'Kinh Doanh', price: 70000, description: 'Mô tả.', format: 'ebook', isPremium: false, status: 'Active'},
    {id: 'B009', title: 'Sách 9', author: 'Tác giả 9', category: 'Văn Học', price: 70000, description: 'Mô tả.', format: 'ebook', isPremium: false, status: 'Active'}
];
let mockUsersData = [
    {id: 'U001', email: 'nguyenvana@gmail.com', status: 'Active', plan: 'Premium', registered: '2023-10-01'},
    {id: 'U002', email: 'tranvanc@hotmail.com', status: 'Active', plan: 'Free', registered: '2024-01-15'},
    {id: 'U003', email: 'levanb@yahoo.com', status: 'Archived', plan: 'Free', registered: '2023-05-20'},
    {id: 'U004', email: 'phamthid@gmail.com', status: 'Active', plan: 'Premium', registered: '2024-02-01'},
    {id: 'U005', email: 'hoangminhe@hotmail.com', status: 'Active', plan: 'Premium', registered: '2024-03-10'},
    {id: 'U006', email: 'user6@test.com', status: 'Active', plan: 'Free', registered: '2024-04-10'},
    {id: 'U007', email: 'user7@test.com', status: 'Active', plan: 'Premium', registered: '2024-05-10'}
];
let mockCategoryData = [
    { id: 1, name: 'Kinh Doanh', count: 45, status: 'Active' },
    { id: 2, name: 'Văn Học', count: 62, status: 'Active' },
    { id: 3, name: 'Kỹ Năng Sống', count: 30, status: 'Active' },
    { id: 4, name: 'Khoa Học', count: 15, status: 'Active' },
    { id: 5, name: 'Tình Cảm', count: 35, status: 'Active' },
    { id: 6, name: 'Lịch Sử', count: 20, status: 'Active' },
    { id: 7, name: 'Thiếu Nhi', count: 10, status: 'Draft' },
];

// === BỔ SUNG: DỮ LIỆU THỰC TẾ (CATEGORIES) ===
let realCategoryData = []; // Biến mới để lưu dữ liệu thực
let currentFilteredCategories = mockCategoryData; // Vẫn giữ biến này để tương thích với code cũ

// Hàm tải dữ liệu thể loại thực tế
const loadRealCategoryData = () => {
    try {
        if (typeof SERVER_CATEGORIES_JSON !== 'undefined' && SERVER_CATEGORIES_JSON && SERVER_CATEGORIES_JSON.trim() !== "" && SERVER_CATEGORIES_JSON.trim() !== "[]") {
            const serverCategories = JSON.parse(SERVER_CATEGORIES_JSON);
            
            // ÁNH XẠ: Lấy idTheLoai -> id, TenTheLoai -> name, gán mặc định count và status
            realCategoryData = serverCategories.map(cat => ({
                id: cat.idTheLoai,     
                name: cat.tenTheLoai,  
                count: 0,              // Giá trị mặc định
                status: 'Active',      // Giá trị mặc định
            }));
            
        } else {
            console.warn("Không tìm thấy dữ liệu Thể loại từ server. Dùng Mock Data thay thế.");
            realCategoryData = [...mockCategoryData]; 
        }
    } catch (e) {
        console.error("Lỗi parse JSON Thể loại:", e, SERVER_CATEGORIES_JSON);
        realCategoryData = [...mockCategoryData]; 
    }
    currentFilteredCategories = realCategoryData;
};
// CẬP NHẬT MOCK DATA CHO TÁC GIẢ/NXB (Thêm trường 'type')
let mockAuthorData = [
    {id: 'A001', name: 'Paulo Coelho', books: 3, status: 'Active', type: 'Author'},
    {id: 'A002', name: 'Timothy Ferriss', books: 5, status: 'Active', type: 'Author'},
    {id: 'A003', name: 'Nguyễn Nhật Ánh', books: 12, status: 'Active', type: 'Author'},
    {id: 'P001', name: 'Nhà Xuất Bản Trẻ', books: 50, status: 'Active', type: 'Publisher'},
    {id: 'P002', name: 'Nhà Xuất Bản Kim Đồng', books: 80, status: 'Active', type: 'Publisher'},
];
let mockCommentData = [
    {id: 'CM01', user: 'U001', book: 'B001', content: 'Sách rất hay, nên đọc!', status: 'Active'},
    {id: 'CM02', user: 'U002', book: 'B003', content: 'Tư duy tuyệt vời.', status: 'Active'},
    {id: 'CM03', user: 'U004', book: 'B005', content: 'Phiên bản Audiobook chất lượng kém.', status: 'Draft'},
    {id: 'CM04', user: 'U003', book: 'B002', content: 'Nội dung hơi khó hiểu.', status: 'Active'},
    {id: 'CM05', user: 'U005', book: 'B004', content: 'Tác giả viết quá dài.', status: 'Draft'},
    {id: 'CM06', user: 'U001', book: 'B006', content: 'Bình luận 6.', status: 'Active'},
    {id: 'CM07', user: 'U002', book: 'B007', content: 'Bình luận 7.', status: 'Active'},
];
let mockSettings = {
    siteName: "Sách Việt Ebook",
    taxRate: 10,
    maxUploadSize: 500,
};
let bookOrUserToDelete = null;
// --- PAGINATION STATE ---
let itemsPerPage = 3;
// Book Pagination State
let currentBookPage = 1;
let currentFilteredBooks = mockBooksData;
// User Pagination State
let currentUserPage = 1;
let currentFilteredUsers = mockUsersData;
// Category Pagination State
let currentCategoryPage = 1;
//let currentFilteredCategories = mockCategoryData; // Sử dụng mockCategoryData
let realBooksData = [];
// Author Pagination State
let currentAuthorPage = 1;
let currentFilteredAuthors = mockAuthorData; // Sử dụng mockAuthorData

// Comment Pagination State
let currentCommentPage = 1;
let currentFilteredComments = mockCommentData;
// --- DOM REFERENCES ---
const itemModal = new bootstrap.Modal(document.getElementById('itemModal'));
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
const dom = {
    modalTitle: document.getElementById('modal-title'),
    deleteIdSpan: document.getElementById('delete-id'),
    deleteWarningMsg: document.getElementById('delete-warning-message'),
    booksTableBody: document.getElementById('books-table-body'),
    usersTableBody: document.getElementById('users-table-body'),
    categoriesTableBody: document.getElementById('categories-table-body'), // Đã tồn tại
    authorsTableBody: document.getElementById('authors-table-body'),
    commentsTableBody: document.getElementById('comments-table-body'),
    noBooksMsg: document.getElementById('no-books-results-message'),
    noUsersMsg: document.getElementById('no-user-results-message'),
    noCategoriesMsg: document.getElementById('no-categories-results-message'), // Đã tồn tại
    noAuthorsMsg: document.getElementById('no-authors-results-message'),
    noCommentsMsg: document.getElementById('no-comments-results-message'),
    toastElement: document.getElementById('liveToast'),
    toastBody: document.querySelector('#liveToast .toast-body'),
    booksPaginationContainer: document.getElementById('books-pagination'),
    usersPaginationContainer: document.getElementById('users-pagination'),
    categoriesPaginationContainer: document.getElementById('categories-pagination'), // Đã tồn tại
    authorsPaginationContainer: document.getElementById('authors-pagination'),
    commentsPaginationContainer: document.getElementById('comments-pagination'),
    formFields: {
        title: document.getElementById('input-title'),
        titleLabel: document.getElementById('input-title-label'), // THÊM MỚI: Label của input-title
        idDisplay: document.getElementById('item-id-display'),
        author: document.getElementById('author'),
        category: document.getElementById('category'),
        price: document.getElementById('price'),
        description: document.getElementById('description'),
        isAudio: document.getElementById('is-audio'),
        isPremium: document.getElementById('is-premium'),
        status: document.getElementById('status'),
        row2: document.getElementById('book-fields-row-2'),
        descField: document.getElementById('book-description-field'),
        isAudioField: document.getElementById('is-audio-field'),
        premiumLabel: document.getElementById('is-premium-label'),
        premiumCheckTitle: document.getElementById('premium-check-title'),
        authorTypeField: document.getElementById('author-type-field'), // THÊM MỚI: Trường loại Tác giả/NXB
        authorType: document.getElementById('author-type'), // THÊM MỚI: Select loại Tác giả/NXB
    }
};
// --- CHART INSTANCES ---
let categoryBarChartInstance = null;
let userDoughnutChartInstance = null;
// --- UTILITY FUNCTIONS ---
function mapDbBookToAdmin(dbBook) {
    const defaultStatus = 'Draft'; 
    const categoryName = dbBook.theLoai ? dbBook.theLoai.tenTheLoai : "Chưa phân loại";
    
    // Giả định: Các trường này phải được lấy từ DB hoặc Mock/Default nếu thiếu.
    const bookStatus = dbBook.trangThai || defaultStatus; // Giả định trạng thái được lấy
    const format = dbBook.theLoai && dbBook.theLoai.tenTheLoai === 'Sách Nói' ? 'audiobook' : 'ebook'; // Suy luận định dạng từ tên thể loại
    const isPremium = dbBook.gia > 50000; // Suy luận Premium từ giá bán
    
    return {
        id: 'B' + dbBook.idSach, // Thêm prefix 'B' để khớp với format ID Mock
        title: dbBook.tieuDe,
        author: dbBook.nguoiDang ? dbBook.nguoiDang.ten : "Không rõ",
        category: categoryName,
        price: dbBook.gia,
        description: dbBook.moTaNgan || "Chưa có mô tả.", // Giả định có moTaNgan
        format: format,
        isPremium: isPremium,
        status: bookStatus, 
    };
}
/** Tải và Ánh xạ dữ liệu Sách từ Server */
const loadRealBookData = () => {
    try {
        if (typeof SERVER_BOOKS_JSON !== 'undefined' && SERVER_BOOKS_JSON && SERVER_BOOKS_JSON.trim() !== "" && SERVER_BOOKS_JSON.trim() !== "[]") {
            const serverBooks = JSON.parse(SERVER_BOOKS_JSON);
            realBooksData = serverBooks.map(mapDbBookToAdmin);
        } else {
             console.warn("Không tìm thấy dữ liệu sách từ server. Dùng Mock Data.");
             realBooksData = [...mockBooksData]; 
        }
    } catch (e) {
        console.error("Lỗi parse JSON sách:", e, SERVER_BOOKS_JSON);
        realBooksData = [...mockBooksData];
    }
};
const formatCurrency = (amount) => {
    if (amount === 0 || amount === '0' || amount === null)
        return 'Miễn Phí';
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(amount);
};
const generateId = (prefix) => prefix + Math.random().toString(36).substring(2, 8).toUpperCase();
const getStatusStyles = (status) => {
    switch (status) {
        case 'Active':
            return {text: 'Active', badgeClass: 'bg-success text-white'};
        case 'Draft':
            return {text: 'Draft', badgeClass: 'bg-warning text-dark'};
        case 'Archived':
            return {text: 'Archived', badgeClass: 'bg-secondary text-white'};
        case 'Blocked':
            return {text: 'Blocked', badgeClass: 'bg-danger text-white'};
        default:
            return {text: status, badgeClass: 'bg-light text-dark'};
    }
};
/** TẠO DROPDOWN THỂ LOẠI ĐỘNG */
const populateCategoryDropdown = (selectedValue = '') => {
    const dropdown = dom.formFields.category; // Lấy <select id="category">
    if (!dropdown)
        return;

    // Xóa tất cả các tùy chọn cũ
    dropdown.innerHTML = '<option value="">Chọn Thể loại</option>';

    // Sử dụng currentFilteredCategories, đã được khởi tạo bằng mock hoặc real data
    const categories = currentFilteredCategories.filter(c => c.status === 'Active' || c.status === 'Draft');

    categories.forEach(cat => {
        const option = document.createElement('option');
        // Đối với dữ liệu Mock: cat.name là tên. 
        // Đối với dữ liệu CSDL: Cần dùng ID (ví dụ: cat.idTheLoai) để gửi về Servlet.

        // Vì hiện tại Mock sử dụng tên cho cả value và display, chúng ta sẽ giữ nguyên tên.
        // NHƯNG để tương thích với Servlet tương lai, ta nên dùng ID. 
        // Do dữ liệu Mock sử dụng ID dạng Cxxx và name dạng Văn Học, ta dùng name làm value tạm thời

        option.value = cat.name; // Gán Tên thể loại làm giá trị (value)
        option.textContent = cat.name;

        if (cat.name === selectedValue) {
            option.selected = true;
        }
        dropdown.appendChild(option);
    });
};
/** TÍNH TOÁN LẠI SỐ LƯỢNG SÁCH CHO TÁC GIẢ VÀ THỂ LOẠI (MOCK SYNC) */
const synchronizeMetadata = () => {
// 1. Đồng bộ số lượng sách cho Tác giả
    const authorCounts = mockBooksData.reduce((acc, book) => {
        const authorName = book.author || 'N/A';
        if (authorName !== 'N/A') {
            acc[authorName.toLowerCase()] = (acc[authorName.toLowerCase()] || 0) + 1;
        }
        return acc;
    }, {});
    // Update Author Data
    mockAuthorData.forEach(author => {
        author.books = authorCounts[author.name.toLowerCase()] || 0;
    });
    // Auto-add new authors (if added directly via book form)
    Object.keys(authorCounts).forEach(lowerName => {
        if (!mockAuthorData.some(a => a.name.toLowerCase() === lowerName)) {
            mockAuthorData.push({
                id: generateId('A'),
                name: lowerName.charAt(0).toUpperCase() + lowerName.slice(1), // Capitalize first letter
                books: authorCounts[lowerName],
                status: 'Active',
                type: 'Author',
            });
        }
    });
    mockAuthorData = mockAuthorData.filter(a => a.books > 0 || a.type === 'Publisher' || a.status !== 'Active'); // Giữ lại NXB và Draft/Archived

    // 2. Đồng bộ số lượng sách cho Thể loại (Sử dụng dữ liệu categories thực)
    const categoryCounts = mockBooksData.reduce((acc, book) => {
        const catName = book.category || 'N/A';
        if (catName !== 'N/A') {
            acc[catName.toLowerCase()] = (acc[catName.toLowerCase()] || 0) + 1;
        }
        return acc;
    }, {});
    // SỬ DỤNG realCategoryData (hoặc mockCategoryData nếu chưa có dữ liệu)
    const targetCategories = realCategoryData.length > 0 ? realCategoryData : mockCategoryData;
    targetCategories.forEach(cat => {
        cat.count = categoryCounts[cat.name.toLowerCase()] || 0;
        // ... (Bổ sung logic cập nhật status nếu cần) ...
    });
    // ... (logic Auto-add categories - GIỮ NGUYÊN) ...

    currentFilteredCategories = targetCategories; // Cập nhật filter bằng dữ liệu đã đồng bộ
};
// Update Category Data
//        mockCategoryData.forEach(cat => {
//        cat.count = categoryCounts[cat.name.toLowerCase()] || 0;
//        });
//        // Auto-add new categories (if added directly via book form)
//        Object.keys(categoryCounts).forEach(lowerName => {
//if (!mockCategoryData.some(c => c.name.toLowerCase() === lowerName)) {
//mockCategoryData.push({
//id: generateId('C'),
//        name: lowerName.charAt(0).toUpperCase() + lowerName.slice(1),
//        count: categoryCounts[lowerName],
//        status: 'Draft',
//});
//}
//});
//        mockCategoryData = mockCategoryData.filter(c => c.count > 0 || c.status !== 'Draft'); // Giữ lại Draft/Archived categories


/** Hiển thị Toast Message */
window.showToast = (message, bgColor = 'bg-success') => {
    dom.toastBody.textContent = message;
    dom.toastBody.className = `toast-body text-white ${bgColor}`;
    const toast = new bootstrap.Toast(dom.toastElement);
    toast.show();
};
// --- PAGINATION LOGIC (GENERAL) ---

/** Tạo nút phân trang chung */
const renderGenericPagination = (containerId, totalItems, currentPage, changePageFunction) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing pagination

    if (totalPages <= 1)
        return;
    // Nút Previous
    const prevDisabled = currentPage === 1 ? 'disabled' : '';
    container.innerHTML += `
                <li class="page-item ${prevDisabled}">
                    <a class="page-link" href="#" onclick="event.preventDefault(); ${changePageFunction}(${currentPage - 1})" aria-label="Previous">
                        <i data-lucide="chevron-left" style="width: 14px; height: 14px;"></i>
                    </a>
                </li>
            `;
    // Nút số trang (hiển thị tối đa 3 nút, cộng với 2 nút đầu/cuối nếu cần)
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + 2);
    if (endPage - startPage < 2) {
        startPage = Math.max(1, endPage - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        container.innerHTML += `
                    <li class="page-item ${activeClass}">
                        <a class="page-link" href="#" onclick="event.preventDefault(); ${changePageFunction}(${i})">${i}</a>
                    </li>
                `;
    }

// Nút Next
    const nextDisabled = currentPage === totalPages ? 'disabled' : '';
    container.innerHTML += `
                <li class="page-item ${nextDisabled}">
                    <a class="page-link" href="#" onclick="event.preventDefault(); ${changePageFunction}(${currentPage + 1})" aria-label="Next">
                        <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
                    </a>
                </li>
            `;
    lucide.createIcons();
};
// Hàm thay đổi trang cho từng section
window.changeBookPage = (page) => {
    const totalPages = Math.ceil(currentFilteredBooks.length / itemsPerPage);
    if (page < 1)
        page = 1;
    if (page > totalPages)
        page = totalPages;
    currentBookPage = page;
    renderBooks(currentFilteredBooks);
};
window.changeUserPage = (page) => {
    const totalPages = Math.ceil(currentFilteredUsers.length / itemsPerPage);
    if (page < 1)
        page = 1;
    if (page > totalPages)
        page = totalPages;
    currentUserPage = page;
    renderUsers(currentFilteredUsers);
};
window.changeCategoryPage = (page) => {
    const totalPages = Math.ceil(currentFilteredCategories.length / itemsPerPage);
    if (page < 1)
        page = 1;
    if (page > totalPages)
        page = totalPages;
    currentCategoryPage = page;
    renderCategories(currentFilteredCategories);
};
window.changeAuthorPage = (page) => {
    const totalPages = Math.ceil(currentFilteredAuthors.length / itemsPerPage);
    if (page < 1)
        page = 1;
    if (page > totalPages)
        page = totalPages;
    currentAuthorPage = page;
    renderAuthors(currentFilteredAuthors);
};
window.changeCommentPage = (page) => {
    const totalPages = Math.ceil(currentFilteredComments.length / itemsPerPage);
    if (page < 1)
        page = 1;
    if (page > totalPages)
        page = totalPages;
    currentCommentPage = page;
    renderComments(currentFilteredComments);
};
// --- CHART RENDERING ---

const updateCharts = (bookData, userData) => {
// 1. Biểu đồ cột: Thống kê Sách theo Thể loại
    const categoryCounts = mockCategoryData.reduce((acc, cat) => {
        if (cat.count > 0) {
            acc[cat.name] = cat.count;
        }
        return acc;
    }, {});
    const categories = Object.keys(categoryCounts);
    const bookCounts = Object.values(categoryCounts);
    if (categoryBarChartInstance) {
        categoryBarChartInstance.destroy();
    }

    const ctxBar = document.getElementById('categoryBarChart');
    if (ctxBar) {
        categoryBarChartInstance = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: categories,
                datasets: [{
                        label: 'Số lượng Sách',
                        data: bookCounts,
                        backgroundColor: [
                            'rgba(62, 124, 177, 0.8)', // medium-blue
                            'rgba(235, 171, 52, 0.8)', // Yellow
                            'rgba(28, 76, 123, 0.8)', // dark-blue
                            'rgba(114, 173, 215, 0.8)', // light-blue
                            'rgba(239, 68, 68, 0.8)', // Red
                        ],
                        borderColor: [
                            'var(--medium-blue)',
                            'rgb(235, 171, 52)',
                            'var(--dark-blue)',
                            'var(--light-blue)',
                            'rgb(239, 68, 68)',
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {display: false},
                    title: {display: false}
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {precision: 0}
                    }
                }
            }
        });
    }


// 2. Biểu đồ tròn: Tỉ lệ Người Dùng (Premium/Free)
    const premiumCount = userData.filter(u => u.plan === 'Premium').length;
    const freeCount = userData.length - premiumCount;
    if (userDoughnutChartInstance) {
        userDoughnutChartInstance.destroy();
    }

    const ctxDoughnut = document.getElementById('userDoughnutChart');
    if (ctxDoughnut) {
        userDoughnutChartInstance = new Chart(ctxDoughnut, {
            type: 'doughnut',
            data: {
                labels: ['Premium', 'Miễn Phí'],
                datasets: [{
                        data: [premiumCount, freeCount],
                        backgroundColor: [
                            'rgb(255, 193, 7)', // Yellow (for Premium)
                            'rgb(108, 117, 125)' // Gray (for Free)
                        ],
                        hoverOffset: 4
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {position: 'bottom'}
                }
            }
        });
    }
};
// --- RENDER FUNCTIONS (TABLES) ---

const renderBooks = (data) => {
    const startIndex = (currentBookPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksOnPage = data.slice(startIndex, endIndex);
    dom.booksTableBody.innerHTML = '';
    dom.noBooksMsg.classList.toggle('d-none', booksOnPage.length > 0);
    document.getElementById('total-books-stat').textContent = mockBooksData.length;
    document.getElementById('audio-books-stat').textContent = mockBooksData.filter(b => b.format === 'audiobook').length;
    booksOnPage.forEach(book => {
        const statusStyle = getStatusStyles(book.status);
        const formatText = book.format === 'audiobook' ? 'Audiobook' : 'Ebook';
        const formatColor = book.format === 'audiobook' ? 'text-warning' : 'text-medium-blue';
        const row = document.createElement('tr');
        row.className = 'table-row-hover';
        row.innerHTML = `
                    <td class="px-3 py-3 text-nowrap">${book.id}</td>
                    <td class="px-3 py-3 text-medium-blue fw-bold">${book.title || 'N/A'}</td>
                    <td class="px-3 py-3 text-nowrap">${book.author || 'N/A'}</td>
                    <td class="px-3 py-3 text-nowrap">${book.category || 'N/A'}</td>
                    <td class="px-3 py-3 text-center"><span class="small fw-bold ${formatColor}">${formatText}</span></td>
                    <td class="px-3 py-3 text-danger fw-bold">${formatCurrency(book.price || 0)}</td>
                    <td class="px-3 py-3 text-center"><span class="badge ${statusStyle.badgeClass}">${statusStyle.text}</span></td>
                    <td class="px-3 py-3 text-center">
                        <button onclick="showBookModal('edit', '${book.id}')" class="btn btn-sm btn-outline-medium-blue me-1">
                            <i data-lucide="square-pen" class="w-4 h-4" style="width: 14px; height: 14px;"></i>
                        </button>
                        <button onclick="confirmDelete('${book.id}', 'book')" class="btn btn-sm btn-outline-danger">
                            <i data-lucide="trash-2" class="w-4 h-4" style="width: 14px; height: 14px;"></i>
                        </button>
                    </td>
                `;
        dom.booksTableBody.appendChild(row);
    });
    renderGenericPagination('books-pagination', data.length, currentBookPage, 'changeBookPage');
    lucide.createIcons();
    updateReportStats(mockUsersData, mockBooksData);
    updateCharts(mockBooksData, mockUsersData);
};
const renderUsers = (data) => {
    const startIndex = (currentUserPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const usersOnPage = data.slice(startIndex, endIndex);
    dom.usersTableBody.innerHTML = '';
    dom.noUsersMsg.classList.toggle('d-none', usersOnPage.length > 0);
    document.getElementById('total-users-stat').textContent = mockUsersData.length;
    usersOnPage.forEach(user => {
        const statusStyle = getStatusStyles(user.status);
        const planColor = user.plan === 'Premium' ? 'text-warning fw-bold' : 'text-secondary';
        const row = document.createElement('tr');
        row.className = 'table-row-hover';
        row.innerHTML = `
                    <td class="px-3 py-3 text-nowrap break-all">${user.id}</td>
                    <td class="px-3 py-3 text-medium-blue fw-bold">${user.email}</td>
                    <td class="px-3 py-3 text-center"><span class="badge ${statusStyle.badgeClass}">${statusStyle.text}</span></td>
                    <td class="px-3 py-3 text-center"><span class="${planColor}">${user.plan}</span></td>
                    <td class="px-3 py-3 text-nowrap">${user.registered}</td>
                    <td class="px-3 py-3 text-center">
                        <button onclick="showUserModal('edit', '${user.id}')" class="btn btn-sm btn-outline-medium-blue me-1">
                            <i data-lucide="square-pen" class="w-4 h-4" style="width: 14px; height: 14px;"></i>
                        </button>
                        <button onclick="confirmDelete('${user.id}', 'user')" class="btn btn-sm btn-outline-danger">
                            <i data-lucide="trash-2" class="w-4 h-4" style="width: 14px; height: 14px;"></i>
                        </button>
                    </td>
                `;
        dom.usersTableBody.appendChild(row);
    });
    renderGenericPagination('users-pagination', data.length, currentUserPage, 'changeUserPage');
    lucide.createIcons();
    updateReportStats(data, mockBooksData);
    updateCharts(mockBooksData, data);
};
// CẬP NHẬT RENDER CATEGORIES ĐỂ CÓ NÚT CRUD
const renderCategories = (data) => {
    const startIndex = (currentCategoryPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const categoriesOnPage = data.slice(startIndex, endIndex);
    dom.categoriesTableBody.innerHTML = '';
    dom.noCategoriesMsg.classList.toggle('d-none', categoriesOnPage.length > 0);
    categoriesOnPage.forEach(cat => {
        const statusStyle = getStatusStyles(cat.status);
        const row = document.createElement('tr');
        row.className = 'table-row-hover';
        row.innerHTML = `
                    <td class="px-3 py-3 text-nowrap">${cat.id}</td>
                    <td class="px-3 py-3 text-medium-blue fw-bold">${cat.name}</td>
                    <td class="px-3 py-3 text-center">${cat.count}</td>
                    <td class="px-3 py-3 text-center"><span class="badge ${statusStyle.badgeClass}">${statusStyle.text}</span></td>
                    <td class="px-3 py-3 text-center">
                        <button onclick="showCategoryModal('edit', '${cat.id}')" class="btn btn-sm btn-outline-medium-blue me-1">
                            <i data-lucide="square-pen" style="width: 14px; height: 14px;"></i>
                        </button>
                        <button onclick="confirmDelete('${cat.id}', 'category')" class="btn btn-sm btn-outline-danger">
                            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                        </button>
                    </td>
                `;
        dom.categoriesTableBody.appendChild(row);
    });
    renderGenericPagination('categories-pagination', data.length, currentCategoryPage, 'changeCategoryPage');
    lucide.createIcons();
};
// CẬP NHẬT RENDER AUTHORS ĐỂ BAO GỒM CỘT TYPE VÀ CÁC NÚT CRUD
const renderAuthors = (data) => {
    const startIndex = (currentAuthorPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const authorsOnPage = data.slice(startIndex, endIndex);
    dom.authorsTableBody.innerHTML = '';
    dom.noAuthorsMsg.classList.toggle('d-none', authorsOnPage.length > 0);
    authorsOnPage.forEach(author => {
        const statusStyle = getStatusStyles(author.status);
        const typeColor = author.type === 'Author' ? 'text-info' : 'text-success';
        const typeDisplay = author.type === 'Author' ? 'Tác Giả' : 'NXB';
        const row = document.createElement('tr');
        row.className = 'table-row-hover';
        row.innerHTML = `
                    <td class="px-3 py-3 text-nowrap">${author.id}</td>
                    <td class="px-3 py-3 text-nowrap"><span class="fw-bold ${typeColor}">${typeDisplay}</span></td>
                    <td class="px-3 py-3 text-medium-blue fw-bold">${author.name}</td>
                    <td class="px-3 py-3 text-center">${author.books}</td>
                    <td class="px-3 py-3 text-center"><span class="badge ${statusStyle.badgeClass}">${statusStyle.text}</span></td>
                    <td class="px-3 py-3 text-center">
                        <button onclick="showAuthorPublisherModal('edit', '${author.id}')" class="btn btn-sm btn-outline-medium-blue me-1">
                            <i data-lucide="square-pen" style="width: 14px; height: 14px;"></i>
                        </button>
                        <button onclick="confirmDelete('${author.id}', 'author')" class="btn btn-sm btn-outline-danger">
                            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                        </button>
                    </td>
                `;
        dom.authorsTableBody.appendChild(row);
    });
    renderGenericPagination('authors-pagination', data.length, currentAuthorPage, 'changeAuthorPage');
    lucide.createIcons();
};
const renderComments = (data) => {
    const startIndex = (currentCommentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const commentsOnPage = data.slice(startIndex, endIndex);
    dom.commentsTableBody.innerHTML = '';
    dom.noCommentsMsg.classList.toggle('d-none', commentsOnPage.length > 0);
    commentsOnPage.forEach(comment => {
        const statusStyle = getStatusStyles(comment.status);
        const row = document.createElement('tr');
        row.className = 'table-row-hover';
        row.innerHTML = `
                    <td class="px-3 py-3 text-nowrap">${comment.id}</td>
                    <td class="px-3 py-3 text-nowrap text-medium-blue">${comment.book}</td>
                    <td class="px-3 py-3 text-nowrap">${comment.user}</td>
                    <td class="px-3 py-3 text-truncate" style="max-width: 250px;">${comment.content}</td>
                    <td class="px-3 py-3 text-center"><span class="badge ${statusStyle.badgeClass}">${statusStyle.text}</span></td>
                    <td class="px-3 py-3 text-center">
                        <button class="btn btn-sm btn-outline-danger"><i data-lucide="shield-off" style="width: 14px; height: 14px;"></i></button>
                    </td>
                `;
        dom.commentsTableBody.appendChild(row);
    });
    renderGenericPagination('comments-pagination', data.length, currentCommentPage, 'changeCommentPage');
    lucide.createIcons();
};
// --- CRUD ACTIONS (MOCK) ---

/**
 * HÀM CẬP NHẬT/THÊM SÁCH MỚI
 * Đã THÊM LOGIC ĐỒNG BỘ TÁC GIẢ/THỂ LOẠI:
 * Đồng bộ metadata sau khi lưu sách.
 */
window.saveBook = () => {
    const mode = document.getElementById('item-mode').value;
    const originalId = document.getElementById('original-id').value;
    const priceValue = dom.formFields.price.value;
    const newAuthorName = dom.formFields.author.value.trim();
    if (!dom.formFields.title.value || !priceValue) {
        return showToast('Vui lòng điền Tên Sách và Giá Bán.', 'bg-warning');
    }

    const dataToSave = {
        title: dom.formFields.title.value,
        author: newAuthorName || 'N/A',
        category: dom.formFields.category.value || 'N/A',
        price: parseInt(priceValue) || 0,
        description: dom.formFields.description.value || '',
        format: dom.formFields.isAudio.checked ? 'audiobook' : 'ebook',
        isPremium: dom.formFields.isPremium.checked,
        status: dom.formFields.status.value,
    };
    if (mode === 'add') {
        dataToSave.id = generateId('B');
        mockBooksData.push(dataToSave);
        showToast("Đã thêm sách mới thành công!", 'bg-success');
        currentBookPage = Math.ceil((mockBooksData.length) / itemsPerPage);
    } else {
        const index = mockBooksData.findIndex(b => b.id === originalId);
        if (index !== -1)
            mockBooksData[index] = {...mockBooksData[index], ...dataToSave, id: originalId};
        showToast(`Đã cập nhật sách ID ${originalId}.`, 'bg-info');
    }

// ĐỒNG BỘ VÀ CẬP NHẬT HIỂN THỊ
    synchronizeMetadata();
    currentFilteredBooks = mockBooksData;
    renderBooks(currentFilteredBooks);
    itemModal.hide();
    // Cập nhật lại danh sách Tác giả/Thể loại nếu đang xem nó
    if (document.getElementById('author-publisher-management').classList.contains('active')) {
        renderAuthors(currentFilteredAuthors);
    }
    if (document.getElementById('category-management').classList.contains('active')) {
        renderCategories(currentFilteredCategories);
    }
};
window.saveUser = () => {
    const mode = document.getElementById('item-mode').value;
    const originalId = document.getElementById('original-id').value;
    const emailValue = dom.formFields.title.value;
    const statusValue = dom.formFields.status.value;
    if (!emailValue || !statusValue) {
        return showToast('Vui lòng điền đầy đủ email và trạng thái.', 'bg-warning');
    }

    let userData = {
        email: emailValue,
        status: statusValue,
        plan: dom.formFields.isPremium.checked ? 'Premium' : 'Free',
        registered: new Date().toISOString().slice(0, 10),
    };
    if (mode.includes('add')) {
        userData.id = generateId('U');
        mockUsersData.push(userData);
        showToast("Đã thêm người dùng mới thành công!", 'bg-success');
    } else {
        const index = mockUsersData.findIndex(u => u.id === originalId);
        if (index !== -1) {
            userData.registered = mockUsersData[index].registered;
            mockUsersData[index] = {...mockUsersData[index], ...userData, id: originalId};
        }
        showToast(`Đã cập nhật người dùng ID ${originalId}.`, 'bg-info');
    }
    currentFilteredUsers = mockUsersData;
    renderUsers(currentFilteredUsers);
    itemModal.hide();
};
// HÀM LƯU TÁC GIẢ/NXB
window.saveAuthorPublisher = () => {
    const mode = document.getElementById('item-mode').value;
    const originalId = document.getElementById('original-id').value;
    const nameValue = dom.formFields.title.value;
    const statusValue = dom.formFields.status.value;
    const typeValue = dom.formFields.authorType.value;
    if (!nameValue || !statusValue) {
        return showToast('Vui lòng điền Tên và Trạng thái.', 'bg-warning');
    }

    let authorData = {
        name: nameValue,
        status: statusValue,
        type: typeValue,
        books: 0,
    };
    if (mode.includes('add')) {
        const prefix = typeValue === 'Author' ? 'A' : 'P';
        authorData.id = generateId(prefix);
        mockAuthorData.push(authorData);
        showToast(`Đã thêm ${typeValue} mới thành công!`, 'bg-success');
    } else {
        const index = mockAuthorData.findIndex(a => a.id === originalId);
        if (index !== -1) {
            authorData.books = mockAuthorData[index].books;
            mockAuthorData[index] = {...mockAuthorData[index], ...authorData, id: originalId};
        }
        showToast(`Đã cập nhật ${typeValue} ID ${originalId}.`, 'bg-info');
    }
    synchronizeMetadata();
    currentFilteredAuthors = mockAuthorData;
    renderAuthors(currentFilteredAuthors);
    itemModal.hide();
};
// THÊM MỚI: HÀM LƯU THỂ LOẠI
window.saveCategory = () => {
    const mode = document.getElementById('item-mode').value;
    const originalId = document.getElementById('original-id').value;
    const nameValue = dom.formFields.title.value;
    const statusValue = dom.formFields.status.value;
    if (!nameValue || !statusValue) {
        return showToast('Vui lòng điền Tên Thể loại và Trạng thái.', 'bg-warning');
    }

    let categoryData = {
        name: nameValue,
        status: statusValue,
        count: 0, // Số lượng sách sẽ được tự động đồng bộ sau
    };
    if (mode.includes('add')) {
        categoryData.id = generateId('C');
        mockCategoryData.push(categoryData);
        showToast(`Đã thêm Thể loại mới thành công!`, 'bg-success');
    } else {
        const index = mockCategoryData.findIndex(c => c.id === originalId);
        if (index !== -1) {
            categoryData.count = mockCategoryData[index].count;
            mockCategoryData[index] = {...mockCategoryData[index], ...categoryData, id: originalId};
        }
        showToast(`Đã cập nhật Thể loại ID ${originalId}.`, 'bg-info');
    }

    synchronizeMetadata();
    currentFilteredCategories = mockCategoryData;
    renderCategories(currentFilteredCategories);
    itemModal.hide();
};
// CẬP NHẬT: HÀM THỰC THI XOÁ CHUNG
window.executeDelete = (type) => {
    if (!bookOrUserToDelete)
        return;
    if (type === 'book') {
        mockBooksData = mockBooksData.filter(b => b.id !== bookOrUserToDelete);
        currentFilteredBooks = mockBooksData;
        const totalPages = Math.ceil(currentFilteredBooks.length / itemsPerPage);
        if (currentBookPage > totalPages && currentBookPage > 1) {
            currentBookPage--;
        }
        renderBooks(currentFilteredBooks);
        showToast(`Đã xóa sách ID: ${bookOrUserToDelete}`, 'bg-danger');
    } else if (type === 'user') {
        mockUsersData = mockUsersData.filter(u => u.id !== bookOrUserToDelete);
        currentFilteredUsers = mockUsersData;
        const totalPages = Math.ceil(currentFilteredUsers.length / itemsPerPage);
        if (currentUserPage > totalPages && currentUserPage > 1) {
            currentUserPage--;
        }
        renderUsers(currentFilteredUsers);
        showToast(`Đã xóa người dùng ID: ${bookOrUserToDelete}`, 'bg-danger');
    } else if (type === 'author') {
        mockAuthorData = mockAuthorData.filter(a => a.id !== bookOrUserToDelete);
        currentFilteredAuthors = mockAuthorData;
        const totalPages = Math.ceil(currentFilteredAuthors.length / itemsPerPage);
        if (currentAuthorPage > totalPages && currentAuthorPage > 1) {
            currentAuthorPage--;
        }
        renderAuthors(currentFilteredAuthors);
        showToast(`Đã xóa Tác giả/NXB ID: ${bookOrUserToDelete}`, 'bg-danger');
    } else if (type === 'category') { // Xử lý xoá Thể loại
// Cảnh báo nếu thể loại đang được sử dụng
        const categoryToDelete = mockCategoryData.find(c => c.id === bookOrUserToDelete);
        if (categoryToDelete && categoryToDelete.count > 0) {
            showToast(`Không thể xóa thể loại "${categoryToDelete.name}" vì có ${categoryToDelete.count} sách đang sử dụng.`, 'bg-danger');
            deleteModal.hide();
            return;
        }
        mockCategoryData = mockCategoryData.filter(c => c.id !== bookOrUserToDelete);
        currentFilteredCategories = mockCategoryData;
        const totalPages = Math.ceil(currentFilteredCategories.length / itemsPerPage);
        if (currentCategoryPage > totalPages && currentCategoryPage > 1) {
            currentCategoryPage--;
        }
        renderCategories(currentFilteredCategories);
        showToast(`Đã xóa Thể loại ID: ${bookOrUserToDelete}`, 'bg-danger');
    }

// Đồng bộ lại metadata sau khi xóa sách hoặc tác giả/thể loại
    synchronizeMetadata();
    deleteModal.hide();
};
// --- FILTERING ---

window.filterTable = (searchTerm, type) => {
    const lowerCaseTerm = searchTerm.toLowerCase().trim();
    if (type === 'book') {
        currentFilteredBooks = mockBooksData.filter(item =>
            (item.title || '').toLowerCase().includes(lowerCaseTerm) ||
                    (item.author || '').toLowerCase().includes(lowerCaseTerm) ||
                    (item.id || '').toLowerCase().includes(lowerCaseTerm)
        );
        currentBookPage = 1;
        renderBooks(currentFilteredBooks);
    } else if (type === 'user') {
        currentFilteredUsers = mockUsersData.filter(item =>
            (item.email || '').toLowerCase().includes(lowerCaseTerm) ||
                    (item.id || '').toLowerCase().includes(lowerCaseTerm)
        );
        currentUserPage = 1;
        renderUsers(currentFilteredUsers);
    } else if (type === 'author') { // THÊM MỚI: Xử lý lọc Tác giả/NXB
        currentFilteredAuthors = mockAuthorData.filter(item =>
            (item.name || '').toLowerCase().includes(lowerCaseTerm) ||
                    (item.id || '').toLowerCase().includes(lowerCaseTerm) ||
                    (item.type || '').toLowerCase().includes(lowerCaseTerm)
        );
        currentAuthorPage = 1;
        renderAuthors(currentFilteredAuthors);
    } else if (type === 'category') { // THÊM MỚI: Xử lý lọc Thể loại
        currentFilteredCategories = mockCategoryData.filter(item =>
            (item.name || '').toLowerCase().includes(lowerCaseTerm) ||
                    (item.id || '').toLowerCase().includes(lowerCaseTerm)
        );
        currentCategoryPage = 1;
        renderCategories(currentFilteredCategories);
    }
};
// --- SETTINGS MANAGEMENT (MOCK) ---

window.loadSettings = () => {
    document.getElementById('setting-site-name').value = mockSettings.siteName;
    document.getElementById('setting-tax-rate').value = mockSettings.taxRate;
    document.getElementById('setting-max-upload').value = mockSettings.maxUploadSize;
};
window.saveSettings = () => {
    mockSettings.siteName = document.getElementById('setting-site-name').value;
    mockSettings.taxRate = parseInt(document.getElementById('setting-tax-rate').value) || 0;
    mockSettings.maxUploadSize = parseInt(document.getElementById('setting-max-upload').value) || 0;
    showToast("Đã lưu Cấu hình (Mock) thành công!", 'bg-success');
    const message = document.getElementById('settings-save-message');
    message.classList.remove('d-none');
    setTimeout(() => message.classList.add('d-none'), 3000);
};
// --- REPORT & STATISTICS ---

const updateReportStats = (userData, bookData) => {
    const activeBooks = bookData.filter(b => b.status === 'Active').length;
    const audioBooks = bookData.filter(b => b.format === 'audiobook').length;
    const totalBooks = bookData.length;
    const premiumUsers = userData.filter(u => u.plan === 'Premium').length;
    const totalUsers = userData.length;
    document.getElementById('report-active-books').textContent = `${activeBooks} / ${totalBooks}`;
    document.getElementById('report-audio-ratio').textContent = totalBooks > 0 ? `${((audioBooks / totalBooks) * 100).toFixed(1)}%` : '0%';
    document.getElementById('report-total-users').textContent = totalUsers;
    document.getElementById('report-premium-users').textContent = totalUsers > 0 ? `${premiumUsers} (${((premiumUsers / totalUsers) * 100).toFixed(1)}%)` : '0 (0%)';
};
// --- GLOBAL UI FUNCTIONS ---

// THÊM MỚI: HÀM SHOW MODAL CHUNG CHO THỂ LOẠI
window.showCategoryModal = (mode, itemId = '') => {
    document.getElementById('item-mode').value = mode + '_category';
    document.getElementById('original-id').value = itemId;
    const isEdit = mode === 'edit';
    // Cấu hình cho THỂ LOẠI: Ẩn các trường không liên quan
    dom.formFields.row2.classList.add('d-none');
    dom.formFields.descField.classList.add('d-none');
    dom.formFields.isAudioField.classList.add('d-none');
    dom.formFields.authorTypeField.style.display = 'none';
    // Cấu hình lại các label
    dom.formFields.premiumCheckTitle.style.display = 'none';
    dom.formFields.isPremium.closest('.col-md-4').style.display = 'none';
    dom.formFields.titleLabel.textContent = 'Tên Thể loại *';
    document.getElementById('item-form').reset();
    if (isEdit) {
        dom.modalTitle.textContent = `Chỉnh Sửa Thể loại: ${itemId}`;
        document.getElementById('save-btn').innerHTML = `<i data-lucide="save" class="me-1" style="width: 18px; height: 18px;"></i><span>Lưu Thay Đổi</span>`;
        const category = mockCategoryData.find(c => c.id === itemId);
        if (category) {
            dom.formFields.idDisplay.value = category.id;
            dom.formFields.title.value = category.name || '';
            dom.formFields.status.value = category.status || 'Draft';
        }
    } else {
        dom.modalTitle.textContent = "Thêm Thể loại Mới";
        document.getElementById('save-btn').innerHTML = `<i data-lucide="plus" class="me-1" style="width: 18px; height: 18px;"></i><span>Tạo Mới</span>`;
        dom.formFields.idDisplay.value = "Tự động tạo...";
    }

    itemModal.show();
    lucide.createIcons();
};
window.showAuthorPublisherModal = (mode, itemId = '') => {
    document.getElementById('item-mode').value = mode + '_author';
    document.getElementById('original-id').value = itemId;
    const isEdit = mode === 'edit';
    // Cấu hình cho TÁC GIẢ/NXB: Ẩn/Hiện các trường cần thiết
    dom.formFields.row2.classList.add('d-none');
    dom.formFields.descField.classList.add('d-none');
    dom.formFields.isAudioField.classList.add('d-none');
    dom.formFields.authorTypeField.style.display = 'block';
    dom.formFields.premiumCheckTitle.style.display = 'block';
    dom.formFields.isPremium.closest('.col-md-4').style.display = 'block';
    dom.formFields.premiumLabel.textContent = 'Đánh dấu quan trọng';
    dom.formFields.titleLabel.textContent = 'Tên Tác giả / NXB *';
    document.getElementById('item-form').reset();
    if (isEdit) {
        dom.modalTitle.textContent = `Chỉnh Sửa Tác giả/NXB: ${itemId}`;
        document.getElementById('save-btn').innerHTML = `<i data-lucide="save" class="me-1" style="width: 18px; height: 18px;"></i><span>Lưu Thay Đổi</span>`;
        const author = mockAuthorData.find(a => a.id === itemId);
        if (author) {
            dom.formFields.idDisplay.value = author.id;
            dom.formFields.title.value = author.name || '';
            dom.formFields.authorType.value = author.type || 'Author';
            dom.formFields.status.value = author.status || 'Draft';
            dom.formFields.isPremium.checked = false;
        }
    } else {
        dom.modalTitle.textContent = "Thêm Tác giả / NXB Mới";
        document.getElementById('save-btn').innerHTML = `<i data-lucide="plus" class="me-1" style="width: 18px; height: 18px;"></i><span>Tạo Mới</span>`;
        dom.formFields.idDisplay.value = "Tự động tạo...";
    }

    itemModal.show();
    lucide.createIcons();
};
window.showBookModal = (mode, itemId = '') => {
    document.getElementById('item-mode').value = mode;
    document.getElementById('original-id').value = itemId;
    const isEdit = mode === 'edit';

    let selectedCategory = '';

    // Cấu hình cho SÁCH
    dom.formFields.row2.classList.remove('d-none');
    dom.formFields.descField.classList.remove('d-none');
    dom.formFields.isAudioField.classList.remove('d-none');
    dom.formFields.authorTypeField.style.display = 'none';
    dom.formFields.premiumCheckTitle.style.display = 'block';
    dom.formFields.isPremium.closest('.col-md-4').style.display = 'block';
    dom.formFields.premiumLabel.textContent = 'Chỉ dành cho Hội viên VIP';
    dom.formFields.titleLabel.textContent = 'Tên Sách *';
    document.getElementById('item-form').reset();
    if (isEdit) {
        dom.modalTitle.textContent = `Chỉnh Sửa Sách: ${itemId}`;
        document.getElementById('save-btn').innerHTML = `<i data-lucide="save" class="me-1" style="width: 18px; height: 18px;"></i><span>Lưu Thay Đổi</span>`;
        const book = mockBooksData.find(b => b.id === itemId);
        if (book) {
            dom.formFields.idDisplay.value = book.id;
            dom.formFields.title.value = book.title || '';
            dom.formFields.author.value = book.author || '';
            dom.formFields.category.value = book.category || '';
            selectedCategory = book.category || '';
            dom.formFields.price.value = book.price || 0;
            dom.formFields.description.value = book.description || '';
            dom.formFields.isAudio.checked = (book.format === 'audiobook');
            dom.formFields.isPremium.checked = book.isPremium || false;
            dom.formFields.status.value = book.status || 'Draft';
        }
    } else {
        dom.modalTitle.textContent = "Thêm Sách Mới";
        document.getElementById('save-btn').innerHTML = `<i data-lucide="plus" class="me-1" style="width: 18px; height: 18px;"></i><span>Tạo Sách</span>`;
        dom.formFields.idDisplay.value = "Tự động tạo...";
    }

    populateCategoryDropdown(selectedCategory);

    itemModal.show();
    lucide.createIcons();
};
window.showUserModal = (mode, itemId = '') => {
    document.getElementById('item-mode').value = mode + '_user';
    document.getElementById('original-id').value = itemId;
    const isEdit = mode === 'edit';
    // Cấu hình cho USER: Ẩn các trường không liên quan
    dom.formFields.row2.classList.add('d-none');
    dom.formFields.descField.classList.add('d-none');
    dom.formFields.isAudioField.classList.add('d-none');
    dom.formFields.authorTypeField.style.display = 'none';
    dom.formFields.premiumCheckTitle.style.display = 'block';
    dom.formFields.isPremium.closest('.col-md-4').style.display = 'block';
    dom.formFields.premiumLabel.textContent = 'Đặt thành viên Premium';
    dom.formFields.titleLabel.textContent = 'Email Người Dùng *';
    dom.modalTitle.textContent = isEdit ? `Chỉnh Sửa Người Dùng: ${itemId}` : "Thêm Người Dùng Mới";
    document.getElementById('save-btn').innerHTML = isEdit ? `<i data-lucide="save" class="me-1" style="width: 18px; height: 18px;"></i><span>Lưu Người Dùng</span>` : `<i data-lucide="plus" class="me-1" style="width: 18px; height: 18px;"></i><span>Tạo Người Dùng</span>`;
    document.getElementById('item-form').reset();
    if (isEdit) {
        const user = mockUsersData.find(u => u.id === itemId);
        if (user) {
            dom.formFields.idDisplay.value = user.id;
            dom.formFields.title.value = user.email;
            dom.formFields.status.value = user.status;
            dom.formFields.isPremium.checked = user.plan === 'Premium';
        }
    } else {
        dom.formFields.idDisplay.value = "Tự động tạo...";
    }

    itemModal.show();
    lucide.createIcons();
};
// CẬP NHẬT: HÀM CONFIRM DELETE CHUNG
window.confirmDelete = (itemId, type) => {
    bookOrUserToDelete = itemId;
    document.getElementById('item-mode').value = type + '_delete';
    dom.deleteIdSpan.textContent = itemId;
    dom.deleteWarningMsg.classList.add('d-none');
    if (type === 'category' || type === 'author') {
        dom.deleteWarningMsg.classList.remove('d-none');
    }

    deleteModal.show();
};
window.showSection = (sectionId, element) => {
    document.querySelectorAll('.content-section').forEach(section => section.classList.add('d-none'));
    document.getElementById(sectionId)?.classList.remove('d-none');
    const titleMap = {
        'dashboard': ['Dashboard Tổng Quan', 'Thống kê hoạt động và báo cáo nhanh.'],
        'book-management': ['Quản Lý Sách', 'Tổng quan về kho sách, chỉnh sửa, thêm mới và xóa.'],
        'category-management': ['Quản Lý Thể Loại', 'Thêm, sửa, xóa các danh mục sách.'],
        'author-publisher-management': ['Quản Lý Tác Giả & NXB', 'Quản lý thông tin tác giả và nhà xuất bản.'],
        'user-management': ['Quản Lý Người Dùng', 'Quản lý tài khoản, quyền truy cập và gói thành viên.'],
        'comment-management': ['Quản Lý Bình Luận', 'Kiểm duyệt và quản lý các bình luận của người dùng.'],
        'settings': ['Cài đặt Hệ Thống', 'Thiết lập chung cho ứng dụng và quản trị viên.'],
    };
    document.getElementById('main-title').textContent = titleMap[sectionId][0];
    document.getElementById('main-subtitle').textContent = titleMap[sectionId][1];
    document.querySelectorAll('.sidebar-link-item').forEach(link => link.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }

// Luôn đồng bộ Metadata trước khi render bất kỳ bảng nào
    synchronizeMetadata();
    // Tải dữ liệu cần thiết
    if (sectionId === 'book-management') {
        currentFilteredBooks = realBooksData; 
        currentBookPage = 1;
        renderBooks(currentFilteredBooks);
    }
    if (sectionId === 'user-management') {
        currentFilteredUsers = mockUsersData;
        currentUserPage = 1;
        renderUsers(currentFilteredUsers);
    }
    if (sectionId === 'category-management') {
        currentFilteredCategories = realCategoryData.length > 0 ? realCategoryData : mockCategoryData;
        currentCategoryPage = 1;
        renderCategories(currentFilteredCategories);
    }
    if (sectionId === 'author-publisher-management') {
        currentFilteredAuthors = mockAuthorData;
        currentAuthorPage = 1;
        renderAuthors(currentFilteredAuthors);
    }
    if (sectionId === 'comment-management') {
        currentFilteredComments = mockCommentData;
        currentCommentPage = 1;
        renderComments(currentFilteredComments);
    }
    if (sectionId === 'settings')
        loadSettings();
    if (sectionId === 'dashboard') {
        updateReportStats(mockUsersData, mockBooksData);
        updateCharts(mockBooksData, mockUsersData);
    }
    
};
// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Tải dữ liệu Thể loại (đã có)
    loadRealCategoryData();
    
    // 2. TẢI DỮ LIỆU SÁCH MỚI
    loadRealBookData();
    // Gán dữ liệu sách thực cho biến dùng cho Filter/Render
    currentFilteredBooks = realBooksData; 
    
    // 3. Đồng bộ Metadata
    synchronizeMetadata();
    
    // 4. Hiển thị Dashboard
    window.showSection('dashboard', document.getElementById('nav-dashboard'));
    lucide.createIcons();
});