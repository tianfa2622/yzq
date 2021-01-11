<template>
  <div class="equipment">
    <Elsearch :searchSettings="searchSettings" @add="add" @search="search" @download="download" />
    <Eltable
      :tableHead="tableHead"
      :tableDatas="tableDatas"
      :tableSettings="tableSettings"
      :search="searchs"
      @modify="modify"
      @detailed="detailed"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
    <el-dialog :title="title" v-model="modifyDialog" center>
      <Elsearch :searchSettings="dialogSearch[0]" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="modifyDialog = false">保存</el-button>
          <el-button @click="modifyDialog = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog custom-class="dialog" :title="title" v-model="dialogShow" center>
      <div class="l">
        <Elsearch :searchSettings="dialogSearch[1]" />
      </div>
      <div class="r">
        <el-form :model="form" label-width="auto">
          <el-form-item label="操作类型">
            <el-select v-model="form.region" placeholder="请选择操作类型">
              <el-option label="订阅" value="0"></el-option>
              <el-option label="取消订阅" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订阅执行状态">
            <span v-if="form.region == 1">未订阅</span>
            <span v-else>订阅</span>
          </el-form-item>
          <Elsearch v-if="form.region == 1" :searchSettings="dialogSearch[2]" />
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogShow = false">确认</el-button>
          <el-button @click="dialogShow = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Elsearch from '/@/components/searchCom/searchCom.vue'
import Eltable from '/@/components/tableCom/tableCom.vue'
export default defineComponent({
  setup() {
    const state = reactive({
      form: {},
      title: '',
      dialogShow: false,
      modifyDialog: false,
      searchs: {
        searchCurrent: 1,
        searchSize: 5,
        searchTotal: 999
      },
      searchSettings: [
        { placeholder: '请输入安装地点', type: 'input', value: 'yhmc' },
        { placeholder: '请输入设备标识', type: 'input', value: 'yhmc' },
        { placeholder: '请输入设备名称', type: 'input', value: 'yhmc' },
        {},
        { placeholder: '查询', type: 'search' },
        { placeholder: '注册', type: 'add' }
      ],
      tableHead: [
        { label: '安装地点', prop: 'input' },
        { label: '是否包含下级', prop: 'input' },
        { label: '设备标识', prop: 'input' },
        { label: '设备生产商名称', prop: 'input' },
        { label: '设备型号', prop: 'input' },
        { label: '设备类型', prop: 'input' },
        { label: '应用场景', prop: 'input' },
        { label: '地球经度', prop: 'input' },
        { label: '地球纬度', prop: 'input' }
      ],
      tableDatas: Array(5).fill({
        input: '123'
      }),
      tableSettings: [
        { name: '修改', type: 'modify' },
        { name: '订阅详情', type: 'detailed' }
      ],
      dialogSearch: [
        [
          { label: '安装地点', placeholder: '请输入安装地点', type: 'input' },
          {
            label: '是否包含下级',
            type: 'radio',
            options: [
              { label: '是', value: 0 },
              { label: '否', value: 1 }
            ]
          },
          { label: '设备标识', placeholder: '请输入设备标识', type: 'input' },
          { label: '设备名称', placeholder: '请输入设备名称', type: 'input' },
          { label: '设备生产商名称', placeholder: '请输入设备生产商名称', type: 'input' },
          { label: '设备型号', placeholder: '请输入设备型号', type: 'input' },
          {
            label: '设备类型',
            placeholder: '请输入设备类型',
            type: 'select',
            options: [
              { label: '智能分析仪', value: 0 },
              { label: '智能安检机', value: 1 },
              { label: '其他', value: 2 }
            ]
          },
          {
            label: '应用场景',
            placeholder: '请输入应用场景',
            type: 'select',
            options: [
              { label: '公安检查站', value: 0 },
              { label: '火车站', value: 1 },
              { label: '汽车站', value: 2 }
            ]
          },
          { label: '地球经度', placeholder: '请输入地球经度', type: 'input' },
          { label: '地球纬度', placeholder: '请输入地球纬度', type: 'input' }
        ],
        [
          { label: '订阅标题', placeholder: '请输入订阅标题', type: 'input' },
          { label: '订阅类别', placeholder: '请输入订阅类别', type: 'input' },
          { label: '订阅资源路径', placeholder: '请输入订阅资源路径', type: 'input' },
          {
            label: '申请人姓名',
            placeholder: '请输入申请人姓名',
            type: 'select',
            options: [
              { label: '张三', value: 0 },
              { label: '张三', value: 1 },
              { label: '张三', value: 2 }
            ]
          },
          {
            label: '申请人单位名称',
            placeholder: '请输入申请人单位名称',
            type: 'select',
            options: [
              { label: '岳麓区公安局', value: 0 },
              { label: '天心区公安局', value: 1 },
              { label: '张三', value: 2 }
            ]
          },
          { label: '开始时间', type: 'data' },
          { label: '结束时间', type: 'data' },
          { label: '信息接收地址', placeholder: '请输入信息接收地址', type: 'input' },
          { label: '信息上报间隔时间', placeholder: '请输入信息上报间隔时间', type: 'input' },
          { label: '理由', placeholder: '请输入订阅理由', type: 'textarea' }
        ],
        [
          {
            label: '订阅取消单位',
            placeholder: '请输入订阅取消单位',
            type: 'select',
            options: [
              { label: '岳麓区公安局', value: 0 },
              { label: '天心区公安局', value: 1 },
              { label: '张三', value: 2 }
            ]
          },
          {
            label: '订阅取消人',
            placeholder: '请输入订阅取消人',
            type: 'select',
            options: [
              { label: '张三', value: 0 },
              { label: '张三', value: 1 },
              { label: '张三', value: 2 }
            ]
          },
          { label: '取消时间', type: 'data' },
          { label: '取消原因', placeholder: '请输入取消原因', type: 'textarea' }
        ]
      ],
      //search
      add: (val: object) => {
        console.log(val)
      },
      search: (val: object) => {
        console.log(val)
      },
      download: (val: object) => {
        console.log(val)
      },
      //table
      detailed: (val: object) => {
        console.log(val)
        state.title = '订阅详情'
        state.dialogShow = true
      },
      modify: (val: object) => {
        console.log(val)
        state.title = '修改信息'
        state.modifyDialog = true
      },
      sizeChange: (val: any) => {
        console.log(val)
      },
      currentChange: (val: any) => {
        console.log(val)
      }
    })
    return state
  },
  components: { Elsearch, Eltable }
})
</script>
<style lang="scss">
.equipment {
  .searchCom {
    .el-form {
      .el-form-item:nth-of-type(4) {
        width: 19%;
      }
      .el-form-item:nth-of-type(5),
      .el-form-item:nth-of-type(6) {
        width: 10%;
        .el-button {
          width: 100%;
        }
      }
      .el-form-item:nth-of-type(5) {
        margin-right: 1%;
      }
    }
  }
  .el-overlay {
    .dialog {
      .el-dialog__body {
        display: flex;
        justify-content: space-between;
        .l,
        .r {
          width: 50%;
        }
        .l {
          .searchCom {
            .el-form {
              .el-form-item {
                width: 80%;
              }
            }
          }
        }
        .r {
          .el-form {
            margin-top: 0.2rem;
            .searchCom,
            .searchCom > .el-form {
              margin: 0;
            }
            .el-form-item {
              width: 80% !important;
              .el-form-item__label-wrap {
                .el-form-item__label {
                  color: #fff;
                }
              }
              .el-form-item__content {
                span{
                  color: #fff;
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
              }
            }
          }
        }
      }
    }
  }
}
</style>