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
                <Icon :icon="'mdi:car'" class="text-gray-800 w-6 h-6 mr-2" />
                {{ isEdit ? "Edit Vehicle" : "Add Vehicle" }}
            </h2>

            <!-- Form Fields -->
            <form @submit.prevent="handleSubmit" class="border-none m-2 p-2">
                <!-- Vehicle Brand -->
                <div class="mb-6">
                    <label for="brand" class="flex block text-sm font-medium text-gray-700">
                        Vehicle Brand
                    </label>
                    <input type="text" id="brand" v-model="localData.brand" placeholder="Enter vehicle brand"
                        class="w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400 text-gray-800 border border-gray-300" />
                </div>

                <!-- Plate Number -->
                <div class="mb-6">
                    <label for="plateNumber" class="flex block text-sm font-medium text-gray-700">
                        Plate Number
                    </label>
                    <input type="text" id="plateNumber" v-model="localData.plateNumber" placeholder="Enter plate number"
                        class="w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400 text-gray-800 border border-gray-300" />
                </div>

                <!-- Driver Name -->
                <div class="mb-6">
                    <label for="driverName" class="flex block text-sm font-medium text-gray-700">
                        Driver Name
                    </label>
                    <select id="driverName" v-model="localData.driverName"
                        class="w-full rounded-lg px-4 py-2 bg-white border border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-500 text-gray-800">
                        <option v-for="driver in drivers" :key="driver.id" :value="driver.name">
                            {{ driver.name }}
                        </option>
                    </select>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end space-x-4 border-t border-gray-200 pt-4">
                    <button type="button" @click="$emit('close')"
                        class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none">
                        Cancel
                    </button>
                    <button type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                        {{ isEdit ? "Save Changes" : "Add Vehicle" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "VehicleModal",
    props: {
        vehicleData: {
            type: Object,
            default: () => ({
                brand: "",
                plateNumber: "",
                driverName: "",
            }), // Provide default values for adding a new vehicle
        },
        drivers: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            localData: { ...this.vehicleData }, // Initialize form data with vehicleData
        };
    },
    methods: {
        handleSubmit() {
            this.$emit("submit", this.localData); // Emit updated or new data
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