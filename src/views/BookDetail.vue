<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Thông Tin Chi Tiết Sách</h2>

    <div v-if="book" class="card">
      <div class="card-body">
        <h5 class="card-title">{{ book.TENSACH }}</h5>
        <p class="card-text"><strong>Mã Sách:</strong> {{ book.MASACH }}</p>
        <p class="card-text"><strong>Đơn Giá:</strong> {{ book.DONGIA }} VNĐ</p>
        <p class="card-text"><strong>Số Quyển:</strong> {{ book.SOQUYEN }}</p>
        <p class="card-text"><strong>Năm Xuất Bản:</strong> {{ book.NAMXUATBAN }}</p>
        <p class="card-text"><strong>Mã Nhà Xuất Bản:</strong> {{ book.MANXB }}</p>
        <p v-if="book.TACGIA" class="card-text"><strong>Tác Giả:</strong> {{ book.TACGIA }}</p>
        <p v-if="book.NGUONGOC" class="card-text"><strong>Nguồn Gốc:</strong> {{ book.NGUONGOC }}</p>
      </div>

      <div class="text-end">
        <button class="btn btn-warning me-2" @click="navigateToUpdateBook">Update Book</button>
        <button v-if="isAdmin || isEmployee" class="btn btn-danger" @click="confirmDelete">Delete Book</button>
      </div>
    </div>

    <div v-else class="text-center">
      <p>Không tìm thấy thông tin sách.</p>
    </div>

    <router-link to="/books" class="btn btn-secondary mt-3">Quay Lại</router-link>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import BookService from "../services/book.service";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore";
export default {
  name: "BookDetail",
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();
    const book = ref(null);
    const navigateToUpdateBook = () => {
        router.push(`/books/${book.value.MASACH}/edit`); // Điều hướng đến trang chỉnh sửa
    };

    const confirmDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sách này không?")) {
        deleteBook();
    }
    };
    const isAdmin = computed(() => authStore.role === "Quản lý"); // Vai trò: Quản lý
    const isEmployee = computed(() => authStore.role === "Nhân viên"); // Vai trò: Nhân viên
    const isReader = computed(() => authStore.role === "Reader");
const deleteBook = async () => {
  try {
    await BookService.deleteBook(book.value.MASACH);
    alert("Xóa sách thành công!");
    router.push("/books"); // Điều hướng về danh sách sách
  } catch (error) {
    console.error("Lỗi khi xóa sách:", error);
    alert("Không thể xóa sách.");
  }
};
    const fetchBookDetail = async () => {
      try {
        const response = await BookService.findById(route.params.MASACH);
        book.value = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sách:", error);
        alert("Không thể lấy thông tin sách.");
      }
    };

    onMounted(() => {
      fetchBookDetail();
    });

    return { 
      book,
      confirmDelete,
      navigateToUpdateBook,
      isAdmin,
      isEmployee,
      isReader,
     };
  },
};
</script>