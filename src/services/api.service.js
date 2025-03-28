import axios from "axios";

// Tạo một instance Axios với cấu hình mặc định
const api = axios.create({
  baseURL: "http://localhost:3000/api", // URL gốc của API
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Tự động thêm token vào headers nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Xử lý lỗi request
  }
);

// Xử lý lỗi phản hồi từ server (nếu cần)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Lỗi phản hồi API:", error.response?.data || error.message);
    return Promise.reject(error); // Ném lỗi để xử lý ở nơi gọi
  }
);
//xử lý token hết hạn
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       console.warn("Token hết hạn hoặc không hợp lệ. Chuyển hướng đến trang đăng nhập.");
//       localStorage.removeItem("token"); // Xóa token cũ
//       window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
//     }
//     return Promise.reject(error);
//   }
// );
export default api;