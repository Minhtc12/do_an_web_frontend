
<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero-section text-center text-white">
      <div class="overlay"></div>
      <div class="content">
        <h1>Chào mừng đến với Web Mượn Sách</h1>
        <p>Nơi bạn có thể khám phá, mượn và quản lý sách dễ dàng!</p>
        <div v-if="!isAuthenticated" class="mt-4">
          <router-link to="/login" class="btn btn-primary">Đăng Nhập</router-link>
          <router-link to="/register" class="btn btn-secondary">Đăng Ký</router-link>
        </div>
        <div v-else class="mt-4">
          <p>Xin chào, {{ userName }}!</p>
          <router-link :to="dashboardPath" class="btn btn-success">Đi tới Dashboard</router-link>
        </div>
      </div>
    </div>

    <!-- Featured Books Section -->
    <section id="featured-books" class="container mt-5">
      <h2 class="text-center mb-4">Sách Nổi Bật</h2>
      <div class="row">
        <div v-for="book in featuredBooks" :key="book.id" class="col-md-4">
          <div class="card shadow-sm">
            <img :src="book.image" class="card-img-top" :alt="book.title">
            <div class="card-body">
              <h5 class="card-title">{{ book.title }}</h5>
              <p class="card-text">{{ book.description }}</p>
              <a href="#" class="btn btn-outline-primary">Xem Chi Tiết</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import { ref, computed } from "vue";
export default {
  setup() {
    const authStore = useAuthStore();
    const featuredBooks = ref([
      { id: 1, title: "Sách 1", description: "Cuốn sách thú vị số 1", image: "book1.jpg" },
      { id: 2, title: "Sách 2", description: "Cuốn sách thú vị số 2", image: "book2.jpg" },
      { id: 3, title: "Sách 3", description: "Cuốn sách thú vị số 3", image: "book3.jpg" },
    ]);

    const dashboardPath = computed(() =>
      authStore.role === "Reader"
        ? "/reader-dashboard"
        : authStore.role === "Employee"
        ? "/employee-dashboard"
        : "/manager-dashboard"
    );

    return {
      isAuthenticated: authStore.isAuthenticated,
      userName: authStore.user?.email || "Khách",
      dashboardPath,
      featuredBooks,
    };
  },
};
</script>

<style>
/* Hero Section */
.hero-section {
  background: url("banner-image.jpg") no-repeat center center/cover;
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-section .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.hero-section .content {
  position: relative;
  color: white;
  text-align: center;
}
.btn-primary {
  margin: 10px;
}

/* Featured Books Section */
#featured-books {
  padding: 20px 0;
}
.card {
  margin-bottom: 20px;
}
</style>