<template>
    <div class="overflow-x-auto shadow-lg rounded-lg bg-white/80 dark:bg-white/10 p-6">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="px-6 py-3"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in data"
            :key="rowIndex"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td
              v-for="(field, colIndex) in fields"
              :key="colIndex"
              class="px-6 py-4 text-gray-900 dark:text-white"
            >
              <slot
                :name="field"
                :row="row"
                :value="row[field]"
                :rowIndex="rowIndex"
                :colIndex="colIndex"
              >
                {{ row[field] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      headers: {
        type: Array,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
      fields: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  