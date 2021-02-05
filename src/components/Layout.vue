<template>
  <div :style="{height:h+'px'}" class="layout-wrapper">
    <div class="content" :class="classPrefix && classPrefix + '-content' ">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="js">
  const height = document.documentElement.clientHeight
  export default {
    name: 'Layout.vue',
    props: ['classPrefix'],
    data() {
      return {
        h: height
      }
    },
  }

</script>

<style lang="scss" scoped>
  .layout-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;

    > .content {
      flex-grow: 1;
      overflow: auto;
    }
  }
</style>
