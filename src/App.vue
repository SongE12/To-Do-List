<template>
  <Logo />
  <CreateTodo />
  <TodoList />
</template>

<script>
import Logo from '~/components/Logo.vue'
import CreateTodo from '~/components/CreateTodo.vue'
import TodoList from '~/components/TodoList.vue'


export default {
  components: {
    Logo,
    CreateTodo,
    TodoList,
    
  },
  computed: {
    
  }
}
</script>

<style lang="scss">
@import "~/scss/main";
</style>
