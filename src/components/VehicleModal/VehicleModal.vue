<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div class="bg-white w-[680px] h-[600px] p-6 rounded-lg shadow-lg flex flex-col relative">
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shadow-md focus:outline-none"
        >
          <Icon :icon="'mdi:close'" class="w-5 h-5" />
        </button>
        <div class="flex justify-between items-center mb-4 border-b pb-2">
          <h2 class="text-md font-semibold">Assign Vehicle</h2>
        </div>
        <ul class="space-y-3 flex-grow overflow-y-auto">
          <li
            v-for="(vehicle, index) in vehicles"
            :key="index"
            class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-100"
          >
            <span class="text-sm font-medium text-gray-800 truncate">{{ vehicle }}</span>
            <button
              @click="$emit('assign', vehicle)"
              class="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full hover:from-blue-600 hover:to-blue-700 focus:outline-none shadow-md w-[100px] justify-center"
            >
              <Icon :icon="'mdi:check-circle-outline'" class="w-4 h-4" />
              Assign
            </button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { Icon } from "@iconify/vue";
  
  export default {
    props: {
      vehicles: {
        type: Array,
        required: true,
      },
    },
    components: { Icon },
  };
  </script>
  
  <style scoped>
  .modal {
    background: rgba(0, 0, 0, 0.5);
  }
  </style>
  