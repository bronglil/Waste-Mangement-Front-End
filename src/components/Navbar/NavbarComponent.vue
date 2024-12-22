<template>
  <header class="navbar">
    <!-- Brand Section -->
    <div class="navbar-brand">
      <img src="@/assets/logorecycle.png" alt="Logo" class="logo" />
      <span class="brand-name">Waste Management</span>
    </div>

    <!-- Actions Section -->
    <nav class="navbar-actions">
      <!-- Settings Dropdown -->
      <div class="action-item relative" @click="toggleSettingsDropdown">
        <img src="@/assets/settings.svg" alt="Setting" class="icon" />

        <div v-if="isSettingsOpen" class="dropdown-menu">
          <button class="dropdown-item" @click="openAccountSettings">Account Settings</button>
          <button class="dropdown-item" @click="openHelp">Help & Support</button>
          <button class="dropdown-item" @click="openInviteAdminModal">Invite Admin</button>
        </div>
      </div>

      <!-- Logout -->
      <div class="action-item" @click="handleLogout">
        <img src="@/assets/logout.svg" alt="Logout" class="icon" />
        <span class="tooltip">Logout</span>
      </div>
    </nav>

    <!-- Invite Admin Modal -->
    <InviteAdminModal v-if="isInviteAdminModalOpen" @close="closeInviteAdminModal" />
  </header>
</template>

<script>
import InviteAdminModal from "../../components/InviteAdmin/InviteAdmin.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: { InviteAdminModal },
  data() {
    return {
      isSettingsOpen: false, // Dropdown state
      isInviteAdminModalOpen: false, // Modal state
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    async handleLogout() {
      await this.logout();
      this.$router.push("/login");
    },
    toggleSettingsDropdown() {
      this.isSettingsOpen = !this.isSettingsOpen;
    },
    openAccountSettings() {
      // alert("Navigating to Account Settings...");
      this.$router.push({ name: 'AccountSettings' });
      this.isSettingsOpen = false;
    },
    openHelp() {
      alert("Opening Help & Support...");
      this.isSettingsOpen = false;
    },
    openInviteAdminModal() {
      this.isInviteAdminModalOpen = true;
      this.isSettingsOpen = false;
    },
    closeInviteAdminModal() {
      this.isInviteAdminModalOpen = false;
    },
  },
};
</script>

<style scoped>
/* Navbar Styles */
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

/* Brand Section */
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

/* Actions Section */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Action Items */
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

.icon {
  width: 24px;
  height: 24px;
  filter: invert(1);
}

/* Tooltip */
.tooltip {
  position: absolute;
  bottom: -30px;
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

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  overflow: hidden;
  width: 180px;
  padding: 0.5rem 0;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  font-size: 14px;
  text-align: left;
  color: #1f2937;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-item:focus {
  outline: none;
  background-color: #e5e7eb;
}
</style>
