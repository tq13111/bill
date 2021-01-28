<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" :class="{selected:tag.name ===selectedTag}" @click="select(tag.name)">
        {{ tag.name }}
      </li>

    </ul>
    <div class="new">
      <button @click="createTag">新建标签</button>
    </div>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index2';

  @Component
  export default class Tags extends Vue {
    tagList = store.tagList;
    selectedTag: string = '';

    select(tag: string) {
      if (this.selectedTag !== tag) {this.$emit('update:selectedTag', tag);} else {this.$emit('update:selectedTag', '');}
    }

    createTag() {
      const name = window.prompt('请输入标签名');
      if (!name) {return window.alert('标签名不能为空，请重新输入');}
      store.createTag(name);
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: flex-end;
    background: #FFFFFF;

    > .current {
      display: flex;
      flex-wrap: wrap;
      padding-left: 20px;

      > li {
        $bg: #d9d9d9;
        background: $bg;
        $h: 22px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;

        &.selected {
          color: white;
          background: darken($bg, 50%);
        }
      }
    }

    > .new {
      padding-top: 16px;
      padding-left: 20px;

      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }

</style>
