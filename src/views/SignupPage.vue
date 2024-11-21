<template>
  <div class="auth-container">
    <h1>Signup</h1>
    <AuthForm :isSignup="true" />
  </div>
</template>

<script>
import AuthForm from '../components/AuthForm.vue';

export default {
  components: { AuthForm },
};
</script>

<style>
/* Same as LoginPage for consistency */
.auth-container {
  max-width: 60%;
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
