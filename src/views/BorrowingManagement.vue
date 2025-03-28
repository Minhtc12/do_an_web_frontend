<template>
  <div>
    <h1>Quản Lý Mượn Sách</h1>
    <!-- Nút lớn -->
    <button @click="fetchPendingRequests">Duyệt Yêu Cầu</button>
    <button @click="fetchNotReturnedBooks">Xem Sách Chưa Trả</button>

    <table v-if="borrows.length > 0">
      <thead>
        <tr>
          <th>Mã Mượn</th>
          <th>Mã Sách</th>
          <th>Tên Sách</th>
          <th>Tên Độc Giả</th>
          <th>Ngày Mượn</th>
          <th v-if="mode === 'pending'">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="borrow in borrows" :key="borrow.MaMuon">
          <td>{{ borrow.MaMuon }}</td>
          <td>{{ borrow.MASACH }}</td>
          <td>{{ borrow.TenSach }}</td>
          <td>{{ borrow.TenDocGia }}</td>
          <td>{{ new Date(borrow.NGAYMUON).toLocaleDateString() }}</td>
          <td v-if="mode === 'pending'">
            <button @click="approveBorrow(borrow.MaMuon)">Duyệt</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No data available</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      mode: null, // Chế độ: duyệt yêu cầu hoặc xem chưa trả
      borrows: [], // Dữ liệu danh sách mượn
    };
  },
  methods: {
    async fetchPendingRequests() {
      try {
        const response = await axios.get('/api/borrowings/all?status=pending');
        this.borrows = response.data;
        this.mode = 'pending';
      } catch (error) {
        console.error('Lỗi khi lấy danh sách yêu cầu chờ:', error);
      }
    },
    async fetchNotReturnedBooks() {
      try {
        const response = await axios.get('/api/borrowings/not-returned');
        this.borrows = response.data;
        this.mode = 'not-returned';
      } catch (error) {
        console.error('Lỗi khi lấy danh sách chưa trả:', error);
      }
    },
    async approveBorrow(MaMuon) {
      try {
        const response = await axios.put(`/api/borrowings/approve/${MaMuon}`, {
          MSNV: "NV123456", // Mã nhân viên hiện tại
        });
        alert(response.data.message);
        this.fetchPendingRequests(); // Cập nhật danh sách sau khi duyệt
      } catch (error) {
        console.error('Lỗi khi duyệt yêu cầu:', error);
      }
    },
  },
};
</script>