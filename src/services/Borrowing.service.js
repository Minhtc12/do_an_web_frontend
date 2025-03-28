import api from "./api.service";

const BorrowingService = {
  requestBorrow(payload) {
  return api.post("/borrowings/request", payload);
},
  getPendingRequests() {
  return api.get("/borrowings/requests/pending");
},
 approveBorrow(MaMuon) {
  return api.put(`/borrowings/approve/${MaMuon}`);
},
  returnBook(MaMuon) {
  return api.put(`/borrowings/return/${MaMuon}`);
},
};

export default BorrowingService;