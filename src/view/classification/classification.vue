<template>
  <div class="classification">
    <h2 class="title">{{ $route.matched[1].name }}</h2>
    <Elsearch
      :searchSettings="searchSettings"
      :searchBtn="searchBtn"
      @add="add"
      @search="search"
      @download="download"
      @uploading="uploading"
    />
    <Eltable
      :tableHead="tableHead"
      :tableDatas="tableDatas"
      :tableSettings="tableSettings"
      :search="searchs"
      @del="del"
      @modify="modify"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
    <el-dialog :title="title" v-model="dialogShow" center>
      <Elsearch :searchSettings="dialogSearch" @add="add" @search="search" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogShow = false">确认</el-button>
          <el-button @click="dialogShow = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog :title="title" v-model="delShow" center>
      <p>确认要删除选中内容吗？删除后数据不可恢复哦！！</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="delShow = false">确认</el-button>
          <el-button @click="delShow = false">取消</el-button>
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
        { placeholder: '请输入枪支编码', type: 'input', value: 'yhmc' },
        { placeholder: '请输入枪支类型', type: 'input', value: 'yhmc' },
        { placeholder: '请输入枪支型号', type: 'input', value: 'yhmc' },
        { placeholder: '请输入枪支名称', type: 'input', value: 'yhmc' },
        { placeholder: '搜索', type: 'add' },
        { placeholder: '重置', type: 'search' }
      ],
      searchBtn: [
        {
          name: '添加',
          type: 'download'
        },
        {
          name: '导入',
          type: 'uploading'
        }
      ],
      tableHead: [
        { label: '枪支及其零部件编码', prop: 'input' },
        { label: '枪支类型', prop: 'input' },
        { label: '枪支型号', prop: 'input' },
        { label: '枪支名称', prop: 'input' }
      ],
      tableDatas: Array(5).fill({
        input: '123'
      }),
      tableSettings: [
        { name: '修改', type: 'modify' },
        { name: '删除', type: 'delete' }
      ],
      dialogSearch: [
        {
          placeholder: '请输入枪支编码',
          label: '枪支及其零部件编码',
          type: 'input',
          value: 'yhmc'
        },
        {
          placeholder: '请输入枪支类型',
          label: '枪支类型',
          type: 'input',
          value: 'yhmc'
        },
        {
          placeholder: '请输入枪支型号',
          label: '枪支型号',
          type: 'input',
          value: 'yhmc'
        },
        { placeholder: '请输入枪支名称', label: '枪支名称', type: 'input', value: 'yhmc' }
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
      uploading: (val: object) => {
        console.log(val)
      },
      //table
      del: (val: object) => {
        console.log(val)
        state.title = '删除'
        state.delShow = true
      },
      modify: (val: object) => {
        console.log(val)
        state.title = '修改'
        state.dialogShow = true
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
.classification {
  .searchCom {
    .el-form {
      .el-form-item:nth-child(5),
      .el-form-item:nth-child(6) {
        width: 1.667rem;
      }
    }
  }
}
</style>