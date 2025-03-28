<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Danh Sách Yêu Cầu Mượn Sách</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Mã Mượn</th>
          <th>Mã Độc Giả</th>
          <th>Mã Sách</th>
          <th>Ngày Mượn</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(request, index) in pendingRequests" :key="request.MaMuon">
          <td>{{ index + 1 }}</td>
          <td>{{ request.MaMuon }}</td>
          <td>{{ request.MADOCGIA }}</td>
          <td>{{ request.MASACH }}</td>
          <td>{{ new Date(request.NGAYMUON).toLocaleDateString() }}</td>
          <td>
            <button class="btn btn-success btn-sm" @click="approveRequest(request.MaMuon)">Duyệt</button>
            <button class="btn btn-danger btn-sm" @click="denyRequest(request.MaMuon)">Từ Chối</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import BorrowingService from "../services/Borrowing.service";

export default {
  setup() {
    const pendingRequests = ref([]);

    const fetchPendingRequests = async () => {
      try {
        const response = await BorrowingService.getPendingRequests();
        pendingRequests.value = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách yêu cầu:", error);
      }
    };

    const approveRequest = async (MaMuon) => {
      try {
        await BorrowingService.approveBorrow(MaMuon);
        pendingRequests.value = pendingRequests.value.filter((req) => req.MaMuon !== MaMuon);
        console.log("Yêu cầu đã được duyệt:", MaMuon);
      } catch (error) {
        console.error("Lỗi khi duyệt yêu cầu:", error);
      }
    };

    onMounted(() => {
      fetchPendingRequests();
    });

    return {
      pendingRequests,
      approveRequest,
    };
  },
};
</script>