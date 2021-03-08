<template>
  <label class="input">
    <span class="name">{{ title }}</span>
    <input :placeholder="placeholder" :value="value" class="input1" type="text"
           @change="onValueChanged($event.target.value)">
    <slot/>
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class MyInput extends Vue {
    @Prop({default: ''}) readonly value!: string;
    @Prop({required: true}) readonly title!: string;
    @Prop() readonly placeholder?: string;

    onValueChanged(value: string) {
      this.$emit('update:value', value);
    }

  }
</script>

<style lang="scss" scoped>
  .input {
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;

    > .name {
      padding-right: 16px;
      white-space: nowrap;
      flex: 0 0 auto;
    }

    > .input1 {
      height: 48px;
      border: none;
      padding-right: 16px;
      margin-right: auto;
      overflow: hidden;
      flex-grow: 1;

    }

    > .input2 {
      flex-shrink: 0;
      border: none;
      background: white;

    }

  }
</style>
