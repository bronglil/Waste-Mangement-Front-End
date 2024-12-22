<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div class="bg-white rounded-xl shadow-xl px-6 py-6 w-full max-w-lg relative">
            <!-- Close Button -->
            <button
                class="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
                @click="$emit('close')">
                <Icon :icon="'mdi:close-circle'" class="text-gray-600 w-5 h-5" />
            </button>

            <!-- Modal Header -->
            <h2 class="text-xl font-semibold mb-6 text-gray-800 text-left flex items-center border-b pb-2">
                <Icon :icon="'mdi:trash-can'" class="menu-icon" />
                Edit Bin
            </h2>

            <!-- Form Fields -->
            <form @submit.prevent="handleSubmit" class="m-2 p-2 border-none">
                <!-- Location -->
                <div class="mb-6">
                    <label for="location" class="flex block pb-4 text-sm font-medium text-gray-700">Location</label>
                    <input type="text" id="location" v-model="localData.location" placeholder="Enter location"
                        class="w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400 text-gray-800" />
                </div>

                <!-- Status -->
                <div class="mb-6">
                    <label for="status" class="flex block pb-4 text-sm font-medium text-gray-700">Status</label>
                    <select id="status" v-model="localData.status"
                        class="w-full rounded-lg px-4 py-2 bg-white border border-gray-300 focus:ring-blue-300 focus:border-blue-500 text-gray-800">
                        <!-- Dynamically include the current status if not already in options -->
                        <option v-if="!isStatusInOptions" :value="localData.status" class="font-semibold text-gray-600">
                            {{ localData.status }}
                        </option>
                        <!-- Show all options -->
                        <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </option>
                    </select>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end space-x-4 border-t mt-6">
                    <button type="button" @click="$emit('close')"
                        class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none">
                        Cancel
                    </button>
                    <button type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import BIN_STATUS_OPTIONS from "../../global/constant";

export default {
    props: {
        initialData: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            localData: { ...this.initialData },
            statusOptions: BIN_STATUS_OPTIONS || [], // Ensure it's initialized to an empty array if undefined
        };
    },
    computed: {
        isStatusInOptions() {
            return this.statusOptions.some((option) => option.value === this.localData.status);
        },
    },
    methods: {
        handleSubmit() {
            this.$emit("save", this.localData);
        },
    },
};
</script>

<style scoped>
button {
    transition: transform 0.2s ease-in-out, background 0.3s ease;
}

button:hover {
    transform: scale(1.05);
}
</style>
