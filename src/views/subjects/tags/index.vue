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
        <el-form-item label="标签名称">
          <el-input
            v-model="tagName"
            style="width: 300px,height: 40px"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="80px" class="forms">
        <el-form-item label="状态" class="option">
          <el-select v-model="region" placeholder="请选择">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button size="mini" style="height: 40px" @click="eliminate"
          >清除</el-button
        >
        <el-button
          type="primary"
          size="mini"
          style="height: 40px"
          @click="search(tagName, region)"
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
        新增标签</el-button
      >
    </div>
    <tagsformVue
      ref="list"
      @tableData="tableData"
      @modify="modify"
    ></tagsformVue>
    <DialogtagsVue
      :visible.sync="dialogVisible"
      :isshow="isshow"
      :modifyId="modifyId"
      @onSuccess="onSuccess"
    ></DialogtagsVue>
  </div>
</template>

<script>
import tagsformVue from './component/tagsform.vue'
import DialogtagsVue from './component/Dialogtags.vue'
import { getTagsList } from '@/api/tags'
export default {
  name: 'tagsVue',
  components: {
    tagsformVue,
    DialogtagsVue
  },
  data() {
    return {
      form: {},
      tagName: '',
      region: '',
      query: {},
      dialogVisible: false,
      modifyId: null,
      isshow: false
      // querytags: {
      //   page: 1,
      //   pagesize: 10,
      //   state: null,
      //   tagName: 1,
      //   subjectID: null
      // }
    }
  },
  methods: {
    tableData(query) {
      this.query = query
    },
    /**
     * 搜索
     */
    search(tagName, region) {
      if (tagName === '' && region === '') {
        return
      }
      if (tagName !== '') {
        if (this.$route.query.id) {
          this.query.tagName = tagName
          this.$refs.list.getData()
        } else {
          this.query.tagName = tagName
          this.$refs.list.getList()
        }
      }
      if (region !== '') {
        if (this.$route.query.id) {
          this.query.state = region
          this.$refs.list.getData()
        } else {
          this.query.state = region
          this.$refs.list.getList()
        }
      }
      // console.log('+++')
      // this.query.tagName = tagName
      // this.query.state = region
      // this.$refs.list.getList()
      // console.log('list')
      // if (this.$route.query.id) {
      //   this.query.tagName = searchName
      //   this.query.state = region
      //   this.$refs.list.getData()
      //   console.log('data')
      // } else {
      //   this.query.tagName = searchName
      //   this.query.state = region
      // console.log(this.$router.options.routes)
      // this.$refs.list.getList()
      //   console.log('list')
      // }
      // this.query.tagName = searchName
      // this.query.state = region
      // this.$refs.list.sousu()
    },
    /**
     * 清除
     */
    eliminate() {
      // if (this.tagName !== '' && this.region !== '') {
      //   return
      // }
      if (this.tagName !== '') {
        if (this.$route.query.id) {
          this.query.tagName = ''
          this.tagName = ''
          this.$refs.list.getData()
        } else {
          this.query.tagName = ''
          this.tagName = ''
          this.$refs.list.getList()
        }
      }
      if (this.region !== '') {
        if (this.$route.query.id) {
          this.region = ''
          this.query.state = ''
          this.$refs.list.getData()
        } else {
          this.region = ''
          this.query.state = ''
          this.$refs.list.getList()
        }
      }
      // this.tagName = ''
      // this.query.tagName = ''
      // this.region = ''
      // this.query.state = ''

      // this.$refs.list.sousu()
      // this.$refs.list.getList()
      // if (this.$route.query.id) {
      //   this.$refs.list.getData()
      //   // this.$refs.list.getList()
      //   console.log('***')
      // } else {
      //   this.$refs.list.getList()
      //   console.log('22222')
      // }
      // this.$refs.list.sousu()
      // if (this.$route.query.id) {
      //   this.$refs.list.getData()
      // } else {
      //   this.$refs.list.getList()
      // }
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
      this.modifyId = id
      this.dialogVisible = true
      this.isshow = false
    },
    /**
     * 确定
     */
    onSuccess() {
      if (this.$route.query.id) {
        this.$refs.list.getData()
      } else {
        this.$refs.list.getList()
      }

      this.$message({
        showClose: true,
        message: '添加成功',
        type: 'success'
      })
    }
  }
  // watch: {
  //   $route: {
  //     handler() {
  //       if (this.$route.query.id) {
  //         this.search()
  //         this.eliminate()
  //         this.$refs.list.getData()
  //       } else {
  //         this.search()
  //         this.eliminate()
  //         this.$refs.list.getList()
  //       }
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.box {
  // margin-top: 20px;
  padding-top: 20px;
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
