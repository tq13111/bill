<template>
  <Layout class-prefix="layout">
    <Tags :selected-tag.sync="record.tag" :value.sync="tagList"/>
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
  import {Component, Watch} from 'vue-property-decorator';
  import recordStore from '@/recordStore';

  const recordList = recordStore.fetchRecords();

  @Component({components: {Tags, Notes, Types, NumberPad}})
  export default class Money extends Vue {
    name: string = `Money.vue`;
    tagList: string[] = ['衣', '食', '住', '行'];
    recordList = recordList;
    record: RecordItem = {
      tag: '',
      notes: '',
      type: '-',
      amount: 0,
    };

    saveRecord() {
      recordStore.updateRecords(this.record);
    }

    @Watch('recordList')
    onRecordListChanged() {
      recordStore.saveRecords(this.recordList);
    }
  }
</script>

<style lang="scss">

  .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>
