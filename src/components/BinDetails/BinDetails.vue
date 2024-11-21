<template>
    <div v-if="bin" class="bin-details">
      <h3>{{ bin.name }}</h3>
      <p>{{ bin.description }}</p>
      <p><strong>Status:</strong> {{ bin.status }}</p>
      <p><strong>Last Emptied:</strong> {{ bin.lastEmptied }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      bin: {
        type: Object,
        required: false,
      },
    },
  };
  </script>
  
  <style>
  .bin-details {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  </style>
  