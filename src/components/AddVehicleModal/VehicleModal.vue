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
                        Assign Driver
                    </label>
                    <select id="driverName" v-model="localData.driverId"
                        class="w-full rounded-lg px-4 py-2 bg-white border border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-500 text-gray-800">
                        <option value="" disabled>Select a driver</option>
                        <option v-for="driver in availableDrivers" :key="driver.id" :value="driver.id">
                            {{ driver.firstName }} {{ driver.lastName }}
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
import { fetchAvailableDriversApi, fetchVehicleByIdApi } from "../../api/vehicles";

export default {
    name: "VehicleModal",
    props: {
        vehicleData: {
            type: Object,
            required: false,
            default: () => ({ id: null }),
        },
    },
    data() {
        return {
            localData: {
                brand: "",
                plateNumber: "",
                driverId: null,
            },
            isSubmitting: false,
            availableDrivers: [],
            isEdit: false,
        };
    },
    async created() {
        if (this.vehicleData?.id) {
            this.isEdit = true;
            await this.loadVehicleDetails();
        } else {
            this.isEdit = false;
        }
        await this.loadDrivers();
    },
    methods: {
        async loadVehicleDetails() {
            try {
                const vehicleDetails = await fetchVehicleByIdApi(this.vehicleData.id);
                this.localData = {
                    brand: vehicleDetails?.vehicleBrand || "",
                    plateNumber: vehicleDetails?.plateNumber || "",
                    driverId: vehicleDetails?.driver?.userId || null,
                };

                if (vehicleDetails.driver) {
                    this.availableDrivers = [
                        {
                            id: vehicleDetails.driver.userId,
                            firstName: vehicleDetails.driver.firstName,
                            lastName: vehicleDetails.driver.lastName,
                        },
                    ];
                }
            } catch (error) {
                console.error("Error loading vehicle details:", error);
            }
        },

        // Fetch available drivers
        async loadDrivers() {
            try {
                const fetchedDrivers = await fetchAvailableDriversApi();

                if (this.isEdit && this.localData.driverId) {
                    this.availableDrivers = [
                        ...this.availableDrivers,
                        ...fetchedDrivers.filter(
                            (driver) => driver.id !== this.localData.driverId
                        ),
                    ];
                } else {
                    this.availableDrivers = fetchedDrivers;
                }
            } catch (error) {
                console.error("Error loading drivers:", error);
            }
        },

        async handleSubmit() {
            if (this.isSubmitting) return;

            this.isSubmitting = true;
            const payload = {
                vehicleBrand: this.localData.brand,
                plateNumber: this.localData.plateNumber,
                userId: this.localData.driverId || null,
            };

            try {
                this.$emit("submit", payload);
            } catch (error) {
                console.error("Error submitting vehicle data:", error);
            } finally {
                this.isSubmitting = false;
            }
        },
    },

};
</script>