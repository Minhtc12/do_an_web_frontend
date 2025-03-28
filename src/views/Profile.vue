<template>
  <div class="profile-page container mt-5">
    <h2 class="text-center">My Profile</h2>
    <form @submit.prevent="updateProfile">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input v-model="profile.name" type="text" class="form-control" id="name" />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input v-model="profile.email" type="email" class="form-control" id="email" disabled />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <input v-model="profile.address" type="text" class="form-control" id="address" />
      </div>
      <button type="submit" class="btn btn-primary">Update Profile</button>
    </form>
  </div>
</template>

<script>
import AuthService from "../services/auth.service";

export default {
  data() {
    return {
      profile: {},
    };
  },
  methods: {
    fetchProfile() {
      AuthService.getAccountInfo()
        .then((response) => {
          this.profile = response.data;
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    },
    updateProfile() {
      AuthService.updateAccountInfo(this.profile)
        .then(() => {
          alert("Profile updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    },
  },
  mounted() {
    this.fetchProfile();
  },
};
</script>

<style>
.profile-page {
  max-width: 600px;
  margin: auto;
}
</style>