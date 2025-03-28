<template>
  <div class="register-form container mt-5">
    <h2 class="text-center mb-4">Register</h2>
    <form @submit.prevent="handleRegister">
      <!-- Tên -->
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Enter your name"
          required
        />
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <!-- Mật khẩu -->
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Enter your password"
          required
        />
      </div>

      <!-- Submit -->
      <button type="submit" class="btn btn-primary w-100">Register</button>
    </form>

    <!-- Hiển thị lỗi -->
    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthService from "../services/auth.service";

export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const handleRegister = async () => {
      try {
        const payload = {
          TEN: name.value,
          Email: email.value,
          Password: password.value,
        };
        console.log("Payload gửi đi:", payload);

        // Gửi yêu cầu đăng ký
        const response = await AuthService.register(payload);
        console.log("Đăng ký thành công:", response);

        // Chuyển hướng đến trang đăng nhập với thông báo thành công
        const router = useRouter(); // Import useRouter ở đầu file nếu chưa có
        router.push({
          path: "/login",
          query: { successMessage: "Đăng ký thành công! Vui lòng đăng nhập." },
        });
      } catch (error) {
        // Xử lý lỗi
        console.error("Lỗi khi đăng ký:", error);
        errorMessage.value = error.response?.data?.message || "Đã xảy ra lỗi trong quá trình đăng ký.";
      }
    };

    return {
      name,
      email,
      password,
      errorMessage,
      handleRegister,
    };
  },
};
</script>

<style>
.register-form {
  max-width: 400px;
  margin: auto;
}
</style>