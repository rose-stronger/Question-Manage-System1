<template>
  <div class="mt-20" style="background-color: #fff">
    <div class="Administration" v-if="$route.query.id">
      <span>学科管理</span> >
      <span class="span">{{ $route.query.name }}</span> >
      <span>目录管理</span>
      <hr />
    </div>

    <div class="box">
      <el-form ref="form" :model="form" label-width="80px" class="forms">
        <el-form-item label="目录名称">
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
        <el-button size="mini" style="height: 40px" @click="eliminate()"
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
      <div class="back" v-if="$route.query.id">
        <!-- <i class="el-icon-back"></i> -->
        <el-button
          type="text"
          class="el-icon-back"
          @click="$router.push('list')"
          >返回学科</el-button
        >
      </div>
      <el-button
        type="success"
        style="height: 40px"
        class="el-icon-edit right"
        @click="added"
      >
        新增目录</el-button
      >
    </div>
    <catalogueVue
      @tableData="tableData"
      ref="catalogue"
      @modify="modify"
    ></catalogueVue>
    <!-- 新增 -->
    <addDialogVue
      :visible.sync="dialogVisible"
      @OnSuccess="OnSuccess"
      :isShow="isShow"
      :modifyId="modifyId"
    ></addDialogVue>
  </div>
</template>

<script>
import catalogueVue from './component/catalogue.vue'
import addDialogVue from './component/addDialog.vue'
export default {
  name: 'Directorys',
  components: {
    catalogueVue,
    addDialogVue
  },
  data() {
    return {
      form: { searchName: '', region: '' },

      uname: [],

      state: '',
      dialogVisible: false,
      modifyId: 0,
      isShow: false
      // lwx: this.$route.query.name
    }
  },
  methods: {
    tableData(data) {
      this.uname = data
      // this.state = data.state;
    },
    /**
     * 搜索
     */
    search(searchName, region) {
      if (searchName === '' && region === '') {
        return
      }
      if (searchName !== '') {
        if (this.$route.query.id) {
          this.uname.directoryName = searchName
          this.$refs.catalogue.getdate()
        } else {
          this.uname.directoryName = searchName
          this.$refs.catalogue.getList()
        }
      }
      if (region !== '') {
        if (this.$route.query.id) {
          this.uname.state = region
          this.$refs.catalogue.getdate()
        } else {
          this.uname.state = region
          this.$refs.catalogue.getList()
        }
      }
      // if (this.$route.query.id) {
      //   this.uname.directoryName = searchName

      //   this.uname.state = region
      //   this.$refs.catalogue.getdate()
      // } else {
      //   this.uname.directoryName = searchName

      //   this.uname.state = region

      //   this.$refs.catalogue.getList()
      // }
    },
    /**
     * 清除
     */
    eliminate() {
      if (this.form.searchName !== '') {
        if (this.$route.query.id) {
          this.uname.directoryName = ''
          this.form.searchName = ''
          this.$refs.catalogue.getdate()
        } else {
          this.uname.directoryName = ''
          this.form.searchName = ''
          this.$refs.catalogue.getList()
        }
      }
      if (this.form.region !== '') {
        if (this.$route.query.id) {
          this.uname.state = ''
          this.form.region = ''
          this.$refs.catalogue.getdate()
        } else {
          this.uname.state = ''
          this.form.region = ''
          this.$refs.catalogue.getList()
        }
      }
      // console.log(this.uname)

      // this.uname.directoryName = ''
      // this.form.searchName = ''
      // this.uname.state = ''
      // this.form.region = ''
      // if (this.$route.query.id) {
      //   // console.log(this.$route.query.id)
      //   this.$refs.catalogue.getdate()
      // } else {
      //   this.$refs.catalogue.getList()
      // }
    },
    /**
     * 新增
     */
    added() {
      this.dialogVisible = true
      this.isShow = true
    },
    OnSuccess() {
      if (this.$route.query.id) {
        this.$refs.catalogue.getdate()
      } else {
        this.$refs.catalogue.getList()
      }

      this.$message({
        showClose: true,
        message: '添加成功',
        type: 'success'
      })
    },
    /**
     * 修改
     */
    modify(id) {
      this.dialogVisible = true
      this.modifyId = id
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  // margin-top: 20px;
  padding-top: 10px;
  display: flex;
  // align-items: center;
  // .forms {
  //   display: felx;
  // }
  // .option {
  //   float: left;
  // }
  .back {
    position: absolute;
    right: 180px;
  }
  .btn {
    margin-left: 10px;
    position: relative;
    width: 300px;
  }
  .right {
    margin-left: 350px;
    margin-right: 30px;
    line-height: 0px;
  }
}
.Administration {
  padding: 20px;

  color: #606266 !important;
  // margin-left: 10px;
  .span {
    padding: 0 10px;
  }
}
</style>
