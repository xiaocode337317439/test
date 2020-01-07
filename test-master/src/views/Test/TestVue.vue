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
            :prop="'monitorData.' + scope.$index + '.date'"
            :rules="monitorForm.monitorRules.date">
            <el-input
              class="light-blue-theme"
              clearable
              v-model="scope.row.date"
              placeholder="请输入date"/>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        monitorForm: {
          monitorData: [{
            date: '2016-05-02',
          }, {
            date: '2016-05-04',
          }, {
            date: '2016-05-01',
          }],
          monitorRules: {
            date: [
              { required: true, message: 'date不能为空', trigger: 'blur' }
            ],
            // type: [
            //   { required: true, message: '品牌名称不能为空', trigger: 'blur' }
            // ],
            // height: [
            //   { required: true, message: '高度不能为空', trigger: 'blur' }
            // ]
          }
        }
      }
    },
  }
</script>
