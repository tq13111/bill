<template>
  <Layout>
    <div class="navBar">
      <Icon name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <Input :value="currentTag && currentTag.name" placeholder="在这里输入标签名" title="标签名" @update:value="update"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Input from '@/components/Money/Input.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Input, Button}
  })
  export default class editLabel extends Vue {
    get currentTag() {
      return this.$store.state.currentTag;
    }

    created() {
      this.$store.commit('fetchTags');
      this.$store.commit('findTag', this.$route.params.id);
      if (!this.currentTag) {
        this.$router.replace('/404');
      }
    }

    update(name: string) {
      if (this.currentTag) {
        this.$store.commit(' updateTag', {id: this.currentTag.id, name});
      }
    }

    remove() {
      if (this.currentTag) {
        this.$store.commit('removeTag', this.currentTag.id);
      }
    }

    goBack() {
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .title {
    }

    > .left {
      width: 24px;
      height: 24px;
    }

    > .right {
      width: 24px;
      height: 24px;
    }
  }

  .form-wrapper {
    background: white;
    margin-top: 8px;
  }

  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>
