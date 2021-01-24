<template>
  <Layout>
    <ul class="tags">
      <li>衣
        <Icon name="right"/>
      </li>
      <li>食
        <Icon name="right"/>
      </li>
      <li>住
        <Icon name="right"/>
      </li>
      <li>行
        <Icon name="right"/>
      </li>
    </ul>
    <div class="createTag-wrapper">
      <button class="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Labels extends Vue {

  }
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    font-size: 16px;
    padding-top: 10px;
    padding-left: 16px;

    > li {
      padding: 10px 0;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;

      > svg {
        color: #666;
        margin-right: 16px;
      }
    }
  }

  .createTag {
    background: #767676;
    color: white;
    padding: 10px 16px;
    border-radius: 4px;
    border: none;

    &-wrapper {
      margin-top: 27px;
      text-align: center;
      padding: 16px;
    }
  }
</style>
