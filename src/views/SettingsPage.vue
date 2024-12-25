<template>
  <div class="min-h-screen p-6 card">
    <CustomAlert v-if="alertVisible" :message="alertMessage" :alertType="alertType" @close="alertVisible = false" />
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
            <option v-for="role in roles" :key="role.value" :value="role.value">
              {{ role.label.toLowerCase() }}
            </option>
          </select>
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
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { fetchAdminDataApi, updateAdminDataApi } from '../api/admins';
import { ROLE_OPTIONS } from '../global/constant';
import CustomAlert from '../components/CustomAlert.vue';

export default {
  components: { Icon, CustomAlert },
  setup() {
    const adminData = ref({
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      role: "",
    });

    const roles = ref(ROLE_OPTIONS);
    const loading = ref(false);
    const alertVisible = ref(false);
    const alertMessage = ref("");
    const alertType = ref("error");

    const user = JSON.parse(localStorage.getItem("auth_user"));

    if (user) {
      adminData.value.firstName = user.firstName || "";
      adminData.value.lastName = user.lastName || "";
      adminData.value.email = user.email || "";
      adminData.value.contactNumber = user.contactNumber || "";
      adminData.value.role = user.role ? user.role.toLowerCase() : "";
    }

    const fetchAdminData = async () => {
      const User = JSON.parse(localStorage.getItem("auth_user"));
      if (User?.userId) {
        try {
          const data = await fetchAdminDataApi(User?.userId);
          console.log("Fetched Admin Data:", data);

          adminData.value = {
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            contactNumber: data.contactNumber || "",
            role: data.role ? data.role.toLowerCase() : "",
          };

          const roleValue = adminData.value.role;
          if (!ROLE_OPTIONS.some(role => role.value === roleValue)) {
            console.warn("Role not found in ROLE_OPTIONS:", roleValue);
          }
        } catch (error) {
          console.error("Error fetching admin data:", error);
          showAlert("Error fetching admin data.", "error");
        }
      }
    };

    onMounted(() => {
      fetchAdminData();
    });

    const handleSubmit = async () => {
      if (
        adminData.value.firstName &&
        adminData.value.lastName &&
        adminData.value.email &&
        adminData.value.contactNumber &&
        adminData.value.role
      ) {
        loading.value = true;
        console.log("Sending Admin Data:", JSON.stringify(adminData.value, null, 2));

        try {
          const user = JSON.parse(localStorage.getItem("auth_user"));
          await updateAdminDataApi(user?.userId, {
            ...adminData.value,
            role: adminData.value.role
          });
          showAlert("Admin updated successfully.", "success");
          adminData.value = { firstName: "", lastName: "", email: "", contactNumber: "", role: "" };
        } catch (error) {
          showAlert("Error updating admin data.", "error");
        }

        loading.value = false;
      } else {
        showAlert("Please fill out all fields.", "error");
      }
    };

    const showAlert = (message, type) => {
      alertMessage.value = message;
      alertType.value = type;
      alertVisible.value = true;
    };

    return {
      adminData,
      roles,
      handleSubmit,
      loading,
      alertVisible,
      alertMessage,
      alertType,
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
