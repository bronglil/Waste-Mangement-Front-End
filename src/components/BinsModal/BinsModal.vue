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
                {{ isEdit ? "Edit Bin" : "Add Bin" }}
            </h2>

            <!-- Form Fields -->
            <form @submit.prevent="handleSubmit" class="m-2 p-2 border-none">
                <!-- Location -->
                <div class="mb-6">
                    <label for="locationName" class="flex block pb-4 text-sm font-medium text-gray-700">Location</label>
                    <input type="text" id="locationName" v-model="localData.locationName"
                        @input="fetchLocationSuggestions" placeholder="Enter location"
                        class="w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400 text-gray-800 border border-gray-300" />
                    <!-- Dropdown for suggestions -->
                    <ul v-if="locationSuggestions.length"
                        class="absolute bg-white border border-gray-300 rounded-lg mt-1 w-64 max-w-full shadow-lg z-10">
                        <li v-for="suggestion in locationSuggestions" :key="suggestion.id"
                            @click="selectLocation(suggestion)"
                            class="px-4 py-2 hover:bg-blue-100 cursor-pointer transition duration-200 ease-in-out">
                            {{ suggestion.name }}
                        </li>
                    </ul>
                </div>

                <!-- Status -->
                <div class="mb-6">
                    <label for="status" class="flex block pb-4 text-sm font-medium text-gray-700">Status</label>
                    <select id="status" v-model="localData.status"
                        class="w-full rounded-lg px-4 py-2 bg-white border border-gray-300 focus:ring-blue-300 focus:border-blue-500 text-gray-800">
                        <!-- Include all options -->
                        <option v-for="option in extendedStatusOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
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
                        {{ isEdit ? "Save Changes" : "Add Bin" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import BIN_STATUS_OPTIONS from "../../global/constant";
import { getLocations } from '../../api/bins'; // Import getLocations from bins.js

export default {
    props: {
        initialData: {
            type: Object,
            default: () => ({
                status: "",
            }),
        },
    },
    data() {
        return {
            localData: {
                ...this.initialData,
                id: null,
                lastUpdated: null,
            },
            statusOptions: BIN_STATUS_OPTIONS || [],
            locationSuggestions: [],
        };
    },
    computed: {
        extendedStatusOptions() {
            const currentStatus = this.localData.status;
            const isStatusInOptions = this.statusOptions.some((option) => option.value === currentStatus);

            if (isStatusInOptions || !currentStatus) {
                return this.statusOptions;
            }

            return [
                { value: currentStatus, label: currentStatus },
                ...this.statusOptions,
            ];
        },
    },
    methods: {
        handleSubmit() {
            const dataToSend = {
                id: this.localData.id,
                lastUpdated: new Date(),
                latitude: this.localData.latitude,
                longitude: this.localData.longitude,
                locationName: this.localData.locationName,
                status: this.localData.status,
            };

            this.$emit("save", dataToSend); // Emit the new object
        },
        async fetchLocationSuggestions() {
            if (this.localData.locationName.length > 2) {
                try {
                    const response = await getLocations({ location: this.localData.locationName });
                    this.locationSuggestions = response; // Assuming the API returns an array of suggestions
                } catch (error) {
                    console.error("Error fetching location suggestions:", error);
                }
            } else {
                this.locationSuggestions = [];
            }
        },
        selectLocation(suggestion) {
            this.localData.id = suggestion.id;
            this.localData.locationName = suggestion.address?.city || suggestion.name;
            this.localData.latitude = suggestion.lat;
            this.localData.longitude = suggestion.lon;
            this.locationSuggestions = [];
        },
    },
};
</script>

<style scoped>
ul {
    max-height: 200px;
    overflow-y: auto;
    width: 90%;
    min-width: 200px;
}

li {
    transition: background-color 0.2s ease;
}

li:hover {
    background-color: #e0f7fa;
}
</style>
