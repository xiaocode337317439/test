<template>
  <div>
    <EditerComponent :catch-data="catchData" :content="formContent"
                     @blur.native.capture="checkDataUnique"/>
    <ElButton @click="commit">提交</ElButton>
    <ElButton>{{count}}</ElButton>
    <div>{{msg}}</div>
  </div>
</template>
<script>
  import EditerComponent from './EditerComponent'

  export default {
    data() {
      return {
        formContent: '<ol><li>aaa</li><li>jhkahdkl</li><li>你好</li></ol>',
        tmp: '',
        count: 0,
        msg: '',
      }
    },
    mounted() {
      this.tmp = this.formContent;
    },
    methods: {
      catchData(value) {
        console.log(value);
        this.tmp = value;
        this.count = this.getSimpleText(this.tmp).length;
      },
      //将html标签去除， 统计内容
      getSimpleText(html) {
        //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
        let re1 = new RegExp("<.+?>", "g");
        //执行替换成空字符
        let msg = html.replace(re1, '');
        return msg;
      },
      checkDataUnique() {
        if (this.getSimpleText(this.tmp).length <= 0) {
          this.msg = '要输入内容哦，不能为空';
        } else if (this.getSimpleText(this.tmp).length > 10){
          this.msg = '内容输入的太多了，删除一点吧';
        } else {
          this.msg = '内容输入的满足要求， 可以提交';
        }
      },
      commit() {
        //提交数据
        this.formContent = this.tmp;
        console.log(this.formContent);
      }
    },
    components: {
      EditerComponent
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  #wangeditor {
    width: 50rem;
  }
</style>
