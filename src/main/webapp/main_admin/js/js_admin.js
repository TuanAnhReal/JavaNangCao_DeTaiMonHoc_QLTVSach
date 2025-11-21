/* * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
// Khởi tạo Icons Lucide
// LƯU Ý QUAN TRỌNG: Lệnh gọi lucide.createIcons() bị xóa ở đây
// và chỉ được gọi sau khi DOM đã được tải hoàn toàn (trong DOMContentLoaded)
// để tránh lỗi "lucide is not defined".

// =========================================================================================
// --- KHAI BÁO BIẾN DỮ LIỆU THỰC TẾ (REAL DATA) ---
let realUsersData = [];
let realBooksData = []; 
let realCategoryData = []; 

// --- MOCK DATA (CHỈ GIỮ LẠI KHAI BÁO ĐỂ LÀM DỰ PHÒNG VÀ CẤU TRÚC, KHÔNG CÓ DỮ LIỆU TĨNH) ---
let mockBooksData = []; 
let mockUsersData = []; 
let mockCategoryData = [];
let mockAuthorData = [];
let mockCommentData = [];
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
let currentFilteredCategories = mockCategoryData;
// Author Pagination State
let currentAuthorPage = 1;
let currentFilteredAuthors = mockAuthorData; 
// Comment Pagination State
let currentCommentPage = 1;
let currentFilteredComments = mockCommentData;
// --- DOM REFERENCES ---
// LƯU Ý: Đảm bảo thẻ script nhúng thư viện Bootstrap và Chart.js đã có sẵn trong trang JSP
// để các biến như bootstrap.Modal, Chart được định nghĩa.
const itemModal = new bootstrap.Modal(document.getElementById('itemModal'));
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
const dom = {
    modalTitle: document.getElementById('modal-title'),
    deleteIdSpan: document.getElementById('delete-id'),
    deleteWarningMsg: document.getElementById('delete-warning-message'),
    booksTableBody: document.getElementById('bookTableBody'), 
    usersTableBody: document.getElementById('userTableBody'), 
    categoriesTableBody: document.getElementById('theLoaiTableBody'), 
    authorsTableBody: document.getElementById('authors-table-body'),
    commentsTableBody: document.getElementById('comments-table-body'),
    noBooksMsg: document.getElementById('no-books-results-message'),
    noUsersMsg: document.getElementById('no-user-results-message'),
    noCategoriesMsg: document.getElementById('no-categories-results-message'), 
    noAuthorsMsg: document.getElementById('no-authors-results-message'),
    noCommentsMsg: document.getElementById('no-comments-results-message'),
    toastElement: document.getElementById('liveToast'),
    toastBody: document.querySelector('#liveToast .toast-body'),
    booksPaginationContainer: document.getElementById('books-pagination'),
    usersPaginationContainer: document.getElementById('users-pagination'),
    categoriesPaginationContainer: document.getElementById('categories-pagination'), 
    authorsPaginationContainer: document.getElementById('authors-pagination'),
    commentsPaginationContainer: document.getElementById('comments-pagination'),
    formFields: {
        title: document.getElementById('input-title'),
        titleLabel: document.getElementById('input-title-label'), 
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
        authorTypeField: document.getElementById('author-type-field'), 
        authorType: document.getElementById('author-type'), 
    }
};
// --- CHART INSTANCES ---
let categoryBarChartInstance = null;
let userDoughnutChartInstance = null;

// =========================================================================================
// --- UTILITY FUNCTIONS (FUNCTION DECLARATION cho hoisting) ---
// =========================================================================================

/**
 * Hàm định dạng ngày tháng: 2025-11-21T14:33:00 -> 21/11/2025
 */
function formatDate(dateTimeString) {
    if (!dateTimeString) return 'N/A';
    try {
        const datePart = dateTimeString.split('T')[0]; 
        const parts = datePart.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    } catch (e) {
        return dateTimeString; 
    }
};

function formatCurrency(amount) {
    if (amount === 0 || amount === '0' || amount === null || amount === undefined)
        return 'Miễn Phí';
    const num = parseInt(amount);
    if (isNaN(num)) return 'N/A';
    
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(num);
};

const generateId = (prefix) => prefix + Math.random().toString(36).substring(2, 8).toUpperCase();

