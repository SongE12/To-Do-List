import { createStore } from 'vuex'
import axios from 'axios'

const END_POINT = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos'
const headers = {
  'Content-Type': 'application/json',
  'apikey': 'FcKdtJs202204',
  'username': 'KDT2_BackSongE'
}

export default createStore( {
  state() {
    return {
      todos: [],
      loading: false,
      order: 0
    }
  },
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    setTodos(state, payload) {
      state.todos = payload // state의 todos를 payload로 받음. 
    },
    addTodo(state, payload) {
      state.todos.push(payload)
    },
    setOrderTodos(state) {
      state.order = state.todos.length
    },
    reorderTodos(state, payload) {
      const { oldIndex, newIndex } = payload
      const clone = { ...state.todos[oldIndex] }
      state.todos.splice(oldIndex, 1)
      state.todos.splice(newIndex, 0, clone)
    }
  },
  actions: {
    async readTodos({ state, commit }) {
      if (state.loading) return

      commit('updateState', {
        loading: true
      })

      try {
        const res = await axios({
          url: END_POINT,
          method: 'GET',
          headers
        })
        console.log(res.data)
        commit('setTodos', res.data)
      } catch (error) {
        alert(error)
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async createTodo({ state, commit }, title) {
      commit('setOrderTodos')
      const res = await axios({
        url: END_POINT,
        method: 'POST',
        headers,
        data: {
          title,
          order: state.order
        }
      })
      console.log(res.data)
      commit('addTodo', res.data)
    },
    async editTodo({ dispatch }, todo) {
      await axios({
      url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
      method: 'PUT',
      headers,
      data: {
        title: todo.title,
        done: todo.done ,
        order: todo.order,
        }
      })
      dispatch('readTodos')
    },
    async deleteTodo({ commit, dispatch }, id) {
      commit('setOrderTodos')
      await axios({
      url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
      method: 'DELETE',
      headers
      })
      dispatch('readTodos')
    },
    async reorderTodos({ state, commit }, payload) {
      commit('reorderTodos', payload)
      commit('setOrderTodos')
      await axios({
        url: `${END_POINT}/reorder`,
        method: 'PUT',
        headers,
        data: {
          todoIds: state.todos.map(todo => todo.id)
        }
      })
    },
  }
})
