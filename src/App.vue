<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "~@/assets/style/helper.scss";
  @import "~@/assets/style/reset.scss";

  body {
    font-family: $font-hei;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    font-size: 16px;
    line-height: 1.5;
    background: white;
    height: 100vh;
  }

  #app {
    max-width: 500px;
    margin: 0 auto;
    height: 100%;
  }
</style>
