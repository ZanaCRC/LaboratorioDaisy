<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    
    <div class="drawer-content">
      <!-- Botón del drawer para móviles -->
      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
        Abrir menú
      </label>
    </div>

    <div class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content">
        <!-- Contenido del Sidebar -->
        <li class="mb-4">
          <router-link to="/projects" class="text-xl font-bold hover:text-primary">Proyectos</router-link>
        </li>
        
        <li>
          <details open>
            <summary class="flex items-center space-x-2" @click="navigateToGeneral">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Mis Proyectos</span>
            </summary>
            <ul>
              
              <li v-for="project in projectStore.getAllProjects" :key="project.id">
                <router-link :to="`/projects/${project.id}`" class="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>{{ project.name }}</span>
                </router-link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectStore } from '../../stores/projects'
import { useRouter } from 'vue-router'

const projectStore = useProjectStore()
const router = useRouter()

const navigateToGeneral = () => {
  router.push('/projects')
}
</script>

