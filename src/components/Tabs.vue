<template>
  <div>
    <ul class="types">
      <li v-for="item in dataSource" :key="item.value"
          :class=" {[classPrefix + '-item']:classPrefix,selected:value === item.value }"
          @click="selectType(item.value)">{{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  @Component
  export default class Tabs extends Vue {
    @Prop({required: true}) readonly dataSource!: { text: string, value: string }[];
    @Prop() readonly value!: string;
    @Prop() readonly classPrefix?: string;

    selectType(value: string) {
      if (value !== '-' && value !== '+') {
        throw new Error('type is unknown');
      }
      this.$emit('update:value', value);
    }
  }
</script>

<style lang="scss" scoped>
  .types {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;

    > li {
      width: 50%;
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
      }
    }
  }

</style>
