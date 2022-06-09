<template>
  <li
    class="list-group-item"
    :class="[todo.done? 'done' :'', $attrs.class]">
    <div class="flex">
      <div class="title">
        <span class="material-icons handle">
          drag_indicator
        </span>
        <input
          class="form-check-input"
          type="checkbox"
          :checked="done" 
          @change="changeDone" />
        <span
          v-if="!editMode"
          class="title"
          :class="todo.done? 'done' : ''"
          :style="todo.done? 'text-decoration:line-through':''">
          {{ title }}
        </span>
        <input
          v-else
          ref="inputFocus"
          class="form-control"
          :value="title"
          @click.stop
          @input="updateTitle" 
          @keydown.enter="offEditMode" />
      </div>
      
      <div class="detail_btn">
        <span class="update">
          {{ updated.slice(0, 19) }}
        </span>
        <button
          v-if="!editMode"
          class="btn btn-outline-primary"
          @click.stop="onEditMode">
          <span class="material-icons">
            edit
          </span>
        </button>
        <button 
          v-else
          class="btn btn-outline-primary"
          @click="[ offEditMode(), editTodo(todo) ]">
          <span class="material-icons">
            check
          </span>
        </button>
        <button 
          class="btn btn-outline-primary"
          @click="deleteTodo(id)">
          <span class="material-icons">
            delete
          </span>
        </button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    todo: {
      type: Object,
      default: null
    },
    done: {
      type: Boolean,
      default: false
    },
    updated: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editMode: false
    }
  },
  methods: {
    async deleteTodo(id) {
      await this.$store.dispatch('deleteTodo', id)
      await this.$store.dispatch('readTodos')
    },
    async onEditMode() {
      this.editMode = true
      window.addEventListener('click', this.offEditMode)
      await this.$nextTick()
      this.$refs.inputFocus.focus()
    },
    offEditMode() {
      this.editMode = false
      window.removeEventListener('click', this.offEditMode)   
    },
    async editTodo(todo) {
      await this.$store.dispatch('editTodo', todo)
    },
    updateTitle(event) {
      this.$emit('update-title', event.target.value)
    },
    changeDone(event) {
      this.$emit('change-done', {
        todo: this.todo, 
        checked: event.target.checked
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";
  .done {
    color: $gray-500;
  }
  li {
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    width: 710px;
    &.doneTodo:not(.done) {
      display: none;
    }
    &.doingTodo.done {
      display: none;
    }
    &.sortable-ghost {
      background-color: $yellow-100;
    }
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .handle {
    cursor: pointer;
  }
  .form-check-input {
    width: 25px;
    height: 25px;
    margin: 0 4px 0 4px;
  }
  .title {
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    padding: 0 0 0 10px;
  }
  .form-control {
    margin-left: 5px;
    display: inline;
    width: 336px;
  }
  .update {
    padding-right: 10px;
    color: $gray-300
  }


</style>
