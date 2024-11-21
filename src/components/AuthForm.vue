<template>
  <div class="auth-form-container">
    <form @submit.prevent="handleSubmit" class="auth-form">
      <h2 class="form-title">{{ isSignup ? 'Create an Account' : 'Welcome Back' }}</h2>

      <!-- Signup-specific fields -->
      <div v-if="isSignup">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="form.firstName" placeholder="Enter your first name" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="form.lastName" placeholder="Enter your last name" required />
        </div>
        <div class="form-group">
          <label for="phone">Phone:</label>
          <input type="tel" id="phone" v-model="form.phone" placeholder="Enter your phone number" required />
        </div>
      </div>

      <!-- Common fields -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" placeholder="Enter your email" required />
      </div>
      <div class="form-group password-group">
        <label for="password">Password:</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="form.password"
          placeholder="Enter your password"
          required
        />
        <i
          :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
          @click="togglePassword"
          class="toggle-password"
        ></i>
      </div>

      <button type="submit" class="form-button">
        {{ isSignup ? 'Sign Up' : 'Log In' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    isSignup: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
      },
      showPassword: false,
    };
  },
  methods: {
    ...mapActions('auth', ['login', 'signup']),
    async handleSubmit() {
      try {
        if (this.isSignup) {
          const { firstName, lastName, phone, email, password } = this.form;
          await this.signup({ firstName, lastName, phone, email, password });
        } else {
          const { email, password } = this.form;
          await this.login({ email, password });
        }
        this.$router.push('/dashboard');
      } catch (error) {
        alert('Error: ' + error.message);
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style>
.auth-form-container {
  display: flex;
  justify-content: center;
  align-items: center;   
  height: 70vh;         
  margin: 95 !important;          
  background: linear-gradient(135deg, #52ab98, #2b6777); 
  padding: 20px;           
  box-sizing: border-box; 
}

/* Form styling */
.auth-form {
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-title {
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #2b6777;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  /* display: block; */
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #444;
}

input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #2b6777;
}

/* Password field with eye icon */
.password-group {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
}

.toggle-password:hover {
  color: #2b6777;
}

/* Button styling */
.form-button {
  background-color: #2b6777;
  color: #ffffff;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #52ab98;
}
</style>
