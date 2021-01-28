<template>
  <Layout>
    <ul class="tags">
      <router-link v-for="tag in tagList"
                   :key="tag.id" :to="`/labels/edit/${tag.id}`"
                   class="tag">{{ tag.name }}
        <Icon name="right"/>
      </router-link>

    </ul>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import tagStore from '@/store/tagStore';

  @Component
  export default class Labels extends Vue {
    tagList = tagStore.tagList;

    createTag() {
      const name = window.prompt('请输入标签名');
      if (!name) {return window.alert('标签名不能为空，请重新输入');}
      tagStore.createTag(name);
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    font-size: 16px;
    padding-left: 16px;

    > .tag {
      padding: 10px 0;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;

      > svg {
        color: #666;
        margin-right: 16px;
        margin-top: 4px;
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
