<template>
  <Layout class-prefix="layout">
    {{ record }}
    <Tags :selected-tag.sync="record.tag" :value.sync="record.tagList"/>
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

  type Record = {
    tagList: string[]
    notes: string
    type: string
    amount: number
    tag: string
  }

  @Component({components: {Tags, Notes, Types, NumberPad}})
  export default class Money extends Vue {
    name: string = `Money.vue`;

    record: Record = {
      tagList: ['1', '2', '3'],
      tag: '',
      notes: '',
      type: '-',
      amount: 0,
    };


  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>
