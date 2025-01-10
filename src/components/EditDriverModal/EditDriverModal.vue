<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-xl px-6 py-6 w-full max-w-lg relative">
      <!-- Close Button -->
      <button @click="$emit('close')" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 focus:outline-none">
        <Icon :icon="'mdi:close'" class="text-gray-600 w-5 h-5" />
      </button>

      <!-- Modal Header -->
      <h2 class="text-xl font-semibold mb-6 text-gray-800 text-left flex items-center border-b pb-2">
        <Icon :icon="'mdi:account'" class="text-gray-800 w-6 h-6 mr-2" />
        Edit Driver
      </h2>

      <!-- Form Fields -->
      <form @submit.prevent="handleSubmit" class="m-2 p-2 border-none flex flex-col ">
        <!-- Name Field -->
        <div class="mb-6 w-full">
          <label for="name" class="flex block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            class="w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400 text-gray-800 border border-gray-300"
            placeholder="Enter driver's name"
          />
        </div>

        <!-- Email Field -->
        <div class="mb-6 w-full">
          <label for="email" class="flex block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400 text-gray-800 border border-gray-300"
            placeholder="Enter driver's email"
          />
        </div>

        <!-- Contact Field -->
        <div class="mb-6 w-full">
          <label for="contact" class="flex block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            id="contact"
            v-model="formData.contact"
            class="w-full rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:border-blue-400 text-gray-800 border border-gray-300"
            placeholder="Enter driver's contact number"
          />
        </div>

        <!-- Status Field -->
        <div class="mb-6 w-full">
          <label for="status" class="flex block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            v-model="formData.status"
            class="w-full rounded-lg px-4 py-2 bg-white border border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-500 text-gray-800"
          >
            <option 
              v-for="option in STATUS_OPTIONS" 
              :key="option.value" 
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Submit Button -->
        <div class="flex space-x-4 border-t border-gray-200 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { STATUS_OPTIONS } from '../../global/constant';

export default {
  components: { Icon },
  props: {
    show: Boolean,
    driver: Object,
  },
  setup(props, { emit }) {
    const formData = ref({
      name: '',
      email: '',
      contact: '',
      status: STATUS_OPTIONS[0].value // Set default status
    });

    // Watch for changes in the driver prop
    watch(() => props.driver, (newDriver) => {
      if (newDriver) {
        formData.value = { ...newDriver };
      }
    }, { immediate: true });

    const handleSubmit = () => {
      emit('save', formData.value);
    };

    return {
      formData,
      handleSubmit,
      STATUS_OPTIONS,
    };
  },
};
</script> 