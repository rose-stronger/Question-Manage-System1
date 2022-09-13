<template>
  <div class="box" :key="key">
    <div class="burden">
      <div class="questions">试题录入</div>
      <hr />
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- subjectName 学科 -->
          <el-row>
            <el-form-item label="学科" prop="subjectID">
              <el-select
                v-model="ruleForm.subjectID"
                @change="onSubjectChange"
                placeholder="请选择"
              >
                <!-- 下拉选框 -->
                <el-option
                  v-for="(item, index) in subjectList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>

          <!-- ruleForm.directoryName  目录-->
          <el-row>
            <el-form-item label="目录" prop="catalogID">
              <el-select
                v-model="ruleForm.catalogID"
                placeholder="请选择"
                @change="onDirectoryChange"
              >
                <el-option
                  v-for="(item, index) in directoryList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
                {{ ruleForm.catalogID }}</el-select
              >
            </el-form-item>
          </el-row>
          <!--企业  此处需要单独调接口 然后 接口中 有 数据 和 选择数据 v-model="company" -->
          <el-row>
            <el-form-item label="企业" prop="enterpriseID">
              <el-select
                v-model="ruleForm.enterpriseID"
                placeholder="请选择活动区域"
                @change="onDirectoryChange"
              >
                <el-option
                  v-for="(item, index) in companyList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <!-- 城市 -->
          <el-row>
            <el-col :span="8">
              <el-form-item
                class="city-box"
                label-width="120px"
                prop="province"
                label="城市："
              >
                <el-select
                  class="city-1"
                  v-model="ruleForm.province"
                  placeholder="请选择"
                  @change="onProvinceChange"
                >
                  <el-option
                    v-for="(item, index) in provincesList"
                    :key="index"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
                <el-select
                  class="city-2"
                  v-model="ruleForm.city"
                  placeholder="请选择"
                  @change="onDirectoryChange"
                >
                  <el-option
                    v-for="(v, k, i) in citys"
                    :key="i"
                    :label="v"
                    :value="v"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="方向" prop="direction">
            <el-select
              v-model="ruleForm.direction"
              placeholder="请选择活动区域"
              @change="onDirectoryChange"
            >
              <el-option
                v-for="(item, index) in directionListArr"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <!-- 题型 -->
          <el-row>
            <el-col>
              <el-form-item label-width="120px" label="题型：">
                <el-radio v-model="ruleForm.questionType" label="1"
                  >单选</el-radio
                >
                <el-radio v-model="ruleForm.questionType" label="2"
                  >多选</el-radio
                >
                <el-radio v-model="ruleForm.questionType" label="3"
                  >简答</el-radio
                >
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 难度 -->
          <el-row>
            <el-col>
              <el-form-item label-width="120px" label="难度：">
                <el-radio v-model="ruleForm.difficulty" label="1"
                  >简单</el-radio
                >
                <el-radio v-model="ruleForm.difficulty" label="2"
                  >一般</el-radio
                >
                <el-radio v-model="ruleForm.difficulty" label="3"
                  >困难</el-radio
                >
              </el-form-item>
            </el-col>
          </el-row>
          <!--  题干  富文本111！！！ -->
          <el-form-item
            label="题干"
            prop="question
