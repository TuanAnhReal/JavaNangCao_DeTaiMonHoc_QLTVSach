
// --- PHẦN 1: ÁNH XẠ DỮ LIỆU (DATA MAPPING) ---
let ALL_BOOKS = []; // Biến toàn cục để lưu trữ danh sách sách

/**
 * Chuyển đổi đối tượng sách từ Java (qua JSON) sang định dạng JS cần.
 * @param {object} dbBook - Đối tượng sách thô từ server.
 * @returns {object} - Đối tượng sách đã được chuẩn hóa cho JS.
 */
function mapDbBookToJs(dbBook) {
    const ngayDangDate = dbBook.ngayDang ? new Date(dbBook.ngayDang) : new Date();
    // APP_CONTEXT_PATH được cung cấp từ index_user.jsp
    const imageUrl = dbBook.anh ? (APP_CONTEXT_PATH + dbBook.anh) : 'https://placehold.co/300x400/F3F4F6/9CA3AF?text=No+Image';

    return {
        title: dbBook.tieuDe,
        author: dbBook.nguoiDang ? dbBook.nguoiDang.ten : "Không rõ tác giả",
        price: dbBook.gia === 0 ? "Miễn Phí" : dbBook.gia.toLocaleString('vi-VN') + 'đ',
        imageUrl: imageUrl,
        isNew: (new Date() - ngayDangDate) < (1000 * 60 * 60 * 24 * 7), 
        isAudio: dbBook.theLoai ? dbBook.theLoai.ten === 'Sách Nói' : false,
        category: dbBook.theLoai ? dbBook.theLoai.ten : "Chưa phân loại",
        description: dbBook.moTaNgan || "Chưa có mô tả cho cuốn sách này."
    };
}

// --- PHẦN 2: CÁC HÀM XỬ LÝ LOGIC (Định nghĩa ở phạm vi toàn cục) ---

function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card-item rounded-xl overflow-hidden bg-white shadow-lg cursor-pointer';
    card.onclick = () => showBookDetailModal(book);
    let badge = '';
    if (book.isNew) badge = '<span class="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">MỚI</span>';
    else if (book.isAudio) badge = '<span class="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">SÁCH NÓI</span>';
    
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

    document.getElementById('filtered-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// Gán hàm cho các file JSP cũ
const filterByFormat = filterBooks; 

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

function showBookDetailModal(book) {
    const modal = document.getElementById('book-detail-modal');
    if (!modal) return;
    document.getElementById('modal-title').textContent = book.title;
    document.getElementById('modal-author').textContent = `Tác giả: ${book.author}`;
    document.getElementById('modal-price').textContent = book.price;
    document.getElementById('modal-category').textContent = book.category;
    document.getElementById('modal-description').textContent = book.description;
    const modalCover = document.getElementById('modal-cover');
    if (modalCover) {
        modalCover.innerHTML = `<img src="${book.imageUrl}" alt="${book.title}" class="w-full h-full object-cover rounded-lg">`;
    }
    const audioBtn = document.getElementById('modal-audio-btn');
    if (audioBtn) audioBtn.classList.toggle('hidden', !book.isAudio);
    modal.classList.remove('hidden');
}

function hideBookDetailModal() {
    const modal = document.getElementById('book-detail-modal');
    if(modal) modal.classList.add('hidden');
}

function slide(direction) {
    const slider = document.getElementById('hero-slider');
    if (!slider) return;
    const scrollAmount = direction === 'next' ? slider.clientWidth : -slider.clientWidth;
    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

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

function toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileMenu && mobileOverlay) {
        mobileMenu.classList.toggle('open');
        mobileOverlay.classList.toggle('hidden');
    }
}

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
        // Biến SERVER_BOOKS_JSON và APP_CONTEXT_PATH được cung cấp từ index_user.jsp
        if (typeof SERVER_BOOKS_JSON !== 'undefined' && SERVER_BOOKS_JSON && SERVER_BOOKS_JSON.trim() !== "" && SERVER_BOOKS_JSON.trim() !== "[]") {
            const serverBooks = JSON.parse(SERVER_BOOKS_JSON);
            ALL_BOOKS = serverBooks.map(mapDbBookToJs);
        } else {
             console.warn("Không tìm thấy dữ liệu sách từ server (SERVER_BOOKS_JSON rỗng).");
             ALL_BOOKS = []; 
        }
    } catch (e) {
        console.error("Lỗi parse JSON sách:", e, SERVER_BOOKS_JSON);
        ALL_BOOKS = [];
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

    // Logic đóng menu khi click ra ngoài
    window.addEventListener('click', (event) => {
        if (userMenuButton && userMenu && !userMenu.classList.contains('hidden') && !userMenuButton.contains(event.target) && !userMenu.contains(event.target)) {
            userMenu.classList.add('hidden');
        }
        const openMegaMenu = document.querySelector('.mega-menu.open');
        if (openMegaMenu && !openMegaMenu.closest('.relative').contains(event.target)) {
            closeAllMegaMenus();
        }
    });

    // =======================================================================
    // == BƯỚC 3: KHỞI TẠO SLIDER (PHẦN ĐÃ SỬA LỖI) ==
    // =======================================================================
    const slider = document.getElementById('hero-slider');
    const dotsContainer = document.getElementById('slider-dots');
    
    if (slider && dotsContainer) {
        const slides = slider.querySelectorAll('.slider-item');
        
        if (slides.length > 0) {
            // Tạo các nút (dot)
            slides.forEach((_, index) => {
                const dot = document.createElement('button'); // <button> là element
                dot.className = 'w-3 h-3 rounded-full bg-white/70 transition';
                dot.onclick = () => slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });
                dotsContainer.appendChild(dot);
            });
            
            // Hàm cập nhật dot nào đang active
            const updateDots = () => {
                 const activeIndex = Math.round(slider.scrollLeft / slider.clientWidth);
                 
                 dotsContainer.querySelectorAll('button').forEach((dot, index) => {
                    dot.classList.toggle('bg-primary', index === activeIndex);
                    dot.classList.toggle('bg-white/70', index !== activeIndex);
                });
            };
            
            slider.addEventListener('scroll', updateDots);
            updateDots(); // Cập nhật lần đầu khi tải trang
        }
    }
    
    // =======================================================================
    // == BƯỚC 4: HIỂN THỊ SÁCH BAN ĐẦU (PHẢI GỌI SAU CÙNG) ==
    // =======================================================================
    filterBooks('all');
});

