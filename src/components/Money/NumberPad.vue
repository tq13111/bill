<template>
  <div class="numberPad">
    <div class="output">100</div>
    <div class="buttons">
      <button @click="calculation" value="1">1</button>
      <button>2</button>
      <button>3</button>
      <button>
        <Icon name="delete" class-prefix="delete"/>
      </button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>
        <Icon name="empty" class-prefix="empty"/>
      </button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok">OK</button>
      <button class="zero">0</button>
      <button>
        <Icon name="point"/>
      </button>
      <button>
        <Icon name="add" class-prefix="add"/>
      </button>

    </div>
  </div>
</template>

<script lang="ts">
  import Icon from '@/components/Icon.vue';

  export default {
    name: 'NumberPad',
    components: {Icon},
    methods: {
      calculation(e) {console.log(e.target);}
    }
  };
</script>

<style lang="scss">
  button {
    > .delete {
      width: 1.5em !important;
      height: 1.5em !important;
      vertical-align: -0.5em !important;
    }

    > .empty {
      width: 2em !important;
      height: 2em !important;
      vertical-align: -0.5em !important;
    }

    > .add {
      width: 2em !important;
      height: 2em !important;
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

        &:nth-child(4), &:nth-child(7), &:nth-child(10) ,&:nth-child(13){
          background: darken($bg, 4*3%);
        }

        &:nth-child(8), &:nth-child(11),  &:nth-child(14){
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