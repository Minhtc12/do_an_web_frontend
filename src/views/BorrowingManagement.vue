<template>
  <div>
    <h1 class="text-center mt-4">Quản Lý Mượn Sách</h1>
    <!-- Nút chức năng -->
    <div class="text-center my-4">
      <button class="btn btn-primary mx-2" @click="fetchPendingRequests">Duyệt Yêu Cầu</button>
      <button class="btn btn-secondary mx-2" @click="fetchNotReturnedBooks">Xem Sách Chưa Trả</button>
    </div>

    <!-- Hiển thị danh sách yêu cầu chờ duyệt -->
    <div v-if="mode === 'pending'">
      <h2 class="text-center">Danh Sách Chờ Duyệt</h2>
      <table class="table table-striped mt-3">
        <thead>
          <tr>
            <th>Mã Mượn</th>
            <th>Mã Sách</th>
            <th>Tên Sách</th>
            <th>Tên Độc Giả</th>
            <th>Ngày Mượn</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="borrow in borrows" :key="borrow.MaMuon">
            <td>{{ borrow.MaMuon }}</td>
            <td>{{ borrow.MASACH }}</td>
            <td>{{ borrow.TenSach }}</td>
            <td>{{ borrow.TenDocGia }}</td>
            <td>{{ new Date(borrow.NGAYMUON).toLocaleDateString() }}</td>
            <td>
              <button class="btn btn-success btn-sm" @click="approveBorrow(borrow.MaMuon)">Duyệt</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="borrows.length === 0" class="text-center">Không có yêu cầu mượn sách cần duyệt</p>
    </div>

    <!-- Hiển thị danh sách sách chưa trả -->
    <div v-if="mode === 'not-returned'">
      <h2 class="text-center">Danh Sách Sách Chưa Trả</h2>
      <table class="table table-striped mt-3">
        <thead>
          <tr>
            <th>Mã Mượn</th>
            <th>Mã Sách</th>
            <th>Tên Sách</th>
            <th>Mã Độc Giả</th>
            <th>Ngày Mượn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="borrow in borrows" :key="borrow.MaMuon">
            <td>{{ borrow.MaMuon }}</td>
            <td>{{ borrow.MASACH }}</td>
            <td>{{ borrow.TenSach }}</td>
            <td>{{ borrow.MADOCGIA}}</td>
            <td>{{ new Date(borrow.NGAYMUON).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="borrows.length === 0" class="text-center">Không có sách chưa trả</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      mode: null, // Chế độ: duyệt yêu cầu hoặc xem chưa trả
      borrows: [], // Dữ liệu danh sách mượn sách
    };
  },
  methods: {
    // Lấy danh sách yêu cầu chờ duyệt
    async fetchPendingRequests() {
      try {
        const response = await axios.get("/api/borrowings/all?status=pending");
        this.borrows = response.data;
        this.mode = "pending"; // Chuyển sang chế độ "pending"
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu cầu chờ:", error);
      }
    },
    // Lấy danh sách sách chưa trả
    async fetchNotReturnedBooks() {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const response = await axios.get("/api/borrowings/not-returned", {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token qua header
      },
    });

    console.log("Dữ liệu từ API (sách chưa trả):", response.data);
    this.borrows = response.data; // Gán dữ liệu vào danh sách
    this.mode = "not-returned"; // Đặt chế độ là "not-returned"
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sách chưa trả:", error);
  }
},
    // Duyệt yêu cầu mượn sách
    async approveBorrow(MaMuon) {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const userId = localStorage.getItem("userId"); // Lấy mã nhân viên từ localStorage

    const response = await axios.put(`/api/borrowings/approve/${MaMuon}`, {
      MSNV: userId, // Mã nhân viên hiện tại
    }, 
    {
      headers: {
        Authorization: `Bearer ${token}`, // Đính kèm token vào header
      },
    });

    alert(response.data.message); // Hiển thị thông báo thành công
    this.fetchPendingRequests(); // Làm mới danh sách yêu cầu chờ duyệt
  } catch (error) {
    console.error("Lỗi khi duyệt yêu cầu:", error);
  }
}
  },
};
</script>