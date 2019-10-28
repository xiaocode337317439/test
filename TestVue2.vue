<template>
  <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
    <el-form-item
      label="年龄">
      <el-select
        v-model="form.value"
        multiple
        filterable
        remote
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="form.loading">
        <el-option
          v-for="item in form.options"
          :key="item.value"
          :label="item.label | formatLabel"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data() {
      return {
        defaultSelect: [
          "Alaska",
          "Michigan"
        ],
        form: {
          options: [],
          value: [],
          list: [],
          loading: false,
          states: ["Alabama", "Alaska", "Arizona",
            "Arkansas", "California", "Colorado",
            "Connecticut", "Delaware", "Florida",
            "Georgia", "Hawaii", "Idaho", "Illinois",
            "Indiana", "Iowa", "Kansas", "Kentucky",
            "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota",
            "Mississippi", "Missouri", "Montana",
            "Nebraska", "Nevada", "New Hampshire",
            "New Jersey", "New Mexico", "New York",
            "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania",
            "Rhode Island", "South Carolina",
            "South Dakota", "Tennessee", "Texas",
            "Utah", "Vermont", "Virginia",
            "Washington", "West Virginia", "Wisconsin",
            "Wyoming"]
        }
      };
    },
    mounted() {
      this.form.list = this.form.states.map(item => {
        return {value: item, label: item};
      });
      this.form.value = this.defaultSelect.map((value, index, arr)=>{
        return this.$options.filters['formatLabel'](value)
      })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let newFormValue = this.form.value.map((value, index, arr)=>{
              if (value.indexOf("工号(") !== -1 ) {
                return value.replace("工号(", "").replace(")", "")
              }
              return value
            })
            console.log(this.form, newFormValue)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      remoteMethod(query) {
        if (query !== '') {
          this.form.loading = true;
          setTimeout(() => {
            this.form.loading = false;
            this.form.options = this.form.list.filter(item => {
              return item.value.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.form.options = [];
        }
      },
    },
    filters: {
      formatLabel(val) {
        return `工号(${val})`
      }
    }
  }
</script>
