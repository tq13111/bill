<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in value" :key="tag" :class="{selected:tag ===selectedTag}" @click="select(tag)">{{ tag }}</li>

    </ul>
    <div class="new">
      <button @click="create">新建标签</button>
    </div>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    @Prop() readonly value!: string[];
    @Prop() readonly selectedTag: string = '';
    name: string = 'Tags';

    select(tag: string) {
      if (this.selectedTag !== tag) {this.$emit('update:selectedTag', tag);} else {this.$emit('update:selectedTag', '');}
    }

    create() {
      const name = window.prompt('请输入标签名');
      if (name === null) {return;}
      if (name === '') {window.alert('标签名不能为空，请重新输入');} else if (this.value.indexOf(name) !== -1) {window.alert('该标签已存在');} else {
        this.$emit('update:value', [...this.value, name]);
      }
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
