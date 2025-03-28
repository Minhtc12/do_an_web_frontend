<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Chỉnh Sửa Sách</h2>
    <form @submit.prevent="updateBook">
      <div class="mb-3">
        <label for="MASACH" class="form-label">Mã Sách</label>
        <input
          v-model="book.MASACH"
          type="text"
          id="MASACH"
          class="form-control"
          readonly
        />
      </div>
      <div class="mb-3">
        <label for="TENSACH" class="form-label">Tên Sách</label>
        <input
          v-model="book.TENSACH"
          type="text"
          id="TENSACH"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="DONGIA" class="form-label">Đơn Giá</label>
        <input
          v-model="book.DONGIA"
          type="number"
          id="DONGIA"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="SOQUYEN" class="form-label">Số Quyển</label>
        <input
          v-model="book.SOQUYEN"
          type="number"
          id="SOQUYEN"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="NAMXUATBAN" class="form-label">Năm Xuất Bản</label>
        <input
          v-model="book.NAMXUATBAN"
          type="number"
          id="NAMXUATBAN"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="MANXB" class="form-label">Mã Nhà Xuất Bản</label>
        <input
          v-model="book.MANXB"
          type="text"
          id="MANXB"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="TACGIA" class="form-label">Tác Giả</label>
        <input
          v-model="book.TACGIA"
          type="text"
          id="TACGIA"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="NGUONGOC" class="form-label">Nguồn Gốc</label>
        <input
          v-model="book.NGUONGOC"
          type="text"
          id="NGUONGOC"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-success">Lưu Cập Nhật</button>
      <router-link to="/books" class="btn btn-secondary ms-3">Hủy</router-link>
    </form>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BookService from "../services/book.service";

export default {
  name: "EditBook",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const book = ref({
      MASACH: "",
      TENSACH: "",
      DONGIA: null,
      SOQUYEN: null,
      NAMXUATBAN: null,
      MANXB: "",
      TACGIA: "",
      NGUONGOC: "",
    });

    // Lấy thông tin sách từ backend
    const fetchBookDetail = async () => {
      try {
        const response = await BookService.findById(route.params.MASACH);
        book.value = response.data;
      } catch (error) {
        console.error("Lỗi khi tải thông tin sách:", error);
        alert("Không thể tải thông tin sách.");
        router.push("/books"); // Quay lại trang danh sách sách nếu lỗi
      }
    };

    // Gửi yêu cầu cập nhật thông tin sách
    const updateBook = async () => {
      try {
        await BookService.updateBook(book.value.MASACH, book.value);
        alert("Cập nhật sách thành công!");
        router.push("/books"); // Điều hướng về danh sách sách sau khi cập nhật
      } catch (error) {
        console.error("Lỗi khi cập nhật sách:", error);
        alert("Không thể cập nhật sách.");
      }
    };

    onMounted(() => {
      fetchBookDetail();
    });

    return {
      book,
      updateBook,
    };
  },
};
</script>