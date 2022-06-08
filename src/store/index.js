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
      loading: false
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
    async createTodo({ commit }, title) {
      const res = await axios({
        url: END_POINT,
        method: 'POST',
        headers,
        data: {
          title
        }
      })
      commit('addTodo', res.data)
    },
    async editTodo(context, todo) {
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
    },
    async deleteTodo({ dispatch }, id) {
      await axios({
      url: `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
      method: 'DELETE',
      headers
      })
      dispatch('readTodos')
    },

  }
})
