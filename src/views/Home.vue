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
        </div>
      </div>
    </div>

    <!-- Search Books Section -->
    <section id="search-books" class="container mt-5">
      <h2 class="text-center mb-4">Tìm Kiếm Sách</h2>
      <form @submit.prevent="searchBooks" class="search-form">
        <div class="input-group">
          <input
            v-model="searchKeyword"
            type="text"
            class="form-control"
            placeholder="Nhập tên sách hoặc từ khóa..."
          />
          <button type="submit" class="btn btn-primary">Tìm Kiếm</button>
        </div>
      </form>
      <div v-if="searchedBooks.length" class="mt-4">
        <h3 class="text-center">Kết Quả Tìm Kiếm</h3>
        <div class="row">
          <div v-for="book in searchedBooks" :key="book.id" class="col-md-4">
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
      </div>
    </section>

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
import BookService from "../services/book.service";

export default {
  setup() {
    const authStore = useAuthStore();
    const searchKeyword = ref("");
    const searchedBooks = ref([]);
    const featuredBooks = ref([]);
    
    const fetchFeaturedBooks = async () => {
      try {
        const response = await BookService.getFeaturedBooks();
        featuredBooks.value = response.data.slice(0, 6); // Hiển thị 6 sách nổi bật đầu tiên
      } catch (error) {
        console.error("Error fetching featured books:", error);
      }
    };

    const searchBooks = async () => {
      try {
        const response = await BookService.searchBooks(searchKeyword.value);
        searchedBooks.value = response.data;
      } catch (error) {
        console.error("Error searching books:", error);
      }
    };

    fetchFeaturedBooks();

    return {
      isAuthenticated: authStore.isAuthenticated,
      userName: authStore.user?.email || "Khách",
      featuredBooks,
      searchKeyword,
      searchedBooks,
      searchBooks,
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

/* Search Books Section */
.search-form {
  max-width: 600px;
  margin: auto;
}
.search-form .input-group {
  display: flex;
}

/* Featured Books Section */
#featured-books {
  padding: 20px 0;
}
.card {
  margin-bottom: 20px;
}
</style>