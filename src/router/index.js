import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import Home from "../views/Home.vue";

const routes = [
  // Trang chủ
  { path: "/", component: Home },

  // Dashboard cho các vai trò
  { path: "/reader-dashboard", component: () => import("../views/ReaderDashboard.vue"), meta: { requiresAuth: true, role: "Reader" } },
  { path: "/manager-dashboard", component: () => import("../views/ManagerDashboard.vue"), meta: { requiresAuth: true, role: "Quản lý" } },
  { path: "/employee-dashboard", component: () => import("../views/EmployeeDashboard.vue"), meta: { requiresAuth: true, role: "Nhân viên" } },


  // Đăng nhập
  { path: "/login", component: () => import("../views/LoginForm.vue") },
  //dăng ký
  { path: "/register", component: () => import("../views/RegisterForm.vue") }, // Đăng ký
 

  // Trang không có quyền truy cập
  { path: "/unauthorized", component: () => import("../views/Unauthorized.vue") },

  // Fallback cho trang không tồn tại
  { path: "/:pathMatch(.*)*", component: () => import("../views/NotFound.vue") },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Middleware kiểm tra quyền truy cập
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Kiểm tra xác thực (requiresAuth)
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next("/login"); // Chuyển hướng đến đăng nhập nếu chưa đăng nhập
  }

  // Kiểm tra vai trò (role)
  if (to.meta.role && authStore.role !== to.meta.role) {
    return next({ path: "/unauthorized", query: { role: to.meta.role } }); // Chuyển đến trang không có quyền truy cập
  }

  next(); // Cho phép tiếp tục nếu đủ điều kiện
});

export default router;