function getStatusStyles(status) {
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
function populateCategoryDropdown(selectedValue = '') {
    const dropdown = dom.formFields.category; 
    if (!dropdown) return;

    dropdown.innerHTML = '<option value="">Chọn Thể loại</option>';

    const categories = realCategoryData.length > 0 ? realCategoryData : mockCategoryData;

    categories.filter(c => c.status === 'Active' || c.status === 'Draft').forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.name; 
        option.textContent = cat.name;

        if (cat.name === selectedValue) {
            option.selected = true;
        }
        dropdown.appendChild(option);
    });
};

/** TÍNH TOÁN LẠI SỐ LƯỢNG SÁCH CHO TÁC GIẢ VÀ THỂ LOẠI (MOCK SYNC) */
function synchronizeMetadata() {
    const sourceBooks = realBooksData.length > 0 ? realBooksData : mockBooksData;
    
    // 1. Đồng bộ số lượng sách cho Thể loại
    const categoryCounts = sourceBooks.reduce((acc, book) => {
        const catName = book.category || 'N/A';
        if (catName !== 'N/A') {
            acc[catName.toLowerCase()] = (acc[catName.toLowerCase()] || 0) + 1;
        }
        return acc;
    }, {});
    
    const targetCategories = realCategoryData.length > 0 ? realCategoryData : mockCategoryData;
    targetCategories.forEach(cat => {
        const catNameLower = cat.name ? cat.name.toLowerCase() : ''; 
        cat.count = categoryCounts[catNameLower] || 0;
    });

    currentFilteredCategories = targetCategories; 
    
    // 2. Đồng bộ số lượng sách cho Tác giả (dùng Mock Author)
    const authorCounts = sourceBooks.reduce((acc, book) => {
        const authorName = book.author || 'N/A';
        if (authorName !== 'N/A') {
            acc[authorName.toLowerCase()] = (acc[authorName.toLowerCase()] || 0) + 1;
        }
        return acc;
    }, {});
    mockAuthorData.forEach(author => {
        author.books = authorCounts[author.name.toLowerCase()] || 0;
    });
    currentFilteredAuthors = mockAuthorData; 
};

/** Hiển thị Toast Message */
window.showToast = (message, bgColor = 'bg-success') => {
    const toastBody = dom.toastBody;
    const toastElement = dom.toastElement;

    if (toastBody && toastElement) {
        toastBody.textContent = message;
        toastBody.className = `toast-body text-white ${bgColor}`;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    } else {
        console.warn('Toast elements not found.');
    }
};

// =========================================================================================
// --- MAPPING FUNCTIONS ---

/**
 * Ánh xạ dữ liệu Người dùng từ DB (JSON) sang cấu trúc JS Admin.
 */
function mapDbUserToAdmin(dbUser) {
    const userId = dbUser.idNguoiDung || dbUser.idnguoidung; 
    const mappedId = 'U' + userId; 
    
    const status = (dbUser.tien || 0) > 0 ? 'Active' : 'Draft'; 
    const plan = (dbUser.tien || 0) > 1000000 ? 'Premium' : 'Free';
    
    return {
        id: mappedId, 
        idNguoiDung: userId, 
        ten: dbUser.ten,
        email: dbUser.email,
        sdt: dbUser.sdt,
        tien: dbUser.tien,
        status: status,
        plan: plan, 
        registered: 'N/A' 
    };
}

function mapDbBookToAdmin(dbBook) {
    const defaultStatus = 'Active'; 
    const categoryName = dbBook.theLoai ? dbBook.theLoai.tenTheLoai : "Chưa phân loại";
    
    const statusText = dbBook.trangThaiSach || defaultStatus; 
    
    const format = dbBook.tep && dbBook.tep.toLowerCase().includes('.mp3') ? 'audiobook' : 'ebook'; 
    const isPremium = dbBook.gia > 50000; 

    return {
        id: 'B' + dbBook.idSach, 
        title: dbBook.tieuDe,
        author: dbBook.nguoiDang ? dbBook.nguoiDang.ten : "Không rõ",
        category: categoryName,
        price: dbBook.gia,
        description: "Chưa có mô tả ngắn.", 
        format: format,
        isPremium: isPremium,
        status: statusText,
    };
}

function mapDbCategoryToAdmin(dbCategory) {
     return {
        id: 'C' + dbCategory.idTheLoai, 
        idTheLoai: dbCategory.idTheLoai, 
        name: dbCategory.tenTheLoai,
        count: 0, 
        status: 'Active' 
    };
}

