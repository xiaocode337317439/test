<template>
  <el-dialog
    :title="editType === 'edit' ? '编辑分组' : '新增分组'"
    :visible.sync="dialogModalShow"
    @close="closeDialog"
    width="600px"
  >
    <o-form
      ref="form"
      label-width="150"
      :form-value.sync="dialogForm"
      :form-list="editFormList"
      not-ctrl
    ></o-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
  </el-dialog>
</template>
<script>
  export default {
    name: 'DialogComponent',
    data() {
      return {
        dialogModalShow: false,
        dialogForm: {}
      }
    },
    props: {
      editFormList: {},
      editType: {},
      //这个要特殊处理，不然父组件改变会影响这个值，会报警告
      form: {},
      hide: {},
      //这个要特殊处理，不然父组件改变会影响这个值，会报警告
      modalShow: false,
      save: {},
      close: {}
    },
    watch: {
      modalShow (newValue, oldValue) {
        this.dialogModalShow = newValue
      },
      form (newValue, oldValue) {
        this.dialogForm = newValue
      }
    },
    methods: {
      closeDialog () {
        //回调
        this.close()
      }
    }
  }
</script>
