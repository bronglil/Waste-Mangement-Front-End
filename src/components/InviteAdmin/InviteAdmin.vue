<template>
    <teleport to="body">
        <div
            class="modal-invite fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-9999 backdrop-blur-sm">
            <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                <!-- Close Button -->
                <button aria-label="Close modal"
                    class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
                    @click="$emit('close')">
                    <Icon :icon="'mdi:close'" class="text-gray-600 w-5 h-5" />
                </button>

                <!-- Modal Header -->
                <h2 class="text-xl font-semibold text-gray-800 mb-6">
                    Invite Admin
                </h2>

                <!-- Form -->
                <form @submit.prevent="handleSubmit" class="border-none m-2 p-2">
                    <!-- Email Input -->
                    <div class="pb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input type="email" id="email" v-model="adminData.email" required
                            placeholder="Enter admin's email" aria-label="Admin email address"
                            class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400" />
                    </div>

                    <!-- Role Selection -->
                    <div class="pb-4">
                        <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
                            Assign Role
                        </label>
                        <select id="role" v-model="adminData.role" required aria-label="Admin role selection"
                            class="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400">
                            <option value="" disabled>Select a role</option>
                            <option v-for="role in roles" :key="role" :value="role">
                                {{ role }}
                            </option>
                        </select>
                    </div>

                    <!-- Submit Button -->
                    <div class="flex justify-end">
                        <button type="submit" :class="{
                            'opacity-50 cursor-not-allowed': loading,
                        }" :disabled="loading"
                            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out">
                            {{ loading ? 'Sending...' : 'Send Invitation' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </teleport>
</template>

<script>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

export default {
    components: { Icon },
    setup() {
        const adminData = ref({
            email: "",
            role: "",
        });

        const roles = ref(["Admin", "Editor", "Viewer"]);
        const loading = ref(false);

        const handleSubmit = async () => {
            if (adminData.value.email && adminData.value.role) {
                loading.value = true;
                console.log("Sending Invitation:", adminData.value);

                // Simulate an API call
                setTimeout(() => {
                    alert(`Invitation sent to ${adminData.value.email} as ${adminData.value.role}`);
                    adminData.value = { email: "", role: "" }; // Reset the form
                    loading.value = false;
                }, 1000);
            } else {
                alert("Please fill out all fields.");
            }
        };

        return {
            adminData,
            roles,
            handleSubmit,
            loading,
        };
    },
};
</script>

<style scoped>
/* Custom Hover Effects */
.modal-invite {
    z-index: 1000;
}

input:hover,
select:hover {
    border-color: #93c5fd;
}

/* Disabled Button Styling */
button:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
}
</style>