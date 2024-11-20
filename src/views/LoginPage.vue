<template>
  <AuthLayout>
    <div class="login-container">
      <div class="login-card">
        <h2 class="login-title">Welcome to Waste Management</h2>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <div class="input-container">
              <input 
                type="text" 
                id="username" 
                v-model="username" 
                placeholder=" " 
                required 
                class="form-input"
              />
              <label for="username" class="input-label">Username</label>
            </div>
          </div>
          <div class="form-group">
            <div class="input-container">
              <input 
                type="password" 
                id="password" 
                v-model="password" 
                placeholder=" " 
                required 
                class="form-input"
              />
              <label for="password" class="input-label">Password</label>
            </div>
          </div>
          <button type="submit" class="login-button">Login</button>
        </form>
        <p class="signup-prompt">
          Don't have an account? 
          <router-link to="/signup" class="signup-link">Sign Up</router-link>
        </p>
      </div>
    </div>
  </AuthLayout>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      console.log('Logging in:', this.username);
      // Add your login logic here
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #6dd5ed, #2193b0);
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

.login-title {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #34495e;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.input-container {
  position: relative;
  margin-bottom: 1rem;
}

.form-input {
  padding: 0.75rem 0.5rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-label {
  position: absolute;
  left: 10px;
  top: 10px;
  color: #aaa;
  transition: 0.2s ease all;
  pointer-events: none;
}

.form-input:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  outline: none;
}

.form-input:focus + .input-label,
.form-input:not(:placeholder-shown) + .input-label {
  top: -10px;
  left: 10px;
  font-size: 0.8rem;
  color: #3498db;
}

.login-button {
  padding: 0.75rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #2980b9;
}

.signup-prompt {
  margin-top: 1rem;
  color: #34495e;
}

.signup-link {
  color: #3498db;
  text-decoration: none;
}

.signup-link:hover {
  text-decoration: underline;
}
</style>