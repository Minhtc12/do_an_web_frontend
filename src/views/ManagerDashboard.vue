<template>
  <div class="manager-dashboard">
    <h1>Trang Tổng Quan Quản Lý</h1>

    <!-- Thống kê -->
    <div>
      <h2>Thống Kê:</h2>
      <ul>
        <li>Tổng Số Nhân Viên: {{ stats.employees }}</li>
        <li>Tổng Số Sách: {{ stats.books }}</li>
        <li>Doanh Thu: {{ stats.revenue }}</li>
      </ul>
    </div>

    <!-- Quản lý -->
    <div>
      <h2>Hành Động Quản Lý:</h2>
      <button @click="manageEmployees">Quản Lý Nhân Viên</button>
      <button @click="manageBooks">Quản Lý Sách</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stats: {
        employees: 0,
        books: 0,
        revenue: 0,
      },
    };
  },
  methods: {
    manageEmployees() {
      console.log("Chuyển đến trang quản lý nhân viên");
    },
    manageBooks() {
      console.log("Chuyển đến trang quản lý sách");
    },
  },
  mounted() {
    console.log("ManagerDashboard mounted");
    // Gọi API để lấy thống kê và dữ liệu liên quan
  },
};
</script>

<style>
.manager-dashboard {
  padding: 20px;
}
</style>