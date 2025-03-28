import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import Home from "../views/Home.vue";
import BookManagement from "../views/BookManagement.vue";
import AddBook from "../views/AddBook.vue"
import BorrowingManagement from "@/views/BorrowingManagement.vue"; // Đảm bảo import file đúng
import Borrow from "@/views/Borrow.vue";


const routes = [
  { path: "/", component: Home }, // Trang chủ (chung cho tất cả)
  { path: "/users", component: () => import("../views/Users.vue"), meta: { requiresAuth: true, role: "Manager" } },
  { path: "/publishers", component: () => import("../views/Publishers.vue"), meta: { requiresAuth: true, role: "Manager" } },
  { path: "/borrow-requests", component: () => import("../views/BorrowRequests.vue"), meta: { requiresAuth: true, role: ["Manager", "Employee"] } },
  { path: "/profile", component: () => import("../views/Profile.vue"), meta: { requiresAuth: true, role: "Reader" } },
  { path: "/borrow-history", component: () => import("../views/BorrowHistory.vue"), meta: { requiresAuth: true, role: "Reader" } },
  { path: "/login", component: () => import("../views/LoginForm.vue") },
  { path: "/register", component: () => import("../views/RegisterForm.vue") }, // Đăng Ký
  
 {
    path: "/books", // Đường dẫn khi nhấn vào "Book"
    name: "BookManagement",
    component: BookManagement,
  },
  {
    path: "/books/add",
    name: "AddBook",
    component: AddBook,
  },
  {
  path: "/books/:MASACH",
  name: "BookDetail",
  component: () => import("../views/BookDetail.vue"),
},
{
  path: "/books/:MASACH/edit",
  name: "EditBook",
  component: () => import("../views/EditBook.vue"),
},
{
  path: "/books/:MASACH/borrow",
  name: "BorrowBook",
  component: () => import("../views/BorrowBook.vue"),
},
  {
  path: "/borrowing/requests",
  name: "BorrowingRequests",
  component: () => import("../views/BorrowRequests.vue"),
  meta: { requiresAuth: true, role: ["Nhân viên", "Quản lý"] }, // Thêm cả quyền Quản lý
},
{
    path: "/borrowing-management",
    name: "BorrowingManagement",
    component: BorrowingManagement,
  },
{
    path: "/borrow",
    name: "Borrow",
    component: Borrow,
  },


];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Middleware kiểm tra quyền truy cập
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Kiểm tra đăng nhập
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next("/login");
  }

  // Kiểm tra vai trò
  if (to.meta.role && ![].concat(to.meta.role).includes(authStore.role)) {
    return next("/unauthorized");
  }

  next();
});

export default router;