// =========================================================================================
// --- TẢI DỮ LIỆU TỪ SERVER ---
// =========================================================================================

/**
 * Hàm gọi API chung, ánh xạ dữ liệu và gán vào biến toàn cục.
 */
function loadRealDataFromAPI(action, mapFunction, targetDataName, callback) {
    const API_URL = './AdminAPI?action=' + action; 
    
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                console.error(`Lỗi HTTP khi tải ${action}: Status ${response.status}`);
                throw new Error(`Lỗi tải dữ liệu: HTTP ${response.status}`);
            }
            return response.json(); 
        })
        .then(data => {
            if (data && data.status === 'error') {
                 console.error(`Lỗi Server khi tải ${action}:`, data.message);
            } else if (data && data.length > 0) {
                const mappedData = data.map(mapFunction);
                
                if(targetDataName === 'realUsersData') realUsersData = mappedData;
                else if(targetDataName === 'realBooksData') realBooksData = mappedData;
                else if(targetDataName === 'realCategoryData') realCategoryData = mappedData;
                
            } 
            if (callback) callback();
        })
        .catch(error => {
            console.error(`Lỗi khi thực hiện fetch cho ${action}:`, error);
            if (callback) callback(); 
        });
};

function loadRealCategoryData(callback) {
    loadRealDataFromAPI('listTheLoai', mapDbCategoryToAdmin, 'realCategoryData', callback);
};
function loadRealBookData(callback) {
    loadRealDataFromAPI('listBooks', mapDbBookToAdmin, 'realBooksData', callback);
};
function loadRealUserData(callback) {
    loadRealDataFromAPI('listUsers', mapDbUserToAdmin, 'realUsersData', callback);
};

// =========================================================================================
// --- RENDER FUNCTIONS ---
// =========================================================================================

/** Tạo nút phân trang chung */
function renderGenericPagination(containerId, totalItems, currentPage, changePageFunction) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const container = document.getElementById(containerId);
    if(container) container.innerHTML = ''; 

    if (totalPages <= 1)
        return;
    const prevDisabled = currentPage === 1 ? 'disabled' : '';
    container.innerHTML += `
                <li class="page-item ${prevDisabled}">
                    <a class="page-link" href="#" onclick="event.preventDefault(); ${changePageFunction}(${currentPage - 1})" aria-label="Previous">
                        <i data-lucide="chevron-left" style="width: 14px; height: 14px;"></i>
                    </a>
                </li>
            `;
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

    const nextDisabled = currentPage === totalPages ? 'disabled' : '';
    container.innerHTML += `
                <li class="page-item ${nextDisabled}">
                    <a class="page-link" href="#" onclick="event.preventDefault(); ${changePageFunction}(${currentPage + 1})" aria-label="Next">
                        <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
                    </a>
                </li>
            `;
    // Chỉ gọi lucide.createIcons() sau khi các element đã được chèn vào DOM
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        lucide.createIcons();
    }
};

window.changeBookPage = (page) => {
    const totalPages = Math.ceil(currentFilteredBooks.length / itemsPerPage);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentBookPage = page;
    renderBooks(currentFilteredBooks);
};
window.changeUserPage = (page) => {
    const totalPages = Math.ceil(currentFilteredUsers.length / itemsPerPage);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentUserPage = page;
    renderUsers(currentFilteredUsers);
};
window.changeCategoryPage = (page) => {
    const totalPages = Math.ceil(currentFilteredCategories.length / itemsPerPage);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentCategoryPage = page;
    renderCategories(currentFilteredCategories);
};
window.changeAuthorPage = (page) => {
    const totalPages = Math.ceil(currentFilteredAuthors.length / itemsPerPage);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentAuthorPage = page;
    renderAuthors(currentFilteredAuthors);
};
window.changeCommentPage = (page) => {
    const totalPages = Math.ceil(currentFilteredComments.length / itemsPerPage);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentCommentPage = page;
    renderComments(currentFilteredComments);
};

