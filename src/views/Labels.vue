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
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import tagHelper from '@/mixins/tagHelper';

  @Component
  export default class Labels extends mixins(tagHelper) {
    get tagList() {
      return this.$store.state.tagList;
    }

    created() {
      this.$store.commit('fetchTags');
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
