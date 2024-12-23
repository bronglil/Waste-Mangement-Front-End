<template>
  <div class="min-h-screen p-6 card">
    <div class="flex items-center justify-between w-full mx-auto p-2 bg-white shadow-md rounded-md border-b m-4">
      <div class="flex items-center space-x-2">
        <Icon :icon="'mdi:user-settings'" class="w-6 h-6 text-gray-800 dark:text-gray-600" />
        <h4 class="text-md font-medium text-gray-800 dark:text-black">Settings</h4>
      </div>
    </div>

    <div class="w-full mx-auto p-2 bg-white shadow-md rounded-md">
      <div class="flex w-full gap-4 mb-6">
        <div class="w-1/2">
          <label for="first_name" class="flex block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input type="text" id="first_name" v-model="adminData.firstName" required
            placeholder="Enter admin's First Name" aria-label="Admin First Name"
            class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
        </div>

        <div class="w-1/2">
          <label for="last_name" class="flex block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input type="text" id="last_name" v-model="adminData.lastName" required placeholder="Enter admin's Last Name"
            aria-label="Admin Last Name"
            class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
        </div>
      </div>

      <div class="flex w-full gap-4 mb-6">
        <div class="w-1/2">
          <label for="email" class="flex block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input type="email" id="email" v-model="adminData.email" required placeholder="Enter admin's Email"
            aria-label="Admin Email"
            class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
        </div>

        <div class="w-1/2">
          <label for="contact_number" class="flex block text-sm font-medium text-gray-700 mb-2">
            Contact Number
          </label>
          <input type="text" id="contact_number" v-model="adminData.contactNumber" required
            placeholder="Enter admin's Contact Number" aria-label="Admin Contact Number"
            class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
        </div>
      </div>

      <div class="flex w-full gap-4 mb-6">
        <div class="w-1/2">
          <label for="role" class="flex block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select id="role" v-model="adminData.role" required
            class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400">
            <option disabled value="">Select Role</option>
            <option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
        </div>

        <div class="w-1/2">
          <div class="relative w-full mb-3">
            <label class="flex items-center block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <div class="relative">
              <input id="password" :type="showPassword ? 'text' : 'password'" v-model="adminData.password"
                class="border px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring focus:border-[#4a90e2] w-full"
                placeholder="Password" />
              <span class="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                @click="togglePassword">
                <Icon :icon="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="text-lg" style="color: #4a90e2;" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button @click="handleSubmit" :disabled="loading"
          class="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {{ loading ? "Updating..." : "Update Admin" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

export default {
  components: { Icon },
  setup() {
    const adminData = ref({
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      role: "",
      password: "", // Added password
    });

    const roles = ref(["Admin", "Editor", "Viewer"]);
    const loading = ref(false);
    const showPassword = ref(false); // State for toggling password visibility

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const handleSubmit = async () => {
      if (
        adminData.value.firstName &&
        adminData.value.lastName &&
        adminData.value.email &&
        adminData.value.contactNumber &&
        adminData.value.role &&
        adminData.value.password
      ) {
        loading.value = true;
        console.log("Sending Admin Data:", JSON.stringify(adminData.value, null, 2)); // Log with JSON.stringify

        // Simulate an API call or other logic
        try {
          // Replace this with an actual API call
          const response = await fetch("https://your-api-endpoint.com", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(adminData.value),
          });

          const result = await response.json();

          if (response.ok) {
            alert(`Admin updated successfully.`);
            adminData.value = { firstName: "", lastName: "", email: "", contactNumber: "", role: "", password: "" }; // Reset form
          } else {
            alert("Error: " + result.message || "Something went wrong!");
          }
        } catch (error) {
          alert("Network Error: " + error.message);
        }

        loading.value = false;
      } else {
        alert("Please fill out all fields.");
      }
    };

    return {
      adminData,
      roles,
      handleSubmit,
      loading,
      showPassword,
      togglePassword,
    };
  },
};
</script>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

button {
  transition: transform 0.2s ease-in-out, background 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}

button:focus {
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
}

select {
  width: 100%;
}

select option {
  padding: 0.25rem 0.5rem;
}

select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.relative input {
  padding-right: 2.5rem;
}
</style>
