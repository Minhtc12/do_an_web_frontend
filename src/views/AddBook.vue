<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Thêm Sách Mới</h2>
    <form @submit.prevent="handleCreateBook">
      <div class="mb-3">
        <label for="MASACH" class="form-label">Mã Sách</label>
        <input
          v-model="newBook.MASACH"
          type="text"
          id="MASACH"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="TENSACH" class="form-label">Tên Sách</label>
        <input
          v-model="newBook.TENSACH"
          type="text"
          id="TENSACH"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="DONGIA" class="form-label">Đơn Giá</label>
        <input
          v-model="newBook.DONGIA"
          type="number"
          id="DONGIA"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="SOQUYEN" class="form-label">Số Quyển</label>
        <input
          v-model="newBook.SOQUYEN"
          type="number"
          id="SOQUYEN"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="NAMXUATBAN" class="form-label">Năm Xuất Bản</label>
        <input
          v-model="newBook.NAMXUATBAN"
          type="number"
          id="NAMXUATBAN"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="MANXB" class="form-label">Mã Nhà Xuất Bản</label>
        <input
          v-model="newBook.MANXB"
          type="text"
          id="MANXB"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="TACGIA" class="form-label">Tác Giả</label>
        <input
          v-model="newBook.TACGIA"
          type="text"
          id="TACGIA"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="NGUONGOC" class="form-label">Nguồn Gốc</label>
        <input
          v-model="newBook.NGUONGOC"
          type="text"
          id="NGUONGOC"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-success">Thêm Sách</button>
      <router-link to="/books" class="btn btn-secondary ms-3">Hủy</router-link>
    </form>
  </div>
</template>
<script>
import { ref } from "vue";
import BookService from "../services/book.service";
import { useRouter } from "vue-router";

export default {
  name: "AddBook",
  setup() {
    const router = useRouter();

    const newBook = ref({
      MASACH: "",
      TENSACH: "",
      DONGIA: null,
      SOQUYEN: null,
      NAMXUATBAN: null,
      MANXB: "",
      TACGIA: "",
      NGUONGOC: "",
    });

    const handleCreateBook = async () => {
      try {
        // Gửi sách mới lên backend
        await BookService.createBook(newBook.value);
        alert("Thêm sách thành công!");
        router.push("/books"); // Quay lại BookManagement sau khi thêm thành công
      } catch (error) {
        console.error("Lỗi khi thêm sách:", error);
        alert("Không thể thêm sách!");
      }
    };

    return {
      newBook,
      handleCreateBook,
    };
  },
};
</script>
<style scoped>
.container {
  max-width: 500px;
}
button {
  margin-top: 10px;
}
</style>