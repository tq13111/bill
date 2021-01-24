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
  import model from '@/model';

  const recordList = model.fetch();

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
      const record2: RecordItem = model.clone(this.record);
      record2.createdAt = new Date();
      this.recordList.push(record2);
    }

    @Watch('recordList')
    onRecordListChanged() {
      model.save(this.recordList);
    }
  }
</script>

<style lang="scss">

  .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>
