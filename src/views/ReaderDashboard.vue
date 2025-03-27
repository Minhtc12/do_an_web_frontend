<template>
  <div class="reader-dashboard">
    <h1>Trang Tổng Quan Người Đọc</h1>

    <!-- Sách đang mượn -->
    <div>
      <h2>Sách Đã Mượn:</h2>
      <ul>
        <li v-for="book in borrowedBooks" :key="book.id">{{ book.title }}</li>
      </ul>
    </div>

    <!-- Danh sách yêu thích -->
    <div>
      <h2>Sách Yêu Thích:</h2>
      <ul>
        <li v-for="book in favoriteBooks" :key="book.id">{{ book.title }}</li>
      </ul>
    </div>

    <!-- Tìm kiếm sách -->
    <div>
      <h2>Tìm Sách</h2>
      <input v-model="searchQuery" type="text" placeholder="Nhập tên sách">
      <button @click="searchBooks">Tìm Kiếm</button>
      <ul v-if="searchResults.length">
        <li v-for="book in searchResults" :key="book.id">{{ book.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      borrowedBooks: [], // Danh sách sách đã mượn
      favoriteBooks: [], // Danh sách sách yêu thích
      searchQuery: "",
      searchResults: [],
    };
  },
  methods: {
    searchBooks() {
      console.log("Tìm kiếm sách:", this.searchQuery);
      // Thêm logic API tìm kiếm sách ở đây
    },
  },
  mounted() {
    console.log("ReaderDashboard mounted");
    // Gọi API để lấy dữ liệu sách đã mượn và yêu thích ở đây
  },
};
</script>

<style>
.reader-dashboard {
  padding: 20px;
}
</style>