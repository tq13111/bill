<template>
  <div>
    <ul class="types">
      <li :class=" value === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class=" value === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>value

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Types extends Vue {
    @Prop() value!: string;

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
