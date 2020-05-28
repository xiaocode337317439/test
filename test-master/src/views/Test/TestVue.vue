<template>
  <el-table
    :data="tableData"
    :span-method="objectSpanMethod"
    border
    style="width: 100%; margin-top: 20px">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="amount1"
      label="数值 1（元）">
    </el-table-column>
    <el-table-column
      prop="amount2"
      label="数值 2（元）">
    </el-table-column>
    <el-table-column
      prop="amount3"
      label="数值 3（元）">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987122',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
      };
    },
    mounted() {
      //在数据加载成功后调用这一句
      this.rowSpanArr = this.getRowSpan('id');
    },
    methods: {
      getRowSpan(key) {
        // 获取合并的数组
        const spanArr = [];
        let position = 0;
        this.tableData.forEach((item, index) => {
          if (index === 0) {
            spanArr.push(1);
            position = 0;
          } else {
            //合并指定的属性key
            if (this.tableData[index][key] === this.tableData[index - 1][key]) {
              spanArr[position] += 1;
              spanArr.push(0);
              this.tableData[index][key] = this.tableData[index - 1][key];
            } else {
              spanArr.push(1);
              position = index;
            }
          }
        });
        return spanArr;
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        // 只合并区域位置
        if (columnIndex === 0) {
          const row = this.rowSpanArr[rowIndex];
          return {
            rowspan: row, //行
            colspan: 1 //列
          };
        }
      }
    }
  };
</script>
