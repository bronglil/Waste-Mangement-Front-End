<template>
  <aside class="sidebar">
    <!-- <div class="sidebar-header">
      <img src="/logo.png" alt="Logo" class="logo" />
      <span class="app-name">Waste Management</span>
    </div> -->
    <ul class="sidebar-menu">
      <li>
        <router-link to="/dashboard" active-class="active">
          <i class="fas fa-home"></i> Dashboard
        </router-link>
      </li>
      <li>
        <router-link to="/locations" active-class="active">
          <i class="fas fa-map-marker-alt"></i> Locations
        </router-link>
      </li>
      <li>
        <router-link to="/vehicles" active-class="active">
          <i class="fas fa-car"></i> Vehicles
        </router-link>
      </li>
      <li>
        <router-link to="/drivers" active-class="active">
          <i class="fas fa-user"></i> Drivers
        </router-link>
      </li>
      <li>
        <router-link to="/notifications" active-class="active">
          <i class="fas fa-bell"></i> Notifications
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {};
</script>

<style>
.sidebar {
  width: 250px;
  background-color: #1f2937;
  color: #ffffff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 10px;
}

.logo {
  width: 40px;
  height: 40px;
}

.app-name {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  margin-bottom: 10px;
}

.sidebar-menu li a {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
  transition: background-color 0.3s;
}

.sidebar-menu li a i {
  margin-right: 10px;
}

.sidebar-menu li a.active,
.sidebar-menu li a:hover {
  background-color: #2d3748;
  border-left: 4px solid #4a90e2;
}
</style>
