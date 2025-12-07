<template>
  <div class="bg-gray-100 dark:bg-gray-900 p-6 min-h-screen">
    <div class="space-y-6 mx-auto max-w-7xl">
      <h1 class="mb-6 font-bold text-gray-900 dark:text-gray-100 text-3xl">Admin Panel</h1>
      
      <UploadButton />
      <UpdatePostcodes />
    </div>
  </div>
</template>
<script setup lang="ts">
import UploadButton from "./components/UploadButton.vue";
import UpdatePostcodes from "./components/UpdatePostcodes.vue";
// import Toast from "primevue/toast";
</script>
