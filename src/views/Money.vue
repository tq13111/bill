<template>
  <Layout class-prefix="layout">
    <Tabs :dataSource="dataSource" :value.sync="record.type" class-prefix="xxx"/>
    <Tags :value.sync="record.tag"/>
    <MyInput :value.sync="record.notes"
             placeholder="在这里输入备注"
             title="备注">
      <input v-model="record.createdAt" :style="{width:'130px',marginRight:'16px',paddingLeft:'4px'}" class="input2"
             type="date">
    </MyInput>
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tabs from '@/components/Tabs.vue';
  import MyInput from '@/components/Money/MyInput.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import store from '@/store';
  import {expenditureTags, incomeagsTags} from '@/constants/TagsList';

  @Component({components: {Tags, MyInput, Tabs, NumberPad}})
  export default class Money extends Vue {
    dataSource = recordTypeList;
    record: RecordItem = {
      tag: '',
      notes: '',
      type: '-',
      amount: 0,
      createdAt: dayjs().format('YYYY-MM-DD')
    };


    saveRecord() {
      if (this.record.amount === 0 && this.record.tag === '') {
        return window.alert('请选择标签并输入金额');
      } else if (this.record.amount === 0) {
        return window.alert('未输入金额，请重新输入');
      } else if (this.record.tag === '') {
        return window.alert('请选择标签，请重新输入');
      } else if (this.record.createdAt > dayjs().format('YYYY-MM-DD')) {
        return window.alert('错误，今天是：' + dayjs().format('M月D日') + '请勿输入之后的日期');
      } else {
        this.$store.commit('createRecord', this.record);
      }
      this.record.tag = '';
      this.record.notes = '';
    }

    fetch() {
      this.$store.state.tagList = [];
      if (this.record.type === '-') {
        expenditureTags.forEach((item) => {
          store.commit('createTag', item);
        });
      } else {
        incomeagsTags.forEach((item) => {
          store.commit('createTag', item);
        });
      }
      this.$store.commit('fetchRecords');
    }

    created() {
      this.fetch();
    }

    updated() {
      this.fetch();
    }

  }
</script>

<style lang="scss" scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column;
    @media (min-height: 600px) {
      .numberPad {
        > .buttons {
          > button {
            min-height: 48px;

            &.ok {
              min-height: 48*2px;
              float: right;
            }
          }
        }
      }
      > .types {
        > li {
          min-height: 56px;
        }
      }
    }

    .types {
      > li {
        color: #eee;
      }
    }

  }
</style>
