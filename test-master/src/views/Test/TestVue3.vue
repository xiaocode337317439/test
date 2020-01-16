<template>
  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="50px" class="demo-dynamic">
    <el-table
      :data="dynamicValidateForm.domains"
      stripe
      style="width: 100%">
      <el-table-column
        label="A属性">
        <template slot-scope="scope">
          <el-form-item
            label="A"
            :key="scope.row.index"
            :prop="'domains.' + scope.row.index + '.A'"
            :rules="{
              required: true, message: 'A输入不能为空', trigger: 'blur'
            }"
          >
            <el-input v-model="scope.row.A"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        label="B属性">
        <template slot-scope="scope">
          <el-form-item
            label="B"
            :key="scope.row.index"
            :prop="'domains.' + scope.row.index + '.B'"
            :rules="{
              required: true, message: 'B输入不能为空', trigger: 'blur'
            }"
          >
            <el-input v-model="scope.row.B"></el-input>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column
        label="C属性">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.C"
            placeholder="请选择"
            @change="val => selectChange(val, scope.row)">
            <el-option
              v-for="item in ['是', '否']"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click.prevent="removeDomain(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 100px;" v-if="dynamicValidateForm.domains.filter(item => item.C === '是').length > 0">
      <h1>这里是添加额外属性：D、E、F</h1>
      <el-table
        :data="dynamicValidateForm.domains.filter(item => item.C === '是')"
        stripe
        style="width: 100%">
        <el-table-column
          label="D属性">
          <template slot-scope="scope">
            <!--上面的data虽然是过滤数据， 但是我们还是在原始数据里面去取值-->
            <el-form-item
              label="D"
              :key="scope.row.index"
              :prop="'domains.' + scope.row.index + '.D'"
              :rules="{
                required: true, message: 'D输入不能为空', trigger: 'blur'
              }"
            >
              <el-input v-model="scope.row.D"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="E属性">
          <template slot-scope="scope">
            <el-form-item
              label="E"
              :key="scope.row.index"
              :prop="'domains.' + scope.row.index + '.E'"
              :rules="{
                required: true, message: 'E输入不能为空', trigger: 'blur'
              }"
            >
              <el-input v-model="scope.row.E"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="F属性">
          <template slot-scope="scope">
            <el-form-item
              label="F"
              :key="scope.row.index"
              :prop="'domains.' + scope.row.index + '.F'"
              :rules="rules.F_Number"
            >
              <!--这里要注意 v-model.number-->
              <el-input v-model.number="scope.row.F"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
      <el-button @click="addDomain">新增输入</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      let validateNumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('F输入不能为空'));
        } else if (parseInt(value) && parseInt(value) > 0) {
          callback();
        } else {
          callback(new Error('输入正确数字'));
        }
      };

      return {
        dynamicValidateForm: {
          domains: [],
        },
        rules: {
          F_Number: [
            {validator: validateNumber, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message.success('数据验证通过');
            console.log('提交的数据', this.dynamicValidateForm.domains)
          } else {
            this.$message.error('数据验证不通过');
            return false;
          }
        });
      },
      removeDomain(item) {
        let index = this.dynamicValidateForm.domains.indexOf(item);
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
        //注意这里更新index 属性
        this.addIndex();
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          A: '',
          B: '',
          C: '',//选择属性
          D: '',
          E: '',
          F: 0,//相加100属性
        });
        //注意这里添加index 属性
        this.addIndex();
      },
      addIndex() {
        //注意这里添加index 属性
        this.dynamicValidateForm.domains = this.dynamicValidateForm.domains.map((item, index) => {
          return {
            ...item,
            index: index
          }
        })
      },
      selectChange(val, row) {
        //如果是选择的 否， 清除d、e、f的输入
        console.log('查看数据的index', row.index);
        row.D = '';
        row.E = '';
        row.F = '';
      },
      numberBlur(el, row) {
        console.log('numberBlur', row);
        //验证另外的数字输入
        // let num = this.$refs['dynamicValidateForm'].validateField('domains.0.F', (rule, value, callback) => {
        //   debugger
        //   console.log(rule);
        // });
      }
    }
  }
</script>

<style scoped>
  /deep/ .el-form-item {
    margin-bottom: 0;
  }

  /deep/ .el-form-item__error {
    color: #ED4014;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: relative;
    top: 100%;
    left: 0;
    text-align: left;
  }
</style>
