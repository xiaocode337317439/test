<template>
  <el-table
    :data="tableData"
    :span-method="objectSpanMethod"
    border
    style="width: 100%; margin-top: 20px"
  >
    <el-table-column prop="labe1" label="标签1"> </el-table-column>
    <el-table-column prop="labe2" label="标签2"> </el-table-column>
    <el-table-column prop="labe3" label="标签3"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          labe1: 10,
          labe2: "11",
          labe3: "3.2"
        },
        {
          labe1: 12,
          labe2: "234",
          labe3: "3.2"
        },
        {
          labe1: 10,
          labe2: "22",
          labe3: "3.2"
        },
        {
          labe1: 12,
          labe2: "234",
          labe3: "3.2"
        },
        {
          labe1: 15,
          labe2: "234",
          labe3: "3.2"
        }
      ]
    };
  },
  created() {
    // 给table赋值，重新遍历新增rowSpan属性，labe1,labe2,labe3为table里面需要合并的属性名称
    this.tableData = this.mergeTableRow(this.tableData, [
      "labe1",
      "labe2",
      "labe3"
    ]);
  },
  methods: {
    mergeTableRow(data, merge) {
      if (!merge || merge.length === 0) {
        return data;
      }
      merge.forEach(m => {
        const mList = {};
        data = data.map((v, index) => {
          const rowVal = v[m];
          if (mList[rowVal] && mList[rowVal].newIndex === index) {
            mList[rowVal]["num"]++;
            mList[rowVal]["newIndex"]++;
            data[mList[rowVal]["index"]][m + "-span"].rowspan++;
            v[m + "-span"] = {
              rowspan: 0,
              colspan: 0
            };
          } else {
            mList[rowVal] = { num: 1, index: index, newIndex: index + 1 };
            v[m + "-span"] = {
              rowspan: 1,
              colspan: 1
            };
          }
          return v;
        });
      });
      return data;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const span = column["property"] + "-span";
      if (row[span]) {
        return row[span];
      }
    }
  }
};
</script>
