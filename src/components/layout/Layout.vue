<template>
  <div class="min-h-screen bg-base-100">
    <TopBar />
    <div class="flex">
      <SideBar class="fixed" />
      <main class="flex-1 p-4 lg:ml-80">
        <router-view></router-view>
      </main>
    </div>

  </div>
</template>

<script setup lang="ts">
import SideBar from './SideBar.vue'
import TopBar from './TopBar.vue'
import FloatingButton from '../common/FloatingButton.vue'
import PlusCircleIcon from '../icons/PlusCircleIcon.vue'
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos del layout si los necesitas */
</style>
