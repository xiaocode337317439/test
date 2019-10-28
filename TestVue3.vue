<template>
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
      <!--<el-select v-model="select" slot="prepend" placeholder="请选择">-->
      <!--<el-option label="餐厅名" value="1"></el-option>-->
      <!--<el-option label="订单号" value="2"></el-option>-->
      <!--<el-option label="用户电话" value="3"></el-option>-->
      <!--</el-select>-->
      <el-button slot="append" icon="el-icon-search" @click="inputClick"></el-button>
    </el-input>

    <!--占位隐藏看这里-->
    <el-button type="primary" style="height: 100px;" v-bind:class="{'hidden-btn' : isHiddenBtn }">主要按钮</el-button>

    <el-form ref="form" label-width="80px">
      <el-form-item label="活动区域">
        <el-select v-model="value" placeholder="请选择活动区域">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        <!--决定是否显示的属性 占位隐藏看这里 记得下面还一个样式-->
        isHiddenBtn: true,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        input3: '',
        select: '',
        //select 数据
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods: {
      inputClick() {
        console.log('inputClick')
      }
    }
  }
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .hidden-btn {
    visibility: hidden;
  }
</style>
