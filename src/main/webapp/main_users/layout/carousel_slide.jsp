<%-- 
    Document   : carousel_slide
    Created on : Oct 26, 2025, 6:27:07 PM
    Author     : PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<section class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <!-- Search bar (Desktop/Tablet) -->
    <div class="relative mb-8 shadow-xl rounded-xl hidden md:block">
        <input type="text" id="desktop-search-input" onkeyup="liveSearch(this.value)"
               class="w-full py-4 pl-12 pr-4 text-lg border-2 border-primary rounded-xl focus:ring-4 focus:ring-primary/50 focus:border-primary transition duration-200"
               placeholder="Tìm kiếm sách, tác giả, thể loại...">
            <div class="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
    </div>

    <h2 class="text-2xl font-bold mb-4 text-gray-800">Ưu Đãi & Sách Nổi Bật</h2>
    <div class="relative">

        <!-- Slider Content -->
        <div id="hero-slider" class="flex overflow-x-auto snap-x snap-mandatory rounded-2xl shadow-xl aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5]">
            <!-- Slide 1: Banner Campaign -->
            <div class="slider-item bg-gray-100 flex items-center justify-center p-6" style="background-image: url('https://placehold.co/1200x500/059669/ffffff?text=Ưu+Đãi+Hội+Viên+Đặc+Biệt'); background-size: cover; background-position: center;">
                <div class="text-center text-white bg-black bg-opacity-40 p-6 rounded-xl backdrop-blur-sm">
                    <h3 class="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">MUA GÓI PREMIUM TẶNG NGAY 3 THÁNG</h3>
                    <p class="text-lg md:text-xl font-medium drop-shadow-md">Trải nghiệm không giới hạn sách điện tử và sách nói chất lượng cao.</p>
                    <button class="mt-4 bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300">
                        Đăng Ký Ngay
                    </button>
                </div>
            </div>

            <!-- Slide 2: Top Sách Mới -->
            <div class="slider-item bg-gray-200 flex items-center justify-center p-6" style="background-image: url('https://placehold.co/1200x500/2563eb/ffffff?text=Top+Sách+Mới+Ra+Mắt'); background-size: cover; background-position: center;">
                <div class="text-center text-white bg-black bg-opacity-40 p-6 rounded-xl backdrop-blur-sm">
                    <h3 class="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">TOP 10 SÁCH PHÁT TRIỂN BẢN THÂN</h3>
                    <p class="text-lg md:text-xl font-medium drop-shadow-md">Tải về đọc ngay những tựa sách đang gây bão cộng đồng.</p>
                    <button class="mt-4 bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
                        Xem Bộ Sưu Tập
                    </button>
                </div>
            </div>

            <!-- Slide 3: Sách Nói -->
            <div class="slider-item bg-gray-300 flex items-center justify-center p-6" style="background-image: url('https://placehold.co/1200x500/ef4444/ffffff?text=Nghe+Sách+Mọi+Lúc+Mọi+Nơi'); background-size: cover; background-position: center;">
                <div class="text-center text-white bg-black bg-opacity-40 p-6 rounded-xl backdrop-blur-sm">
                    <h3 class="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">KHÁM PHÁ THẾ GIỚI SÁCH NÓI</h3>
                    <p class="text-lg md:text-xl font-medium drop-shadow-md">Hàng ngàn tựa sách với giọng đọc truyền cảm.</p>
                    <button class="mt-4 bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
                        Nghe Thử Miễn Phí
                    </button>
                </div>
            </div>
        </div>

        <!-- Slider Navigation Buttons -->
        <button onclick="slide('prev')" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 p-3 rounded-full text-white hover:bg-opacity-50 transition hidden md:block z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button onclick="slide('next')" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 p-3 rounded-full text-white hover:bg-opacity-50 transition hidden md:block z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>

        <!-- Dots Indicator -->
        <div id="slider-dots" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            <!-- Dots will be generated by JS -->
        </div>
    </div>
</section>
