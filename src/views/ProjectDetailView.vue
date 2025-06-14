<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ project?.name || 'Proyecto no encontrado' }}</h1>
    
    <div v-if="project" class="space-y-4">
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Tareas Totales</div>
          <div class="stat-value">{{ project.tasks.length }}</div>
        </div>
        
        <div class="stat">
          <div class="stat-title">Tareas Completadas</div>
          <div class="stat-value">{{ completedTasks }}</div>
        </div>
        
        <div class="stat">
          <div class="stat-title">Progreso</div>
          <div class="stat-value">{{ progressPercentage }}%</div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>Estado</th>
              <th>Tarea</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in project.tasks" :key="task.id">
              <td>
                <input 
                  type="checkbox" 
                  :checked="task.completed" 
                  class="checkbox" 
                  @change="toggleTaskComplete(task.id)"
                />
              </td>
              <td>
                <span :class="{ 'line-through': task.completed }">{{ task.title }}</span>
                <div v-if="task.completedAt" class="text-xs text-gray-500">
                  Completada: {{ formatDate(task.completedAt) }}
                </div>
              </td>
              <td>
                <button class="btn btn-ghost btn-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button class="btn btn-ghost btn-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
            <!-- Fila para agregar nueva tarea -->
            <tr class="hover:bg-base-200">
              <td colspan="3">
                <button class="btn btn-ghost btn-sm w-full" @click="openModal">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Agregar Tarea
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Component -->
    <ProjectModal :isOpen="isModalOpen" @close="closeModal">
      <h3 class="text-lg font-bold">Nueva Tarea</h3>
      <p class="py-4">Agrega una nueva tarea al proyecto</p>
      
      <!-- Formulario -->
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Título de la tarea</span>
        </label>
        <input 
          type="text" 
          placeholder="Escribe aquí" 
          class="input input-bordered w-full max-w-xs"
          v-model="newTaskTitle"
        />
      </div>

      <div class="form-control w-full max-w-xs mt-4">
        <label class="label">
          <span class="label-text">Descripción</span>
        </label>
        <textarea 
          placeholder="Escribe la descripción" 
          class="textarea textarea-bordered w-full max-w-xs"
          v-model="newTaskDescription"
        ></textarea>
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
import { computed, watch, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '../stores/projects'
import ProjectModal from '../components/common/Modal.vue'

const route = useRoute()
const projectStore = useProjectStore()

const projectId = computed(() => Number(route.params.id))
const newTaskTitle = ref('')
const newTaskDescription = ref('')
const isModalOpen = ref(false)

// Establecer el proyecto actual cuando el componente se monta
onMounted(() => {
  if (projectId.value) {
    projectStore.setCurrentProject(projectId.value)
  }
})

// Observar cambios en el ID del proyecto
watch(projectId, (newId) => {
  if (newId) {
    projectStore.setCurrentProject(newId)
  }
})

const project = computed(() => {
  return projectStore.projects.find(p => p.id === projectId.value)
})

const completedTasks = computed(() => {
  return project.value?.tasks.filter(task => task.completed).length || 0
})

const progressPercentage = computed(() => {
  if (!project.value?.tasks.length) return 0
  return Math.round((completedTasks.value / project.value.tasks.length) * 100)
})

// Función para formatear la fecha
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Función para marcar/desmarcar tarea como completada
const toggleTaskComplete = (taskId: number) => {
  if (projectId.value) {
    projectStore.completeTask(projectId.value, taskId)
  }
}

// Funciones para el modal
const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleClose = () => {
  newTaskTitle.value = ''
  newTaskDescription.value = ''
  closeModal()
}

const handleSave = () => {
  if (newTaskTitle.value.trim() && projectId.value) {
    projectStore.addTask(projectId.value, newTaskTitle.value, newTaskDescription.value)
    handleClose()
  }
}
</script> 