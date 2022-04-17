import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    tasks: JSON.parse(localStorage.getItem("tasks") || "[]").map(task => {
      if (new Date(task.date) < new Date()) {
        task.status = 'outdated'
      }
      return task
    })
  },
  getters: {
    tasks: s => s.tasks,
    taskById: s => id => s.tasks.find(t => t.id === id)
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, {
      id,
      description,
      date
    }) {
      const tasks = state.tasks.concat() // получаем копию массива
      const idx = tasks.findIndex(t => t.id === id) // находим индекс в массие ту задачу которую изменяем
      const task = tasks[idx] //task - это та задача которую нужно изменить
      const status = new Date(date) > new Date() ? 'active' : 'outdated'
      tasks[idx] = {
        ...task,
        date,
        description,
        status
      }
      state.tasks = tasks
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    compliteTask(state, id) {
      const idx = state.tasks.findIndex(t => t.id === id)
      state.tasks[idx].status = 'completed'
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }
  },
  actions: {
    createTask({
      commit
    }, task) {
      commit('createTask', task)
    },
    updateTask({
      commit
    }, task) {
      commit('updateTask', task)
    },
    compliteTask({
      commit
    }, id) {
      commit('compliteTask', id)
    }

  },
  modules: {}
})