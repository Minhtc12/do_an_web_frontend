<template>
  <div>
    <h1 class="text-center mt-4">Duyệt Yêu Cầu Mượn Sách</h1>
    <div v-if="borrows.length > 0" class="mt-5">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Mã Mượn</th>
            <th>Tên Sách</th>
            <th>Độc Giả</th>
            <th>Ngày Mượn</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="borrow in borrows" :key="borrow.MaMuon">
            <td>{{ borrow.MaMuon }}</td>
            <td>{{ borrow.TenSach }}</td>
            <td>{{ borrow.TenDocGia }}</td>
            <td>{{ new Date(borrow.NGAYMUON).toLocaleDateString() }}</td>
            <td>
              <button class="btn btn-success btn-sm" @click="approveBorrow(borrow.MaMuon)">
                Duyệt
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="text-center mt-5">Không có yêu cầu mượn sách cần duyệt</p>
  </div>
</template>
<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const borrows = ref([]); // Dữ liệu danh sách yêu cầu mượn sách chờ duyệt

    // Hàm lấy danh sách yêu cầu chờ duyệt
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get("/api/borrowings/all?status=pending");
        borrows.value = response.data; // Gán dữ liệu vào borrows
      } catch (error) {
        console.error("Lỗi khi lấy danh sách chờ duyệt:", error);
      }
    };

    // Hàm duyệt yêu cầu mượn sách
    const approveBorrow = async (MaMuon) => {
      try {
        const response = await axios.put(`/api/borrowings/approve/${MaMuon}`, {
          MSNV: "NV123456", // Mã nhân viên duyệt yêu cầu
        });
        alert(response.data.message); // Hiển thị thông báo thành công
        fetchPendingRequests(); // Tải lại danh sách sau khi duyệt
      } catch (error) {
        console.error("Lỗi khi duyệt yêu cầu:", error);
      }
    };

    onMounted(() => {
      fetchPendingRequests(); // Lấy danh sách chờ duyệt khi component được mounted
    });

    return {
      borrows,
      approveBorrow,
    };
  },
};
</script>
<style scoped>
h1 {
  font-size: 2rem;
}

.table {
  margin-top: 20px;
  border: 1px solid #ddd;
}

.table th, .table td {
  text-align: center;
  vertical-align: middle;
}

.btn-success {
  font-size: 0.9rem;
  padding: 5px 10px;
}
</style>