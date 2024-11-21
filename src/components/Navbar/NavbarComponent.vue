<template>
  <header class="navbar">
    <div class="navbar-brand">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <span class="brand-name">Waste Management</span>
    </div>

    <nav class="navbar-actions">
      <div class="action-item" @click="handleLogout">
        <img src="@/assets/logout.svg" alt="Logout" class="icon" />
        <span class="tooltip">Logout</span>
      </div>
    </nav>
  </header>
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

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1f2937; 
  color: #ffffff;          
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
  height: 60px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  width: 40px;
  height: 40px;
}

.brand-name {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.action-item {
  position: relative;
  font-size: 18px;
  cursor: pointer;
  color: #ffffff;
  transition: color 0.3s ease;
}

.action-item:hover {
  color: #4a90e2; 
}

.action-item .icon {
  width: 30px;
  height: 30px;
  filter: invert(1); 
}

.tooltip {
  position: absolute;
  bottom: -25px; 
  left: 50%;
  transform: translateX(-50%);
  background-color: #2b6777;
  color: #ffffff;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.action-item:hover .tooltip {
  opacity: 1;
  visibility: visible;
}
</style>
