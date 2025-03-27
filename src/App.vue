<template>
  <div id="app">
    <AppHeader :key="headerKey" />
    <router-view />
  </div>
</template>

<script>
import { useAuthStore } from "./stores/authStore";
import AppHeader from "./components/AppHeader.vue";
import { computed } from "vue";

export default {
  components: {
    AppHeader,
  },
  setup() {
    const authStore = useAuthStore();
    authStore.initialize(); // Khởi tạo trạng thái từ localStorage

    // Sử dụng computed để cập nhật key của AppHeader khi trạng thái thay đổi
    const headerKey = computed(() => authStore.isAuthenticated);

    return {
      headerKey,
    };
  },
};
</script>