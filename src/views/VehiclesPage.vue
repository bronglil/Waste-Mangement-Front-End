<template>
    <div class="min-h-screen p-6 card">
        <!-- Vehicles Section -->
        <div class="flex items-center justify-between w-100 mx-auto space-x-2 p-2 bg-white shadow-md rounded-md">
            <div class="flex items-center space-x-2">
                <Icon :icon="'mdi:car'" class="w-6 h-6 text-gray-800 dark:text-gray-600" />
                <h4 class="text-md font-medium text-gray-800 dark:text-black">Vehicles</h4>
            </div>
            <div class="flex items-center space-x-4">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Add Vehicle</span>
                <button @click="openAddVehicleModal"
                    class="w-8 h-8 flex items-center justify-center text-blue-500 hover:text-blue-700 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none"
                    title="Add">
                    <Icon :icon="'mdi:add'" class="w-5 h-5" />
                </button>
            </div>
        </div>

        <!-- Vehicles Table -->
        <ReusableTable :headers="['Vehicle Brand', 'Plate Number', 'Driver Name', 'Actions']" :data="vehicles"
            :fields="['brand', 'plateNumber', 'driverName', 'actions']">
            <template #brand="{ row }">
                <div class="text-base font-medium text-gray-900 dark:text-white">{{ row.brand }}</div>
            </template>
            <template #plateNumber="{ row }">
                <div class="text-gray-700 dark:text-gray-300">{{ row.plateNumber }}</div>
            </template>
            <template #driverName="{ row }">
                <div class="text-gray-700 dark:text-gray-300">{{ row.driverName }}</div>
            </template>
            <template #actions="{ row }">
                <div class="flex space-x-2">
                    <button @click="openEditVehicleModal(row)"
                        class="w-8 h-8 flex items-center justify-center text-blue-500 hover:text-blue-700 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none"
                        title="Edit">
                        <Icon :icon="'mdi:pencil'" class="w-5 h-5" />
                    </button>
                    <button @click="deleteVehicle(row.id)"
                        class="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 rounded-full bg-red-100 hover:bg-red-200 focus:outline-none"
                        title="Delete">
                        <Icon :icon="'mdi:trash-can'" class="w-5 h-5" />
                    </button>
                </div>
            </template>
        </ReusableTable>

        <!-- Vehicle Modal -->
        <VehicleModal v-if="showVehicleModal" :vehicleData="currentVehicle" :drivers="drivers"
            @submit="handleVehicleSubmit" @close="closeVehicleModal" />
    </div>
</template>

<script>
import ReusableTable from "../components/ReusableTable/ReusableTable.vue";
import VehicleModal from "../components/AddVehicleModal/VehicleModal.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

export default {
    components: { ReusableTable, VehicleModal, Icon },
    setup() {
        const drivers = ref([
            { id: 1, name: "Neil Sims" },
            { id: 2, name: "Bonnie Green" },
        ]);

        const vehicles = ref([
            { id: 1, brand: "Toyota", plateNumber: "ABC-123", driverName: "Neil Sims" },
            { id: 2, brand: "Ford", plateNumber: "XYZ-789", driverName: "Bonnie Green" },
        ]);

        const showVehicleModal = ref(false);
        const currentVehicle = ref(null);

        const openAddVehicleModal = () => {
            currentVehicle.value = null; // Clear data for adding
            showVehicleModal.value = true;
        };

        const openEditVehicleModal = (vehicle) => {
            currentVehicle.value = { ...vehicle }; // Populate data for editing
            showVehicleModal.value = true;
        };

        const closeVehicleModal = () => {
            showVehicleModal.value = false;
        };

        const handleVehicleSubmit = (vehicleData) => {
            if (currentVehicle.value) {
                // Edit existing vehicle
                const index = vehicles.value.findIndex((v) => v.id === currentVehicle.value.id);
                if (index !== -1) vehicles.value[index] = { ...currentVehicle.value, ...vehicleData };
            } else {
                // Add new vehicle
                const newVehicle = {
                    ...vehicleData,
                    id: vehicles.value.length + 1, // Generate a new ID
                };
                vehicles.value.push(newVehicle);
            }
            closeVehicleModal();
        };

        const deleteVehicle = (id) => {
            vehicles.value = vehicles.value.filter((vehicle) => vehicle.id !== id);
        };

        return {
            drivers,
            vehicles,
            showVehicleModal,
            currentVehicle,
            openAddVehicleModal,
            openEditVehicleModal,
            closeVehicleModal,
            handleVehicleSubmit,
            deleteVehicle,
        };
    },
};
</script>
