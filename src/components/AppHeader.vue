<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container">
        <!-- Logo -->
        <router-link to="/" class="navbar-brand">
          <i class="bi bi-book"></i> Library
        </router-link>

        <!-- Toggle button for small screens -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation links -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <ul class="navbar-nav me-auto">
            <!-- Home: Hiển thị cho mọi vai trò -->
            <li class="nav-item">
              <router-link to="/" class="nav-link">
                <i class="bi bi-house-door"></i> Home
              </router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link to="/books" class="nav-link">
                <i class="bi bi-book"></i> Book 
              </router-link>
            </li> -->

            <!-- Links dành cho Quản lý -->
            <li v-if="isAdmin" class="nav-item">
              <router-link to="/users" class="nav-link">
                <i class="bi bi-people"></i> Users
              </router-link>
            </li>
            <li v-if="isAdmin" class="nav-item">
              <router-link to="/publishers" class="nav-link">
                <i class="bi bi-building"></i> Publishers
              </router-link>
            </li>
            
    

            <!-- Links dành cho Nhân viên -->
            <li v-if="isAdmin || isEmployee" class="nav-item">
              <router-link to="/borrowing-management" class="nav-link">
                <i class="bi bi-list-check"></i> Borrow
              </router-link>
            </li>
            
            <li v-if="isAdmin || isEmployee" class="nav-item">
              <router-link to="/books" class="nav-link">
                <i class="bi bi-book"></i> Book 
              </router-link>
            </li>

            <!-- Links dành cho Độc giả -->
             <li v-if="isReader" class="nav-item">
              <router-link to="/books" class="nav-link">
                <i class="bi bi-book"></i> Book 
              </router-link>
            </li>
            <li v-if="isReader" class="nav-item">
              <router-link to="/borrow" class="nav-link">
                <i class="bi bi-bookmark"></i> BorrowHistory
              </router-link>
            </li>
            <li v-if="isReader" class="nav-item">
              <router-link to="/profile" class="nav-link">
                <i class="bi bi-person-circle"></i> MyProfile
              </router-link>
            </li>
            <!-- <li v-if="isReader" class="nav-item">
              <router-link to="/" class="nav-link">
                <i class="bi bi-bookmark-check"></i> My Borrow History
              </router-link>
            </li> -->
            <!-- <li v-if="isReader"><router-link to="/borrowing-management">Borrow</router-link></li> -->
    
          </ul>

          <!-- Account and Authentication -->
          <ul class="navbar-nav ms-auto">
            <!-- Nếu chưa đăng nhập: Hiển thị nút Đăng Nhập và Đăng Ký -->
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link to="/login" class="nav-link">Đăng Nhập</router-link>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link to="/register" class="nav-link">Đăng Ký</router-link>
            </li>

            <!-- Nếu đã đăng nhập: Hiển thị Welcome và Logout -->
            <li v-if="isAuthenticated" class="nav-item">
              <span class="nav-link">Welcome, {{ userName }}</span>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <button class="btn btn-link nav-link" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    console.log("Role từ authStore:", authStore.role);
    // Kiểm tra vai trò người dùng
    const isAuthenticated = computed(() => authStore.isAuthenticated); // Xác định trạng thái đăng nhập
    const isAdmin = computed(() => authStore.role === "Quản lý"); // Vai trò: Quản lý
    const isEmployee = computed(() => authStore.role === "Nhân viên"); // Vai trò: Nhân viên
    const isReader = computed(() => authStore.role === "Reader"); // Vai trò: Độc giả
   const userName = computed(() => authStore.user); // Sử dụng trực tiếp giá trị từ authStore.user // Tên người dùng hoặc "Guest" nếu không xác định

    // Hàm đăng xuất
    const logout = () => {
      authStore.logout(); // Xóa thông tin đăng nhập
      router.push("/login"); // Chuyển hướng đến trang đăng nhập
    };

    return {
      isAuthenticated,
      isAdmin,
      isEmployee,
      isReader,
      userName,
      logout,
    };
  },
};
</script>

<style>
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}
.nav-link {
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 5px; /* Khoảng cách giữa icon và text */
}
</style>