function updateCharts(bookData, userData) {
// 1. Biểu đồ cột: Thống kê Sách theo Thể loại
    const categoryCounts = currentFilteredCategories.reduce((acc, cat) => {
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
    if (ctxBar && window.Chart) {
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
    if (ctxDoughnut && window.Chart) {
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

function renderBooks(data) {
    const startIndex = (currentBookPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksOnPage = data.slice(startIndex, endIndex);
    const totalBooks = realBooksData.length > 0 ? realBooksData.length : mockBooksData.length; 
    
    if(dom.booksTableBody) dom.booksTableBody.innerHTML = '';
    if(dom.noBooksMsg) dom.noBooksMsg.classList.toggle('d-none', booksOnPage.length > 0);
    const totalBooksStat = document.getElementById('total-books-stat');
    if(totalBooksStat) totalBooksStat.textContent = totalBooks;
    
    const audioCount = realBooksData.length > 0 ? realBooksData.filter(b => b.format === 'audiobook').length : mockBooksData.filter(b => b.format === 'audiobook').length;
    const audioBooksStat = document.getElementById('audio-books-stat');
    if(audioBooksStat) audioBooksStat.textContent = audioCount;

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
        if(dom.booksTableBody) dom.booksTableBody.appendChild(row);
    });
    renderGenericPagination('books-pagination', data.length, currentBookPage, 'changeBookPage');
    // Bỏ lucide.createIcons() khỏi đây
    const finalUsers = realUsersData.length > 0 ? currentFilteredUsers : mockUsersData;
    updateReportStats(finalUsers, data); 
    updateCharts(data, finalUsers);
};

function renderUsers(data) {
    const startIndex = (currentUserPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const usersOnPage = data.slice(startIndex, endIndex);
    const totalUsers = realUsersData.length > 0 ? realUsersData.length : mockUsersData.length;
    
    if(dom.usersTableBody) dom.usersTableBody.innerHTML = '';
    if(dom.noUsersMsg) dom.noUsersMsg.classList.toggle('d-none', usersOnPage.length > 0);
    const totalUsersStat = document.getElementById('total-users-stat');
    if(totalUsersStat) totalUsersStat.textContent = totalUsers;

    usersOnPage.forEach(user => {
        const statusStyle = getStatusStyles(user.status);
        const planColor = user.plan === 'Premium' ? 'text-warning fw-bold' : 'text-secondary';
        const row = document.createElement('tr');
        row.className = 'table-row-hover';
        row.innerHTML = `
                    <td class="px-3 py-3 text-nowrap break-all">${user.id}</td>
                    <td class="px-3 py-3 text-medium-blue fw-bold">${user.ten || 'N/A'}</td> 
                    <td class="px-3 py-3 text-nowrap">${user.email}</td>
                    <td class="px-3 py-3 text-nowrap">${user.sdt || 'N/A'}</td>
                    <td class="px-3 py-3 text-danger fw-bold">${formatCurrency(user.tien || 0)}</td>
                    <td class="px-3 py-3 text-center">
                        <button onclick="showUserModal('edit', '${user.id}')" class="btn btn-sm btn-outline-medium-blue me-1">
                            <i data-lucide="square-pen" class="w-4 h-4" style="width: 14px; height: 14px;"></i>
                        </button>
                        <button onclick="confirmDelete('${user.id}', 'user')" class="btn btn-sm btn-outline-danger">
                            <i data-lucide="trash-2" class="w-4 h-4" style="width: 14px; height: 14px;"></i>
                        </button>
                    </td>
                `;
        if(dom.usersTableBody) dom.usersTableBody.appendChild(row);
    });
    renderGenericPagination('users-pagination', data.length, currentUserPage, 'changeUserPage');
    // Bỏ lucide.createIcons() khỏi đây
    const finalBooks = realBooksData.length > 0 ? currentFilteredBooks : mockBooksData;
    updateReportStats(data, finalBooks);
    updateCharts(finalBooks, data);
};

function renderCategories(data) {
    const startIndex = (currentCategoryPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const categoriesOnPage = data.slice(startIndex, endIndex);
    
    if(dom.categoriesTableBody) dom.categoriesTableBody.innerHTML = '';
    if(dom.noCategoriesMsg) dom.noCategoriesMsg.classList.toggle('d-none', categoriesOnPage.length > 0);
    
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
        if(dom.categoriesTableBody) dom.categoriesTableBody.appendChild(row);
    });
    renderGenericPagination('categories-pagination', data.length, currentCategoryPage, 'changeCategoryPage');
    // Bỏ lucide.createIcons() khỏi đây
};

function renderAuthors(data) {
    const startIndex = (currentAuthorPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const authorsOnPage = data.slice(startIndex, endIndex);
    if(dom.authorsTableBody) dom.authorsTableBody.innerHTML = '';
    if(dom.noAuthorsMsg) dom.noAuthorsMsg.classList.toggle('d-none', authorsOnPage.length > 0);
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
        if(dom.authorsTableBody) dom.authorsTableBody.appendChild(row);
    });
    renderGenericPagination('authors-pagination', data.length, currentAuthorPage, 'changeAuthorPage');
    // Bỏ lucide.createIcons() khỏi đây
};
function renderComments(data) {
    const startIndex = (currentCommentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const commentsOnPage = data.slice(startIndex, endIndex);
    if(dom.commentsTableBody) dom.commentsTableBody.innerHTML = '';
    if(dom.noCommentsMsg) dom.noCommentsMsg.classList.toggle('d-none', commentsOnPage.length > 0);
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
        if(dom.commentsTableBody) dom.commentsTableBody.appendChild(row);
    });
    renderGenericPagination('comments-pagination', data.length, currentCommentPage, 'changeCommentPage');
    // Bỏ lucide.createIcons() khỏi đây
};


// =========================================================================================
// --- CRUD / FILTER LOGIC (Đã khôi phục các hàm bị thiếu) ---
// =========================================================================================

/**
 * Khôi phục hàm filterTable bị thiếu (gây lỗi ReferenceError)
 * Đã định nghĩa trên window để khắc phục lỗi scope/hoisting
 */
window.filterTable = function(searchTerm, type) {
    const lowerCaseTerm = searchTerm.toLowerCase().trim();
    if (type === 'book') {
        const sourceData = realBooksData.length > 0 ? realBooksData : mockBooksData;
        currentFilteredBooks = sourceData.filter(item =>
            (item.title || '').toLowerCase().includes(lowerCaseTerm) ||
            (item.author || '').toLowerCase().includes(lowerCaseTerm) ||
            (item.id || '').toLowerCase().includes(lowerCaseTerm)
        );
        currentBookPage = 1;
        renderBooks(currentFilteredBooks);
    } else if (type === 'user') {
        const sourceData = realUsersData.length > 0 ? realUsersData : mockUsersData;
        currentFilteredUsers = sourceData.filter(item =>
            (item.email || '').toLowerCase().includes(lowerCaseTerm) ||
            (item.ten || '').toLowerCase().includes(lowerCaseTerm) || 
            (item.id || '').toLowerCase().includes(lowerCaseTerm)
        );
        currentUserPage = 1;
        renderUsers(currentFilteredUsers);
    } else if (type === 'author') {
        currentFilteredAuthors = mockAuthorData.filter(item =>
            (item.name || '').toLowerCase().includes(lowerCaseTerm) ||
            (item.id || '').toLowerCase().includes(lowerCaseTerm) ||
            (item.type || '').toLowerCase().includes(lowerCaseTerm)
        );
        currentAuthorPage = 1;
        renderAuthors(currentFilteredAuthors);
    } else if (type === 'category') {
        const sourceData = realCategoryData.length > 0 ? realCategoryData : mockCategoryData;
        currentFilteredCategories = sourceData.filter(item =>
            (item.name || '').toLowerCase().includes(lowerCaseTerm) ||
            (item.id || '').toLowerCase().includes(lowerCaseTerm)
        );
        currentCategoryPage = 1;
        renderCategories(currentFilteredCategories);
    }
}

// Hàm lưu (CRUD)
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

    synchronizeMetadata();
    currentFilteredBooks = realBooksData.length > 0 ? realBooksData : mockBooksData;
    renderBooks(currentFilteredBooks);
    itemModal.hide();
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
    currentFilteredUsers = realUsersData.length > 0 ? realUsersData : mockUsersData;
    renderUsers(currentFilteredUsers);
    itemModal.hide();
};
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
        count: 0, 
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
    currentFilteredCategories = realCategoryData.length > 0 ? realCategoryData : mockCategoryData;
    renderCategories(currentFilteredCategories);
    itemModal.hide();
};
window.executeDelete = (type) => {
    if (!bookOrUserToDelete) return;
    
    if (type === 'book') {
        mockBooksData = mockBooksData.filter(b => b.id !== bookOrUserToDelete);
        realBooksData = realBooksData.filter(b => b.id !== bookOrUserToDelete); 
        currentFilteredBooks = realBooksData.length > 0 ? realBooksData : mockBooksData;
        const totalPages = Math.ceil(currentFilteredBooks.length / itemsPerPage);
        if (currentBookPage > totalPages && currentBookPage > 1) currentBookPage--;
        renderBooks(currentFilteredBooks);
        showToast(`Đã xóa sách ID: ${bookOrUserToDelete}`, 'bg-danger');
    } else if (type === 'user') {
        mockUsersData = mockUsersData.filter(u => u.id !== bookOrUserToDelete);
        realUsersData = realUsersData.filter(u => u.id !== bookOrUserToDelete); 
        currentFilteredUsers = realUsersData.length > 0 ? realUsersData : mockUsersData;
        const totalPages = Math.ceil(currentFilteredUsers.length / itemsPerPage);
        if (currentUserPage > totalPages && currentUserPage > 1) currentUserPage--;
        renderUsers(currentFilteredUsers);
        showToast(`Đã xóa người dùng ID: ${bookOrUserToDelete}`, 'bg-danger');
    } else if (type === 'category') { 
        const categoryToDelete = (realCategoryData.length > 0 ? realCategoryData : mockCategoryData).find(c => c.id === bookOrUserToDelete);
        if (categoryToDelete && categoryToDelete.count > 0) {
            showToast(`Không thể xóa thể loại "${categoryToDelete.name}" vì có ${categoryToDelete.count} sách đang sử dụng.`, 'bg-danger');
            deleteModal.hide();
            return;
        }
        mockCategoryData = mockCategoryData.filter(c => c.id !== bookOrUserToDelete);
        realCategoryData = realCategoryData.filter(c => c.id !== bookOrUserToDelete); 
        currentFilteredCategories = realCategoryData.length > 0 ? realCategoryData : mockCategoryData;
        const totalPages = Math.ceil(currentFilteredCategories.length / itemsPerPage);
        if (currentCategoryPage > totalPages && currentCategoryPage > 1) currentCategoryPage--;
        renderCategories(currentFilteredCategories);
        showToast(`Đã xóa Thể loại ID: ${bookOrUserToDelete}`, 'bg-danger');
    } else if (type === 'author') {
        mockAuthorData = mockAuthorData.filter(a => a.id !== bookOrUserToDelete);
        currentFilteredAuthors = mockAuthorData;
        const totalPages = Math.ceil(currentFilteredAuthors.length / itemsPerPage);
        if (currentAuthorPage > totalPages && currentAuthorPage > 1) currentAuthorPage--;
        renderAuthors(currentFilteredAuthors);
        showToast(`Đã xóa Tác giả/NXB ID: ${bookOrUserToDelete}`, 'bg-danger');
    }
    
    synchronizeMetadata();
    deleteModal.hide();
};


