<template>
  <div>
    <el-dialog
      title="题目预览"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="50%"
      :before-close="handleClose"
      @open="resetForm"
    >
      <span>
        <div ref="ruleFormRef">
          <el-row :gutter="20">
            <el-col :span="6"
              ><div
                class="grid-content bg-purple"
                label="用户名"
                prop="username"
              >
                【题型】: <span>{{ getObj.questionType }}</span>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                【编号】: <span>{{ getObj.id }}</span>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                【难度】: <span>{{ getObj.difficulty }}</span>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                【标签】: <span>{{ getObj.tags }}</span>
              </div></el-col
            >
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                【学科】: <span>{{ getObj.subjectID }}</span>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                【目录】: <span>{{ getObj.catalogID }}</span>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                【方向】: <span v-html="getObj.direction"></span></div
            ></el-col>
          </el-row>
          <!-- .bt-ccc -->
          <el-row class="bt-ccc">
            <el-col :span="24"
              ><div class="grid-content bg-purple-dark">【题干】:</div></el-col
            >
            <el-col :span="24"
              ><div class="grid-content bg-purple-dark">
                <span v-html="getObj.question"></span></div
            ></el-col>
            <el-row>
              <el-col :span="24"
                ><div class="grid-content bg-purple-dark">
                  <!-- <template #default="{ row }"> -->
                  <!-- {{ transForm(getObj.questionType) }} -->
                  <span>{{ transForm(getObj.questionType) }}</span>
                  选项：（以下选中的选项为正确答案）
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="24"
                ><div class="grid-content bg-purple-dark">
                  <el-radio-group v-model="radio">
                    <el-radio
                      v-for="item in getObj.options"
                      :key="item.id"
                      :label="item.isRight"
                      >{{ item.title }}</el-radio
                    >
                  </el-radio-group>
                </div></el-col
              >
            </el-row>
          </el-row>
          <el-row>
            <el-col :span="24"
              ><div class="grid-content bg-purple-dark">
                【参考答案】:
                <el-button size="mini" type="danger" @click="watchMv()"
                  >视频答案预览</el-button
                >
              </div></el-col
            >
            <el-col :span="24"
              ><div class="grid-content bg-purple-dark">
                <!--   v-if="isShow === true" -->
                <video
                  controls
                  autoplay
                  class="video"
                  ref="dialogVideo"
                  width="352"
                  height="264"
                  :src="getObj.videoURL"
                ></video></div
            ></el-col>

            <el-col :span="24"
              ><div class="grid-content bg-purple-dark">
                【答案解析】<span>{{ getObj.answerID }}</span>
              </div></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="24"
              ><div class="grid-content bg-purple-dark">
                【题目备注】: <span>{{ getObj.remarks }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button class="confirm" type="primary" @click="onConfirm"
          >关闭</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { postAddUser, getUserDetail, putUserEdit } from '@/api/user'
export default {
  props: {
    visible: {
      type: Boolean
    },
    // tableDataList: {
    //   type: Array
    // },
    // isAdd: {
    //   type: Boolean
    // },
    // selId: {
    //   type: Number
    // },
    getObj: {
      type: Object
    }
  },
  data() {
    return {
      // ruleForm: {
      //   username: '',
      //   email: '',
      //   password: '',
      //   role: '',
      //   permission_group_id: null,
      //   phone: '',
      //   introduction: ''
      // },
      // avatar: '',
      // disabled: 1,
      radio: 1,
      isShow: false,

      dialogVisible: false
    }
  },
  methods: {
    resetForm() {
      this.$refs.ruleFormRef.resetFields()
    },
    transForm(type) {
      console.log(type)
      if (type === '1') {
        return '单选'
      } else if (type === '2') {
        return '多选'
      } else {
        return '简答'
      }
    },

    onConfirm() {
      this.isShow = false
      this.$emit('update:visible', false)
    },
    handleClose(done) {
      this.isShow = false
      done()
    }

    // this.$emit('update:visible', false)
  },
  // resetForm() {
  //   this.$refs.ruleForm.resetFields()
  // },
  // async getUserDetailAPI() {
  //   const res = await getUserDetail(this.selId)
  //   // console.log(res);
  //   this.ruleForm = res
  // },
  watchMv() {
    this.isShow = true
    // this.dialogVisible = true
  }
}
// watch: {
//   visible(val) {

//     if (val && !this.isAdd && this.selId) {

//     }
//   }
// }
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  // background: #99a9bf;
}

.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.confirm {
  text-align: center;
  margin-right: 50%;
}
</style>
