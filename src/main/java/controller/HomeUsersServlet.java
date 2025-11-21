package controller;

// THÊM IMPORT CỦA GSON
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonSerializer;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
// ---
import com.google.gson.Gson;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import model.Sach;
import model.SachDAO;

@WebServlet(urlPatterns = {"/trang-chu"})
public class HomeUsersServlet extends HttpServlet {

    private SachDAO sachDAO;
    private Gson gson; // Tạo biến Gson

    @Override
    public void init() throws ServletException {
        sachDAO = new SachDAO();
        
        // --- SỬA LỖI GSON VÀ LOCALDATETIME ---
        // "Dạy" cho Gson cách xử lý LocalDateTime
        gson = new GsonBuilder()
            .serializeNulls()
            .registerTypeAdapter(LocalDateTime.class, (JsonSerializer<LocalDateTime>) (src, typeOfSrc, context) -> 
                // Chuyển LocalDateTime thành chuỗi (String)
                src == null ? null : new com.google.gson.JsonPrimitive(src.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
            )
            .registerTypeAdapter(LocalDateTime.class, (JsonDeserializer<LocalDateTime>) (json, typeOfT, context) ->
                // (Không cần thiết cho việc này, nhưng để cho đủ)
                json == null ? null : LocalDateTime.parse(json.getAsString(), DateTimeFormatter.ISO_LOCAL_DATE_TIME)
            )
            .create();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        
        String action = request.getParameter("action");
        if (action == null) {
            action = "viewHome";
        }
        switch (action) {
            case "viewHome":
                xuLyViewHome(request, response);
                break;

            default:
                xuLyViewHome(request, response);
                break;
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Gọi doGet để xử lý cả request POST
        doGet(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }

    private void xuLyViewHome(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1. Lấy dữ liệu sách (List<Sach> từ Java)
        List<Sach> featuredBooks = sachDAO.getFeaturedBooks(3); // Lấy 3 sách cho carousel
        List<Sach> allBooks = sachDAO.getAllBooks(); // Lấy TẤT CẢ sách cho danh sách

        // 2. SỬA LỖI: Chuyển đổi List<Sach> thành chuỗi JSON
        String featuredBooksJson = gson.toJson(featuredBooks);
        String allBooksJson = gson.toJson(allBooks);

        // 3. Gửi chuỗi JSON sang JSP
        request.setAttribute("featuredBooksJson", featuredBooksJson);
        request.setAttribute("bookListJson", allBooksJson); // Tên này phải khớp với JSP
        
        // 4. SỬA LỖI: Chỉ forward MỘT lần
        request.getRequestDispatcher("/main_users/index_user.jsp").forward(request, response);
    }

}
