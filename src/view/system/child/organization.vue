<template>
  <div class="organization">
    <Elsearch :searchSettings="searchSettings" @add="add" @search="search" @download="download" />
    <Eltable
      :tableHead="tableHead"
      :tableDatas="tableDatas"
      :tableSettings="tableSettings"
      :search="searchs"
      @del="del"
      @modify="modify"
      @custom="custom"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
    <el-dialog :title="title" v-model="delShow" center width="30%">
      <p>确认删除该组织机构吗？删除前请检查该组织机构下没有用户数据，否则无法删除！</p>
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
          placeholder: '全部状态',
          type: 'select',
          value: 'yhmc',
          options: [
            { label: '已启用', value: 0 },
            { label: '已禁用', value: 1 }
          ]
        },
        { placeholder: '请输入机构代码或机构名称', type: 'input', value: 'yhmc' },
        {},
        {},
        { placeholder: '查询', type: 'search' },
        { placeholder: '新增', type: 'add' }
      ],
      tableHead: [
        { label: '机构代码', prop: 'input' },
        { label: '机构名称', prop: 'input' },
        { label: '状态', prop: 'input' }
      ],
      tableDatas: Array(5).fill({
        input: '123'
      }),
      tableSettings: [
        { name: '删除', type: 'delete' },
        { name: '禁用', type: 'custom' },
        { name: '修改', type: 'modify' }
      ],
      dialogSearch: [
        { label: '机构代码', placeholder: '请输入组织机构代码', type: 'input', value: 'yhmc' },
        { label: '机构名称', placeholder: '请输入组织机构名称', type: 'input', value: 'yhmc' }
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
      custom: (val: object) => {
        console.log(val)
      },
      modify: (val: object) => {
        console.log(val)
        state.title = '修改组织机构'
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
.organization {
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