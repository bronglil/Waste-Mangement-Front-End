<template>
    <div class="min-h-screen p-6 card">
        <div class="flex justify-between items-center p-4 bg-white shadow-md rounded-md">
            <div class="flex items-center space-x-2">
                <Icon :icon="'mdi:trash-can'" class="w-6 h-6 text-gray-800 dark:text-gray-600" />
                <h4 class="text-lg font-medium text-gray-800 dark:text-black">Bin Management</h4>
            </div>
            <div class="flex items-center space-x-4">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Add Bin</span>
                <button @click="openAddBinModal"
                    class="w-8 h-8 flex items-center justify-center text-blue-500 hover:text-blue-700 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none"
                    title="Add">
                    <Icon :icon="'mdi:add'" class="w-5 h-5" />
                </button>
            </div>
        </div>

        <ReusableTable :headers="['Location', 'Status', 'Actions']" :data="filteredBins"
            :fields="['location', 'status', 'actions']">
            <template #location="{ value }">
                <div class="text-base font-medium text-gray-900 dark:text-white">{{ value }}</div>
            </template>

            <template #status="{ row }">
                <div :class="{
                    'bg-green-100 text-green-700': row.status === 'Empty',
                    'bg-yellow-100 text-yellow-700': row.status === 'In Progress',
                    'bg-red-100 text-red-700': row.status === 'Full',
                }" class="inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full shadow-sm">
                    {{ row.status }}
                </div>
            </template>

            <template #actions="{ row }">
                <div class="flex space-x-2">
                    <button @click="openEditBinModal(row)"
                        class="w-8 h-8 flex items-center justify-center text-blue-500 hover:text-blue-700 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none"
                        title="Edit">
                        <Icon :icon="'mdi:pencil'" class="w-5 h-5" />
                    </button>
                    <button @click="deleteBin(row.id)"
                        class="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 rounded-full bg-red-100 hover:bg-red-200 focus:outline-none"
                        title="Delete">
                        <Icon :icon="'mdi:trash-can'" class="w-5 h-5" />
                    </button>
                </div>
            </template>
        </ReusableTable>

        <EditBinModal v-if="showEditBinModal" :initial-data="currentBin" @save="saveBinChanges"
            @close="closeEditBinModal" />
    </div>
</template>

<script>
import ReusableTable from "../components/ReusableTable/ReusableTable.vue";
import EditBinModal from "../components/BinsModal/BinsModal.vue";
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";

export default {
    components: { ReusableTable, EditBinModal, Icon },
    setup() {
        const bins = ref([
            { id: 1, location: "Sector A - Block 3", status: "Full" },
            { id: 2, location: "Sector B - Park Side", status: "Empty" },
            { id: 3, location: "Sector C - Main Road", status: "In Progress" },
        ]);

        const showEditBinModal = ref(false);
        const currentBin = ref(null);

        const filteredBins = computed(() => bins.value);

        const openAddBinModal = () => {
            currentBin.value = null; // Clear data for adding a new bin
            showEditBinModal.value = true;
        };

        const openEditBinModal = (bin) => {
            currentBin.value = { ...bin }; // Populate data for editing
            showEditBinModal.value = true;
        };

        const closeEditBinModal = () => {
            showEditBinModal.value = false;
        };

        const saveBinChanges = (updatedData) => {
            if (currentBin.value) {
                // Update existing bin
                const binIndex = bins.value.findIndex((bin) => bin.id === currentBin.value.id);
                if (binIndex !== -1) {
                    bins.value[binIndex] = { ...currentBin.value, ...updatedData };
                }
            } else {
                // Add new bin
                bins.value.push({
                    ...updatedData,
                    id: bins.value.length + 1, // Generate unique ID
                });
            }
            closeEditBinModal();
        };

        const deleteBin = (id) => {
            bins.value = bins.value.filter((bin) => bin.id !== id);
        };

        return {
            bins,
            filteredBins,
            showEditBinModal,
            currentBin,
            openAddBinModal,
            openEditBinModal,
            closeEditBinModal,
            saveBinChanges,
            deleteBin,
        };
    },
};
</script>
