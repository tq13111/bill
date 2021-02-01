<template>
  <Layout>
    <Tabs :dataSource="dataSource" :value.sync="type" class-prefix="type"/>
    <ul>
      <li v-for="(group,index) in groupList" :key="index">
        <h3 class="title">{{ beautify(group.title) }}</h3>
        <ul>
          <li v-for="(item,index) in group.items" :key=index class="record">
            <span>{{ item.tag }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span></li>
        </ul>
      </li>
    </ul>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import clone from '@/lib/clone';
  import dayjs from 'dayjs';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    type: string = '-';
    dataSource = recordTypeList;

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupList() {
      const {recordList} = this;
      // const  lastRecord = recordList
      if (recordList.length === 0) {return [];}

      const newList = clone(recordList).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      const result = [{title: dayjs(newList[0].createdAt).format('YYYY-M-D'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-M-D'), items: [current]});
        }
      }
      return result;
    }

    beautify(string: string) {
      const now = dayjs();
      const date = dayjs(string);
      if (date.isSame(now, 'day')) {
        return '今天';
      } else if (date.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (date.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (date.isSame(now, 'year')) {
        return date.format('M月D日');
      } else {
        return date.format('YYYY年M月D日');
      }
    }

    created() {
      this.$store.commit('fetchRecords');
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .type-item {
    background: #c4c4c4;

    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item;
  }

  .record {
    background: white;
    @extend %item;
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
</style>
