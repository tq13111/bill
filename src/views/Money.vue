<template>
  <Layout class-prefix="layout">
    <Tags/>
    <Notes :value.sync="record.notes"/>
    <Types :value.sync="record.type"/>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import tagStore from '@/store/tagStore';
  import recordStore from '@/store/recordStore';


  @Component({components: {Tags, Notes, Types, NumberPad}})
  export default class Money extends Vue {
    tagList = tagStore.tagList;
    recordList = recordStore.recordList;
    record: RecordItem = {
      tag: '',
      notes: '',
      type: '-',
      amount: 0,
    };

    saveRecord() {
      recordStore.createRecord(this.record);
    }

  }
</script>

<style lang="scss">

  .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>
