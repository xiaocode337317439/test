<template>
  <el-button type="primary" v-bind:class="[class1, listData.length > 0 ? class2:'']" @click="btnClick">点击后就消失了，但是还占位</el-button>
</template>

<script>
  export default {
    data() {
      return {
        listData: [],
        class1: 'size-color',
        class2: 'hidden-btn'
      }
    },
    methods: {
      btnClick() {
        console.log('btnClick');
        this.listData.push('xxxx');
      }
    }
  }
</script>

<style>
  .size-color {
    height: 100px;
    background: red;
  }
  .hidden-btn {
    visibility: hidden;
  }
</style>
