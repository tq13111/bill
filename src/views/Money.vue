<template>
  <Layout class-prefix="layout">
    <Tags/>
    <Input :value.sync="record.notes"
           placeholder="在这里输入备注"
           title="备注"/>
    <Types :value.sync="record.type"/>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Input from '@/components/Money/Input.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index2';

  @Component({components: {Tags, Input, Types, NumberPad}})
  export default class Money extends Vue {
    tagList = store.tagList;
    recordList = store.recordList;
    record: RecordItem = {
      tag: '',
      notes: '',
      type: '-',
      amount: 0,
    };

    saveRecord() {
      store.createRecord(this.record);
    }

  }
</script>

<style lang="scss">

  .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>
