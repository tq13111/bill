<template>
  <Layout class-prefix="layout">
    <Tags :value.sync="tagList"/>
    <Notes/>
    <Types/>
    <NumberPad/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';

  import {Component} from 'vue-property-decorator';


  @Component({components: {Tags, Notes, Types, NumberPad}})
  export default class Money extends Vue {
    name: string = `Money.vue`;

    data() {
      return {
        tagList: ['1', '2', '3']
      };
    }

  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>
