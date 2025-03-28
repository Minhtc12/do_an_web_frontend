import api from "./api.service"; // Module để gọi các yêu cầu HTTP

const BookService = {
  // API tạo mới sách
  createBook(payload) {
    return api.post("/books", payload); // Tương ứng với controller 'exports.create'
  },

  // API lấy danh sách sách (có thể bao gồm query tìm kiếm)
  // Các API khác
  getBooks() {
    return api.get("/books");
  },

  // Định nghĩa hàm getFeaturedBooks
  getFeaturedBooks() {
    return api.get("/books/featured"); // Backend cần hỗ trợ endpoint này
  },


  // API lấy thông tin chi tiết của sách theo ID
  findById(id) {
    return api.get(`/books/${id}`); // Tương ứng với 'exports.findById'
  },

  // API cập nhật thông tin sách
  updateBook(id, payload) {
    return api.put(`/books/${id}`, payload); // Tương ứng với 'exports.update'
  },

  // API xóa sách
  deleteBook(id) {
    return api.delete(`/books/${id}`); // Tương ứng với 'exports.delete'
  },

  // API tìm kiếm sách theo tên hoặc tác giả
  searchBooks(query) {
    return api.get("/books/search", { params: { q: query } }); // Tương ứng với 'exports.search'
  },

  // API lấy danh sách sách theo nhà xuất bản
  getBooksByPublisher(publisherId) {
    return api.get(`/books/publisher/${publisherId}`); // Tương ứng với 'exports.findBooksByPublisher'
  },
};

export default BookService;