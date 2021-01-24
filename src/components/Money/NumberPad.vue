<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="calculation">1</button>
      <button @click="calculation">2</button>
      <button @click="calculation">3</button>
      <button @click="remove">
        <Icon class-prefix="remove" name="remove"/>
      </button>
      <button @click="calculation">4</button>
      <button @click="calculation">5</button>
      <button @click="calculation">6</button>
      <button @click="clear">
        <Icon class-prefix="clear" name="clear"/>
      </button>
      <button @click="calculation">7</button>
      <button @click="calculation">8</button>
      <button @click="calculation">9</button>
      <button class="ok" @click="ok">OK</button>
      <button @click="calculation" class="zero">0</button>
      <button @click="calculation" value=".">
        <Icon name="point"/>
      </button>
      <button @click="calculation" value="+">
        <Icon name="add" class-prefix="add"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import Icon from '@/components/Icon.vue';
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component({components: {Icon}})
  export default class NumberPad extends Vue {
    @Prop() readonly value!: number;
    output = this.value.toString();

    calculation(e: MouseEvent) {
      const button = (e.currentTarget as HTMLButtonElement);
      const input = button.textContent || button.value!;

      if (this.output.length >= 16) {return;}
      if (this.output === '0') {
        if (input === '0') {return;} else if ('123456789'.indexOf(input) !== -1) {
          this.output = input;
          return;
        }
      }
      if (input === '.' && this.output.match(/\+[0-9]+\.[0-9]+/)) {return;}
      if (this.output.indexOf('+') !== -1 && input === '+' && this.output.length >= 3) {
        this.add();
      }
      this.output += input;
      this.output = this.output.replace(/\+0+/, '+0').replace(/\.\+/, '+').replace(/\.+/g, '.').replace(/\++/, '+').replace(/\+\./, '+0.');
    }

    add() {
      const array = this.output.split('+');
      if (array[1] !== '') {
        const number = (parseFloat(array[0]) * 100 + parseFloat(array[1]) * 100) / 100;
        this.output = number.toString();
        if (this.output.length >= 16) {
          this.output = '错误';
          return;
        }
      }
    }

    remove() {
      this.output = this.output.slice(0, -1);
      if (this.output.length === 0) {this.output = '0';}
    }

    clear() {
      this.output = '0';
    }

    ok() {
      if (this.output.indexOf('+') !== -1) {this.add();}
      this.output = this.output.replace(/\.$|\+$/, '');
      this.$emit('update:value', this.output);
      this.$emit('submit');
      this.output = '0';
    }
  }
</script>

<style lang="scss">
  button {
    > .remove {
      width: 1.5em !important;
      height: 1.5em !important;
      vertical-align: -0.5em !important;
    }

    > .clear {
      width: 2em !important;
      height: 2em !important;
      vertical-align: -0.5em !important;
    }

    > .add {
      width: 1.5em !important;
      height: 1.5em !important;
      vertical-align: -0.5em !important;
    }
  }
</style>
<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .numberPad {
    .output {
      @extend %clearFix;
      @extend %innerShadow;
      font-size: 36px;
      font-family: Consolas, monospace;
      padding: 9px 16px;
      text-align: right;
      height: 72px;
    }

    .buttons {
      @extend %clearFix;

      > button {
        width: 25%;
        height: 64px;
        float: left;
        background: transparent;
        border: none;

        &.ok {
          height: 64*2px;
          float: right;
        }


        $bg: #f2f2f2;

        &:nth-child(1) {
          background: $bg;
        }

        &:nth-child(2), &:nth-child(5) {
          background: darken($bg, 4%);
        }

        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($bg, 4*2%);
        }

        &:nth-child(4), &:nth-child(7), &:nth-child(10), &:nth-child(13) {
          background: darken($bg, 4*3%);
        }

        &:nth-child(8), &:nth-child(11), &:nth-child(14) {
          background: darken($bg, 4*4%);
        }

        &:nth-child(15) {
          background: darken($bg, 4*5%);
        }

        &:nth-child(12) {
          background: darken($bg, 4*6%);
        }
      }
    }
  }
</style>
