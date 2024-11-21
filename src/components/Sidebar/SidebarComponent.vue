<template>
  <aside :class="['sidebar', { collapsed }]">
    <div class="sidebar-top-line"></div>

    <div class="sidebar-header">
      <Icon icon="mdi:account-circle" class="avatar-icon" />
      <div v-if="!collapsed" class="admin-info">
        <span class="admin-name">Admin Name</span>
        <span class="admin-role">Super Admin</span>
      </div>
    </div>

    <ul class="sidebar-menu">
      <li v-for="item in menuItems" :key="item.label">
        <router-link :to="item.route" active-class="active">
          <Icon :icon="item.icon" class="menu-icon" />
          <span v-if="!collapsed" class="menu-label">{{ item.label }}</span>
        </router-link>
      </li>
    </ul>

    <button class="collapse-toggle" @click="toggleSidebar">
  <Icon
    :icon="collapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'"
    class="menu-toggle-icon"
  />
</button>
  </aside>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      collapsed: false, 
      menuItems: [
        { label: 'Locations', route: '/location', icon: 'mdi:map-marker' },
        { label: 'Bins', route: '/bins', icon: 'mdi:trash-can' },
        { label: 'Drivers', route: '/drivers', icon: 'mdi:account' },
        { label: 'Vehicles', route: '/vehicles', icon: 'mdi:car' },
        { label: 'Notifications', route: '/notifications', icon: 'mdi:bell' },
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

<style>
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
  height: 3px;
  background-color: #4a90e2;
}


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

.sidebar-menu li a:hover .menu-label {
  opacity: 1;
}

.sidebar-menu li a.active,
.sidebar-menu li a:hover {
  background-color: #2d3748;
  border-left: 4px solid #4a90e2;
}

.sidebar.collapsed .menu-label {
  display: none;
}

.sidebar.collapsed li a:hover .menu-label {
  display: inline-block;
  position: absolute;
  left: 80px;
  background-color: #1f2937;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 999;
  color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.collapse-toggle {
  position: absolute;
  top: 10px;
  right: 4px; 
  transform: translateX(50%); 
  background: none;
  border: none;
  color: #ffffff;
  font-size: 20px;
  padding: 8px;
  cursor: pointer;
  text-align: center;
}

.collapse-toggle:hover {
  color: #3447f0;
}

.menu-toggle-icon {
  font-size: 24px;
  background-color: #4a90e2;
  padding: 1px 0;
  border-radius: 40%;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    z-index: 1000;
  }
}
</style>
