<template>
  <aside :class="['sidebar', { collapsed }]">
    <!-- Top Line -->
    <div class="sidebar-top-line"></div>

    <!-- Header Section -->
    <div class="sidebar-header">
      <Icon icon="mdi:account-circle" class="avatar-icon" />
      <div v-if="!collapsed" class="admin-info">
        <span class="admin-name">{{ fullName || 'Admin Name' }}</span>
        <span class="admin-role">Super Admin</span>
      </div>
    </div>

    <!-- Menu Items -->
    <ul class="sidebar-menu">
      <li v-for="item in menuItems" :key="item.label">
        <router-link :to="item.route" active-class="active">
          <Icon :icon="item.icon" class="menu-icon" />
          <span v-if="!collapsed" class="menu-label">{{ item.label }}</span>
        </router-link>
      </li>
    </ul>

    <button @click="toggleSidebar"
      class="collapse-toggle w-8 h-8 flex items-center justify-center text-blue-500 hover:text-blue-700 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none"
      title="Add">
      <Icon :icon="collapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'" class=" w-5 h-5" />
    </button>

  </aside>
</template>

<script>
import { Icon } from "@iconify/vue";
import { mapGetters } from 'vuex';

export default {
  components: {
    Icon,
  },
  computed: {
    ...mapGetters('auth', {
      fullName: 'userFullName',
    }),
  },
  data() {
    return {
      collapsed: false,
      menuItems: [
        { label: "Dashboard", route: "/dashboard", icon: "mdi:view-dashboard" },
        { label: "Locations", route: "/location", icon: "mdi:map-marker" },
        { label: "Bins", route: "/bins", icon: "mdi:trash-can" },
        { label: "Drivers", route: "/drivers", icon: "mdi:account" },
        { label: "Vehicles", route: "/vehicles", icon: "mdi:car" },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style scoped>
/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #1f2937;
  color: #ffffff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s ease;
  overflow: hidden;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: relative;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-top-line {
  height: 2px;
  background-color: #4a90e2;
}

/* Header Section */
.sidebar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
}

.avatar-icon {
  font-size: 60px;
  color: #4a90e2;
}

.admin-info {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.admin-name {
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
}

.admin-role {
  font-size: 12px;
  color: #9ca3af;
}

/* Sidebar Menu */
.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 10px;
  flex-grow: 1;
}

.sidebar-menu li {
  margin-bottom: 10px;
}

.sidebar-menu li a {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 20px;
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
  transition: background-color 0.3s;
  position: relative;
}

.sidebar-menu li a .menu-icon {
  font-size: 20px;
}

.sidebar-menu li a .menu-label {
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.sidebar-menu li a.active,
.sidebar-menu li a:hover {
  background-color: #2d3748;
}

.sidebar.collapsed .menu-label {
  display: none;
}

.sidebar.collapsed li a:hover .menu-label {
  display: inline-block;
  position: absolute;
  left: 80px;
  background-color: #1f2937;
  padding: 10px;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 999;
  color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* Collapse Toggle */
.collapse-toggle {
  position: absolute;
  bottom: 9%;
  left: 50%;
  transform: translateX(-50%);
  background: #4a90e2;
  border: none;
  color: #ffffff;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.menu-toggle-icon {
  font-size: 24px;
}

/* Media Queries */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    z-index: 1000;
  }
}
</style>
