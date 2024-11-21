<template>
  <div class="auth-container">
    <h1>Login</h1>
    <AuthForm :isSignup="false" />
  </div>
</template>

<script>
import AuthForm from '../components/AuthForm.vue';

export default {
  components: { AuthForm },
};
</script>

<style>
.auth-container {
  max-width: 50%;
  margin: 0 auto;
  padding: 20px;
  background: #f4f8f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
  color: #2b6777;
}
</style>
