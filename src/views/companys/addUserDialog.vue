<template>
  <div>
    <el-dialog
      :title="isAdd ? '新增用户' : '编辑用户'"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      width="50%"
      :before-close="handleClose"
      @closed="resetForm"
    >
      <span>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="200px"
          class="demo-ruleForm"
        >
          <el-form-item label="企业名称" prop="shortName">
            <el-input
              v-model="ruleForm.shortName"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属公司" prop="company">
            <el-input v-model="ruleForm.company"></el-input>
            https://www.tianyancha.com （在此可查询所属公司全称及简称）
          </el-form-item>
          <!-- 城市 -->
          <el-form-item label="城市" prop="province">
            <el-select
              @change="changeFn"
              v-model="ruleForm.province"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in provincesList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- *******地区******** -->
          <el-form-item label="地区" prop="city">
            <el-select v-model="ruleForm.city" placeholder="请选择">
              <el-option
                v-for="(item, index) in citysList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="方向(企业标签)" prop="tags">
            <el-input v-model="ruleForm.tags"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
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
import {
  postAddCompany,
  getCompanyDetail,
  putEditCompanyDetail,
} from "@/api/companys";
import { provincesFun, citys } from "@/api/citysData";
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
        province: "",
        company: "",

        remarks: "",
        shortName: "",
        tags: "",
        isFamous: Boolean,
      },
      // isFamous: true,

      rules: {
        shortName: [
          { required: true, message: "请输入shortName", trigger: "blur" },
        ],
        company: [
          { required: true, message: "请输入company", trigger: "blur" },
        ],
        province: [{ required: true, trigger: "blur" }],
        city: [{ required: true, message: "请输入company", trigger: "blur" }],
        tags: [{ required: true, trigger: "blur" }],
        remarks: [{ required: true, message: "备注", trigger: "blur" }],
      },
      provincesList: provincesFun(), // 城市
      citysList: [], // 地区
    };
  },
  methods: {
    onCancel() {
      this.$emit("update:visible", false);
    },
    /**
     * 地区赋值给本地
     */
    changeFn() {
      // 获取地区赋值给本地
      this.citysList = citys(this.ruleForm.province);
    },
    async onConfirm() {
      if (this.isAdd) {
        await postAddCompany(this.ruleForm);
        this.$message.success("添加用户成功！！");
      } else {
        await putEditCompanyDetail(this.selId, {
          ...this.ruleForm,
          isFamous: true,
        });
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
    async getCompanyDetailAPI() {
      const res = await getCompanyDetail(this.selId);

      this.ruleForm = res;
    },
  },
  watch: {
    visible(val) {
      // console.log(this.selId);
      if (val && !this.isAdd && this.selId) {
        this.getCompanyDetailAPI();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  ::v-deep.el-input__inner {
    width: 309px;
    height: 32px;
    line-height: 32px;
  }
}
</style>
