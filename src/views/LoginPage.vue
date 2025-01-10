<template>
  <main>
    <section class="absolute w-full h-full">
      <div class="absolute top-0 w-full h-full" style="background-size: 100%; background-repeat: no-repeat;"
        :style="{ 'background-image': 'url(' + bgImage + ')' }"></div>
      <div class="container mx-auto px-4 h-full">
        <div class="flex content-center items-center justify-center h-full">
          <div class="w-full lg:w-4/12 px-4">
            <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div class="rounded-t mb-0 px-6 py-6" :style="{ backgroundColor: '#4a90e2' }">
                <div class="text-center mb-3">
                  <h6 class="text-white text-lg font-bold">Sign in</h6>
                </div>
                <hr class="mt-4 border-b-1 border-gray-200" />
              </div>
              <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form @submit.prevent="handleSubmit">
                  <!-- Email -->
                  <div class="relative w-full mb-3">
                    <label class="flex items-center block text-gray-700 text-sm font-bold mb-2" for="email">
                      Email
                    </label>
                    <input id="email" v-model="form.email" type="email"
                      class="border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:border-[#4a90e2] w-full"
                      placeholder="Email" />
                  </div>
                  <!-- Password -->
                  <div class="relative w-full mb-3">
                    <label class="flex items-center block text-gray-700 text-sm font-bold mb-2" for="password">
                      Password
                    </label>
                    <div class="relative">
                      <input id="password" :type="showPassword ? 'text' : 'password'" v-model="form.password"
                        class="border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:border-[#4a90e2] w-full"
                        placeholder="Password" />
                      <span class="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                        @click="togglePassword">
                        <Icon :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="text-lg"
                          style="color: #4a90e2;" />
                      </span>
                    </div>
                  </div>
                  <!-- Error Message -->
                  <div v-if="errorMessage" class="text-red-500 text-sm mb-3">
                    {{ errorMessage }}
                  </div>
                  <!-- Sign In Button -->
                  <div class="text-center mt-8">
                    <button
                      class="bg-[#4a90e2] text-white hover:bg-blue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full"
                      type="submit">
                      Sign In
                    </button>
                  </div>
                </form>
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
  name: "LoginPage",
  components: { Icon },
  data() {
    return {
      bgImage,
      form: {
        email: "",
        password: "",
      },
      showPassword: false,
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async handleSubmit() {
      try {
        const { email, password } = this.form;
        console.log(email, password, "email, password");
        await this.login({ credentials: { email, password }, source: 'LoginPage' });
        this.$router.push("/dashboard")
      } catch (error) {
        this.errorMessage = error.message || "An error occurred during login.";
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
/* Background Gradient */
.bg-gray-900 {
  background: linear-gradient(135deg, #2b6777, #4a90e2);
}

/* Center Page */
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
