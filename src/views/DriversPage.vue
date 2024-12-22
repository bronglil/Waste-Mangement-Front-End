<template>
  <div class="min-h-screen p-6 card">
    <div class="flex items-center justify-between w-100 mx-auto space-x-2 p-2 bg-white shadow-md rounded-md">
      <div class="flex items-center space-x-2">
        <Icon :icon="'mdi:truck'" class="w-6 h-6 text-gray-800 dark:text-gray-600" />
        <h4 class="text-md font-medium text-gray-800 dark:text-black">Drivers</h4>
      </div>
    </div>

    <ReusableTable
      :headers="['Driver', 'Vehicle', 'Status', 'Actions']"
      :data="filteredDrivers"
      :fields="['name', 'vehicle', 'status', 'actions']"
    >
      <!-- Driver Name Slot -->
      <template #name="{ row, value }">
        <div class="flex items-center">
          <img
            :src="row.image"
            alt="Driver Profile"
            class="w-10 h-10 rounded-full mr-3"
          />
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
          <template v-if="row.vehicle">
            <span class="text-gray-700 dark:text-gray-300">{{ row.vehicle }}</span>
          </template>
          <template v-else>
            <button
              @click="openAssignVehicleModal(row)"
              class="px-2 py-2 w-20 flex items-center gap-1 bg-blue-600 text-white text-xs rounded-full shadow hover:bg-blue-700 focus:outline-none"
            >
              <Icon :icon="'mdi:truck-plus'" class="w-4 h-4" />
              Assign
            </button>
          </template>
        </div>
      </template>

      <!-- Status Slot with Dropdown -->
      <template #status="{ row }">
        <div>
          <select
            v-model="row.status"
            @change="updateStatus(row)"
            class="px-2 py-1 w-full text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring focus:ring-blue-300 dark:focus:ring-blue-600"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </template>

      <!-- Actions Slot -->
      <template #actions="{ row }">
        <div class="flex space-x-2">
          <button
            @click="openEditDriverModal(row)"
            class="w-8 h-8 flex items-center justify-center text-blue-500 hover:text-blue-700 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none"
            title="Edit"
          >
            <Icon :icon="'mdi:pencil'" class="w-5 h-5" />
          </button>
          <button
            @click="deleteDriver(row.id)"
            class="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 rounded-full bg-red-100 hover:bg-red-200 focus:outline-none"
            title="Delete"
          >
            <Icon :icon="'mdi:trash-can'" class="w-5 h-5" />
          </button>
        </div>
      </template>
    </ReusableTable>

    <!-- Assign Vehicle Modal -->
    <VehicleModal
      v-if="showVehicleModal"
      :vehicles="availableVehicles"
      @assign="assignVehicle"
      @close="closeVehicleModal"
    />

    <!-- Edit Driver Modal -->
    <AddDriverModal
      v-if="showEditDriverModal"
      :initial-data="currentDriver"
      @save="updateDriver"
      @close="closeEditDriverModal"
    />
  </div>
</template>

<script>
import ReusableTable from "../components/ReusableTable/ReusableTable.vue";
import VehicleModal from "../components/VehicleModal/VehicleModal.vue";
import AddDriverModal from "../components/AddDriverModal/AddDriverModal.vue";
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";

export default {
  components: { ReusableTable, VehicleModal, AddDriverModal, Icon },
  setup() {
    const drivers = ref([
      {
        id: 1,
        name: "Neil Sims",
        email: "neil.sims@example.com",
        vehicle: "",
        status: "Active",
        image: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
      },
      {
        id: 2,
        name: "Bonnie Green",
        email: "bonnie.green@example.com",
        vehicle: "Truck 2",
        status: "Inactive",
        image: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
      },
    ]);

    const availableVehicles = ref(["Truck 1", "Truck 3", "Truck 4"]);
    const showVehicleModal = ref(false);
    const showEditDriverModal = ref(false);
    const currentDriver = ref(null);
    const searchQuery = ref("");

    const filteredDrivers = computed(() =>
      drivers.value.filter((driver) =>
        driver.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );

    const assignVehicle = (vehicle) => {
      if (currentDriver.value) {
        currentDriver.value.vehicle = vehicle;
        console.log(`Assigned ${vehicle} to ${currentDriver.value.name}`);
        closeVehicleModal();
      }
    };

    const closeVehicleModal = () => {
      showVehicleModal.value = false;
    };

    const openAssignVehicleModal = (row) => {
      currentDriver.value = row;
      showVehicleModal.value = true;
    };

    const openEditDriverModal = (row) => {
      currentDriver.value = { ...row };
      showEditDriverModal.value = true;
    };

    const closeEditDriverModal = () => {
      showEditDriverModal.value = false;
    };

    const updateDriver = (updatedData) => {
      const driverIndex = drivers.value.findIndex(
        (driver) => driver.id === currentDriver.value.id
      );
      if (driverIndex !== -1) {
        drivers.value[driverIndex] = { ...currentDriver.value, ...updatedData };
      }
      closeEditDriverModal();
    };

    const updateStatus = (row) => {
      console.log(`Status updated to ${row.status} for driver ${row.name}`);
      // Optionally handle API calls or logic to persist changes
    };

    const deleteDriver = (id) => {
      drivers.value = drivers.value.filter((driver) => driver.id !== id);
      console.log(`Deleted driver with id: ${id}`);
    };

    return {
      drivers,
      availableVehicles,
      searchQuery,
      filteredDrivers,
      showVehicleModal,
      showEditDriverModal,
      assignVehicle,
      closeVehicleModal,
      openAssignVehicleModal,
      openEditDriverModal,
      closeEditDriverModal,
      updateDriver,
      updateStatus,
      deleteDriver,
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
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

select:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
}
</style>
