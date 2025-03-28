import { defineStore } from "pinia";
import AuthService from "../services/auth.service";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null, // Thông tin người dùng (email hoặc tên)
    token: localStorage.getItem("token") || null, // Token được lưu trong localStorage
    role: localStorage.getItem("role") || null, // Vai trò người dùng (Reader, Employee, Manager)
  }),
  getters: {
    isAuthenticated: (state) => !!state.token, // Kiểm tra trạng thái đăng nhập
    isReader: (state) => state.role === "Reader", // Reader không có role
    isEmployee: (state) => state.role === "Employee",
    isManager: (state) => state.role === "Manager",
  },
  actions: {
    initialize() {
  try {
    const storedRole = localStorage.getItem("role");
    this.role = storedRole && storedRole !== "" ? storedRole : null; // Cập nhật role

    const storedUser = localStorage.getItem("user");
    this.user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : (this.role || "Reader");

    console.log("Đã khởi tạo trạng thái từ LocalStorage:", { token: this.token, role: this.role, user: this.user });
  } catch (error) {
    console.error("Lỗi khi khởi tạo trạng thái:", error);
    this.token = null;
    this.role = null;
    this.user = null;
  }
},
   async login(email, password, userType) {
  try {
    const endpoint = userType === "Employee" ? "/employees/login" : "/readers/login";
    const response = await AuthService.login(email, password, endpoint);

    this.token = response.token;
    this.role = response.role; // Cập nhật vai trò chính xác từ backend
    this.user = response.name || "Reader";

    // Lưu thông tin vào localStorage
    localStorage.setItem("token", this.token);
    localStorage.setItem("role", this.role); // Lưu vai trò
    localStorage.setItem("user", JSON.stringify(this.user));

    console.log("Đăng nhập thành công:", { token: this.token, role: this.role, user: this.user });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.message || error);
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