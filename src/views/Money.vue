<template>
  <Layout class-prefix="layout">
    <Tags :value.sync="record.tag"/>
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

  @Component({components: {Tags, Input, Types, NumberPad}})
  export default class Money extends Vue {
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
