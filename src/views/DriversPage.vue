<template>
  <div class="min-h-screen p-6 card">
    <div class="flex items-center justify-between w-100 mx-auto space-x-2 p-2 bg-white shadow-md rounded-md">
      <div class="flex items-center space-x-2">
        <Icon :icon="'mdi:truck'" class="w-6 h-6 text-gray-800 dark:text-gray-600" />
        <h4 class="text-md font-medium text-gray-800 dark:text-black">Drivers</h4>
      </div>
    </div>

    <ReusableTable :headers="['Driver', 'Vehicle', 'Contact', 'Status', 'Actions']" :data="drivers"
      :fields="['name', 'vehicle', 'contact', 'status', 'actions']">
      <!-- Driver Name Slot -->
      <template #name="{ row, value }">
        <div class="flex items-center">
          <img :src="row.image" alt="Driver Profile" class="w-10 h-10 rounded-full mr-3" />
          <div>
            <div class="text-base font-semibold text-gray-900 dark:text-white">
              {{ value }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ row.email }}
            </div>
          </div>
        </div>
      </template>

      <!-- Vehicle Slot -->
      <template #vehicle="{ row }">
        <div>
          <template v-if="row.vehicle != null">
            <span class="text-gray-700 dark:text-gray-300">{{ row.vehicle.plateNumber }}</span>
          </template>
          <template v-else>
            <button @click="openAssignVehicleModal(row)"
              class="px-2 py-2 w-20 flex items-center gap-1 bg-blue-600 text-white text-xs rounded-full shadow hover:bg-blue-700 focus:outline-none">
              <Icon :icon="'mdi:truck-plus'" class="w-4 h-4" />
              Assign
            </button>
          </template>
        </div>
      </template>

      <template #contact="{ row }">
        <div>
          <template v-if="row.contact">
            <span class="text-gray-700 dark:text-gray-300">{{ row.contact }}</span>
          </template>
        </div>
      </template>

       <!-- Status Slot -->
       <template #status="{ row }">

<div>
{{row.status}}

</div>

</template>
      <!-- <template #status="{ row }">
        <div>
          <select v-model="row.status" @change="updateStatus(row)"
            class="px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring focus:ring-blue-300 dark:focus:ring-blue-600 w-40">
            <option v-for="option in STATUS_OPTIONS" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </template> -->

      <!-- Actions Slot -->
      <template #actions="{ row }">
        <div class="flex space-x-2">
          <button @click="openEditModal(row)"
            class="w-8 h-8 flex items-center justify-center text-blue-500 hover:text-blue-700 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none"
            title="Edit">
            <Icon :icon="'mdi:pencil'" class="w-5 h-5" />
          </button>
          <button @click="deleteDriver(row.id)"
            class="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 rounded-full bg-red-100 hover:bg-red-200 focus:outline-none"
            title="Delete">
            <Icon :icon="'mdi:trash-can'" class="w-5 h-5" />
          </button>
        </div>
      </template>
    </ReusableTable>

    <!-- Assign Vehicle Modal -->
    <VehicleModal v-if="showVehicleModal" :vehicles="availableVehicles" @assign="assignVehicle"
      @close="closeVehicleModal" />

    <!-- Edit Driver Modal -->
    <AddDriverModal v-if="showEditDriverModal" :initial-data="currentDriver" @save="updateDriver"
      @close="closeEditDriverModal" />

    <EditDriverModal
      v-if="showEditModal"
      :show="showEditModal"
      :driver="selectedDriver"
      @save="handleUpdateDriver"
      @close="closeEditModal"
    />
  </div>
</template>


<script>
import ReusableTable from "../components/ReusableTable/ReusableTable.vue";
import VehicleModal from "../components/VehicleModal/VehicleModal.vue";
import AddDriverModal from "../components/AddDriverModal/AddDriverModal.vue";
import EditDriverModal from '../components/EditDriverModal/EditDriverModal.vue';
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";
import { fetchDriversApi, UpdateDriverApi, DeleteDriverApi } from "../api/drivers";
import { fetchVehiclesApi, updateVehicleApi } from "../api/vehicles";
import { STATUS_OPTIONS } from "../global/constant";

