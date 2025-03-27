<template>
  <header>
    <!-- Navigation bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container">
        <!-- Logo -->
        <a class="navbar-brand" href="#">
          <i class="bi bi-book"></i> Library Management
        </a>

        <!-- Toggle button for small screens -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation links -->
        <div class="collapse navbar-collapse" id="navbarContent">
          <!-- Left-side navigation -->
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">
                <i class="bi bi-house-door"></i> Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/books" class="nav-link">
                <i class="bi bi-book-half"></i> Books
              </router-link>
            </li>
          </ul>

          <!-- Right-side account actions -->
          <ul class="navbar-nav ms-auto">
            <!-- Login and Register -->
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li v-if="!isAuthenticated" class="nav-item">
              <router-link to="/register" class="nav-link">Register</router-link>
            </li>

            <!-- Dropdown for logged-in users -->
            <li v-if="isAuthenticated" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-person-circle"></i> Welcome, {{ userName }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <button class="dropdown-item" @click="logout">
                    <i class="bi bi-box-arrow-right"></i> Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    // Authenticated state
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const userName = computed(() => authStore.role || "Guest");

    const logout = () => {
      authStore.logout();
      router.push("/"); // Redirect to home page after logout
      console.log("Logged out and redirected to home.");
    };

    return {
      isAuthenticated,
      userName,
      logout,
    };
  },
};
</script>

<style>
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}
.nav-link {
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 5px; /* Space between icon and text */
}
.shadow-sm {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}
</style>