<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" :class="{selected:tag.name ===value}" @click="select(tag.name)">
        <Icon :name="tag.iconName"/>
        <p>{{ tag.name }}</p>
      </li>
    </ul>

  </div>

</template>

<script lang="ts">
  import {Component, Prop} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import tagHelper from '@/mixins/tagHelper';

  @Component
  export default class Tags extends mixins(tagHelper) {
    @Prop() readonly value: string = '';

    get tagList() {
      return this.$store.state.tagList;
    }

    select(tag: string) {
      if (this.value !== tag) {this.$emit('update:value', tag);} else {this.$emit('update:value', '');}
    }

    createTag() {
      const name = window.prompt('请输入标签名');
      if (name === null) {return;}
      if (name === '') {return window.alert('标签名不能为空，请重新输入');}
      this.$store.commit('createTag', name);
    }

    created() {
      this.$store.commit('fetchTags');
    }

  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .tags {
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: flex-end;
    background: #FFFFFF;
    height: 400px;
    overflow: auto;


    > .current {
      display: flex;
      flex-wrap: wrap;
      height: 100%;
      align-content: start;

      > li {
        $bg: #d9d9d9;
        width: 25%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        @media (min-width: 900px) {
          height: 25%;
        }

        &.selected {
          color: white;
          background: lighten($mainBackground, 40%);
          border-radius: 10%;
        }

        > .icon {
          height: 40%;
          width: 40%;
          margin-bottom: 6px;
        }
      }
    }
  }

</style>
