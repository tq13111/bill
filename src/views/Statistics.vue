<template>
  <Layout>
    <Tabs :dataSource="dataSource" :value.sync="type" class-prefix="type"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    type: string = '-';
    dataSource = recordTypeList;
  }
</script>

<style lang="scss" scoped>
  ::v-deep .type-item {
    background: #c4c4c4;

    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }

  }
</style>
