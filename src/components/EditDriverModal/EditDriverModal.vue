<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
    <div class="bg-white w-[680px] h-[600px] p-6 rounded-lg shadow-lg flex flex-col relative">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Edit Driver</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">Close</span>
          <Icon :icon="'mdi:close'" class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            v-model="formData.name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            v-model="formData.email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact</label>
          <input
            type="text"
            v-model="formData.contact"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select
            v-model="formData.status"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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

        <div class="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
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