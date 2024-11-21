<template>
  <header class="navbar">
    <div class="navbar-brand">
      <img src="/logo.png" alt="Logo" class="logo" />
      <span class="brand-name">Waste</span>
    </div>
    <nav class="navbar-actions">
      <button class="user-button">
        <img src="/user-avatar.png" alt="User Avatar" class="avatar" />
        <span>Super Admin</span>
      </button>
    </nav>
  </header>
</template>

<script>
export default {};
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
  gap: 10px;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.user-button .avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
</style>