"
          >
            <quill-editor
              ref="text"
              v-model="ruleForm.question"
              class="editor"
              :options="editorOption"
            />
          </el-form-item>
          <!-- 选项 -->
          <!-- 单选 -->
          <template v-if="ruleForm.questionType === '1'">
            <div v-for="(item, index) in arr" :key="index">
              <el-row v-if="index < 4">
                <el-col>
                  <el-form-item label-width="120px" label="选项：">
                    <el-row>
                      <el-col :span="1">
                        <el-radio :label="index" v-model="radio"
                          >{{ item.code }}：</el-radio
                        >
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.title"></el-input>
                      </el-col>
                      <el-col :span="10">
                        <el-upload
                          class="upload-demo"
                          action="#"
                          multiple
                          :limit="3"
                        >
                          <el-button class="upload_btn">点击上传</el-button>
                        </el-upload>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col>
                <el-button
                  class="add_btn"
                  style="margin-left: 40px; margin-bottom: 20px"
                  type="danger"
                  size="small"
                  @click="addItem"
                  disabled
                  >+增加选项与答案</el-button
                >
              </el-col>
            </el-row>
          </template>
          <!-- 多选 增加不禁用-->
          <template v-if="ruleForm.questionType === '2'">
            <div v-for="(item, index) in arr" :key="index">
              <el-checkbox-group v-model="checkList">
                <el-row v-if="index < questionIndex">
                  <el-col>
                    <el-form-item label-width="120px" label="选项：">
                      <el-row>
                        <el-col :span="1">
                          <el-checkbox :label="index">{{
                            item.code
                          }}</el-checkbox>
                        </el-col>
                        <el-col :span="5">
                          <el-input v-model="item.title"></el-input>
                        </el-col>
                        <el-col :span="10">
                          <el-upload
                            class="upload-demo"
                            action="#"
                            multiple
                            :limit="3"
                          >
                            <el-button class="upload_btn">点击上传</el-button>
                          </el-upload>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-checkbox-group>
            </div>
            <el-row>
              <el-col>
                <el-button
                  style="margin-left: 64px; margin-bottom: 20px"
                  class="add_btn"
                  type="danger"
                  size="small"
                  @click="addItem"
                  >+增加选项与答案</el-button
                >
              </el-col>
            </el-row>
          </template>
          <!-- 解析视频 -->

          <el-row>
            <el-form-item label="解析视频">
              <el-input v-model="ruleForm.videoURL"></el-input>
            </el-form-item>
          </el-row>
          <!--答案解析  富文本22222！！！ -->
          <el-row>
            <el-form-item label="答案解析" prop="answer">
              <quill-editor
                ref="text"
                v-model="ruleForm.answer"
                class="editor"
                :options="editorOption"
              />
            </el-form-item>
          </el-row>
          <!-- 题目备注 -->
          <el-row>
            <el-form-item label="题目备注">
              <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
            </el-form-item>
          </el-row>

          <!-- 题目标签： -->
          <el-row>
            <el-col :span="8">
              <el-form-item label-width="120px" label="题目标签：">
                <el-select
                  v-model="ruleForm.tags"
                  multiple
                  allow-create
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in tagList"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-button @click="onCancel">取 消</el-button> -->
          <!-- 提交按钮  按需切换 -->
          <el-form-item label-width="120px" label="">
            <el-button
              :type="$route.query.id ? 'success ' : 'primary'"
              @click="onClick($event)"
              >{{ $route.query.id ? '确认修改' : '确认提交' }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCompanyList } from '@/api/companys'
import { subjectsSimpleList } from '@/api/subject'
import { directoryNameList } from '@/api/catalogue'
import { getTagsNameList } from '@/api/tags'
import {
  getBasicRandomsDetail,
  questionBankList,
  postBasicRandomsEdit,
  postBasicRandomsAdd
} from '@/api/questionBank'
import { provincesFun, citys } from '@/api/citysData'
import { array } from '@/api/contances'

