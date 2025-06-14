<template>
  <div v-if="isOpen" class="modal modal-open">
    <div class="modal-box">
      <slot/>
      
      <div class="modal-action">
        <slot name="actions" />
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">


// Props
const props = defineProps<{
  isOpen: boolean
}>()



</script>

<style scoped>
</style> 