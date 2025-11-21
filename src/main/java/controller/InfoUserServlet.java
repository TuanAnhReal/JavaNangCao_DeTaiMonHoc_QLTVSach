/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.User;
import model.UserDAO;

/**
 *
 * @author ADMIN
 */
@WebServlet(name = "InfoUserServlet", urlPatterns = {"/info-user"})
public class InfoUserServlet extends HttpServlet {

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

        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");

        String action = request.getParameter("action");
        if (action == null) {
            action = "formUser";
        }
        switch (action) {
            case "formUser":
                xuLyInfoUser(request, response);
                break;
            case "update":
                System.out.println("Chỉnh sửa thông tin User");
                xuLyUpdateUser(request, response);
                break;
            case "form-dangsach":
                System.out.println("Mở form đăng sách");
                break;
            case "push-sach":
                System.out.println("Up sách lên server");
                break;
        }

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
        // Gọi doGet để xử lý cả request POST
        doGet(request, response);
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

    private void xuLyInfoUser(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //gọi đến trang thông tin của user hiện hành
        request.getRequestDispatcher("/main_users/info_user.jsp").forward(request, response);
    }

    private void xuLyUpdateUser(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("IdNguoiDung"));
        String ten = request.getParameter("Ten");
        String gioitinh = request.getParameter("GioiTinh");
        String email = request.getParameter("Email");
        String diachi = request.getParameter("DiaChi");
        String sdt = request.getParameter("SDT");

        User u = new User(id, ten, gioitinh, diachi, email, sdt);
        uDAO.updateUser(u);

       HttpSession session = request.getSession();
                session.setAttribute("user", u);
        request.setAttribute("success", "Cập nhật thông tin thành công!");
        request.getRequestDispatcher("/main_users/info_user.jsp").forward(request, response);
    }
}
