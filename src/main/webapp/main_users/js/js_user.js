/*
 * =============================================================================
 * == FILE JAVASCRIPT HOÀN CHỈNH CHO TRANG CHỦ USER (PHIÊN BẢN CUỐI) ==
 * =============================================================================
 * Bao gồm:
 * 1. Dữ liệu sách mở rộng (18 cuốn).
 * 2. Logic hiển thị sách và modal chi tiết.
 * 3. Logic điều khiển Slider (Carousel).
 * 4. Logic điều khiển tất cả các Menu (User, Mega, Mobile).
 * 5. Logic tìm kiếm trực tiếp (Live Search).
 * 6. TỰ ĐỘNG CUỘN đến phần kết quả khi lọc hoặc tìm kiếm.
 * =============================================================================
 */

// --- PHẦN 1: DỮ LIỆU MẪU (MOCK DATA) - ĐÃ MỞ RỘNG ---
const MOCK_BOOKS = [
    {title: "9 Chiến Lược Tâm Lý", author: "Vũ Minh", price: "99.000₫", imgColor: "bg-red-400", isNew: true, category: "Kinh Doanh", description: "Phân tích sâu sắc về tâm lý khách hàng và các kỹ thuật thuyết phục trong kinh doanh hiện đại."},
    {title: "Đắc Nhân Tâm", author: "Dale Carnegie", price: "Miễn Phí", imgColor: "bg-blue-400", isBestSeller: true, category: "Kỹ Năng", description: "Cuốn sách kinh điển về nghệ thuật đối nhân xử thế, giúp bạn xây dựng các mối quan hệ hiệu quả."},
    {title: "Quân Vương", author: "Machiavelli", price: "60.000₫", imgColor: "bg-amber-400", isAudio: true, category: "Kinh Doanh", description: "Một trong những tác phẩm gây tranh cãi nhất về chính trị và quyền lực."},
    {title: "Tư Duy Nhanh và Chậm", author: "Daniel Kahneman", price: "150.000₫", imgColor: "bg-cyan-400", category: "Kinh Doanh", description: "Khám phá hai hệ thống tư duy chi phối mọi quyết định của con người."},
    {title: "Nhà Giả Kim", author: "Paulo Coelho", price: "75.000₫", imgColor: "bg-green-400", category: "Văn Học", description: "Câu chuyện về cậu bé chăn cừu Santiago đi tìm kho báu, một hành trình khám phá ra ý nghĩa của cuộc sống."},
    {title: "Tuổi Trẻ Đáng Giá", author: "Rosie Nguyễn", price: "55.000₫", imgColor: "bg-pink-400", isNew: true, category: "Kỹ Năng", description: "Lời khuyên chân thành và thực tế dành cho giới trẻ về cách quản lý thời gian, tài chính và xây dựng sự nghiệp."},
    {title: "Vũ Trụ Trong Vỏ Hạt Dẻ", author: "Stephen Hawking", price: "180.000₫", imgColor: "bg-purple-500", category: "Khoa Học", description: "Giải thích các khái niệm phức tạp nhất của vật lý hiện đại như lý thuyết dây, hố đen một cách dễ hiểu."},
    {title: "Sapiens - Lược Sử Loài Người", author: "Yuval Noah Harari", price: "160.000₫", imgColor: "bg-amber-700", category: "Khoa Học", description: "Khám phá hành trình tiến hóa của loài người từ buổi bình minh đến kỷ nguyên hiện đại."},
    {title: "Người Giàu Có Nhất Thành Babylon", author: "George S. Clason", price: "70.000₫", imgColor: "bg-yellow-600", category: "Kinh Doanh", description: "Các bí quyết về tiết kiệm, đầu tư và làm giàu được truyền lại qua các câu chuyện cổ Babylon."},
    {title: "Khởi Nghiệp Tinh Gọn", author: "Eric Ries", price: "110.000₫", imgColor: "bg-indigo-600", category: "Kinh Doanh", description: "Phương pháp tạo ra sản phẩm mới dưới điều kiện không chắc chắn, tập trung vào vòng lặp 'Xây dựng-Đo lường-Học hỏi'."},
    {title: "Hành Trình Về Phương Đông", author: "Baird T. Spalding", price: "Miễn Phí", imgColor: "bg-teal-700", isAudio: true, category: "Sách Nói", description: "Một hành trình tâm linh kỳ thú, ghi lại những trải nghiệm và học hỏi từ các bậc thầy giác ngộ ở phương Đông."},
    {title: "Sức Mạnh Của Thói Quen", author: "Charles Duhigg", price: "120.000₫", imgColor: "bg-orange-500", category: "Kỹ Năng", description: "Khám phá khoa học đằng sau việc hình thành thói quen trong cuộc sống và công việc của chúng ta."},
    {title: "Atomic Habits", author: "James Clear", price: "135.000₫", imgColor: "bg-red-500", isBestSeller: true, category: "Kỹ Năng", description: "Phương pháp xây dựng những thói quen tốt và phá bỏ những thói quen xấu thông qua những cải tiến nhỏ, 1% mỗi ngày."},
    {title: "Tội Ác và Hình Phạt", author: "Fyodor Dostoevsky", price: "199.000₫", imgColor: "bg-gray-700", category: "Văn Học", description: "Một trong những tiểu thuyết vĩ đại nhất, đào sâu vào tâm lý tội lỗi, sự chuộc tội và đạo đức con người."},
    {title: "Lược Sử Thời Gian", author: "Stephen Hawking", price: "175.000₫", imgColor: "bg-blue-800", category: "Khoa Học", description: "Một chuyến du hành đến những bí ẩn lớn nhất của vũ trụ, từ Vụ Nổ Lớn đến các hố đen."},
    {title: "Bố Già", author: "Mario Puzo", price: "189.000₫", imgColor: "bg-stone-800", category: "Văn Học", description: "Thiên tiểu thuyết kinh điển về thế giới ngầm của Mafia Ý tại Mỹ, về quyền lực, gia đình và sự phản bội."},
    {title: "Hoàng Tử Bé", author: "Antoine de Saint-Exupéry", price: "45.000₫", imgColor: "bg-sky-400", category: "Văn Học", description: "Một câu chuyện triết lý dành cho mọi lứa tuổi về tình bạn, tình yêu và sự mất mát qua con mắt của một đứa trẻ."},
    {title: "Yêu", author: "Osho", price: "Miễn Phí", imgColor: "bg-pink-500", isAudio: true, category: "Tình Cảm", description: "Những bài diễn giải sâu sắc và độc đáo về bản chất của tình yêu, giúp ta hiểu và yêu một cách trọn vẹn hơn."}
];


