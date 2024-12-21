<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
  >
    <div class="bg-white rounded-xl shadow-xl px-6 py-6 w-full max-w-lg relative">
      <!-- Close Button -->
      <button
        class="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
        @click="$emit('close')"
      >
        <Icon :icon="'mdi:close-circle'" class="text-gray-600 w-5 h-5" />
      </button>

      <!-- Modal Header -->
      <h2 class="text-xl font-semibold mb-6 text-gray-800 text-left flex items-center border-b pb-2">
        <Icon :icon="'mdi:account-edit'" class="text-gray-800 w-6 h-6 mr-2" />
         Driver
      </h2>

      <!-- Form Fields -->
      <form @submit.prevent="handleSubmit" class="border-none m-2 p-2">
        <!-- First Name -->
        <div class="mb-6 flex flex-col">
          <label for="firstName" class="flex block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="firstName"
            placeholder="Enter first name"
            class="w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400 text-gray-800"
          />
        </div>

        <!-- Last Name -->
        <div class="mb-6">
          <label for="lastName" class="flex block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            placeholder="Enter last name"
            class="w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400 text-gray-800"
          />
        </div>

        <!-- Email -->
        <div class="mb-6">
          <label for="email" class="flex block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter email address"
            class="w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400 text-gray-800"
          />
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end border-t p-2">
          <button
            type="submit"
            class="bg-blue-500 text-white font-medium px-4 py-2 mt-6 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 w-24"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditDriverModal",
  props: {},
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
    };
  },
  methods: {
    handleSubmit() {
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      };
      console.log("Form submitted with data:", formData);
      this.$emit("submit", formData);
    },
  },
};
</script>

<style scoped>

</style>
