<template>
  <div class="publisher-page container mt-5">
    <h2 class="text-center">Manage Publishers</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="publisher in publishers" :key="publisher.id">
          <td>{{ publisher.id }}</td>
          <td>{{ publisher.name }}</td>
          <td>{{ publisher.address }}</td>
          <td>
            <button class="btn btn-warning btn-sm" @click="editPublisher(publisher.id)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="deletePublisher(publisher.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PublisherService from "../services/publisher.service";

export default {
  data() {
    return {
      publishers: [],
    };
  },
  methods: {
    fetchPublishers() {
      PublisherService.getPublishers()
        .then((response) => {
          this.publishers = response.data;
        })
        .catch((error) => {
          console.error("Error fetching publishers:", error);
        });
    },
    editPublisher(id) {
      console.log("Edit publisher:", id);
      // Thêm logic chỉnh sửa
    },
    deletePublisher(id) {
      console.log("Delete publisher:", id);
      // Thêm logic xóa
    },
  },
  mounted() {
    this.fetchPublishers();
  },
};
</script>

<style>
.publisher-page {
  max-width: 800px;
  margin: auto;
}
</style>