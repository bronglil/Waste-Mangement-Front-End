<template>
  <div>
    <h1>Dashboard</h1>
    <p v-if="user">Welcome, {{ user.email }}</p>
    <p v-else>You are not logged in.</p>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState('auth', ['user']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async handleLogout() {
    await this.logout();
    this.$router.push('/login'); 
  },
  },
};
</script>
