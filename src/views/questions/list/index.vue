<template>
  <div class="box">
    <div class="btn">
      <el-button type="success" class="el-icon-edit">
        <span @click="$router.push('/questions/new')">新增试题</span>
      </el-button>
    </div>
    <div class="package">
      <el-form ref="form" :model="form" label-width="80px" class="form">
        <!--  搜索 第一个数据 -->
        <el-form-item label="学科" class="item" prop="subject">
          <el-select v-model="form.subject" placeholder="请选择">
            <el-option
              v-for="item in dataList"
              :key="item.id"
              :label="item.subject"
              :value="item.subject"
            ></el-option>
          </el-select>
        </el-form-item>

        <!--搜索 第二个数据 -->
        <el-form-item label="录入人" class="item" prop="creator">
          <el-select v-model="form.creator" placeholder="请选择">
            <!--  :value="item.creatorID" -->
            <el-option
              v-for="item in dataList"
              :key="item.id"
              :label="item.creator"
              :value="item.creator"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button size="mini" @click="clear">清除</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="search(form.subject, form.creator)"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <tableVue></tableVue>
  </div>
</template>

<script>
import tableVue from './component/table.vue'
import { questionBankList } from '@/api/questionBank'
export default {
  name: 'listVue',
  components: { tableVue },
  data() {
    return {
      form: {
        // page: 1,
        // pagesize: 10,

        subject: '',
        creator: ''
      },

      query: {
        pagesize: 10,
        page: 1,
        creator: '',
        subject: ''
      },
      dataList: []
    }
  },
  methods: {
    newlyAdded() {
      // this.$router.push("addTit");
    },
    async questionBankListAPI() {
      const { items, counts } = await questionBankList(this.query)
      // console.log(res)
      this.dataList = items
      // this.form = items
    },
    search(sub, creator) {
      // console.log(sub, creator)
      // { creator: this.form.creator, subject: this.form.subject }
      this.query.creator = creator
      this.query.subject = sub

      this.questionBankListAPI()
    },
    /**
     * 清除
     */
    clear() {
      this.query.subject = ''
      this.query.creator = ''
      this.form = {
        // page: 1,
        // pagesize: 10,

        subject: '',
        creator: ''
      }
      this.questionBankListAPI()
    }
  },
  created() {
    this.questionBankListAPI()
  }
}
</script>

<style lang="scss" scoped>
.box {
  // display: flex;
  margin: 10px;
  padding: 10px;
  background-color: #fff;
  .btn {
    text-align: right;
    span {
      margin-left: 5px;
    }
  }
  .package {
    margin: 20px 0;
    // display: flex;
    // justify-content: space-between;
    // flex-wrap: wrap;
    .form {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .item {
        // width:% !important;
        flex: 25%;
        // display: flex;
        // justify-content: space-around;
        // margin-right: 50px;
        .input {
          width: 210px;
        }
        .city {
          width: 50%;
          // width: 100%;
        }
      }
    }
  }
}
</style>
