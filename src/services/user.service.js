import api from "./api.service";

const UserService = {
  // Lấy danh sách độc giả
  getReaders() {
    return api.get("/docgia"); // Endpoint backend để lấy danh sách độc giả
  },

  // Lấy danh sách nhân viên
  getEmployees() {
    return api.get("/nhanvien"); // Endpoint backend để lấy danh sách nhân viên
  },

  // Lấy thông tin cụ thể về độc giả
  getReaderById(id) {
    return api.get(`/docgia/${id}`); // Endpoint backend để lấy thông tin độc giả theo ID
  },

  // Lấy thông tin cụ thể về nhân viên
  getEmployeeById(id) {
    return api.get(`/nhanvien/${id}`); // Endpoint backend để lấy thông tin nhân viên theo ID
  },

  // Cập nhật thông tin độc giả
  updateReader(id, payload) {
    return api.put(`/docgia/${id}`, payload); // Endpoint backend để cập nhật thông tin độc giả
  },

  // Cập nhật thông tin nhân viên
  updateEmployee(id, payload) {
    return api.put(`/nhanvien/${id}`, payload); // Endpoint backend để cập nhật thông tin nhân viên
  },

  // Xóa độc giả
  deleteReader(id) {
    return api.delete(`/docgia/${id}`); // Endpoint backend để xóa độc giả
  },

  // Xóa nhân viên
  deleteEmployee(id) {
    return api.delete(`/nhanvien/${id}`); // Endpoint backend để xóa nhân viên
  },
};

export default UserService;