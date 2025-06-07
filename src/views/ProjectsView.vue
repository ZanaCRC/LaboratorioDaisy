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
          <!-- row 1 -->
          <tr>
            <th>1</th>
            <td>Proyecto A</td>
            <td>5 tareas pendientes</td>
            <td>
              <div class="flex items-center gap-2">
                <div class="radial-progress" style="--value:70;">70%</div>
              </div>
            </td>
          </tr>
          <!-- row 2 -->
          <tr>
            <th>2</th>
            <td>Proyecto B</td>
            <td>3 tareas pendientes</td>
            <td>
              <div class="flex items-center gap-2">
                <div class="radial-progress" style="--value:45;">45%</div>
              </div>
            </td>
          </tr>
          <!-- row 3 -->
          <tr>
            <th>3</th>
            <td>Proyecto C</td>
            <td>8 tareas pendientes</td>
            <td>
              <div class="flex items-center gap-2">
                <div class="radial-progress" style="--value:25;">25%</div>
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
      
      <!-- Formulario básico -->
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Nombre del proyecto</span>
        </label>
        <input 
          type="text" 
          placeholder="Escribe aquí" 
          class="input input-bordered w-full max-w-xs"
          
        />
      </div>
      <template #actions>
        <button class="btn btn-primary mr-2" @click="handleSave">Guardar</button>
        <button class="btn" @click="handleClose">Cerrar</button>
      </template>
    </ProjectModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Importar los componentes necesarios
import FloatingButton from '../components/common/FloatingButton.vue'
import PlusCircleIcon from '../components/icons/PlusCircleIcon.vue'
import ProjectModal from '../components/common/ProjectModal.vue'

// Estado local
const projectName = ref('')
// Estado del modal
const isModalOpen = ref(false)

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
  console.log('Guardando proyecto:', projectName.value)
  // Aquí puedes agregar lógica para guardar
  projectName.value = ''
  emit('close')
}
// Aquí puedes agregar la lógica del componente
// Por ejemplo, puedes cargar los datos de proyectos desde una API
</script>

<style scoped>
.radial-progress {
  --size: 2.5rem;
  --thickness: 2px;
}
</style> 