<template>
  <div class="borrow-history-page container mt-5">
    <h2 class="text-center">My Borrow History</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Book Title</th>
          <th>Borrow Date</th>
          <th>Return Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="history in borrowHistory" :key="history.id">
          <td>{{ history.bookTitle }}</td>
          <td>{{ history.borrowDate }}</td>
          <td>{{ history.returnDate }}</td>
          <td>{{ history.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BorrowService from "../services/borrow.service";

export default {
  data() {
    return {
      borrowHistory: [],
    };
  },
  methods: {
    fetchBorrowHistory() {
      BorrowService.getBorrowHistory()
        .then((response) => {
          this.borrowHistory = response.data;
        })
        .catch((error) => {
          console.error("Error fetching borrow history:", error);
        });
    },
  },
  mounted() {
    this.fetchBorrowHistory();
  },
};
</script>

<style>
.borrow-history-page {
  max-width: 800px;
  margin: auto;
}
</style>