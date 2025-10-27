/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

// Lấy các phần tử cần thiết từ DOM
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Bắt sự kiện khi click vào nút "Register" trong overlay
signUpButton.addEventListener('click', () => {
    // Thêm class để kích hoạt hiệu ứng trượt sang form Đăng Ký
    container.classList.add("right-panel-active");
});

// Bắt sự kiện khi click vào nút "Login" trong overlay
signInButton.addEventListener('click', () => {
    // Xóa class để kích hoạt hiệu ứng trượt về form Đăng Nhập
    container.classList.remove("right-panel-active");
});

