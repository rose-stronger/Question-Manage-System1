<template>
  <div class="mt-20" style="background-color: #fff">
    <div class="box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="学科名称">
          <el-input
            v-model="subjectName"
            style="width: 300px,height: 40px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button size="mini" style="height: 40px" @click="eliminate()"
          >清除</el-button
        >
        <el-button
          type="primary"
          size="mini"
          style="height: 40px"
          @click="search(subjectName)"
          >搜索</el-button
        >
      </div>
      <el-button
        type="success"
        style="height: 40px"
        class="el-icon-edit right"
        @click="added"
      >
        新增学科</el-button
      >
    </div>
    <subjectData
      ref="list"
      @famgfa="famgfa"
      :dialogVisible="dialogVisible"
      @modify="modify"
    ></subjectData>
    <dialogSubjectVue
      :visible.sync="dialogVisible"
      @OnSuccess="OnSuccess"
      :isShow="isShow"
      :modifyId="modifyId"
    ></dialogSubjectVue>
  </div>
</template>

<script>
import subjectData from './conponent/subjectData.vue'
import dialogSubjectVue from './conponent/dialogSubject.vue'
export default {
  name: 'subjectVue',
  components: {
    subjectData,
    dialogSubjectVue
  },
  data() {
    return {
      form: {},
      subjectName: '',
      query: {},
      dialogVisible: false,
      modifyId: 0,
      isShow: false
    }
  },
  methods: {
    /**
     * 搜索
     */
    search(subjectName) {
      this.query.subjectName = subjectName

      // this.$refs.list.classification()
      // this.$route.query.name = subjectName
      this.$refs.list.getlist()
    },
    /**
     * 清除
     */
    eliminate() {
      this.query.subjectName = ''
      this.subjectName = ''
      // this.query = {};
      this.$nextTick(() => {
        this.$refs.list.getlist()
      })
    },
    /**
     * 获取子组件列表数据
     */
    famgfa(query) {
      this.query = query
    },
    /**
     *新增
     */
    added() {
      this.dialogVisible = true
      this.isShow = true
    },
    /**
     * 修改
     */
    modify(id) {
      this.dialogVisible = true
      this.modifyId = id
      this.isShow = false
      // console.log(this.modifyId);
    },

    /**
     * 更新dialogSubjectVue新增
     */
    OnSuccess() {
      this.$refs.list.getlist()
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  // margin-top: 20px;
  padding-top: 20px;
  display: flex;
  // align-items: center;

  .btn {
    margin-left: 10px;
  }
  .right {
    margin-left: 780px;
    line-height: 0px;
  }
}
</style>
