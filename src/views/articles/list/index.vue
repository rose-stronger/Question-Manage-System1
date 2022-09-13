<template>
  <div class="mt-20" style="background-color: #fff">
    <div class="box">
      <el-form ref="form" :model="form" label-width="80px" class="forms">
        <el-form-item label="关键字">
          <el-input
            v-model="form.searchName"
            style="width: 300px,height: 40px"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="80px" class="forms">
        <el-form-item label="状态" class="option">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button
          size="mini"
          style="height: 40px"
          @click="eliminate(searchName, region)"
          >清除</el-button
        >
        <el-button
          type="primary"
          size="mini"
          style="height: 40px"
          @click="search(form.searchName, form.region)"
          >搜索</el-button
        >
      </div>
      <el-button
        type="success"
        style="height: 40px"
        class="el-icon-edit right"
        @click="added"
      >
        新增技巧</el-button
      >
    </div>
    <!-- form表单 -->
    <articlesFormVue
      v-if="fangfa"
      @modify="modify"
      ref="list"
      @preview="preview"
      @fangfa="fangfa"
    ></articlesFormVue>

    <!--dialog  -->
    <dialogArticlesVue
      :visible.sync="dialogVisible"
      :isshow="isshow"
      :modifyId="modifyId"
      @onSuccess="onSuccess"
    ></dialogArticlesVue>

    <!-- 预览 -->
    <previewformVue
      v-if="previewId"
      :visible.sync="previewdialogVisible"
      :previewId="previewId"
      @previewform="previewform"
    ></previewformVue>
  </div>
</template>

<script>
import articlesFormVue from './component/articlesform.vue'
import dialogArticlesVue from './component/dialogArticles.vue'
import previewformVue from './component/previewform.vue'
export default {
  name: 'articlesVue',
  components: {
    articlesFormVue,
    dialogArticlesVue,
    previewformVue
  },
  data() {
    return {
      form: { searchName: '', region: '' },

      dialogVisible: false,
      modifyId: null,
      isshow: false,
      query: {},
      previewId: null,
      previewdialogVisible: false
    }
  },
  created() {
    // this.modify()
  },
  methods: {
    fangfa(query) {
      this.query = query
    },
    /**
     * 新增
     */
    added() {
      this.dialogVisible = true
      this.isshow = true
    },
    /**
     * 修改
     */
    modify(id) {
      this.dialogVisible = true
      this.isshow = false
      this.modifyId = id
      console.log(this.modifyId)
    },
    /**
     * 预览
     */
    preview(id) {
      this.previewdialogVisible = true
      this.previewId = id
    },
    onSuccess() {
      this.$refs.list.getList()
      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },
    previewform() {
      this.$refs.list.getList()
    },
    /**
     * 搜索
     */
    search(searchName, region) {
      if (searchName === '' && region === '') {
        return
      }
      if (searchName !== '') {
        this.query.keyword = searchName
      } else if (region !== '') {
        this.query.state = region
      }

      this.$refs.list.getList()
    },
    /**
     * 清空
     */
    eliminate(searchName, region) {
      // console.log(this.query)
      // console.log(this.query == true)
      // console.log(this.query === true)
      if (searchName !== '') {
        this.query.keyword = ''
        searchName = ''
        this.$refs.list.getList()
      }
      if (region !== '') {
        this.query.state = ''
        region = ''
        this.$refs.list.getList()
      }
      // if (region !== '' || searchName !== '') {
      //   this.query.keyword = ''
      //   searchName = ''
      //   this.query.state = ''
      //   region = ''
      //   this.$refs.list.getList()
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  padding-top: 20px;
  display: flex;

  .btn {
    margin-left: 10px;
    width: 300px;
  }
  .right {
    margin-left: 350px;
    margin-right: 30px;
    line-height: 0px;
  }
}
</style>
