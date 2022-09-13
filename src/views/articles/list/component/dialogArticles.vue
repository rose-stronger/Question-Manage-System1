<template>
  <div>
    <el-dialog
      :title="isshow ? '新增' : '修改'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="80%"
      @closed="closed"
    >
      <el-form ref="form" :model="ruleForm" :rules="rules" label-width="120px">
        <el-form-item label="文章标题:" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章内容:" prop="articleBody">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:"
            name="file"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeUpload"
            id="quill-upload"
          >
          </el-upload>
          <!--富文本编辑器组件-->
          <el-row v-loading="quillUpdateImg">
            <quill-editor
              v-model="ruleForm.articleBody"
              ref="myQuillEditor"
              :options="editorOption"
              @change="onEditorChange($event)"
              @ready="onEditorReady($event)"
            >
            </quill-editor>
          </el-row>
        </el-form-item>
        <el-form-item label="视频地址:" prop="videoURL">
          <el-input v-model="ruleForm.videoURL"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addedArticleList,
  detailsArticleList,
  editArticleList
} from '@/api/interview'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  //['blockquote', 'code-block'],                      //引用，代码块
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction
  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ['image'],
  ['clean']
]

export default {
  name: 'dialogArticlesVue',
  props: {
    visible: Boolean,
    isshow: Boolean,
    modifyId: Number
  },
  data() {
    return {
      ruleForm: {
        title: '',
        articleBody: '',
        videoURL: ''
      },
      rules: {
        title: [{ required: true, message: '请输文章标题', trigger: 'blur' }],
        articleBody: [
          { required: true, message: '请输文章标题', trigger: 'blur' }
        ]
      },
      editorOption: {
        placeholder: '请输入文章内容'
      },
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      editorOption: {
        placeholder: '',
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function (value) {
                if (value) {
                  document.querySelector('#quill-upload input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    /**
     * 取消
     */
    cancel() {
      this.$emit('update:visible', false)
      console.log(this.isshow)
    },
    /**
     * 确定
     */
    async determine() {
      // console.log(this.isshow)
      if (this.isshow) {
        // console.log(this.isshow)
        await addedArticleList(this.ruleForm)
      } else {
        console.log(this.isshow)
        await editArticleList(this.modifyId, this.ruleForm)
      }
      this.$emit('onSuccess')

      this.cancel()
    },
    /**
     * 防止添加回显
     */
    closed() {
      this.$refs.form.resetFields()
    },
    /**
     * 详情
     */
    async getdetails() {
      console.log(this.modifyId)
      this.ruleForm = await detailsArticleList(this.modifyId)

      console.log(this.ruleForm)
    },

    onEditorChange({ editor, html, text }) {
      //获取文本值
      // html带html标签
      //text只有文字
    },
    // 上传图片前
    beforeUpload(res, file) {
      this.quillUpdateImg = true
    },
    // 上传图片成功
    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      // 如果上传成功
      //console.log('chenggong',res)
      if (res.code == 200 && res.target !== null) {
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片 res.info为服务器返回的图片地址
        // console.info(res.target)
        // console.info("image",'image')
        // console.info('length',length)
        quill.insertEmbed(length, 'image', res.target)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 上传图片失败
    uploadError(res, file) {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    },
    onEditorReady() {},
    getContent(value) {}
  },
  watch: {
    visible(val) {
      if (val && !this.isshow && this.modifyId) {
        this.getdetails()
      }
    }
  }
}
</script>

<style></style>
