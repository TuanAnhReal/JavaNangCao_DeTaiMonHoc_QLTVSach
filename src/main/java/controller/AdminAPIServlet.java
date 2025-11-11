/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import controller.admin.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.Sach;
import model.SachDAO;
import model.TheLoai;
import model.TheLoaiDAO;

/**
 *
 * @author PC
 */
@WebServlet(name = "AdminHomeServlet", urlPatterns = {"/api"})
public class AdminAPIServlet extends HttpServlet {

    private SachDAO sachDAO;
    private TheLoaiDAO theLoaiDAO;
    private Gson gson;

    @Override
    public void init() throws ServletException {
        sachDAO = new SachDAO();
        theLoaiDAO = new TheLoaiDAO();
        // Cần Gson để chuyển dữ liệu sang JS/Mock Data
        gson = new GsonBuilder().create();
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
        response.setContentType("application/json;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");

        List<TheLoai> allCategories = theLoaiDAO.getAllTheLoai();
        List<Sach> allBooks = sachDAO.getAllBooksForAdmin();

        String booksJson = gson.toJson(allBooks);
        String categoriesJson = gson.toJson(allCategories);
        response.getWriter().println(booksJson);
        //request.setAttribute("booksJson", booksJson);
        //request.setAttribute("categoriesJson", categoriesJson); // Dùng để thay thế mockCategoryData
        
       // request.getRequestDispatcher("/main_admin/index_admin.jsp").forward(request, response);
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
