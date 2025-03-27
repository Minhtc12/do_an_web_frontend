import { defineStore } from "pinia";
import AuthService from "../services/auth.service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null, // Thông tin người dùng (email hoặc tên)
    token: localStorage.getItem("token") || null, // Token được lưu trong localStorage
    role: localStorage.getItem("role") || null, // Vai trò người dùng (Reader, Employee, Manager)
  }),
  getters: {
    isAuthenticated: (state) => !!state.token, // Kiểm tra trạng thái đăng nhập
    isReader: (state) => state.role === "Reader",
    isEmployee: (state) => state.role === "Employee",
    isManager: (state) => state.role === "Manager",
  },
  actions: {
    initialize() {
      this.token = localStorage.getItem("token");
      this.role = localStorage.getItem("role");
      this.user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin user từ localStorage
      console.log("Đã khởi tạo trạng thái từ LocalStorage:", { token: this.token, role: this.role, user: this.user });
    },

    async login(email, password, userType) {
      try {
        const endpoint = userType === "Employee" ? "/employees/login" : "/readers/login";
        console.log("Gửi yêu cầu đến endpoint:", endpoint);

        // Gọi AuthService.login và nhận phản hồi từ backend
        const response = await AuthService.login(email, password, endpoint);
        console.log("Phản hồi từ backend:", response);

        // Lưu thông tin đăng nhập
        this.token = response.token; // Lưu token
        this.role = response.role;  // Lưu vai trò
        this.user = response.name || null; // Lưu tên người dùng (nếu có)

        // Lưu vào localStorage
        localStorage.setItem("token", this.token);
        localStorage.setItem("role", this.role);
        localStorage.setItem("user", JSON.stringify(this.user)); // Lưu thông tin user dưới dạng JSON

        console.log("Đã lưu thông tin vào authStore:", { token: this.token, role: this.role, user: this.user });
      } catch (error) {
        console.error("Lỗi trong authStore.login:", error.message);
        throw error;
      }
    },

    logout() {
      this.token = null; // Xóa token
      this.role = null;  // Xóa vai trò
      this.user = null;  // Xóa thông tin người dùng

      // Xóa dữ liệu trong localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      console.log("Đã đăng xuất và cập nhật trạng thái authStore.");
    },
  },
});