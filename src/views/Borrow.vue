<template>
  <div>
    <h1 class="text-center mt-4">Quản Lý Mượn Sách</h1>
    <div class="text-center my-4">
      <!-- Nút chức năng -->
      <button class="btn btn-primary mx-2" @click="fetchBooks">Mượn Sách</button>
      <button class="btn btn-secondary mx-2" @click="fetchBorrowHistory">Lịch Sử Mượn</button>
    </div>

    <!-- Giao diện mượn sách -->
    <div v-if="mode === 'borrow'">
      <h2 class="text-center">Danh Sách Sách Có Thể Mượn</h2>
      <table class="table table-striped mt-3">
        <thead>
          <tr>
            <th>Tên Sách</th>
            <th>Tác Giả</th>
            <th>Thể Loại</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.MASACH">
            <td>{{ book.TenSach }}</td>
            <td>{{ book.TacGia }}</td>
            <td>{{ book.TheLoai }}</td>
            <td>
              <button class="btn btn-success btn-sm" @click="borrowBook(book.MASACH)">Mượn</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="books.length === 0" class="text-center">Không có sách nào để mượn.</p>
    </div>

    <!-- Giao diện lịch sử mượn -->
    <div v-if="mode === 'history'">
      <h2 class="text-center">Lịch Sử Mượn Sách</h2>
      <table class="table table-striped mt-3">
        <thead>
          <tr>
            <th>Tên Sách</th>
            <th>Tác Giả</th>
            <th>Ngày Mượn</th>
            <th>Ngày Trả</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in borrowHistory" :key="record.MaMuon">
            <td>{{ record.MASACH.TenSach }}</td>
            <td>{{ record.MASACH.TacGia }}</td>
            <td>{{ new Date(record.NGAYMUON).toLocaleDateString() }}</td>
            <td>{{ record.NGAYTRA ? new Date(record.NGAYTRA).toLocaleDateString() : "Chưa trả" }}</td>
            <td>{{ record.TrangThai }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="borrowHistory.length === 0" class="text-center">Không có lịch sử mượn sách để hiển thị.</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      mode: null, // Chế độ hiển thị: "borrow" hoặc "history"
      books: [], // Danh sách sách có thể mượn
      borrowHistory: [], // Lịch sử mượn sách
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await axios.get("/api/books/available", {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token qua header
          },
        });
        this.books = response.data;
        this.mode = "borrow"; // Chuyển sang chế độ mượn sách
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      }
    },
    async fetchBorrowHistory() {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage
        const response = await axios.get("/api/borrowings/history", {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token qua header
          },
        });
        this.borrowHistory = response.data;
        this.mode = "history"; // Chuyển sang chế độ lịch sử mượn
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử mượn sách:", error);
      }
    },
    async borrowBook(MASACH) {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // Lấy mã độc giả từ localStorage

        const response = await axios.post("/api/borrowings/request", {
          MASACH,
          MADOCGIA: userId, // Gửi mã độc giả
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Đính kèm token
          },
        });

        alert(response.data.message);
        this.fetchBooks(); // Làm mới danh sách sách sau khi mượn
      } catch (error) {
        console.error("Lỗi khi mượn sách:", error);
      }
    },
  },
};
</script>