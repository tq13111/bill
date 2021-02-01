<template>
  <Layout class-prefix="layout">
    <Tags :value.sync="record.tag"/>
    <Input :value.sync="record.notes"
           placeholder="在这里输入备注"
           title="备注"/>
    <Tabs :dataSource="dataSource" :value.sync="record.type" class-prefix="xxx"/>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tabs from '@/components/Tabs.vue';
  import Input from '@/components/Money/Input.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({components: {Tags, Input, Tabs, NumberPad}})
  export default class Money extends Vue {
    dataSource = recordTypeList;

    get tagList() {
      return this.$store.state.tagList;
    }

    get recordList() {
      return this.$store.state.recordList;
    }

    record: RecordItem = {
      tag: '',
      notes: '',
      type: '-',
      amount: '0',
    };

    saveRecord() {
      if (this.record.amount === '0' && this.record.tag === '') {return window.alert('请选择标签并输入金额');} else if (this.record.amount === '0') {return window.alert('未输入金额，请重新输入');} else if (this.record.tag === '') {return window.alert('请选择标签，请重新输入');} else {
        this.$store.commit('createRecord', this.record);
      }
      this.record.tag = '';
    }

    created() {
      this.$store.commit('fetchRecords');
      this.$store.commit('fetchTags');
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column;
  }
</style>
