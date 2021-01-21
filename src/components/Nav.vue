<template>
  <div>
    <router-link to="/Label">
      <Icon name="label"/>
      标签</router-link>
    <router-link to="/Money">
      <Icon name="money"/>
      记账</router-link>
    <router-link to="/statistics">
      <Icon name="statistics"/>
      统计</router-link>
  </div>
</template>
<script lang="ts">
import Icon from '@/components/Icon.vue';

export default {
  name: 'Nav.vue',
  components: {Icon}
};
</script>

<style lang="scss" scoped>

</style>
