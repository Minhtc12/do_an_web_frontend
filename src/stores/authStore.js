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

    const storedUserId = localStorage.getItem("userId"); // Đọc userId từ localStorage
    this.userId = storedUserId && storedUserId !== "undefined" ? storedUserId : null;

    const storedToken = localStorage.getItem("token"); // Đọc token từ localStorage
    this.token = storedToken || null;

    console.log("Đã khởi tạo trạng thái từ LocalStorage:", { token: this.token, role: this.role, user: this.user, userId: this.userId });
  } catch (error) {
    console.error("Lỗi khi khởi tạo trạng thái:", error);
    this.token = null;
    this.role = null;
    this.user = null;
    this.userId = null;
  }
},
   async login(email, password, userType) {
  try {
    const endpoint = userType === "Employee" ? "/employees/login" : "/readers/login";
    const response = await AuthService.login(email, password, endpoint);

    this.token = response.token;
    this.role = response.role; // Vai trò từ backend
    this.user = response.name || "Nhân viên"; // Tên người dùng từ backend
    this.userId = response.MSNV|| response.MADOCGIA|| null; // Lưu MADOCGIA hoặc MSNV từ backend

    // Lưu thông tin vào localStorage
    localStorage.setItem("token", response.token);
    localStorage.setItem("role", response.role); // Lưu vai trò
    localStorage.setItem("user", JSON.stringify(this.user));
    localStorage.setItem("userId", this.userId); // Lưu userId

    console.log("Đăng nhập thành công:", { token: this.token, role: this.role, user: this.user, userId: this.userId });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.message || error);
    throw error; // Ném lỗi để giao diện xử lý
  }
},
    logout() {
      this.token = null; // Xóa token
      this.role = null;  // Xóa vai trò
      this.user = null;  // Xóa thông tin người dùng
      this.userId = null;

      // Xóa dữ liệu trong localStorage
      localStorage.removeItem("this.token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");

      console.log("Đã đăng xuất và cập nhật trạng thái authStore.");
    },
  },
});