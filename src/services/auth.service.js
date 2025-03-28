import api from "./api.service";

const AuthService = {
  register(payload) {
    // Gửi yêu cầu POST đến endpoint `/readers/register`
    return api.post("/readers/register", payload);
  },

  login(email, password, endpoint) {
  return api.post(endpoint, { Email: email, Password: password })
    .then(response => {
      console.log("Phản hồi AuthService:", response.data); // Log chi tiết phản hồi
      return response.data; // Chỉ trả về data
    })
    .catch(error => {
      console.error("Lỗi AuthService:", error.response?.data || error.message); // Log chi tiết lỗi
      throw error.response?.data || error; // Ném lỗi để xử lý ở nơi gọi
    });
}
,

  logout() {
    localStorage.removeItem("token");
  },
  getToken() {
    return localStorage.getItem("token");
  },
  // Lấy thông tin tài khoản
  getAccountInfo() {
    return api.get("/docgia/me"); // Backend sẽ dùng JWT để xác định tài khoản
  },

  // Cập nhật thông tin tài khoản
  updateAccountInfo(payload) {
    return api.put("/docgia/me", payload);
  },

};

export default AuthService;