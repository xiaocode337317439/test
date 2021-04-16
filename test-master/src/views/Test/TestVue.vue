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
    <el-table-column prop="labe4" label="标签4"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          labe1: 1,
          labe2: 2,
          labe3: 3,
          labe4: 4
        },
        {
          labe1: 1,
          labe2: 2,
          labe3: 4,
          labe4: 5
        },
        {
          labe1: 2,
          labe2: 3,
          labe3: 3,
          labe4: 5
        },
        {
          labe1: 4,
          labe2: 5,
          labe3: 6,
          labe4: 7
        },
        {
          labe1: 5,
          labe2: 3,
          labe3: 7,
          labe4: 5
        }
      ]
    };
  },
  created() {
    // 给table赋值，重新遍历新增rowSpan属性，labe1,labe2,labe3为table里面需要合并的属性名称
    this.tableData = this.mergeTableRow(this.tableData, [
      "labe1",
      "labe2",
      "labe3",
      "labe4"
    ]);
  },
  methods: {
    sortTable(data = [], merge = []) {
      // 提取需要合并的属性
      // 将数据用列表示[[第一列...],[第二列...]...]
      const map = merge.map((col, colIndex) => {
        return [
          data.map((row, rowIndex) => {
            let obj = {};
            // 行列坐标作为key
            obj[`${rowIndex}-${colIndex}`] = row[col];
            return obj;
          })
        ];
      });
      map.forEach(value => {});
      console.log(map);
    },
    mergeTableRow(data, merge) {
      if (!merge || merge.length === 0) {
        return data;
      }
      this.sortTable(data, merge);
      //默认排序第一个需要排序的属性
      data.sort((a, b) => a[merge[0]] - b[merge[0]]);
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
