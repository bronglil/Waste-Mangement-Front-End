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


        <VehicleModal v-if="showVehicleModal" :vehicleData="currentVehicle" @submit="handleVehicleSubmit"
            @close="closeVehicleModal" />
    </div>
</template>

<script>
import ReusableTable from "../components/ReusableTable/ReusableTable.vue";
import VehicleModal from "../components/AddVehicleModal/VehicleModal.vue";
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";
import { fetchVehiclesApi, addVehicleApi, updateVehicleApi, deleteVehicleApi } from '../api/vehicles'; // Import the new API functions

export default {
    components: { ReusableTable, VehicleModal, Icon },
    setup() {
        const vehicles = ref([]);
        const showVehicleModal = ref(false);
        const currentVehicle = ref(null);


        // Fetch vehicles from API
        const fetchVehicles = async () => {
            try {
                const response = await fetchVehiclesApi();
                vehicles.value = response?.map(vehicle => ({
                    id: vehicle.vehicleId,
                    brand: vehicle.vehicleBrand,
                    plateNumber: vehicle.plateNumber,
                    driverName: vehicle.driver?.userId ? vehicle.driver?.firstName + ' ' + vehicle.driver?.lastName : 'Unassigned'
                }));
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        onMounted(async () => {
            await fetchVehicles();
        });

        const openAddVehicleModal = () => {
            currentVehicle.value = null;
            showVehicleModal.value = true;
        };

        const openEditVehicleModal = (vehicle) => {
            console.log(vehicle, "vehicle")
            currentVehicle.value = { id: vehicle.id };
            showVehicleModal.value = true;
        };

        const closeVehicleModal = () => {
            showVehicleModal.value = false;
        };

        const handleVehicleSubmit = async (payload) => {
            if (payload instanceof Event) {
                console.error("SubmitEvent detected unexpectedly:", payload);
                return;
            }

            console.log("Received payload in parent component:", payload);

            try {
                if (currentVehicle.value) {
                    await updateVehicleApi(currentVehicle.value.id, payload);
                } else {
                    await addVehicleApi(payload);
                }
                await fetchVehicles(); // Refresh the vehicle list
            } catch (error) {
                console.error("Error while submitting vehicle data in parent:", error);
            } finally {
                closeVehicleModal();
            }
        };

        const deleteVehicle = async (id) => {
            try {
                await deleteVehicleApi(id);
                await fetchVehicles();
            } catch (error) {
                console.error('Error deleting vehicle:', error);
            }
        };

        return {
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