export default {
  data() {
    return {
      ruleForm: {
        subjectID: '', //学科
        catalogID: '', // 目录
        enterpriseID: '', // 企业
        province: '', //企业所在地省份
        city: '', // 企业所在城市
        direction: '', // 	方向
        questionType: '1', // 题型
        difficulty: '1', //难度
        question: '', // 题干
        // 选项
        options: [],
        videoURL: ' ', // 解析视频
        answer: '', // 答案解析
        remarks: '', //	题目备注
        tags: [] // 试题标签
        // options: [
        //   {
        //     id: null,
        //     questionsID: 35,
        //     code: 'D',
        //     title: '',
        //     img: '',
        //     isRight: 0
        //   },
        //   {
        //     id: null,
        //     questionsID: 35,
        //     code: 'C',
        //     title: '',
        //     img: '',
        //     isRight: 0
        //   },
        //   {
        //     id: null,
        //     questionsID: 35,
        //     code: 'B',
        //     title: '',
        //     img: '',
        //     isRight: 0
        //   },
        //   {
        //     id: null,
        //     questionsID: 35,
        //     code: 'A',
        //     title: '',
        //     img: '',
        //     isRight: 0
        //   }
        // ],
      },
      avatar: '',
      // disabled: 1,

      rules: {
        subjectID: [{ required: true, message: '请选择学科' }],
        catalogID: [{ required: true, message: '请选择目录' }],
        enterpriseID: [{ required: true, message: '请选择企业' }],
        province: [{ required: true, message: '请选择地区' }],
        direction: [{ required: true, message: '请选择方向' }],
        question: [{ required: true, message: '请输入题干' }],
        answer: [{ required: true, message: '请输入答案解析' }],
        videoURL: [{ required: true, message: '请输入解析视频地址' }]
      },
      radio: 2,
      radio_1: 2,
      radio_right: 1,
      content: '',
      editorOption: {},
      isConfirmEditBtn: 1,

      // ruleForm: this.$store.state.jumpGetData.questionsInfo,
      // ruleForm: {},
      tableDataList: {},
      // isNext: null,
      // tableData: null,
      company: '',
      // 学科列表
      subjectList: [],

      directionList: null,
      directionListArr: [
        'o2o',
        '外包服务',
        '企业服务',
        '互联网金融',
        '企业咨询',
        '互联网',
        '电子商务',
        '其他'
      ],
      isNext: null,
      /**
       * 存储企业的选项 [{label: value:},{}] no
       * 企业列表
       */
      companyList: [],

      citysList: [], // 地区
      multiValue: [], // 标签[]
      // ruleForm.tags
      optionsArr: [],
      questionType_1: null,
      difficulty_1: null,
      // 二级目录列表
      directoryList: [],

      /**
       * 完善功能
       */
      // 复选框列表
      checkList: [],
      // 单选
      radio: '',
      // 选项存储的index
      questionIndex: 4,
      // 存储选项的数组
      // arr: array

      // getObj: {}
      // 完善
      key: 1,

      // 标签列表
      tagList: [],
      // 存储选项的数组
      arr: array,
      // 区域列表
      citys: [],
      provincesList: provincesFun() // 城市列表
      // tagsList: [] //标签列表
    }
  },
  methods: {
    /**
     * 地区赋值给本地
     */
    onProvinceChange(val) {
      // 获取地区赋值给本地
      // this.citysList = citys(this.ruleForm.province)
      this.ruleForm.city = ''
      this.citys = citys(val)
    },
    /**
     * 在此 调取接口 获取 radio下拉选框 把radio 转为数字型
     *
     */

    //  此处 是 添加录入  在后面要submit被调用 如果是新 录入 则调用onConfirm
    async onConfirm() {
      // 标签转字符串
      console.log('-------------标签转字符串---------')
      console.log(this.ruleForm.tags)
      this.ruleForm.tags = this.ruleForm.tags.join(',')
      // 试题选项操作 处理数据
      switch (this.ruleForm.questionType) {
        // 单选
        case '1':
          /**
           *arr 中 每一个对象 截取0 1 2 3 构成四个选项 {
    code: 'B', // 代码
    title: '', // 标题
    img: '', // 图片URL
    isRight: false // 是否正确答案 true/false
  },
           */
          const optionArr = this.arr.slice(0, 4)
          // 判断是否默认勾选 radio=1
          optionArr.forEach((item, index) => {
            if (index === this.radio) {
              item.isRight = true
            } else {
              item.isRight = false
            }
          })
          this.ruleForm.options = optionArr
          break

        // 多选的情况
        case '2':
          const arr = this.arr.slice(0, this.questionIndex)
          // 判断默认勾选
          for (let i = 0; i < arr.length; i++) {
            // 复选框列表
            console.log(this.checkList)
            this.checkList.forEach((item) => {
              if (i === item) {
                arr[i].isRight = true
              }
            })
          }
          this.ruleForm.options = arr
          break
      }
      const data = await postBasicRandomsAdd(this.ruleForm)
      this.$router.push('/questions/list')

      // if (this.$route.query.id) {
      //   await postBasicRandomsEdit(this.$route.query.id, this.ruleForm)
      //   this.$message.success('修改信息成功！！！')
      //   this.$router.push('/questions/list')
      //   // this.getCompanyListAPI()
      //   console.log(this.ruleForm)

      // } else {
      //   console.log(this.ruleForm)
      //   const res = await postBasicRandomsAdd(this.ruleForm)
      //   this.$message.success('添加信息成功！！！')
      //   //  在此 应该重新刷新列表  并跳转至 基础题库
      //   this.$router.push('/questions/list')

      // }
    },

    /**
     * 调企业的接口
     * 获取企业列表
     */
    async getCompanyListAPI() {
      const res = await getCompanyList({
        page: 1,
        pagesize: 10000
      })
      console.log(res)
      res.items.forEach((item) => {
        this.companyList.push({
          value: item.id,
          label: item.company
        })
      })

      console.log(this.companyList)

      // 做一个判断

      // if (this.$route.query.id) {
      //   this.tableData.forEach((item) => {
      //     if (item.id === this.ruleForm.enterpriseID) {
      //       this.company = item.company
      //       console.log(this.company)
      //     }
      //   })
      // }
      /**
       * 公司的下拉选项
       */
      // this.tableData.forEach((item) => {
      //   this.companyList.push({
      //     value: item.id,
      //     label: item.company
      //   })
      // })

      // 去重
      // this.companyList = Array.from(new Set(this.companyList))
    },
    // 获取学科列表
    async subjectsSimpleListAPI() {
      const res = await subjectsSimpleList()
      console.log(res)
      this.subjectList = res
      console.log(this.subjectList)
    },
    // 学科选择框发生变化后  触发的函数
    async onSubjectChange(val) {
      this.ruleForm.tags = null
      this.ruleForm.catalogID = null
      const res = await directoryNameList({ subjectID: val })
      this.directoryList = res
      this.tagList = []
    },
    // 获取标签列表
    async getTagList() {
      const res = await getTagsNameList({
        subjectID: this.ruleForm.subjectID
      })

      if (res.length) {
        // this.tagList = res.items
        this.tagList = res
      } else {
        this.tagList = []
      }
      console.log('------------tagList------------')

      console.log(this.tagList)
    },
    // 目录选择框发生变化后触发的函数
    onDirectoryChange(val) {
      // 获取标签
      this.getTagList()
    },
    // 获取目录
    // async directoryListAPI() {
    //   const res = await directoryNameList({
    //    subjectID: this.ruleForm.subjectID
    //   })
    //   this.directoryList = res.items
    //   console.log(this.directionList)
    // },

    // async getTagsNameListAPI() {
    //   const res = await getTagsNameList({
    //     subjectID: 1
    //   })

    //   if (res.length) {
    //     this.tagsList = res
    //     console.log('-------')
    //   } else {
    //     this.tagsList = []
    //   }

    //   console.log(this.tagsList)
    //   console.log(this.ruleForm)

    // },
    // 获取 方向 其实是  固定值
    // async questionBankListAPI() {
    //   const { items } = await questionBankList({})
    //   this.directionList = items
    //   console.log(this.directionList)
    //   this.directionList.forEach((element) => {
    //     // console.log(element)
    //     // console.log(element.direction)
    //     this.directionListArr.push(element.direction)
    //   })
    //   this.directionListArr = Array.from(new Set(this.directionListArr))
    //   console.log(this.directionListArr)
    // },

    // 获取 基础题库详情 111
    async getBasicRandomsDetailAPI() {
      if (this.$route.query.id) {
        const res = await getBasicRandomsDetail(
          this.$route.query.id,
          this.isNext
        )
        console.log(res)
        this.ruleForm = res
        // 标签改为数组
        console.log(res.tags)
        // 有时 会 tags null
        this.ruleForm.tags = res.tags.split(',')
        // 选项个数
        this.questionIndex = this.ruleForm.options.length
        // ？？？？？？？？？？？？？？？？？？
        // 重新加载添加按钮所需的容器
        const array1 = array
        // 对添加按钮的数据进行处理
        const newArr = array1.splice(+this.ruleForm.options.length)
        this.arr = this.ruleForm.options.concat(newArr)
        // 开始获取目录 ????????????????????????
        const data = await directoryNameList({
          // subjectID: ''
          subjectID: this.ruleForm.subjectID
        })
        console.log(' ------------this.directoryList--------------')
        console.log(data)
        console.log(data.length)
        if (data.length) {
          this.directoryList = data
        } else {
          this.directoryList = []
        }

        console.log('------------ this.directoryList------------')
        console.log(this.directoryList)
        switch (this.ruleForm.questionType) {
          // 单选
          case '1':
            this.ruleForm.options.forEach((item, index) => {
              if (item.isRight === 1) {
                // 如果为1  让radio 赋值为 index
                this.radio = index
              }
            })
            break
          // 多选
          case '2':
            this.ruleForm.options.forEach((item, index) => {
              if (item.isRight === 1) {
                this.checkList.push(index)
              }
            })
            break
        }
      }
    },
    addItem() {
      if (this.questionIndex > 25) {
        return
      }
      this.questionIndex++
    },
    onClick(e) {
      console.log(e)
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (!valid) {
          return false
        } else {
          switch (e.target.innerText) {
            case '确认提交':
              this.onConfirm()
              this.$message.success('添加成功')
              break

            case '确认修改':
              // 标签转字符串
              this.ruleForm.tags = this.ruleForm.tags.join(',')
              // 试题选项操作 处理数据
              switch (this.ruleForm.questionType) {
                // 单选
                case '1':
                  const optionArr = this.arr.slice(0, 4)
                  // 判断谁是默认勾选
                  optionArr.forEach((item, index) => {
                    if (index === this.radio) {
                      item.isRight = true
                    } else {
                      item.isRight = false
                    }
                  })
                  this.ruleForm.options = optionArr.reverse()
                  break

                // 多选的情况
                case '2':
                  const arr = this.arr.slice(0, this.questionIndex)
                  // 判断默认勾选
                  for (let i = 0; i < arr.length; i++) {
                    this.checkList.forEach((item) => {
                      if (i === item) {
                        arr[i].isRight = true
                      }
                    })
                  }
                  this.ruleForm.options = arr.reverse()
                  break
              }
              const data = await postBasicRandomsEdit(
                this.$route.query.id,
                this.ruleForm
              )
              console.log(data)
              this.$message.success('修改成功')
              break
          }
          this.$router.push('/questions/list')
        }
      })
    }
  },
  created() {
    if (this.$route.query.id) {
    }
    // this.date = Date.now()
    // // 获取题目详情
    this.getBasicRandomsDetailAPI()
    // 获取企业列表
    this.getCompanyListAPI()
    // 获取学科列表
    this.subjectsSimpleListAPI()
    // 获取标签列表
    // this.getTagList()
  },
  computed: {},

  // 侦听器
  // watch: {
  //   // 根据情况 $route.query 可以换成 $route.params
  //   '$route.query.id': {
  //     immediate: true, // 第一次的数据，也要当做是一种变化
  //     deep: true,

  //     // 处理函数（不能修改名字） handler('新的值'，'旧的值')
  //     handler(new_value, old_value) {
  //       console.log(new_value)
  //       // console.log(old_value)
  //       // 执行代码部分
  //       if (new_value) {
  //         // this.getCompanyListAPI()
  //         this.subjectsSimpleListAPI()
  //         this.directoryListAPI()
  //         this.getTagsNameListAPI()
  //         this.questionBankListAPI()
  //         this.getBasicRandomsDetailAPI()
  //       } else {
  //         console.log('什么也不要做')
  //         // this.getCompanyListAPI()
  //         this.subjectsSimpleListAPI()
  //         this.directoryListAPI()
  //         this.getTagsNameListAPI()
  //         this.questionBankListAPI()
  //         this.isConfirmEditBtn = 0

  //         this.$refs.ruleForm.resetFields()
  //       }
  //     }
  //   }
  // }
  watch: {
    '$route.query.id'() {
      // ++this.key
      //  在history记录中前进或者后退val步，当val为0时刷新当前页面。
      this.$router.go(0)
      this.getBasicRandomsDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 20px;
  background-color: #eff1f4;
  .burden {
    background-color: #fff;
    .questions {
      padding: 10px;
    }
  }
}
.options_a {
  display: block;
  margin-top: 10px;
}
</style>