// --- HÀM SHOW MODAL CHUNG (BỊ THIẾU LOGIC) ---
window.showCategoryModal = (mode, itemId = '') => {
    document.getElementById('item-mode').value = mode + '_category';
    document.getElementById('original-id').value = itemId;
    const isEdit = mode === 'edit';
    
    dom.formFields.row2.classList.add('d-none');
    dom.formFields.descField.classList.add('d-none');
    dom.formFields.isAudioField.classList.add('d-none');
    dom.formFields.authorTypeField.style.display = 'none';
    if(dom.formFields.premiumCheckTitle) dom.formFields.premiumCheckTitle.style.display = 'none';
    if(dom.formFields.isPremium.closest('.col-md-4')) dom.formFields.isPremium.closest('.col-md-4').style.display = 'none';
    dom.formFields.titleLabel.textContent = 'Tên Thể loại *';
    document.getElementById('item-form').reset();
    
    const sourceData = realCategoryData.length > 0 ? realCategoryData : mockCategoryData;
    
    if (isEdit) {
        dom.modalTitle.textContent = `Chỉnh Sửa Thể loại: ${itemId}`;
        document.getElementById('save-btn').innerHTML = `<i data-lucide="save" class="me-1" style="width: 18px; height: 18px;"></i><span>Lưu Thay Đổi</span>`;
        const category = sourceData.find(c => c.id === itemId);
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
    
    dom.formFields.row2.classList.add('d-none');
    dom.formFields.descField.classList.add('d-none');
    dom.formFields.isAudioField.classList.add('d-none');
    dom.formFields.authorTypeField.style.display = 'block';
    if(dom.formFields.premiumCheckTitle) dom.formFields.premiumCheckTitle.style.display = 'block';
    if(dom.formFields.isPremium.closest('.col-md-4')) dom.formFields.isPremium.closest('.col-md-4').style.display = 'block';
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
    if(dom.formFields.premiumCheckTitle) dom.formFields.premiumCheckTitle.style.display = 'block';
    if(dom.formFields.isPremium.closest('.col-md-4')) dom.formFields.isPremium.closest('.col-md-4').style.display = 'block';
    dom.formFields.premiumLabel.textContent = 'Chỉ dành cho Hội viên VIP';
    dom.formFields.titleLabel.textContent = 'Tên Sách *';
    document.getElementById('item-form').reset();
    
    const sourceData = realBooksData.length > 0 ? realBooksData : mockBooksData;
    
    if (isEdit) {
        dom.modalTitle.textContent = `Chỉnh Sửa Sách: ${itemId}`;
        document.getElementById('save-btn').innerHTML = `<i data-lucide="save" class="me-1" style="width: 18px; height: 18px;"></i><span>Lưu Thay Đổi</span>`;
        const book = sourceData.find(b => b.id === itemId);
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
    if(dom.formFields.premiumCheckTitle) dom.formFields.premiumCheckTitle.style.display = 'block';
    if(dom.formFields.isPremium.closest('.col-md-4')) dom.formFields.isPremium.closest('.col-md-4').style.display = 'block';
    dom.formFields.premiumLabel.textContent = 'Đặt thành viên Premium';
    dom.formFields.titleLabel.textContent = 'Email Người Dùng *';
    dom.modalTitle.textContent = isEdit ? `Chỉnh Sửa Người Dùng: ${itemId}` : "Thêm Người Dùng Mới";
    document.getElementById('save-btn').innerHTML = isEdit ? `<i data-lucide="save" class="me-1" style="width: 18px; height: 18px;"></i><span>Lưu Người Dùng</span>` : `<i data-lucide="plus" class="me-1" style="width: 18px; height: 18px;"></i><span>Tạo Người Dùng</span>`;
    document.getElementById('item-form').reset();
    
    const sourceData = realUsersData.length > 0 ? realUsersData : mockUsersData;
    
    if (isEdit) {
        const user = sourceData.find(u => u.id === itemId);
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
window.editUser = (id) => { console.log('Edit User: ' + id); showUserModal('edit', id); };
window.editTheLoai = (id) => { console.log('Edit Category: ' + id); showCategoryModal('edit', id); };
window.viewBookDetails = (id) => { console.log('View Book Details: ' + id); };
window.deleteTheLoai = (id) => { confirmDelete(id, 'category'); };
window.loadSettings = () => { 
    // MOCK IMPLEMENTATION
    const siteNameInput = document.getElementById('setting-site-name');
    const taxRateInput = document.getElementById('setting-tax-rate');
    const maxUploadInput = document.getElementById('setting-max-upload');

    if (siteNameInput) siteNameInput.value = mockSettings.siteName;
    if (taxRateInput) taxRateInput.value = mockSettings.taxRate;
    if (maxUploadInput) maxUploadInput.value = mockSettings.maxUploadSize;
    console.log('Loading settings from mock.'); 
};
window.saveSettings = () => {
    mockSettings.siteName = document.getElementById('setting-site-name').value;
    mockSettings.taxRate = parseInt(document.getElementById('setting-tax-rate').value) || 0;
    mockSettings.maxUploadSize = parseInt(document.getElementById('setting-max-upload').value) || 0;
    showToast("Đã lưu Cấu hình (Mock) thành công!", 'bg-success');
    const message = document.getElementById('settings-save-message');
    if (message) {
        message.classList.remove('d-none');
        setTimeout(() => message.classList.add('d-none'), 3000);
    }
};

function updateReportStats(userData, bookData) {
    const activeBooks = bookData.filter(b => b.status === 'Active').length;
    const audioBooks = bookData.filter(b => b.format === 'audiobook').length;
    const totalBooks = bookData.length;
    const premiumUsers = userData.filter(u => u.plan === 'Premium').length;
    const totalUsers = userData.length;
    
    const activeBooksSpan = document.getElementById('report-active-books');
    if (activeBooksSpan) activeBooksSpan.textContent = `${activeBooks} / ${totalBooks}`;
    
    const audioRatioSpan = document.getElementById('report-audio-ratio');
    if (audioRatioSpan) audioRatioSpan.textContent = totalBooks > 0 ? `${((audioBooks / totalBooks) * 100).toFixed(1)}%` : '0%';
    
    const totalUsersSpan = document.getElementById('report-total-users');
    if (totalUsersSpan) totalUsersSpan.textContent = totalUsers;
    
    const premiumUsersSpan = document.getElementById('report-premium-users');
    if (premiumUsersSpan) premiumUsersSpan.textContent = totalUsers > 0 ? `${premiumUsers} (${((premiumUsers / totalUsers) * 100).toFixed(1)}%)` : '0 (0%)';
};

window.saveAuthorPublisher = () => { console.log('Save Author/Publisher (Mock)'); showToast("Lưu Tác giả/NXB (Mock)", 'bg-info'); itemModal.hide(); };


// --- GLOBAL UI FUNCTIONS ---
window.showSection = (sectionId, element) => {
    document.querySelectorAll('.content-section').forEach(section => section.classList.add('d-none'));
    const targetSection = document.getElementById(sectionId);
    if(targetSection) targetSection.classList.remove('d-none');
    
    const titleMap = {
        'dashboard': ['Dashboard Tổng Quan', 'Thống kê hoạt động và báo cáo nhanh.'],
        'book-management': ['Quản Lý Sách', 'Tổng quan về kho sách, chỉnh sửa, thêm mới và xóa.'],
        'category-management': ['Quản Lý Thể Loại', 'Thêm, sửa, xóa các danh mục sách.'],
        'author-publisher-management': ['Quản Lý Tác Giả & NXB', 'Quản lý thông tin tác giả và nhà xuất bản.'],
        'user-management': ['Quản Lý Người Dùng', 'Quản lý tài khoản, quyền truy cập và gói thành viên.'],
        'comment-management': ['Quản Lý Bình Luận', 'Kiểm duyệt và quản lý các bình luận của người dùng.'],
        'settings': ['Cài đặt Hệ Thống', 'Thiết lập chung cho ứng dụng và quản trị viên.'],
    };
    
    const mainTitle = document.getElementById('main-title');
    if(mainTitle) mainTitle.textContent = titleMap[sectionId][0];
    const mainSubtitle = document.getElementById('main-subtitle');
    if(mainSubtitle) mainSubtitle.textContent = titleMap[sectionId][1];

    // Xử lý active link
    document.querySelectorAll('.sidebar-link-item').forEach(link => link.classList.remove('active'));
    if (element) {
        element.classList.add('active');
    }

    synchronizeMetadata(); 
    
    // Tải dữ liệu cần thiết và render
    if (sectionId === 'book-management') {
        currentFilteredBooks = realBooksData.length > 0 ? realBooksData : mockBooksData;
        currentBookPage = 1;
        renderBooks(currentFilteredBooks);
    }
    if (sectionId === 'user-management') {
        currentFilteredUsers = realUsersData.length > 0 ? realUsersData : mockUsersData;
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
        const finalUsers = realUsersData.length > 0 ? realUsersData : mockUsersData;
        const finalBooks = realBooksData.length > 0 ? realBooksData : mockBooksData;
        updateReportStats(finalUsers, finalBooks);
        updateCharts(finalBooks, finalUsers);
    }
    // Cần phải gọi lại lucide.createIcons() sau khi cập nhật nội dung
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        lucide.createIcons();
    }
};

// --- INITIALIZATION (QUAN TRỌNG: CHẠY API LOAD DATA) ---
document.addEventListener('DOMContentLoaded', () => {
    // Gọi lucide.createIcons() ngay khi DOM tải xong
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        lucide.createIcons();
    }
    
    // 1. Tải Category (cần thiết cho Book)
    loadRealCategoryData(() => {
        // 2. TẢI DỮ LIỆU SÁCH
        loadRealBookData(() => {
            // 3. TẢI DỮ LIỆU USER
            loadRealUserData(() => {
                
                // 4. Đồng bộ Metadata (sau khi TẤT CẢ data thực đã được tải)
                synchronizeMetadata(); 
                
                // 5. Gán Filtered Data để sử dụng trong render đầu tiên
                currentFilteredBooks = realBooksData.length > 0 ? realBooksData : mockBooksData;
                currentFilteredCategories = realCategoryData.length > 0 ? realCategoryData : mockCategoryData;
                currentFilteredUsers = realUsersData.length > 0 ? realUsersData : mockUsersData;

                // 6. Hiển thị Dashboard
                // Giả định element đầu tiên là nav-dashboard
                window.showSection('dashboard', document.getElementById('nav-dashboard'));
            });
        });
    });
});