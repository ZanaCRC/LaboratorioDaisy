import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { useStorage } from '@vueuse/core'

interface Task {
  id: number
  title: string
  completed: boolean
  projectId: number
  completedAt: Date | null
}

interface Project {
  id: number
  name: string
  tasks: Task[]
}

interface ProjectState {
  projects: Project[]
  currentProjectId: number | null
}

export const useProjectStore = defineStore('projects', {
  state: (): ProjectState => ({
    projects: [],
    currentProjectId: null
  }),

  getters: {
    getCurrentProject: (state) => {
      return state.projects.find(project => project.id === state.currentProjectId)
    },
    getAllProjects: (state) => state.projects,
    getProjectTasks: (state) => (projectId: number) => {
      const project = state.projects.find(p => p.id === projectId)
      return project?.tasks || []
    }
  },

  actions: {
    addProject(name: string) {
      const newProject: Project = {
        id: Date.now(),
        name,
        tasks: [],
      }
      this.projects.push(newProject)
    },

    setCurrentProject(id: number) {
      this.currentProjectId = id
    },

    addTask(projectId: number, title: string, description: string) {
      const project = this.projects.find(p => p.id === projectId)
      if (project) {
        const newTask: Task = {
          id: Date.now(),
          title,
          completed: false,
          projectId,
          completedAt: null
        }
        project.tasks.push(newTask)
      }
    },

    completeTask(projectId: number, taskId: number) {
      const project = this.projects.find(p => p.id === projectId)
      if (project) {
        const task = project.tasks.find(t => t.id === taskId)
        if (task) {
          task.completed = !task.completed
          task.completedAt = task.completed ? new Date() : null
        }
      }
    }
  }
})
