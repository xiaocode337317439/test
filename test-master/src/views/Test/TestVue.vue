<template>
  <el-cascader
    v-model="valueModel"
    :options="options"
    :props="{ multiple: true }"
    @change="handleChange"
    collapse-tags
    clearable>
  </el-cascader>
</template>

<script>
  export default {
    data() {
      return {
        valueModel: [],
        options: [
          {
            value: 'zhinan',
            label: '指南',
            children: [
              {
                value: 'shejiyuanze',
                label: '设计原则',
              }, {
                value: 'daohang',
                label: '导航',
              }
            ]
          }, {
            value: 'ziyuan',
            label: '资源',
            children: [
              {
                value: 'axure',
                label: 'Axure Components'
              }, {
                value: 'sketch',
                label: 'Sketch Templates'
              }, {
                value: 'jiaohu',
                label: '组件交互文档'
              }
            ]
          }
        ]
      };
    },
    mounted() {
      this.options.unshift({
        value: '',
        label: '全部'
      })
      this.valueModel = ['']
      this.last = true //初始化选中
    },
    methods: {
      handleChange(value) {
        const find = value.find(v => v.length === 1 && v[0] === '')
        const curr = !!find //等价 find ? true : false
        let copy;

        const update = (last) => {
          //更新last
          this.last = last
          //由于this.valueModel.shift() 不能导致页面刷新，以下方法重新赋值
          copy = JSON.parse(JSON.stringify(this.valueModel))
          this.valueModel = []
          this.$nextTick(() => {
            this.valueModel = copy
            console.log(this.valueModel);
          })
        }

        if (this.last) {
          if (curr) {
            //如果上次选中，这次选中，代表点击的其它
            this.valueModel.shift()
            update(false)
          } else {
            //如果上次选中,这次没选中，代表点击的全选
            this.valueModel = ['']
            update(true)
          }
        } else {
          if (curr) {
            //如果上次没选中，这次选中，代表点击的全选
            this.valueModel = ['']
            update(true)
          } else {
            //如果上次没选中，这次没选中，代表点击的其它
            //不操作
            update(false)
          }
        }
        //console.log(this.valueModel);  这里直接取值可能会有误差，因为数据在update的$nextTick 方法才被修改完成
        //console.log(copy);             如果要取值，使用copy的值
      }
    }
  }
</script>
