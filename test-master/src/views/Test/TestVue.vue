<template>
  <el-form :model="monitorForm" :rules="monitorForm.monitorRules" ref="monitorForm">
    <el-table
      :data="monitorForm.monitorData"
      style="width: 100%">
      <el-table-column
        label="日期"
        width="180">
        <template slot-scope="scope">
          <el-form-item
            style="height: 100%"
            :prop="'monitorData.' + scope.$index + '.date'"
            :rules="monitorForm.monitorRules.date">
            <el-input
              style="height: 100%"
              clearable
              v-model="scope.row.date"
              placeholder="请输入date"/>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        prop="date"
        width="180">
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
  export default {
    data() {
      let validateValue = (rule, value, callback) => {
        //map
        this.callbackObj[rule.fullField] = callback;
        let num = 0;
        this.monitorForm.monitorData.forEach(item => {
          num += parseInt(item);
        });
        console.log(num);
        if (num !== 100) {
          Object.keys(this.callbackObj).forEach(key => {
            this.callbackObj[key](new Error('总和不等于100'));
          })
          // callback(new Error('总和不等于100'));
        } else {
          Object.keys(this.callbackObj).forEach(key => {
            this.callbackObj[key]();
          })
          // callback();
        }
      };
      return {
        callbackObj: {},
        monitorForm: {
          monitorData: [{
            date: '1',
          }, {
            date: '2',
          }, {
            date: '3',
          }],
          monitorRules: {
            date: [
              {required: true, trigger: 'blur', validate: validateValue}
            ],
          }
        }
      }
    },
  }
</script>
<style scoped>
  .el-form-item {
    margin-bottom: 0;
  }

  /deep/.el-form-item__error {
    color: #ED4014;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: relative;
    top: 100%;
    left: 0;
  }
</style>
