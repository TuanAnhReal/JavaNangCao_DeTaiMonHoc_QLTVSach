/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder; // Cần thêm import này
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.time.LocalDateTime; // Cần thêm import này
import java.time.format.DateTimeFormatter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.User;
import model.UserDAO;
import model.Sach;
import model.SachDAO;
import model.TheLoai;
import model.TheLoaiDAO;

/**
 *
 * @author PC
 */
@WebServlet(urlPatterns = {"/AdminAPI"})
public class AdminAPIServlet extends HttpServlet {

    private final UserDAO userDAO = new UserDAO();
    private final SachDAO sachDAO = new SachDAO();
    private final TheLoaiDAO theLoaiDAO = new TheLoaiDAO();
    // KHẮC PHỤC LỖI: Khởi tạo Gson với adapter cho LocalDateTime
    private final Gson gson = new GsonBuilder()
            // Đăng ký bộ tuần tự hóa cho LocalDateTime
            .registerTypeAdapter(LocalDateTime.class, new JsonSerializer<LocalDateTime>() {
                private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

                @Override
                public JsonPrimitive serialize(LocalDateTime localDateTime, Type srcType, JsonSerializationContext context) {
                    return new JsonPrimitive(formatter.format(localDateTime));
                }
            })
            // Cấu hình Gson để không xuất ra các trường có giá trị null
            .serializeNulls()
            .create(); // Khởi tạo Gson

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
        response.setContentType("application/json;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");

        String action = request.getParameter("action");
        
        PrintWriter out = response.getWriter();
        
        try {
            if ("listUsers".equals(action)) {
                
                List<User> userList = userDAO.getAll(); 
                out.print(gson.toJson(userList));
                
            } else if ("listBooks".equals(action)) {
                
                // Lấy danh sách sách cho Admin (có thể bao gồm cả trạng thái nháp/chờ duyệt)
                List<Sach> bookList = sachDAO.getAllBooksForAdmin(); 
                out.print(gson.toJson(bookList));
                
            } else if ("listTheLoai".equals(action)) {
                
                // Lấy danh sách tất cả thể loại
                List<TheLoai> categoryList = theLoaiDAO.getAllTheLoai(); 
                out.print(gson.toJson(categoryList));
                
            } else {
                // Xử lý action không xác định
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print(gson.toJson(new ErrorResponse("Action not found")));
            }
        } catch (Exception e) {
            // Xử lý lỗi server/DB
            System.err.println("Lỗi AdminAPIServlet cho action " + action + ": " + e.getMessage());
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); 
            out.print(gson.toJson(new ErrorResponse("Internal Server Error: " + e.getMessage())));
        } finally {
            out.flush();
        }
    }

    // Lớp nội bộ đơn giản để trả về lỗi dưới dạng JSON
    private static class ErrorResponse {

        String status = "error";
        String message;

        public ErrorResponse(String message) {
            this.message = message;
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
        processRequest(request, response);
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

}
