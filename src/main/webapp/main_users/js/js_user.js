/*
 * =============================================================================
 * == FILE JAVASCRIPT HOÀN CHỈNH CHO TRANG CHỦ USER ==
 * =============================================================================
 * Đọc dữ liệu sách từ biến 'SERVER_BOOKS_JSON' (do JSP cung cấp)
 * và ánh xạ (map) nó sang định dạng mà các hàm JS đang sử dụng.
 * Đã khôi phục đầy đủ Slider, Modal, Menus và Search.
 * =============================================================================
 */

// --- PHẦN 1: ÁNH XẠ DỮ LIỆU (DATA MAPPING) ---
let ALL_BOOKS = []; // Biến toàn cục để lưu trữ danh sách sách

/**
 * Chuyển đổi đối tượng sách từ Java (qua JSON) sang định dạng JS cần.
 * @param {object} dbBook - Đối tượng sách thô từ server.
 * @returns {object} - Đối tượng sách đã được chuẩn hóa cho JS.
 */
function mapDbBookToJs(dbBook) {
    // Chuyển đổi định dạng ngày tháng của Gson (nó là một chuỗi ISO)
    const ngayDangDate = dbBook.ngayDang ? new Date(dbBook.ngayDang) : new Date();
    
    // Tạo đường dẫn ảnh hoàn chỉnh, APP_CONTEXT_PATH được lấy từ index_user.jsp
    const imageUrl = dbBook.anh ? (APP_CONTEXT_PATH + dbBook.anh) : 'https://placehold.co/300x400/F3F4F6/9CA3AF?text=No+Image';

    return {
        title: dbBook.tieuDe,
        author: dbBook.nguoiDang ? dbBook.nguoiDang.ten : "Không rõ tác giả",
        price: dbBook.gia === 0 ? "Miễn Phí" : dbBook.gia.toLocaleString('vi-VN') + 'đ',
        imageUrl: imageUrl, // Sử dụng ảnh thật
        isNew: (new Date() - ngayDangDate) < (1000 * 60 * 60 * 24 * 7), // Sách mới trong 7 ngày
        isAudio: dbBook.theLoai ? dbBook.theLoai.ten === 'Sách Nói' : false,
        category: dbBook.theLoai ? dbBook.theLoai.ten : "Chưa phân loại",
        description: dbBook.moTaNgan || "Chưa có mô tả cho cuốn sách này."
    };
}


// --- PHẦN 2: CÁC HÀM XỬ LÝ LOGIC (Định nghĩa ở phạm vi toàn cục) ---

/**
 * Tạo thẻ HTML cho một cuốn sách.
 */
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card-item rounded-xl overflow-hidden bg-white shadow-lg cursor-pointer';
    card.onclick = () => showBookDetailModal(book);
    let badge = '';
    if (book.isNew) badge = '<span class="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">MỚI</span>';
    else if (book.isAudio) badge = '<span class="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">SÁCH NÓI</span>';
    
    // ĐÃ SỬA: Dùng <img> với book.imageUrl thay vì <div> với màu
    card.innerHTML = `
        <div class="relative aspect-[3/4] bg-gray-200">
            <img src="${book.imageUrl}" 
                 alt="${book.title}" 
                 class="w-full h-full object-cover"
                 onerror="this.src='https://placehold.co/300x400/F3F4F6/9CA3AF?text=Load+Error'">
            ${badge}
        </div>
        <div class="p-3">
            <h4 class="text-base font-bold text-gray-900 line-clamp-2">${book.title}</h4>
            <p class="text-sm text-gray-500 line-clamp-1 mt-1">${book.author}</p>
            <p class="mt-2 text-md font-extrabold ${book.price === 'Miễn Phí' ? 'text-primary' : 'text-red-600'}">${book.price}</p>
        </div>`;
    return card;
}

/**
 * Hiển thị danh sách sách dựa trên bộ lọc.
 */