export default {
  components: { ReusableTable, VehicleModal, AddDriverModal, Icon, EditDriverModal },
  setup() {
    const drivers = ref([]);
    const availableVehicles = ref([]);
    const showEditModal = ref(false);
    const selectedDriver = ref(null);
    const showVehicleModal = ref(false);

    const fetchDrivers = async () => {
      try {
        const response = await fetchDriversApi();
        drivers.value = response?.map(driver => ({
          id: driver.userId,
          name: driver.firstName + " " + driver.lastName,
          email: driver.email,
          status: driver.status,
          image: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
          contact: driver.contactNumber,
          vehicle: driver.vehicle
        }));
        console.log('driver vehicle data', drivers.value[0].vehicle)
      } catch (error) {
        console.error("Error fetching drivers", error);
      }
    };

    const fetchAvailableVehicles = async () => {
      try {
        const response = await fetchVehiclesApi();
        availableVehicles.value = response;
      } catch (error) {
        console.error("Error fetching vehicles", error);
      }
    };

    onMounted(async () => {
      await fetchDrivers();
      await fetchAvailableVehicles();
    });

    const updateStatus = (row) => {
      console.log(`Status updated for ${row.name}: ${row.status}`);
      // Implement your backend update logic here
    };

    const openEditModal = (driver) => {
      console.log("driver data to be updated", driver)
      selectedDriver.value = { ...driver }; // Create a copy of driver data
      showEditModal.value = true;
    };

    const closeEditModal = () => {
      showEditModal.value = false;
      selectedDriver.value = null;
    };

    const handleUpdateDriver = async (updatedDriver) => {
      console.log('updated driver details', updatedDriver)
      try {
        // Call the API to update the driver
        await UpdateDriverApi(updatedDriver.id, updatedDriver);

        // Update local state
        const index = drivers.value.findIndex(d => d.id === updatedDriver.id);
        if (index !== -1) {
          drivers.value[index] = { ...updatedDriver };
        }
        closeEditModal();
      } catch (error) {
        console.error('Error updating driver:', error);
      }
    };

    const deleteDriver = async (driverId) => {
      console.log('acessing delete function', driverId)
      try {
        // Call the API to delete the driver
        await DeleteDriverApi(driverId);

        // Remove the driver from the local state
        drivers.value = drivers.value.filter(driver => driver.id !== driverId);
        console.log('Driver deleted successfully');
      } catch (error) {
        console.error('Error deleting driver:', error);
      }
    };

    const openAssignVehicleModal = (driver) => {
      console.log('driver data', driver)
      selectedDriver.value = driver;
      showVehicleModal.value = true;
    };

    const closeVehicleModal = () => {
      showVehicleModal.value = false;
      selectedDriver.value = null;
    };

    const assignVehicle = async (vehicle) => {
      console.log('accessing assign vehicle')
      try {
        // Update vehicle data with the driver's details
        const updatedVehicleData = {
          ...vehicle,
          userId: selectedDriver.value.id,
          driver: {
            firstName: selectedDriver.value.name.split(" ")[0],
            lastName: selectedDriver.value.name.split(" ")[1],
            email: selectedDriver.value.email,
            contactNumber: selectedDriver.value.contact,
            userId: selectedDriver.value.id,
          }
        };
        console.log('vehicle data', vehicle)
        console.log('user data', selectedDriver)

        // Call the API to update the vehicle
        await updateVehicleApi(vehicle.vehicleId, updatedVehicleData);
        console.log('vehicle assigned successfully')

        // Re-fetch drivers to update the UI with the latest data
        await fetchDrivers();

        closeVehicleModal();
      } catch (error) {
        console.error("Error assigning vehicle", error);
      }
    };

    return {
      drivers,
      availableVehicles,
      STATUS_OPTIONS,
      updateStatus,
      showEditModal,
      selectedDriver,
      openEditModal,
      closeEditModal,
      handleUpdateDriver,
      deleteDriver,
      showVehicleModal,
      openAssignVehicleModal,
      closeVehicleModal,
      assignVehicle,
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


</style>
