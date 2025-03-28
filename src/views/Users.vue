<template>
  <div class="users-page container mt-5">
    <h2 class="text-center">Manage Users</h2>
    <p class="text-center">
      This is the user management page. You can view, edit, or delete users here.
    </p>
    <!-- Table hoặc giao diện quản lý -->
    <div class="table-responsive mt-4">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Hiển thị danh sách người dùng tại đây -->
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editUser(user.id)">
                Edit
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import UserService from "../services/user.service"; // Sử dụng dịch vụ để lấy dữ liệu từ API

export default {
  setup() {
    const users = ref([]);

    // Lấy danh sách người dùng từ API
    const fetchUsers = async () => {
      try {
        const response = await UserService.getUsers();
        users.value = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const editUser = (userId) => {
      console.log("Edit user:", userId);
      // Thực hiện logic sửa user
    };

    const deleteUser = (userId) => {
      console.log("Delete user:", userId);
      // Thực hiện logic xóa user
    };

    onMounted(() => {
      fetchUsers();
    });

    return {
      users,
      editUser,
      deleteUser,
    };
  },
};
</script>

<style>
.users-page {
  max-width: 800px;
  margin: auto;
}
</style>