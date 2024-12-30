<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div class="bg-white rounded-xl shadow-xl px-6 py-6 w-full max-w-lg relative">
            <button
                class="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none"
                @click="$emit('close')">
                <Icon :icon="'mdi:close-circle'" class="text-gray-600 w-5 h-5" />
            </button>

            <h2 class="text-xl font-semibold mb-6 text-gray-800 text-left flex items-center border-b pb-2">
                <Icon :icon="'mdi:trash-can'" class="menu-icon" />
                {{ isEdit ? "Edit Bin" : "Add Bin" }}
            </h2>

            <form @submit.prevent="handleSubmit" class="m-2 p-2 border-none">
                <div class="mb-6">
                    <label for="locationName" class="flex block pb-4 text-sm font-medium text-gray-700">Location</label>
                    <input type="text" id="locationName" v-model="localData.locationName"
                        @input="debouncedFetchLocationSuggestions" placeholder="Enter location"
                        class="w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400 text-gray-800 border border-gray-300" />

                    <ul v-if="locationSuggestions.length"
                        class="absolute bg-white border border-gray-300 rounded-lg mt-1 w-64 max-w-full shadow-lg z-10">
                        <li v-for="suggestion in locationSuggestions" :key="suggestion.id"
                            @click="selectLocation(suggestion)"
                            class="px-4 py-2 hover:bg-blue-100 cursor-pointer transition duration-200 ease-in-out">
                            {{ suggestion.name }}
                        </li>
                    </ul>
                </div>

                <!-- Button to Get Current Location -->
                <div class="mb-6">
                    <button type="button" @click="getCurrentLocation"
                        class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                        Use Current Location
                    </button>
                </div>

                <div class="mb-6">
                    <label for="status" class="flex block pb-4 text-sm font-medium text-gray-700">Status</label>
                    <input
                        type="number"
                        id="status"
                        placeholder="Enter the current satus of bin"
                        v-model.number="localData.status" 
                        class="w-full rounded-lg px-4 py-2 bg-white border border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-500 text-gray-800">
                                    
                </div>

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
import { getLocations } from '../../api/bins';

// Reverse geocoding function
async function reverseGeocode(lat, lng) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.display_name || 'Current Location'; // Adjust based on your API response
    } catch (error) {
        console.error("Error fetching location name:", error);
        return 'Current Location'; // Fallback name in case of an error
    }
}

// Debounce function
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

export default {
    // props: {
    //     initialData: {
    //         type: Object,
    //         default: () => ({
    //             status: "",
    //         }),
    //     },
    // },
    data() {
        return {
            localData: {
                ...this.initialData,
                id: null,
                lastUpdated: null,
            },
            statusOptions: BIN_STATUS_OPTIONS,
            locationSuggestions: [],
            debouncedFetchLocationSuggestions: null, // To hold the debounced function
        };
    },
    created() {
        // Initialize the debounced function
        this.debouncedFetchLocationSuggestions = debounce(this.fetchLocationSuggestions, 300);
    },
    // computed: {
    //     extendedStatusOptions() {
    //         const currentStatus = this.localData.status;
    //         const isStatusInOptions = this.statusOptions.some((option) => option.value === currentStatus);

    //         if (isStatusInOptions || !currentStatus) {
    //             return this.statusOptions;
    //         }

    //         return [
    //             { value: currentStatus, label: currentStatus },
    //             ...this.statusOptions,
    //         ];
    //     },
    // },
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

            this.$emit("save", dataToSend);
        },
        async fetchLocationSuggestions() {
            if (this.localData.locationName.length > 2) {
                try {
                    const response = await getLocations({ location: this.localData.locationName });
                    this.locationSuggestions = response;
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
        async getCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async position => {
                    this.localData.latitude = position.coords.latitude;
                    this.localData.longitude = position.coords.longitude;

                    // Use reverse geocoding to get the location name
                    const locationName = await reverseGeocode(this.localData.latitude, this.localData.longitude);
                    // Truncate locationName to 30 characters if it exceeds that length
                    this.localData.locationName = locationName.length > 30 ? locationName.substring(0, 30) : locationName;
                }, error => {
                    console.error("Geolocation error:", error);
                });
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
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