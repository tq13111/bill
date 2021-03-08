<template>
  <Layout>
    <Tabs :dataSource="dataSource" :value.sync="type" class-prefix="type"/>
    <ul v-if="groupList.length>0">
      <li v-for="(group,index) in groupList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
        <ul>
          <li v-for="(item,index) in group.items" :key=index class="record">
            <span>{{ item.tag }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span></li>
        </ul>
      </li>
    </ul>
    <div v-else class="no-result">目前没有相关记录</div>
  </Layout>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import {mixins} from 'vue-class-component';
  import tagHelper from '@/mixins/tagHelper';
  import clone from '@/lib/clone';
  import dayjs from 'dayjs';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs}
  })
  export default class Labels extends mixins(tagHelper) {
    type: string = '-';
    dataSource = recordTypeList;

    get tagList() {
      return this.$store.state.tagList;
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupList() {
      const {recordList} = this;
      const newList = clone(recordList)
        .filter(item => item.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {return [] as dayResult;}

      const result: dayResult = [{title: dayjs(newList[0].createdAt).format('YYYY-M-D'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-M-D'), items: [current]});
        }
      }
      result.map((group) => {
        group.total = group.items.reduce((previousValue, item) => previousValue + item.amount, 0);
      });
      return result;
    }

    created() {
      this.$store.commit('fetchRecords');

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

  }
</script>


<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  ::v-deep .type-item {
    background: white;

    &.selected {
      background: $mainBackground;

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
    background: lighten($mainBackground, 20%);
    border-bottom: 1px solid #eee;
    color: #eee;
    @extend %item;
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }

  .no-result {
    text-align: center;
    padding: 16px;
  }


</style>

