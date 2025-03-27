import api from "./api.service";

const EmployeeService = {
  getAllEmployees() {
    return api.get("/employees"); // Lấy danh sách nhân viên
  },
  getEmployeeById(MSNV) {
    return api.get(`/employees/${MSNV}`); // Lấy thông tin nhân viên theo MSNV
  },
  createEmployee(data) {
    return api.post("/employees", data); // Thêm nhân viên mới
  },
  updateEmployee(MSNV, data) {
    return api.put(`/employees/${MSNV}`, data); // Cập nhật nhân viên
  },
  deleteEmployee(MSNV) {
    return api.delete(`/employees/${MSNV}`); // Xóa nhân viên
  },
};

export default EmployeeService;