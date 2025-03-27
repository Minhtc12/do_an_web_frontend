<template>
  <div class="unauthorized">
    <h1>Không có quyền truy cập</h1>
    <p>Xin lỗi, bạn không có quyền truy cập vào trang này.</p>
    <router-link to="/">Quay lại Trang Chủ</router-link>
  </div>
</template>

<script>
export default {
  name: "Unauthorized",
};
</script>

<style scoped>
.unauthorized {
  text-align: center;
  margin-top: 50px;
}
h1 {
  color: red;
  font-size: 2rem;
}
p {
  margin-top: 15px;
  font-size: 1.2rem;
}
a {
  margin-top: 20px;
  display: inline-block;
  color: blue;
  text-decoration: underline;
  font-size: 1rem;
}
</style>