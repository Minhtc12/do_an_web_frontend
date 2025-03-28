<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Danh Sách Sách</h2>

    <!-- Thanh tìm kiếm -->
    <div class="d-flex align-items-center justify-content-center mb-3">
  <div class="input-group me-3" style="width: 60%;">
    <input
      v-model="searchQuery"
      type="text"
      class="form-control"
      placeholder="Tìm kiếm sách..."
    />
  </div>
  <router-link v-if="isStaff" to="/books/add" class="btn btn-primary">
  Create Book
</router-link>

</div>

    <!-- Danh sách sách -->
    <div class="row">
      <div class="col-md-4" v-for="book in filteredBooks" :key="book.MASACH">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">{{ book.TENSACH }}</h5>
            <p class="card-text"><strong>Tác Giả:</strong> {{ book.TACGIA || "N/A" }}</p>
            <p class="card-text"><strong>Năm Xuất Bản:</strong> {{ book.NAMXUATBAN }}</p>

            <button class="btn btn-primary btn-sm me-2" @click="navigateToBorrowForm(book.MASACH)">Borrow</button>
            <button class="btn btn-info btn-sm me-2" @click="viewDetails(book)">Detail</button>
           <button v-if="isStaff" class="btn btn-danger btn-sm me-2" @click="confirmDelete">
            Delete
          </button>

          </div>
        </div>
      </div>
      
    </div>
    
    <!-- Modal Borrow
    <div v-if="showBorrowModal" class="modal">
      <div class="modal-content">
        <h3>Xác Nhận Mượn Sách</h3>
        <p><strong>Mã Sách:</strong> {{ selectedBook.MASACH }}</p>
        <p><strong>Tên Sách:</strong> {{ selectedBook.TENSACH }}</p>
        <p><strong>Tác Giả:</strong> {{ selectedBook.TACGIA || "N/A" }}</p>
        <p>Bạn có chắc chắn muốn mượn sách này không?</p>

        <button class="btn btn-success" @click="confirmBorrow">Đồng ý</button>
        <button class="btn btn-secondary" @click="closeBorrowModal">Hủy</button>
      </div>
    </div>
    <div v-if="showDeleteModal" class="overlay">
  <div class="modal">
    <h3>Xác Nhận Xóa</h3>
    <p>Bạn có chắc chắn muốn xóa sách này không?</p>
    <button class="btn btn-danger" @click="confirmDelete">Xóa</button>
    <button class="btn btn-secondary" @click="closeDeleteModal">Hủy</button>
  </div>
</div> -->
  </div>
    
</template>
<script>
import { ref, computed, onMounted } from "vue";
import BookService from "../services/book.service";
import BorrowingService from "../services/Borrowing.service";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";



export default {
     name: "BookManagement",
  setup() {
    

    const router = useRouter();
    const books = ref([]);
    const searchQuery = ref("");
    const authStore = useAuthStore();
    const isStaff = computed(() => authStore.role === "Nhân viên" || authStore.role === "Quản lý");

    // Modal trạng thái
    const showBorrowModal = ref(false);
    const selectedBook = ref(null);
    const navigateToBorrowForm = (MASACH) => {
  router.push(`/books/${MASACH}/borrow`); // Điều hướng đến trang BorrowBook
};
    // Lấy danh sách sách
    const fetchBooks = async () => {
      try {
        const response = await BookService.getBooks();
        books.value = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      }
    };

    // Tìm kiếm sách
    const filteredBooks = computed(() =>
      books.value.filter((book) =>
        book.TENSACH.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );

    // Mở modal Borrow
    const openBorrowModal = (book) => {
      selectedBook.value = book;
      showBorrowModal.value = true;
    };

    // Đóng modal Borrow
    const closeBorrowModal = () => {
      showBorrowModal.value = false;
    };

    // Xác nhận mượn sách
    const confirmBorrow = async () => {
      try {
        const payload = {
          MADOCGIA: authStore.userId,
          MASACH: selectedBook.value.MASACH,
          NGAYMUON: new Date(),
        };
        await BorrowingService.requestBorrow(payload);
        alert("Yêu cầu mượn sách thành công!");
        closeBorrowModal();
      } catch (error) {
        console.error("Lỗi khi mượn sách:", error);
        alert("Không thể mượn sách!");
      }
    };

    // Xem chi tiết sách
    const viewDetails = (book) => {
      router.push(`/books/${book.MASACH}`);
    };

    // Xóa sách

const confirmDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sách này không?")) {
        deleteBook();
    }
    };

const deleteBook = async () => {
  try {
    await BookService.deleteBook(book.value.MASACH);
    alert("Xóa sách thành công!");
    router.push("/books"); // Điều hướng về danh sách sách
  } catch (error) {
    console.error("Lỗi khi xóa sách:", error);
    alert("Không thể xóa sách.");
  }
};
    // Mở modal Create Book
    const openCreateBookModal = () => {
      console.log("Mở form thêm sách");
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      searchQuery,
      filteredBooks,
      isStaff,
      showBorrowModal,
      selectedBook,
      openBorrowModal,
      closeBorrowModal,
      confirmBorrow,
      viewDetails,
      // deleteBook,
      openCreateBookModal,
      navigateToBorrowForm,
  
 
  
  confirmDelete,

    };
  },
};
</script>
<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

input-group {
  max-width: 50%; /* Giới hạn chiều rộng tối đa */
}
.btn-primary {
  white-space: nowrap; /* Đảm bảo nút không bị co nhỏ nếu không đủ chỗ */
}

</style>