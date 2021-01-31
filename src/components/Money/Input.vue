<template>
  <label class="input">
    <span class="name">{{ title }}</span>
    <input :placeholder="placeholder" :value="value" type="text" @change="onValueChanged($event.target.value)">
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Input extends Vue {
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

    > .name {
      padding-right: 16px;
    }

    > input {
      height: 64px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>
