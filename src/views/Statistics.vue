<template>
  <Layout>
    <Tabs :dataSource="dataSource" :value.sync="type" class-prefix="type"/>
    <p>分类统计</p>
    <div class="chart-wrapper">
      <Chart :options="roundChartOptions"/>
    </div>
    <p>日趋势</p>
    <div ref="chartWrapper" class="chart-wrapper">
      <Chart :options="chartOptions" class="chart"/>
    </div>


  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import clone from '@/lib/clone';
  import dayjs from 'dayjs';
  import Chart from '@/components/Chart.vue';
  import _ from 'lodash';

  @Component({
    components: {Chart, Tabs}
  })
  export default class Statistics extends Vue {
    type: string = '-';
    dataSource = recordTypeList;

    get chartData() {
      const array = [];
      for (let i = 0; i <= 29; i++) {
        const date = dayjs().subtract(29, 'day').add(i, 'day').format('YYYY-M-D');
        const found = _.find(this.dayList, {title: date});
        array.push({date, total: found ? found.total : 0});
      }
      return array;
    }


    get chartOptions() {
      const date = this.chartData.map(item => item.date);
      const total = this.chartData.map(item => item.total);
      return {
        grid: {left: 16, right: 16, height: '45%', top: 25},
        xAxis: {
          type: 'category',
          data: date,
          axisTick: {alignWithLabel: true},
          axisLine: {lineStyle: {color: '#356ca7'}},
          axisLabel: {
            show: true,
            formatter: function (value: string) {
              return value.substr(5);
            }
          }
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'line',
          data: total,
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
            borderWidth: 1,
            color: '#356ca7'
          },
          label: {
            show: true, //开启显示
            position: [0, -20], //在上方显示
            fontFamily: 'Arial',
            textStyle: { //数值样式
              color: 'black',
              fontSize: 16
            }
          }
        }],
      };
    }

    get roundChartOptions() {
      let data = this.typeList.map(item => ({value: item.total, name: item.tag}));
      if (data.length === 0) {data = [{value: 0, name: '无'}];}
      return {
        color: [
          '#5470c6',
          '#91cc75',
          '#fac858',
          '#ee6666',
          '#73c0de',
          '#3ba272',
          '#fc8452',
          '#9a60b4',
          '#ea7ccc'
        ],
        gradientColor: ['#f6efa6',
          ' #d88273',
          '#bf444c'],
        title: {
          left: 'center',
          padding: 16,
          textStyle: {
            // color: '#356ca7'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            center: ['50%', '40%'],
            name: '',
            type: 'pie',
            radius: '45%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0，0.5)'
              }
            }
          }
        ]
      };
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get dayList() {
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

    get typeList() {
      const {recordList} = this;
      const newList = clone(recordList)
        .filter(item => item.type === this.type);
      if (newList.length === 0) {return [];}
      const result: typeResult = [{tag: newList[0].tag, items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (last.tag === current.tag) {
          last.items.push(current);
        } else {
          result.push({tag: current.tag, items: [current]});
        }
      }
      result.map((group) => {
        group.total = group.items.reduce((previousValue, item) => previousValue + item.amount, 0);
      });
      return result;
    }

    mounted() {
      const div = this.$refs.chartWrapper as HTMLDivElement;
      div.scrollLeft = div.scrollWidth;
    }

    updated() {
      const div = this.$refs.chartWrapper as HTMLDivElement;
      div.scrollLeft = div.scrollWidth;
    }

    created() {
      this.$store.commit('fetchRecords');
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  ::v-deep .type-item {

    &.selected {
      background: white;
      color: $mainBackground;

      &::after {
        display: none;
      }
    }
  }


  p {
    text-align: center;
    color: $mainBackground;
    position: relative;
    top: 10px;
    font-weight: bold;
    font-size: 18px;
  }

  .chart {
    width: 430%;

    &-wrapper {
      overflow-y: hidden;
      height: 40%;
      position: relative;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>
