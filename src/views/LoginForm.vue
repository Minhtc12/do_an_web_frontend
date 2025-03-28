<template>
  <div class="login-form container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-lg">
          <div class="card-header bg-primary text-white text-center">
            <h3>Đăng Nhập</h3>
          </div>
          <!-- Hiển thị thông báo thành công -->
    <div v-if="successMessage" class="alert alert-success text-center">
      {{ successMessage }}
    </div>

          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <!-- Email -->
              <div class="form-group mb-3">
                <label for="email" class="form-label">Email:</label>
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  class="form-control form-control-lg"
                  placeholder="Nhập email"
                  required
                />
              </div>

              <!-- Password -->
              <div class="form-group mb-3">
                <label for="password" class="form-label">Mật Khẩu:</label>
                <input
                  v-model="password"
                  type="password"
                  id="password"
                  class="form-control form-control-lg"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              <!-- Role -->
              <div class="form-group mb-3">
                <label for="role" class="form-label">Bạn là:</label>
                <select v-model="role" id="role" class="form-select form-select-lg" required>
                  <option value="Reader">Người Đọc</option>
                  <option value="Employee">Nhân Viên</option>
                </select>
              </div>

              <!-- Submit -->
              <button type="submit" class="btn btn-primary btn-lg w-100">Đăng Nhập</button>
            </form>
          </div>
          <div v-if="errorMessage" class="card-footer text-danger text-center">
            {{ errorMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { useAuthStore } from "../stores/authStore";
import { useRouter, useRoute } from "vue-router";

export default {
  data() {
  return {
    email: "",
    password: "",
    userType: "Reader", // Mặc định là Reader
    successMessage: "", // Thêm biến để hiển thị thông báo
  };
},

  setup() {
    const authStore = useAuthStore();
    const router = useRouter(); // Khai báo router
    const email = ref("");
    const password = ref("");
    const role = ref("Reader"); // Giá trị mặc định
    const errorMessage = ref("");
    const route = useRoute(); // Sử dụng useRoute để lấy query
  const successMessage = route.query.successMessage || ""; // Nếu không có, gán giá trị mặc định


//     const handleLogin = async () => {
//   try {
//     console.log("Bắt đầu đăng nhập...");
//     await authStore.login(email.value, password.value, role.value);

//     console.log("Đăng nhập thành công:", authStore.role);

//     // Logic điều hướng dựa trên vai trò
//     const dashboardPath =
//       authStore.role === "Reader"
//         ? "/reader-dashboard"
//         : authStore.role === "Manager" // Quản lý
//         ? "/manager-dashboard"
//         : "/employee-dashboard"; // Nhân viên
//     console.log("Điều hướng đến:", dashboardPath);

//     router.push(dashboardPath); // Điều hướng đến đúng trang dashboard
//   } catch (error) {
//     console.error("Lỗi trong handleLogin:", error.message);
//     errorMessage.value = error.message || "Đã xảy ra lỗi khi đăng nhập.";
//   }
// };
const handleLogin = async () => {
  try {
    console.log("Bắt đầu đăng nhập...");
    await authStore.login(email.value, password.value, role.value);

    console.log("Đăng nhập thành công:", authStore.role);

    // Điều hướng đến trang chủ sau khi đăng nhập
    router.push("/"); // Chuyển hướng đến Home.vue
    console.log("Điều hướng đến: /");
  } catch (error) {
    console.error("Lỗi trong handleLogin:", error.message);
    errorMessage.value = error.message || "Đã xảy ra lỗi khi đăng nhập."; // Hiển thị lỗi lên form
  }
};

    return {
      email,
      password,
      role,
      errorMessage,
      handleLogin,
      successMessage,

    };
  },
};
</script>

<style>
.login-form {
  max-width: 700px;
  margin: auto;
}
.card {
  border-radius: 12px;
}
.card-header {
  font-weight: bold;
  font-size: 1.5rem;
}
.form-control-lg {
  font-size: 1.2rem;
}
.form-select-lg {
  font-size: 1.2rem;
}
.btn-lg {
  padding: 10px 16px;
  font-size: 1.2rem;
}
</style>