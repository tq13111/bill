<template>
  <div ref="main" class="main">
  </div>

</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  // eslint-disable-next-line no-unused-vars
  import echarts, {EChartOption, ECharts} from 'echarts';

  @Component
  export default class chart extends Vue {
    chart?: ECharts;
    @Prop() options?: EChartOption;

    @Watch('options')
    onOptionsChange(newValue: EChartOption) {
      this.chart!.setOption(newValue);
    }

    mounted() {
      if (this.options === undefined) {return console.error('options 为空');}
      this.chart = echarts.init(this.$refs.main as HTMLDivElement);
      this.chart.setOption(this.options);
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    height: 400px;
  }
</style>
