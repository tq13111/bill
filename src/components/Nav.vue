<template>
  <nav>
    <router-link active-class="selected" class="item" to="/Labels">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link to="/Money" class="item" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>
<script lang="ts">
  export default {
    name: 'Nav.vue',
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  nav {
    @extend %outerShadow;
    display: flex;
    flex-direction: row;
    font-size: 12px;

    > .item {
      padding: 2px 0;
      width: 33.33333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .icon {
        width: 32px;
        height: 32px;
      }
    }

    > .item.selected {
      color: $color-highlight;
    }
  }
</style>
