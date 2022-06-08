<template>
  <div class="container">
    <a href="/">
      To Do <span>List</span>
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import "~/scss/main";
.container {
  padding-top: 40px;
}
a {
  display: block;
  width: 320px;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 64px;
  font-weight: 900;
  text-decoration: none;
  &:hover {
    color: $primary;
  }
  span {
    color: $black;
  }
}

</style>
