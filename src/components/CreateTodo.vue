<template>
  <div class="container">
    <div class="input">
      <input
        class="form-control"
        :value="title" 
        @input="title = $event.target.value"
        @keydown.enter="createTodo" />
      <button
        class="btn btn-primary"
        @click="createTodo">
        + ADD
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    }
  },
  methods: {
    async createTodo() {
      if(!this.title.trim()) return
      
      this.$store.dispatch('createTodo', this.title)
      this.title = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";
.container {
  padding-top: 40px;
}
.input {
  width: 700px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
}
.form-control {
  width: 600px;
}
.btn {
  margin-left: 20px;
  color: #fff;
  font-weight: bold;
}

</style>
