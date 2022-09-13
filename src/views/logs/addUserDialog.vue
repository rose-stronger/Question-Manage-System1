<template>
  <div>
    <el-dialog
      :title="isAdd ? '新增用户' : '编辑用户'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="30%"
      :before-close="handleClose"
      @open="resetForm"
    >
      <span>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item v-if="isAdd" label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
          <el-form-item label="权限组名称" prop="permission_group_id">
            <el-select
              v-model="ruleForm.permission_group_id"
              placeholder="请选择活动区域"
            >
              <el-option
                v-for="item in tableDataList"
                :key="item.id"
                :label="item.permission_group_title"
                :value="item.permission_group_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="介绍" prop="introduction">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="ruleForm.introduction"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postAddUser, getUserDetail, putUserEdit } from "@/api/user";
export default {
  props: {
    visible: {
      type: Boolean,
    },
    tableDataList: {
      type: Array,
    },
    isAdd: {
      type: Boolean,
    },
    selId: {
      type: Number,
    },
  },
  data() {
    return {
      ruleForm: {
        username: "",
        email: "",
        password: "",
        role: "",
        permission_group_id: null,
        phone: "",
        introduction: "",
      },
      avatar: "",
      disabled: 1,

      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入email", trigger: "blur" }],
        password: [{ required: true, message: "请输入email", trigger: "blur" }],
        role: [],
        permission_group_id: [],
        phone: [],
        introduction: [],
      },
    };
  },
  methods: {
    onCancel() {
      this.$emit("update:visible", false);
    },
    async onConfirm() {
      if (this.isAdd) {
        await postAddUser(this.ruleForm);
        this.$message.success("添加用户成功！！");
      } else {
        console.log(this.isAdd);
        console.log(this.selId);
        console.log(this.ruleForm);
        // console.log(this.ruleForm.username);
        // console.log(this.ruleForm.permission_group_id);

        await putUserEdit(this.selId, { ...this.ruleForm });
        this.$message.success("修改用户成功！！");
      }

      this.onCancel();

      this.$emit("onSuccess");
    },
    handleClose(done) {
      done();
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    async getUserDetailAPI() {
      const res = await getUserDetail(this.selId);
      // console.log(res);
      this.ruleForm = res;
    },
  },
  watch: {
    visible(val) {
      console.log(this.selId);
      if (val && !this.isAdd && this.selId) {
        console.log(111);
        this.getUserDetailAPI();
      }
    },
  },
};
</script>

<style></style>
