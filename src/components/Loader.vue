<template>
  <div 
    :style="{
      width: `${size}rem`,
      height: `${size}rem`,
      zIndex
    }"
    class="spinner-border text-primary"></div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 3
    },
    zIndex: {
      type: Number,
      default: 9
    },
  }
}
</script>

<style lang="scss" scoped>
.spinner-border {
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
}
</style>
