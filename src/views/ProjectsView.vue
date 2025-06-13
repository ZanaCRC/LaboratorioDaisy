<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Proyectos</h1>
    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th>ID</th>
            <th>Proyecto</th>
            <th>Tareas</th>
            <th>Avance</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projectStore.getAllProjects" :key="project.id">
            <th>{{ project.id }}</th>
            <td>{{ project.name }}</td>
            <td>{{ project.tasks.length }} tareas pendientes</td>
            <td>
              <div class="flex items-center gap-2">
                <div class="radial-progress" :style="`--value:${getProjectProgress(project)};`">
                  {{ getProjectProgress(project) }}%
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Floating Button -->
    <FloatingButton @click="openModal()">
      <PlusCircleIcon />
    </FloatingButton>
    
    <!-- Modal Component -->
    <ProjectModal :isOpen="isModalOpen" @close="closeModal">
      <h3 class="text-lg font-bold">Nuevo Proyecto</h3>
      <p class="py-4">Aquí puedes crear un nuevo proyecto. Presiona ESC o haz clic en el botón para cerrar</p>
      
      <!-- Formulario -->
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Nombre del proyecto</span>
        </label>
        <input 
          type="text" 
          placeholder="Escribe aquí" 
          class="input input-bordered w-full max-w-xs"
          v-model="projectName"
          @input="(e: Event) => console.log('Input cambiado:', (e.target as HTMLInputElement).value)"
        />
      </div>
      <!-- Modal Actions -->
      <template #actions>
        <button class="btn btn-primary mr-2" @click="handleSave">Guardar</button>
        <button class="btn" @click="handleClose">Cerrar</button>
      </template>
    </ProjectModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// Importar los componentes necesarios
import FloatingButton from '../components/common/FloatingButton.vue'
import PlusCircleIcon from '../components/icons/PlusCircleIcon.vue'
import ProjectModal from '../components/common/Modal.vue'
import { useProjectStore } from '../stores/projects'

// Estado local
const projectName = ref('')
// Estado del modal
const isModalOpen = ref(false)
// Inicializar el store
const projectStore = useProjectStore()

// Función para calcular el progreso del proyecto
const getProjectProgress = (project: any) => {
  if (!project.tasks.length) return 0
  const completedTasks = project.tasks.filter((task: any) => task.completed).length
  return Math.round((completedTasks / project.tasks.length) * 100)
}

// Función para abrir el modal
const openModal = () => {
  console.log('Abriendo modal')
  isModalOpen.value = true

}

// Función para cerrar el modal
const closeModal = () => {
  console.log('Cerrando modal')
  isModalOpen.value = false
}
// Función para cerrar
const handleClose = () => {
  projectName.value = ''
  closeModal()
}
// Función para guardar
const handleSave = () => {
  console.log('Guardando proyecto')
  console.log('Valor actual de projectName:', projectName.value)
  if (projectName.value.trim()) {
    console.log('Proyecto a guardar:', projectName.value)
    projectStore.addProject(projectName.value)
    console.log('Proyectos en el store:', projectStore.getAllProjects)
    projectName.value = ''
    closeModal()
  } else {
    console.log('El nombre del proyecto está vacío')
  }
}
</script>

<style scoped>
.radial-progress {
  --size: 2.5rem;
  --thickness: 2px;
}
</style> 