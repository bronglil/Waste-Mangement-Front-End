<template>
    <div class="auth-layout">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AuthLayout',
  };
  </script>
  
  <style scoped>
  .auth-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  </style>