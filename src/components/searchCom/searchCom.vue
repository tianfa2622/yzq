<template>
  <div class="searchCom">
    <el-form ref="form" :model="formDatas" :rules="rules" label-width="auto">
      <el-form-item
        v-for="(item, index) in searchSettings"
        :key="index"
        :label="item.label != '' ? item.label : ''"
        :prop="item.value"
      >
        <el-input
          v-model="formDatas[item.value]"
          :placeholder="item.placeholder"
          v-if="item.type === 'input'"
        ></el-input>
        <el-cascader
          v-model="formDatas[item.value]"
          :options="item.options"
          :placeholder="item.placeholder"
          v-if="item.type === 'cascader'"
        ></el-cascader>
        <el-select
          clearable
          v-if="item.type === 'select'"
          v-model="formDatas[item.value]"
          :placeholder="item.placeholder"
        >
          <el-option
            v-for="op in item.options"
            :label="op.label"
            :value="op.value"
            :key="op.value"
          ></el-option>
        </el-select>
        <el-date-picker
          v-if="item.type === 'data'"
          v-model="formDatas[item.value]"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY/MM/DD"
        >
        </el-date-picker>
        <el-input
          v-if="item.type === 'textarea'"
          type="textarea"
          v-model="formDatas[item.value]"
          :placeholder="item.placeholder"
          :disabled='item.disabled'
        ></el-input>
        <el-radio-group v-if="item.type === 'radio'" v-model="formDatas[item.value]">
          <el-radio :label="op.value" v-for="op in item.options" :key="op.value">{{
            op.label
          }}</el-radio>
        </el-radio-group>
        <el-button v-if="item.type === 'search'" @click="search">{{ item.placeholder }}</el-button>
        <el-button v-if="item.type === 'add'" @click="add">{{ item.placeholder }}</el-button>
        <el-button v-if="item.type === 'download'" @click="download">{{
          item.placeholder
        }}</el-button>
        <el-button v-if="item.type === 'reset'" @click="reset">{{ item.placeholder }}</el-button>
      </el-form-item>
    </el-form>
    <div class="btns" v-if="searchBtn">
      <div class="btn" v-for="item in searchBtn" :key="item.name">
        <el-button v-if="item.type === 'search'" @click="search">{{ item.name }}</el-button>
        <el-button v-if="item.type === 'add'" @click="add">{{ item.name }}</el-button>
        <el-button v-if="item.type === 'download'" @click="download">{{ item.name }}</el-button>
        <el-button v-if="item.type === 'uploading'" @click="uploading">{{ item.name }}</el-button>
        <el-button v-if="item.type === 'reset'" @click="reset">{{ item.name }}</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, toRefs, ref,onMounted } from 'vue'
export default defineComponent({
  props: ['searchSettings', 'searchBtn'],
  setup(props, { emit }) {
    const { searchSettings } = props
    const rules: any = ref({})
    searchSettings.forEach((item: any) => {
      rules.value[item.value] = item.rule || []
    })
    const form = ref<InstanceType<typeof ElForm>>()
    const state = reactive({
      formDatas: {},
      add: () => {
        emit('add', state.formDatas)
      },
      search: () => {
        emit('search', state.formDatas)
      },
      download: () => {
        emit('download', state.formDatas)
      },
      uploading: () => {
        emit('uploading', state.formDatas)
      },
      reset: () => {
        if (form.value) {
          form.value.resetFields()
        }
      },
      validate: (cb?: Function) => {
        if (form.value) {
          form.value.validate((valid) => {
            if (cb) {
              console.log(rules.value)
              cb(valid)
            }
          })
        }
      }
    })
    return {
      ...toRefs(state),
      form,
      rules
    }
  }
})
</script>
<style lang="scss">
.searchCom {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .el-form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 20%;
      margin-bottom: 0;
      .el-form-item__label-wrap {
        .el-form-item__label {
          color: #fff;
        }
      }
      .el-form-item__content {
        .el-input {
          width: 90%;
          input {
            background-color: #072e37;
            color: #fff;
            border-width: 2px;
            border-style: inset;
            border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
          }
          input::placeholder {
            color: #00f3ff;
          }
        }
        .el-select {
          width: 90%;
          .el-input {
            width: 100%;
            input {
              background-color: #072e37;
              color: #fff;
              border-width: 2px;
              border-style: inset;
              border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
            }
            input::placeholder {
              color: #00f3ff;
            }
          }
        }
        .el-date-editor {
          width: 90%;
          background-color: #072e37;
          border-width: 2px;
          border-style: inset;
          border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
          input {
            background-color: #072e37;
            border: none;
            color: #fff;
          }
          input::placeholder {
            color: #fff;
          }
          span {
            color: #fff;
          }
        }
        .el-textarea {
          width: 90%;
          .el-textarea__inner {
            background-color: #062830;
            color: #00f3ff;
          }
          .el-textarea__inner::placeholder {
            color: #00f3ff;
          }
        }
        .el-cascader {
          width: 100%;
        }
        .el-radio-group {
          .el-radio {
            .el-radio__label {
              color: #fff;
            }
          }
        }
      }
    }
  }
  .btns {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.2rem;
    .btn {
      width: 1.5rem;
    }
  }
  .el-button {
    width: 90%;
    background-color: #053c43;
    span {
      color: #00f3ff;
    }
  }
}
</style>