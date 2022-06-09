<template>
  <div class="container">
    <div class="detail_btn">
      <button
        class="btn btn-primary"
        @click="readAll">
        {{ all }}
      </button> 
      <button
        class="btn btn-primary"
        @click="readDone">
        {{ done }}
      </button>
      <button
        class="btn btn-primary"
        @click="readDoing">
        {{ doing }}
      </button>
      <button
        class="btn btn-primary"
        @click="deleteDone">
        Clean
      </button>
    </div>
    <Loader v-if="loading" />
    <ul
      ref="todoList"
      class="list-group list-group-flush">
      <TodoItem
        v-for="(todo) in todos"
        :id="todo.id"
        :key="todo.id"
        :class="[isDone? 'doneTodo' : '', isDoing? 'doingTodo' : '']"
        :done="todo.done"
        :todo="todo" 
        :title="todo.title"
        :updated="todo.updatedAt"
        @update-title="updateTitle(todo, $event)" 
        @change-done="changeDone" />
    </ul>
  </div>
</template>

<script>
import TodoItem from '~/components/TodoItem.vue'
import Loader from '~/components/Loader.vue'
import Sortable from 'sortablejs'

export default {
  components: {
    TodoItem,
    Loader
  },
  data() {
    return {
      isDone: false,
      isDoing: false,
      done: 'Done',
      doing: 'Doing',
      all: 'All'
    }
  },
  computed: { // state의 계산된 데이터를 가져옴
    todos() {
      return this.$store.state.todos
    },
    loading() {
      return this.$store.state.loading
    }
  },
  created() {
    this.readTodos() // 함수 호출
  },
  mounted() {
    this.initSortable()
  },
  methods: {
    async readTodos() { // 함수 선언
     this.$store.dispatch('readTodos')
    },
    updateTitle(todo, event) {
      todo.title = event
    },
    async changeDone({ todo, checked }) {
      todo.done = checked
      await this.$store.dispatch('editTodo', todo)
    },
    readAll() { 
      this.isDone = false
      this.isDoing = false
    },
    readDone() { 
      this.isDone = true
      this.isDoing = false
    },
    readDoing() { 
      this.isDone = false
      this.isDoing = true
    },
    async deleteDone() {
      await this.todos.forEach(todo => {
        if (todo.done) {
          this.$store.dispatch('deleteTodo', todo.id)
        }
      })
    },
    initSortable() {
      new Sortable(this.$refs.todoList, {
        handle: 'li .handle', 
        delay: 50, 
        animation: 0, 
        forceFallback: true, 
        onEnd: event => {
          this.reorderTodos(event.oldIndex, event.newIndex)
        }
      })
    },
    reorderTodos(oldIndex, newIndex) {
      this.$store.dispatch('reorderTodos', { oldIndex, newIndex })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";
.container {
  padding-top: 40px;
}
.detail_btn {
  width: 340px;
  display: flex;
  left: 0;
  right: 0;
  margin: auto;
  padding-bottom: 40px;
  .btn {
    width: 70px;
    margin-right: 20px;
    font-weight: bold;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
