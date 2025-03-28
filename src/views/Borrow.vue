<template>
  <div>
    <h1 class="text-center mt-4">Quản Lý Sách Đã Mượn</h1>
    <div class="text-center my-4">
      <!-- Nút chức năng -->
      <button class="btn btn-warning mx-2" @click="fetchPendingBooks">Sách Chờ Duyệt</button>
      <button class="btn btn-primary mx-2" @click="fetchBorrowedBooks">Sách Đã Mượn</button>
    </div>

    <!-- Giao diện sách chờ duyệt -->
    <div v-if="mode === 'pending'">
      <h2 class="text-center">Danh Sách Sách Đang Chờ Duyệt</h2>
      <table class="table table-striped mt-3">
        <thead>
          <tr>
            <th>Tên Sách</th>
            <th>Ngày Mượn</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in pendingBooks" :key="record.MaMuon">
            <td>{{ record.MASACH.TENSACH }}</td>
            <td>{{ new Date(record.NGAYMUON).toLocaleDateString() }}</td>
            <td>
              <button class="btn btn-danger btn-sm" @click="cancelBorrowRequest(record.MaMuon)">Hủy</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="pendingBooks.length === 0" class="text-center">Không có sách nào đang chờ duyệt.</p>
    </div>

    <!-- Giao diện sách đã mượn -->
    <div v-if="mode === 'borrowed'">
      <h2 class="text-center">Danh Sách Sách Đã Mượn</h2>
      <table class="table table-striped mt-3">
        <thead>
          <tr>
            <th>Tên Sách</th>
            <th>Ngày Mượn</th>
            <th>Ngày Trả</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in borrowedBooks" :key="record.MaMuon">
            <td>{{ record.MASACH.TENSACH }}</td>
            <td>{{ new Date(record.NGAYMUON).toLocaleDateString() }}</td>
            <td>{{ record.NGAYTRA ? new Date(record.NGAYTRA).toLocaleDateString() : "Chưa trả" }}</td>
            <td>
              <button v-if="!record.NGAYTRA" class="btn btn-success btn-sm" @click="returnBook(record.MaMuon)">Trả</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="borrowedBooks.length === 0" class="text-center">Không có sách nào đã mượn.</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      mode: null, // Chế độ hiển thị: 'pending' hoặc 'borrowed'
      pendingBooks: [], // Danh sách sách đang chờ duyệt
      borrowedBooks: [], // Danh sách sách đã mượn
    };
  },
  methods: {
    async fetchPendingBooks() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/borrowings/pending", {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.pendingBooks = response.data;
        this.mode = "pending"; // Chuyển sang chế độ hiển thị sách chờ duyệt
        console.log("Danh sách sách chờ duyệt:", this.pendingBooks);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách chờ duyệt:", error);
      }
    },

    async fetchBorrowedBooks() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/borrowings/borrowed", {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.borrowedBooks = response.data;
        this.mode = "borrowed"; // Chuyển sang chế độ hiển thị sách đã mượn
        console.log("Danh sách sách đã mượn:", this.borrowedBooks);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách đã mượn:", error);
      }
    },

    async cancelBorrowRequest(MaMuon) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`/api/borrowings/cancel/${MaMuon}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert(response.data.message);
        this.fetchPendingBooks(); // Làm mới danh sách sách chờ duyệt
      } catch (error) {
        console.error("Lỗi khi hủy yêu cầu mượn sách:", error);
      }
    },

    async returnBook(MaMuon) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`/api/borrowings/return/${MaMuon}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert(response.data.message);
        this.fetchBorrowedBooks(); // Làm mới danh sách sách đã mượn
      } catch (error) {
        console.error("Lỗi khi trả sách:", error);
      }
    },
  },
};
</script>