<%-- 
    Document   : carousel_slide
    Created on : Oct 26, 2025
    Author     : PC (Đã chuyển sang dữ liệu động)
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<h2 class="text-2xl font-bold mb-4 text-gray-800">Sách Nổi Bật</h2>
    <div class="relative">

        <!-- Slider Content -->
        <div id="hero-slider" class="flex overflow-x-auto snap-x snap-mandatory rounded-2xl shadow-xl aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5]">
            
            <%-- Dùng JSTL để lặp qua danh sách sách nổi bật (từ Servlet) --%>
            <c:forEach var="book" items="${featuredBooks}">
                <div class="slider-item bg-gray-100 flex items-center justify-center p-6" 
                     style="background-image: url('<c:url value="${book.anhBanner != null ? book.anhBanner : 'https://placehold.co/1200x500/059669/ffffff?text=Sach+Noi+Bat'}" />'); background-size: cover; background-position: center;">
                    
                    <div class="text-center text-white bg-black bg-opacity-40 p-6 rounded-xl backdrop-blur-sm">
                        
                        <%-- Tiêu đề sách --%>
                        <h3 class="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">
                            <c:out value="${book.tieuDe}" />
                        </h3>
                        
                        <%-- Mô tả ngắn (lấy từ MoTaNgan hoặc TenNguoiDang) --%>
                        <p class="text-lg md:text-xl font-medium drop-shadow-md">
                            <c:choose>
                                <c:when test="${not empty book.moTaNgan}">
                                    <c:out value="${book.moTaNgan}" />
                                </c:when>
                                <c:otherwise>
                                    Tác giả: <c:out value="${book.tenNguoiDang}" /> - Thể loại: <c:out value="${book.tenTheLoai}" />
                                </c:otherwise>
                            </c:choose>
                        </p>
                        
                        <%-- Nút Xem chi tiết --%>
                        <a href="<c:url value="/trang-chu?action=viewBook&id=${book.idSach}" />"
                           class="mt-4 bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover-primary transition duration-300">
                            Xem Chi Tiết
                        </a>
                    </div>
                </div>
            </c:forEach>
            
            <%-- Slide dự phòng nếu không có sách nào --%>
            <c:if test="${empty featuredBooks}">
                <div class="slider-item bg-gray-100 flex items-center justify-center p-6" style="background-image: url('https://placehold.co/1200x500/059669/ffffff?text=Chào+Mừng+Đến+Sách+Việt'); background-size: cover; background-position: center;">
                    <div class="text-center text-white bg-black bg-opacity-40 p-6 rounded-xl backdrop-blur-sm">
                        <h3 class="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">KHÁM PHÁ THƯ VIỆN SÁCH</h3>
                        <p class="text-lg md:text-xl font-medium drop-shadow-md">Nơi tri thức bắt đầu. Sách mới sẽ sớm được cập nhật.</p>
                    </div>
                </div>
            </c:if>

        </div>

        <!-- Slider Navigation Buttons (Giữ nguyên) -->
        <button onclick="slide('prev')" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 p-3 rounded-full text-white hover:bg-opacity-50 transition hidden md:block z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button onclick="slide('next')" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 p-3 rounded-full text-white hover:bg-opacity-50 transition hidden md:block z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>

        <!-- Dots Indicator (Giữ nguyên) -->
        <div id="slider-dots" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            <!-- Dots sẽ được JS tạo ra -->
        </div>
    </div>
