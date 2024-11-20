<template>
  <AuthLayout>
    <div class="signup-container">
      <div class="signup-card">
        <h2 class="signup-title">Create Your Account</h2>
        <form @submit.prevent="handleSignup" class="signup-form">
          <div class="form-group">
            <div class="input-container">
              <input 
                type="text" 
                id="firstName" 
                v-model="firstName" 
                placeholder=" " 
                required 
                class="form-input"
              />
              <label for="firstName" class="input-label">First Name</label>
            </div>
          </div>
          <div class="form-group">
            <div class="input-container">
              <input 
                type="text" 
                id="lastName" 
                v-model="lastName" 
                placeholder=" " 
                required 
                class="form-input"
              />
              <label for="lastName" class="input-label">Last Name</label>
            </div>
          </div>
          <div class="form-group">
            <div class="input-container">
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                placeholder=" " 
                required 
                class="form-input"
              />
              <label for="email" class="input-label">Email</label>
            </div>
          </div>
          <div class="form-group">
            <div class="input-container">
              <input 
                :type="passwordVisible ? 'text' : 'password'" 
                id="password" 
                v-model="password" 
                placeholder=" " 
                required 
                class="form-input"
              />
              <label for="password" class="input-label">Password</label>
              <span class="eye-icon" @click="togglePasswordVisibility">
                {{ passwordVisible ? '👁️' : '👁️‍🗨️' }}
              </span>
            </div>
          </div>
          <button type="submit" class="signup-button">Sign Up</button>
        </form>
        <p class="login-prompt">
          Already have an account? 
          <router-link to="/login" class="login-link">Login</router-link>
        </p>
      </div>
    </div>
  </AuthLayout>
</template>

<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordVisible: false,
    };
  },
  methods: {
    handleSignup() {
      console.log('Signing up:', this.firstName, this.lastName, this.email);
      // Add your signup logic here
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }
  }
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #6dd5ed, #2193b0);
}

.signup-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

.signup-title {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #34495e;
}

.signup-form {
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
  width: calc(100% - 30px); /* Adjust width to account for the icon */
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

.eye-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #aaa;
}

.eye-icon:hover {
  color: #3498db;
}

.signup-button {
  padding: 0.75rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.signup-button:hover {
  background-color: #2980b9;
}

.login-prompt {
  margin-top: 1rem;
  color: #34495e;
}

.login-link {
  color: #3498db;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>