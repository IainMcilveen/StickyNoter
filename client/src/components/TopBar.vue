<template>
  <div class="topbar flex">
    <button @click="() => { emit('addNote') }" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-3 mr-auto">+ Add Note</button>
    <div class="user-button flex mr-3">
      <UserButton />
    </div>
  </div>
</template>

<script setup>
  import { UserButton } from '@clerk/vue'

  const emit = defineEmits(['addNote'])
</script>

<style scoped>

</style>