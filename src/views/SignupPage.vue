<template>
  <main>
    <section class="absolute w-full h-full">
      <div
        class="absolute top-0 w-full h-full"
        style="background-size: 100%; background-repeat: no-repeat;"
        :style="{ 'background-image': 'url(' + bgImage + ')' }"
      ></div>
      <div class="container mx-auto px-4 h-full">
        <div class="flex content-center items-center justify-center h-full">
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div
                class="rounded-t mb-0 px-6 py-6"
                :style="{ backgroundColor: '#4a90e2' }"
              >
                <div class="text-center mb-3">
                  <h6 class="text-white text-lg font-bold">Sign up</h6>
                </div>
                <hr class="mt-4 border-b-1 border-gray-200" />
              </div>
              <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form @submit.prevent="handleSubmit">
                  <!-- First Name -->
                  <div class="relative w-full mb-3">
                    <label
                      class="flex items-center text-gray-700 text-sm font-bold mb-2"
                      for="firstName"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      v-model="form.firstName"
                      type="text"
                      class="border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:border-[#4a90e2] w-full"
                      placeholder="First Name"
                    />
                    <div v-if="errors.firstName" class="text-red-500 text-xs mt-1">{{ errors.firstName }}</div>
                  </div>
                  <!-- Last Name -->
                  <div class="relative w-full mb-3">
                    <label
                      class="flex items-center text-gray-700 text-sm font-bold mb-2"
                      for="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      v-model="form.lastName"
                      type="text"
                      class="border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:border-[#4a90e2] w-full"
                      placeholder="Last Name"
                    />
                    <div v-if="errors.lastName" class="text-red-500 text-xs mt-1">{{ errors.lastName }}</div>
                  </div>
                  <!-- Phone -->
                  <div class="relative w-full mb-3">
                    <label
                      class="flex items-center text-gray-700 text-sm font-bold mb-2"
                      for="phone"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      class="border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:border-[#4a90e2] w-full"
                      placeholder="Phone"
                    />
                    <div v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</div>
                  </div>
                  <!-- Email -->
                  <div class="relative w-full mb-3">
                    <label
                      class="flex items-center text-gray-700 text-sm font-bold mb-2"
                      for="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      class="border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:border-[#4a90e2] w-full"
                      placeholder="Email"
                    />
                    <div v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</div>
                  </div>
                  <!-- Password -->
                  <div class="relative w-full mb-3">
                    <label
                      class="flex items-center text-gray-700 text-sm font-bold mb-2"
                      for="password"
                    >
                      Password
                    </label>
                    <div class="relative">
                      <input
                        id="password"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="form.password"
                        class="border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:border-[#4a90e2] w-full"
                        placeholder="Password"
                      />
                      <span
                        class="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                        @click="togglePassword"
                      >
                        <Icon
                          :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'"
                          class="text-lg"
                          style="color: #4a90e2"
                        />
                      </span>
                    </div>
                    <div v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</div>
                  </div>
                  <!-- Submit Button -->
                  <div class="text-center mt-6">
                    <button
                      class="bg-[#4a90e2] text-white hover:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class="flex flex-wrap mt-6">
              <div class="w-full text-center">
                <a href="#login" class="text-[#4a90e2] hover:text-blue-600 text-sm">
                  Already have an account? Login here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import bgImage from "../assets/register_bg_2.png";
import { Icon } from "@iconify/vue";
import { mapActions } from "vuex";

export default {
  name: "SignupPage",
  components: { Icon },
  data() {
    return {
      bgImage,
      form: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
      },
      showPassword: false,
      errors: {},
    };
  },
  methods: {
    ...mapActions("auth", ["signup"]),
    validateForm() {
      this.errors = {};

      if (!this.form.firstName) {
        this.errors.firstName = "First Name is required.";
      } else if (this.form.firstName.length < 2) {
        this.errors.firstName = "First Name must be at least 2 characters.";
      }

      if (!this.form.lastName) {
        this.errors.lastName = "Last Name is required.";
      } else if (this.form.lastName.length < 2) {
        this.errors.lastName = "Last Name must be at least 2 characters.";
      }

      const phonePattern = /^[0-9]{10}$/;
      if (!this.form.phone) {
        this.errors.phone = "Phone number is required.";
      } else if (!phonePattern.test(this.form.phone)) {
        this.errors.phone = "Phone number must be 10 digits.";
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.form.email) {
        this.errors.email = "Email is required.";
      } else if (!emailPattern.test(this.form.email)) {
        this.errors.email = "Email is not valid.";
      }

      if (!this.form.password) {
        this.errors.password = "Password is required.";
      } else if (this.form.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters.";
      }

      return Object.keys(this.errors).length === 0;
    },
    async handleSubmit() {
      if (this.validateForm()) {
        try {
          const { firstName, lastName, phone, email, password } = this.form;
          await this.signup({ firstName, lastName, phone, email, password });
          this.$router.push("/dashboard");
        } catch (error) {
          alert("Error: " + error.message);
        }
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.bg-gray-900 {
  background: linear-gradient(135deg, #2b6777, #4a90e2);
}
</style>