function filterBooks(filterValue, filterType = 'category') {
    const container = document.getElementById('filtered-books-list');
    const titleElement = document.getElementById('filtered-title');
    if (!container || !titleElement) return;

    container.innerHTML = '';
    let filtered = ALL_BOOKS;
    
    if (filterValue && filterValue !== 'all') {
        filtered = ALL_BOOKS.filter(book => book.category === filterValue);
        titleElement.textContent = `Thể Loại: ${filterValue}`;
    } else {
        titleElement.textContent = 'Sách Mới & Nổi Bật';
    }

    if (filtered.length > 0) {
        filtered.forEach(book => container.appendChild(createBookCard(book)));
    } else {
        container.innerHTML = `<p class="col-span-full text-center text-gray-500">Không tìm thấy sách nào.</p>`;
    }

    // Tự động cuộn xuống
    document.getElementById('filtered-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
const filterByFormat = filterBooks; // Gán alias cho các hàm onclick cũ

/**
 * Tìm kiếm sách trực tiếp.
 */
function liveSearch(searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();
    const container = document.getElementById('filtered-books-list');
    const titleElement = document.getElementById('filtered-title');
    if (!container || !titleElement) return;

    if (searchTerm === '') {
        filterBooks('all');
        return;
    }

    container.innerHTML = '';
    titleElement.textContent = `Kết quả cho: "${searchTerm}"`;
    const results = ALL_BOOKS.filter(b => b.title.toLowerCase().includes(searchTerm) || b.author.toLowerCase().includes(searchTerm));

    if (results.length > 0) {
        results.forEach(book => container.appendChild(createBookCard(book)));
    } else {
        container.innerHTML = `<p class="col-span-full text-center text-gray-500">Không tìm thấy kết quả nào.</p>`;
    }
    
    document.getElementById('filtered-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Hiển thị modal chi tiết sách (đã cập nhật để hiển thị ảnh).
 */
function showBookDetailModal(book) {
    const modal = document.getElementById('book-detail-modal');
    if (!modal) return;
    
    document.getElementById('modal-title').textContent = book.title;
    document.getElementById('modal-author').textContent = `Tác giả: ${book.author}`;
    document.getElementById('modal-price').textContent = book.price;
    document.getElementById('modal-category').textContent = book.category;
    document.getElementById('modal-description').textContent = book.description;
    
    // Đã sửa: Hiển thị ảnh thật trong modal
    const modalCover = document.getElementById('modal-cover');
    if (modalCover) {
        modalCover.innerHTML = `<img src="${book.imageUrl}" alt="${book.title}" class="w-full h-full object-cover rounded-lg">`;
    }

    const audioBtn = document.getElementById('modal-audio-btn');
    if (audioBtn) audioBtn.classList.toggle('hidden', !book.isAudio);
    
    modal.classList.remove('hidden');
}

/**
 * Ẩn modal chi tiết sách.
 */
function hideBookDetailModal() {
    const modal = document.getElementById('book-detail-modal');
    if(modal) modal.classList.add('hidden');
}

/**
 * Chuyển slider.
 */
function slide(direction) {
    const slider = document.getElementById('hero-slider');
    if (!slider) return;
    const scrollAmount = direction === 'next' ? slider.clientWidth : -slider.clientWidth;
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

/**
 * Mở/đóng mega menu (Thể loại, Dịch vụ).
 */
function toggleMegaMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (!menu) return;
    const isOpen = menu.classList.contains('open');
    closeAllMegaMenus(); 
    if (!isOpen) { 
        menu.classList.add('open');
        const icon = menu.closest('.relative').querySelector('a > svg');
        if (icon) icon.classList.add('rotate-180');
    }
}

/**
 * Mở/đóng menu di động (trượt ngang).
 */
function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileMenu && mobileOverlay) {
        mobileMenu.classList.toggle('open');
        mobileOverlay.classList.toggle('hidden');
    }
}

/**
 * Đóng tất cả các mega menu đang mở.
 */
function closeAllMegaMenus() {
    document.querySelectorAll('.mega-menu.open').forEach(openMenu => {
        openMenu.classList.remove('open');
        const icon = openMenu.closest('.relative').querySelector('svg.rotate-180');
        if(icon) icon.classList.remove('rotate-180');
    });
}


// --- PHẦN 3: KHỞI TẠO CÁC SỰ KIỆN KHI TRANG TẢI XONG ---

document.addEventListener('DOMContentLoaded', function () {

    // Bước 1: Đọc và xử lý dữ liệu sách từ server
    try {
        if (typeof SERVER_BOOKS_JSON !== 'undefined' && SERVER_BOOKS_JSON && SERVER_BOOKS_JSON.trim() !== "" && SERVER_BOOKS_JSON.trim() !== "[]") {
            const serverBooks = JSON.parse(SERVER_BOOKS_JSON);
            ALL_BOOKS = serverBooks.map(mapDbBookToJs);
        } else {
             console.warn("Không tìm thấy dữ liệu sách từ server (SERVER_BOOKS_JSON rỗng).");
             ALL_BOOKS = []; // Đảm bảo ALL_BOOKS là mảng dù có lỗi
        }
    } catch (e) {
        console.error("Lỗi nghiêm trọng khi parse JSON sách:", e, SERVER_BOOKS_JSON);
        ALL_BOOKS = []; // Đảm bảo ALL_BOOKS là mảng dù có lỗi
    }

    // Bước 2: Gán sự kiện cho các Menu
    
    // Logic cho User Menu
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenu = document.getElementById('user-menu');
    if (userMenuButton && userMenu) {
        userMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            userMenu.classList.toggle('hidden');
        });
    }

    // Logic cho Mobile Menu
    const mobileMenuBtn = document.getElementById('menu-toggle-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.onclick = toggleMenu;
    }
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileOverlay) {
        mobileOverlay.onclick = toggleMenu;
    }

    // Logic đóng menu khi click ra ngoài
    window.addEventListener('click', (event) => {
        // Đóng user menu
        if (userMenuButton && userMenu && !userMenu.classList.contains('hidden') && !userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
            userMenu.classList.add('hidden');
        }
        // Đóng mega menus
        const openMegaMenu = document.querySelector('.mega-menu.open');
        if (openMegaMenu && !openMegaMenu.closest('.relative').contains(event.target)) {
            closeAllMegaMenus();
        }
    });

    // Bước 3: Khởi tạo Slider (Carousel)
    const slider = document.getElementById('hero-slider');
    const dotsContainer = document.getElementById('slider-dots');
    if (slider && dotsContainer) {
        const slides = slider.querySelectorAll('.slider-item');
        if (slides.length > 0) {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = 'w-3 h-3 rounded-full bg-white/70 transition';
                dot.onclick = () => slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });
                dotsContainer.appendChild(dot);
            });
            
            const updateDots = () => {
                 const activeIndex = Math.round(slider.scrollLeft / slider.clientWidth);
                 dotsContainer.childNodes.forEach((dot, index) => {
                    dot.classList.toggle('bg-primary', index === activeIndex);
                    dot.classList.toggle('bg-white/70', index !== activeIndex);
                });
            };
            slider.addEventListener('scroll', updateDots);
            updateDots(); // Cập nhật lần đầu
        }
    }
    
    // Bước 4: Hiển thị sách ban đầu (PHẢI GỌI SAU CÙNG)
    filterBooks('all');
});