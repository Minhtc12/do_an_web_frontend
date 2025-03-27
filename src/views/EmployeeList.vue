<template>
  <div>
    <h1 class="text-center mb-4">Danh Sách Nhân Viên</h1>
    <table class="table table-bordered table-striped">
      <thead class="thead-dark">
        <tr>
          <th>MSNV</th>
          <th>Họ Tên</th>
          <th>Email</th>
          <th>Chức Vụ</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.MSNV">
          <td>{{ employee.MSNV }}</td>
          <td>{{ employee.HoTenNV }}</td>
          <td>{{ employee.Email }}</td>
          <td>{{ employee.ChucVu }}</td>
          <td>
            <router-link
              :to="`/employees/${employee.MSNV}/edit`"
              class="btn btn-sm btn-primary mr-2"
            >
              Sửa
            </router-link>
            <button
              class="btn btn-sm btn-danger"
              @click="deleteEmployee(employee.MSNV)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import EmployeeService from "../services/employee.service";

export default {
  data() {
    return {
      employees: [], // Danh sách nhân viên
    };
  },
  async mounted() {
    // Lấy danh sách nhân viên khi component được tải
    try {
      this.employees = await EmployeeService.getAllEmployees();
    } catch (error) {
      console.error("Lỗi khi tải danh sách nhân viên:", error);
      alert("Không thể tải danh sách nhân viên!");
    }
  },
  methods: {
    async deleteEmployee(MSNV) {
      if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
        try {
          await EmployeeService.deleteEmployee(MSNV); // Gửi yêu cầu xóa
          alert("Nhân viên đã được xóa thành công!");
          this.employees = this.employees.filter(
            (employee) => employee.MSNV !== MSNV
          ); // Loại bỏ khỏi danh sách hiện tại
        } catch (error) {
          console.error("Lỗi khi xóa nhân viên:", error);
          alert("Không thể xóa nhân viên!");
        }
      }
    },
  },
};
</script>

<style>
.table {
  margin-top: 20px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

h1 {
  margin-top: 20px;
}
</style>