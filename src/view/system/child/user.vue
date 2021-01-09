<template>
  <div class="user">
    <Elsearch :searchSettings="searchSettings" @add="add" @search="search" @download="download" />
    <Eltable
      :tableHead="tableHead"
      :tableDatas="tableDatas"
      :tableSettings="tableSettings"
      :search="searchs"
      @del="del"
      @modify="modify"
      @detailed="detailed"
      @custom="custom"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
    <el-dialog :title="title" v-model="delShow" center width="30%">
      <p>确认删除该用户吗？ 删除前请检查该用户是否没有添加立项数据，否则无法删除！</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="delShow = false">确认</el-button>
          <el-button @click="delShow = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog :title="title" v-model="dialogShow" center destroy-on-close>
      <Elsearch :searchSettings="dialogSearch" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogShow = false">取消</el-button>
          <el-button @click="dialogShow = false">保存</el-button>
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
      title: '',
      dialogShow: false,
      delShow: false,
      searchs: {
        searchCurrent: 1,
        searchSize: 5,
        searchTotal: 999
      },
      searchSettings: [
        {
          placeholder: '账号状态',
          type: 'select',
          value: 'yhmc',
          options: [
            { label: '正常', value: 0 },
            { label: '已禁用', value: 1 }
          ]
        },
        { placeholder: '请输入姓名或警号', type: 'input', value: 'yhmc' },
        {},
        {},
        { placeholder: '查询', type: 'search' },
        { placeholder: '新增', type: 'add' }
      ],
      tableHead: [
        { label: '姓名', prop: 'input' },
        { label: '警号', prop: 'input' },
        { label: '联系电话', prop: 'input' },
        { label: '所属单位', prop: 'input' },
        { label: '所属角色', prop: 'input' },
        { label: '账号状态', prop: 'input' }
      ],
      tableDatas: Array(5).fill({
        input: '123'
      }),
      tableSettings: [
        { name: '删除', type: 'delete' },
        { name: '禁用', type: 'custom' },
        { name: '修改', type: 'modify' },
        { name: '重置密码', type: 'detailed' }
      ],
      dialogSearch: [
        { placeholder: '请输入新密码', type: 'input', value: 'yhmc' },
        { label: '联系电话', type: 'input', value: 'yhmc' },
        {
          label: '所属单位',
          type: 'select',
          value: 'yhmc',
          options: [
            { label: '科信总队', value: 0 },
            { label: '治安总队', value: 1 },
            { label: '长沙市科信', value: 2 },
            { label: '见组织机构字典表', value: 3 }
          ]
        }
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
        state.title = '重置密码'
        state.dialogSearch = [{ placeholder: '请输入新密码', type: 'input', value: 'yhmc' }]
        state.dialogShow = true
      },
      custom: (val: object) => {
        console.log(val)
      },
      modify: (val: object) => {
        console.log(val)
        state.title = '编辑用户'
        state.dialogSearch = [
          { label: '警号', type: 'input', value: 'yhmc' },
          { label: '姓名', type: 'input', value: 'yhmc' },
          { label: '联系电话', type: 'input', value: 'yhmc' },
          {
            label: '所属单位',
            type: 'select',
            value: 'yhmc',
            options: [
              { label: '科信总队', value: 0 },
              { label: '治安总队', value: 1 },
              { label: '长沙市科信', value: 2 },
              { label: '见组织机构字典表', value: 3 }
            ]
          },
          {
            label: '所属角色',
            type: 'select',
            value: 'yhmc',
            options: [
              { label: '立项单位', value: 0 },
              { label: '科信总队', value: 1 },
              { label: '警保总队', value: 2 },
              { label: '见角色管理', value: 3 }
            ]
          }
        ]
        state.dialogShow = true
      },
      del: (val: object) => {
        console.log(val)
        state.title = '删除确认'
        state.delShow = true
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
.user {
  padding-right: 0.2rem;
  box-sizing: border-box;
  .searchCom {
    .el-form {
      .el-form-item:nth-of-type(4) {
        width: 19%;
      }
      .el-form-item:nth-of-type(5) {
        margin-right: 1%;
      }
      .el-form-item:nth-of-type(5),
      .el-form-item:nth-of-type(6) {
        width: 10%;
        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>