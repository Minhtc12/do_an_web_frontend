<template>
  <div class="employee-dashboard">
    <h1>Trang Tổng Quan Nhân Viên</h1>

    <!-- Danh sách yêu cầu mượn sách -->
    <div>
      <h2>Yêu Cầu Mượn Sách:</h2>
      <ul>
        <li v-for="request in borrowRequests" :key="request.id">
          {{ request.readerName }} yêu cầu mượn "{{ request.bookTitle }}"
          <button @click="approveRequest(request.id)">Phê Duyệt</button>
          <button @click="rejectRequest(request.id)">Từ Chối</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      borrowRequests: [], // Danh sách yêu cầu mượn sách
    };
  },
  methods: {
    approveRequest(requestId) {
      console.log("Phê duyệt yêu cầu:", requestId);
      // Thêm logic API phê duyệt yêu cầu
    },
    rejectRequest(requestId) {
      console.log("Từ chối yêu cầu:", requestId);
      // Thêm logic API từ chối yêu cầu
    },
  },
  mounted() {
    console.log("EmployeeDashboard mounted");
    // Gọi API để lấy dữ liệu yêu cầu mượn sách
  },
};
</script>

<style>
.employee-dashboard {
  padding: 20px;
}
</style>