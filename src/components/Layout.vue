<template>
  <div :style="{height:h+'px'}" class="layout-wrapper">
    <div :class="classPrefix && classPrefix + '-content' " class="content">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="js">
  let height = document.documentElement.clientHeight
  window.onload = () => {
    if (document.documentElement.clientHeight > 800) {
      window.alert('为保证预览效果，请使用手机预览')
    }
  }
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
    height: 100%;

    > .content {
      flex-grow: 1;
      overflow: auto;
    }
  }

  @media(min-height: 900px) {
    .layout-wrapper {
      height: 900px !important;
      margin-top: 48px;

    }
  }
</style>