// --- PHẦN 2: CÁC HÀM XỬ LÝ LOGIC (Định nghĩa ở phạm vi toàn cục để onclick gọi được) ---

function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card-item rounded-xl overflow-hidden bg-white shadow-lg cursor-pointer';
    card.onclick = () => showBookDetailModal(book);
    let badge = '';
    if (book.isNew) badge = '<span class="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">MỚI</span>';
    else if (book.isAudio) badge = '<span class="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">SÁCH NÓI</span>';
    card.innerHTML = `<div class="relative aspect-[3/4] ${book.imgColor} flex items-center justify-center p-4">${badge}<svg xmlns="http://www.w3.org/2000/svg" width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-white opacity-80"><path d="M4 19.5V15A2.5 2.5 0 0 1 6.5 12.5V5A2.5 2.5 0 0 1 9 2.5h6A2.5 2.5 0 0 1 17.5 5v7.5A2.5 2.5 0 0 1 20 15v4.5"/><path d="M4 19.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V19H4v.5z"/></svg></div><div class="p-3"><h4 class="text-base font-bold text-gray-900 line-clamp-2">${book.title}</h4><p class="text-sm text-gray-500 line-clamp-1 mt-1">${book.author}</p><p class="mt-2 text-md font-extrabold ${book.price === 'Miễn Phí' ? 'text-primary' : 'text-red-600'}">${book.price}</p></div>`;
    return card;
}

function filterBooks(filterValue, filterType = 'category') {
    const container = document.getElementById('filtered-books-list');
    const titleElement = document.getElementById('filtered-title');
    if (!container || !titleElement) return;

    container.innerHTML = '';
    let filtered = MOCK_BOOKS;
    
    if (filterValue && filterValue !== 'all') {
        filtered = MOCK_BOOKS.filter(book => book.category === filterValue);
        titleElement.textContent = `Thể Loại: ${filterValue}`;
    } else {
        titleElement.textContent = 'Sách Mới & Nổi Bật';
    }

    if (filtered.length > 0) {
        filtered.forEach(book => container.appendChild(createBookCard(book)));
    } else {
        container.innerHTML = `<p class="col-span-full text-center text-gray-500">Không tìm thấy sách nào.</p>`;
    }

    // TỰ ĐỘNG CUỘN XUỐNG PHẦN KẾT QUẢ
    document.getElementById('filtered-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
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
    const results = MOCK_BOOKS.filter(b => b.title.toLowerCase().includes(searchTerm) || b.author.toLowerCase().includes(searchTerm));

    if (results.length > 0) {
        results.forEach(book => container.appendChild(createBookCard(book)));
    } else {
        container.innerHTML = `<p class="col-span-full text-center text-gray-500">Không tìm thấy kết quả nào.</p>`;
    }
    
    // TỰ ĐỘNG CUỘN XUỐNG PHẦN KẾT QUẢ
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
    closeAllMegaMenus(); // Luôn đóng tất cả trước
    if (!isOpen) { // Chỉ mở nếu trước đó nó đang đóng
        menu.classList.add('open');
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

    // --- LOGIC CHO USER MENU ---
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenu = document.getElementById('user-menu');
    if (userMenuButton && userMenu) {
        userMenuButton.addEventListener('click', (event) => {
            event.stopPropagation();
            userMenu.classList.toggle('hidden');
        });
    }

    // --- LOGIC ĐÓNG CÁC MENU KHI CLICK RA NGOÀI ---
    window.addEventListener('click', (event) => {
        // Đóng user menu
        if (userMenu && !userMenu.classList.contains('hidden') && !userMenuButton.contains(event.target)) {
            userMenu.classList.add('hidden');
        }
        // Đóng mega menus
        const openMegaMenu = document.querySelector('.mega-menu.open');
        if (openMegaMenu && !openMegaMenu.closest('.relative').contains(event.target)) {
            closeAllMegaMenus();
        }
    });

    // --- HIỂN THỊ SÁCH BAN ĐẦU ---
    filterBooks('all');

    // --- KHỞI TẠO SLIDER DOTS ---
    const slider = document.getElementById('hero-slider');
    const dotsContainer = document.getElementById('slider-dots');
    if (slider && dotsContainer) {
        const slides = slider.querySelectorAll('.slider-item');
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
});