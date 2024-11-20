<script setup lang="ts">
</script>

<template>
  <div id="app">
    <nav class="bg-white text-gray-800 shadow-md p-4 fixed top-0 left-0 w-full z-10">
      <div class="flex items-center justify-between">
        <div class="text-lg font-semibold">NewP</div>
        <div class="space-x-6">
          <a href="/" class="hover:text-gray-500">Home</a>
          <a href="/map" class="hover:text-gray-500">Activity Map</a>
          <a href="/about" class="hover:text-gray-500">About</a>
        </div>
      </div>
    </nav>
    <div class="pt-8"> <!-- Espace sous la navbar pour ne pas cacher le contenu -->
      <router-view />
    </div>
  </div>
</template>


<style scoped>
</style>
