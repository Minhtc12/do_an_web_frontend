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
      });
  },

  logout() {
    localStorage.removeItem("token");
  },
  getToken() {
    return localStorage.getItem("token");
  },
};

export default AuthService;