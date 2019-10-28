<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="Date"
      prop="date">
    </el-table-column>
    <el-table-column
      label="Name"
      prop="name">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <!--scope.row.showList[0] 看你们后端是怎么给你的， 这里是取对应按钮的是否显示-->
        <el-button
          v-bind:class="[Class1, scope.row.showList[0] ? showBtnClass:hiddenBtnClass]"
          size="mini">Edit</el-button>
        <el-button
          v-bind:class="[Class1, scope.row.showList[1] ? showBtnClass:hiddenBtnClass]"
          size="mini"
          type="danger">Delete</el-button>
        <el-button
          v-bind:class="[Class1, scope.row.showList[2] ? showBtnClass:hiddenBtnClass]"
          size="mini"
          type="primary">btnClick1</el-button>
        <el-button
          v-bind:class="[Class1, scope.row.showList[3] ? showBtnClass:hiddenBtnClass]"
          size="mini"
          type="success">btnClick2</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        hiddenBtnClass: 'hidden-btn',
        showBtnClass: 'show-btn',
        Class1: 'class1',

        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          showList: [
            true,
            false,
            false,
            false
          ]
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          showList: [
            true,
            true,
            false,
            false
          ]
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          showList: [
            true,
            true,
            true,
            false
          ]
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          showList: [
            true,
            true,
            true,
            true
          ]
        }],
      }
    },
  }
</script>

<style>
  .class1 {
    height: 50px;
  }
  .hidden-btn {
    visibility: hidden;
  }
  .show-btn {
    visibility: visible;
  }
</style>
