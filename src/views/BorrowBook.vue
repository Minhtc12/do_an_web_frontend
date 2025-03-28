<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Xác Nhận Mượn Sách</h2>

    <!-- Hiển thị thông tin sách -->
    <div v-if="book" class="card">
      <div class="card-body">
        <h5 class="card-title">{{ book.TENSACH }}</h5>
        <p class="card-text"><strong>Mã Sách:</strong> {{ book.MASACH }}</p>
        <p class="card-text"><strong>Tác Giả:</strong> {{ book.TACGIA || "N/A" }}</p>
        <p class="card-text"><strong>Năm Xuất Bản:</strong> {{ book.NAMXUATBAN }}</p>
        <p class="card-text"><strong>Ngày Mượn:</strong> {{ new Date().toLocaleDateString() }}</p>
      </div>

      <!-- Nút xác nhận hoặc hủy -->
      <div class="text-center mt-3">
        <button class="btn btn-success me-2" @click="handleBorrow">Xác Nhận</button>
        <router-link to="/books" class="btn btn-secondary">Hủy</router-link>
      </div>
    </div>

    <div v-else class="text-center">
      <p>Đang tải thông tin sách...</p>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import BookService from "../services/book.service";
import BorrowingService from "../services/Borrowing.service";
import { useAuthStore } from "../stores/authStore";

export default {
  name: "BorrowBook",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const book = ref(null); // Thông tin sách
    const authStore = useAuthStore(); // Trạng thái người dùng đăng nhập

    // Lấy thông tin sách dựa trên MASACH từ URL
    const fetchBookDetail = async () => {
      try {
        const response = await BookService.findById(route.params.MASACH);
        book.value = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sách:", error);
        alert("Không thể lấy thông tin sách.");
        router.push("/books"); // Quay lại danh sách sách nếu có lỗi
      }
    };

    // Xử lý xác nhận mượn sách
    const handleBorrow = async () => {
      try {
        const payload = {
  MADOCGIA: localStorage.getItem("userId"), // Lấy mã độc giả từ localStorage
  MASACH: book.value.MASACH,
  NGAYMUON: new Date(),
};

await BorrowingService.requestBorrow(payload);
        alert("Mượn sách thành công!");
        router.push("/books"); // Quay lại danh sách sách sau khi thành công
      } catch (error) {
        console.error("Lỗi khi mượn sách:", error);
        alert("Không thể mượn sách.");
      }
    };

    // Lấy thông tin sách khi trang được tải
    onMounted(() => {
      fetchBookDetail();
    });

    return { book, handleBorrow }; // Trả về các biến và hàm để sử dụng trong template
  },
};
</script>