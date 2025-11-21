package controller;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.UserDAO;

/**
 *
 * @author PC
 */
@WebServlet(urlPatterns = {"/dangnhap"})
public class LoginServlet extends HttpServlet {

    UserDAO uDAO;

    @Override
    public void init() throws ServletException {
        uDAO = new UserDAO();
    }

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        request.getRequestDispatcher("/login/index_login.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        //lấy ra action 
        String action = request.getParameter("action");
        if (action == null) {
            action = "form";
        }
        switch (action) {
            case "form":
                request.getRequestDispatcher("/login/index_login.jsp").forward(request, response);
                break;
            case "login":
                xuLyLogin(request, response);
                break;
            case "regist":
                xuLyRegist(request, response);
                break;
        }

    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    private void xuLyLogin(HttpServletRequest request, HttpServletResponse response) {
        try {
            String tentk = request.getParameter("TenTK");
            String matkhau = request.getParameter("MatKhau");

            var user = uDAO.checkLogin(tentk, matkhau);

            if (user != null) {
                String vaiTro = user.getVaiTro();
                HttpSession session = request.getSession();
                session.setAttribute("user", user);

                // SỬ DỤNG equalsIgnoreCase() để đảm bảo hoạt động với 'admin', 'Admin', 'ADMIN'...
                if ("Admin".equalsIgnoreCase(vaiTro)) {
                    response.sendRedirect(request.getContextPath() + "/admin");
                    return;
                } else if ("user".equalsIgnoreCase(vaiTro)) {
                    response.sendRedirect(request.getContextPath() + "/trang-chu");
                } else {
                    // Xử lý vai trò không xác định hoặc không hợp lệ
                    request.setAttribute("error", "Tài khoản có vai trò không hợp lệ.");
                    request.getRequestDispatcher("/login/index_login.jsp").forward(request, response);
                }
            } else {
                request.setAttribute("error", "Tên đăng nhập hoặc mật khẩu không đúng!");
                request.getRequestDispatcher("/login/index_login.jsp").forward(request, response);
            }
        } catch (Exception e) {
            System.out.println("Lỗi: " + e.toString());
        }
    }

    private void xuLyRegist(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String tentk = request.getParameter("TenTKDK");
        String matkhau = request.getParameter("MatKhauDK");
        String rematkhau = request.getParameter("reMatKhauDK");

        if (tentk == null || matkhau == null || rematkhau == null
                || tentk.trim().isEmpty() || matkhau.trim().isEmpty()) {
            request.setAttribute("error", "Vui lòng điền đầy đủ thông tin.");
            request.getRequestDispatcher("/login/index_login.jsp").forward(request, response);
            return;
        }
        if (!matkhau.equals(rematkhau)) {
            request.setAttribute("error", "Mật khẩu xác nhận không khớp.");
            request.getRequestDispatcher("/login/index_login.jsp").forward(request, response);
            return;
        }

        boolean newUser = uDAO.register(tentk, matkhau);

        if (newUser) {
            // Đăng ký thành công, chuyển hướng đến trang đăng nhập với một thông báo
            request.setAttribute("success", "Đăng ký thành công! Vui lòng đăng nhập.");
            request.getRequestDispatcher("/login/index_login.jsp").forward(request, response);
        } else {
            // Đăng ký thất bại, có thể do tên tài khoản đã tồn tại
            request.setAttribute("error", "Tên tài khoản đã tồn tại. Vui lòng chọn tên khác.");
            request.getRequestDispatcher("/login/index_login.jsp").forward(request, response);
        }
    }
}
