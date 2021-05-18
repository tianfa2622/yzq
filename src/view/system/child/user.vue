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
    <el-dialog title="删除" v-model="delShow" center width="30%">
      <p>确认删除该用户吗？ 删除前请检查该用户是否没有添加立项数据，否则无法删除！</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="confirmDel">确认</el-button>
          <el-button @click="delShow = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog :title="customtitle" v-model="customShow" center width="30%">
      <p>确认{{customtitle}}该用户吗？</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="confirmCustom">确认</el-button>
          <el-button @click="customShow = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog :title="title" v-model="dialogShow" center destroy-on-close>
      <Elsearch ref="modifyForm" :searchSettings="dialogSearch" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="confirm">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive,ref,toRefs,nextTick,onMounted  } from 'vue'
import Elsearch from '/@/components/searchCom/searchCom.vue'
import Eltable from '/@/components/tableCom/tableCom.vue'
import { ElMessage } from 'element-plus';
import { searchAll,del,updateState} from '/@/api/system/user'
import { resourceUsage } from 'process';
export default defineComponent({
  setup() {
    const tableDatas = ref<any>([])
    const row = ref<{ id?: number,enabled?:boolean }>({})
    const modifyForm = ref<InstanceType<typeof Elsearch>>()
    const state = reactive({
      customtitle:'',
      customShow:false,
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
          value: 'enabled',
          options: [
            { label: '正常', value: 1 },
            { label: '已禁用', value: 0 }
          ]
        },
        { placeholder: '请输入姓名或警号', type: 'input', value: 'keywords' },
        {},
        {},
        { placeholder: '查询', type: 'search' },
        { placeholder: '新增', type: 'add' }
      ],
      tableHead: [
        { label: '姓名', prop: 'name' },
        { label: '警号', prop: 'username' },
        { label: '联系电话', prop: 'phone' },
        { label: '所属单位', prop: 'organization' },
        { label: '所属角色', prop: 'rolesName' },
        { label: '账号状态', prop: 'enabledName' }
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
        state.title = '新增用户'
        state.dialogSearch = [
          { label: '警号', type: 'input', value: 'username' },
          { label: '姓名', type: 'input', value: 'name' },
          { label: '联系电话', type: 'input', value: 'phone' },
          {
            label: '所属单位',
            type: 'select',
            value: 'organization',
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
       // 搜索按钮 这里要一个参数
      search: async (val?: any) => {
        console.log(val)
        let size = state.searchs.searchSize
        let current = state.searchs.searchCurrent
        let enabled = val ? val.enabled : 1
        let keywords = val ? val.keywords : ''
        try{
          const  res  = await searchAll({size:size,current:current,enabled:enabled,keywords:keywords})
          if (res.code === 1) {
            tableDatas.value = res.data.records
            for (let i = 0; i < res.data.records.length; i++) {
              if (res.data.records[i].roles[0]) {
                tableDatas.value[i].rolesName = res.data.records[i].roles[0].name
              }
              if (res.data.records[i].enabled === true) {
                tableDatas.value[i].enabledName = '已启用'
              }else{
                tableDatas.value[i].enabledName = '已禁用'
              }
            }
            state.searchs.searchTotal = res.data.total
            if (val) {
              ElMessage.success({
                message: '查询成功',
                type: 'success'
              })
            }
          }
        } catch(err){
          console.log(err)
        }
      },
      // 切换每页条数
      sizeChange: (val: number) => {
        state.searchs.searchSize = val
        state.search()
      },
      // 切换分页
      currentChange: (val: number) => {
        state.searchs.searchCurrent = val
        state.search()
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
      custom: (val: any) => {
        if (val.enabled===true) {
          state.customtitle = '禁用'
          row.value = val
          row.value.enabled = false
        }else{
          state.customtitle = '启用'
          row.value = val
          row.value.enabled = true
        }
        state.customShow = true
      },
      confirmCustom: async()=>{
        if (row.value.id) {
          const id = row.value.id
          const enabled = row.value.enabled
          const res = await updateState({id:id,enabled:enabled})
          if (res.code === 1) {
            ElMessage.success({
              message: `${state.customtitle}成功`,
              type: 'success'
            })
            state.customShow = false
            state.search()
          }
        }
      },
      modify: (val: object) => {
        console.log(val)
        state.title = '编辑用户'
        state.dialogSearch = [
          { label: '警号', type: 'input', value: 'username' },
          { label: '姓名', type: 'input', value: 'name' },
          { label: '联系电话', type: 'input', value: 'phone' },
          {
            label: '所属单位',
            type: 'input',
            value: 'organization'
            // options: [
            //   { label: '科信总队', value: 0 },
            //   { label: '治安总队', value: 1 },
            //   { label: '长沙市科信', value: 2 },
            //   { label: '见组织机构字典表', value: 3 }
            // ]
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
          nextTick(() => {
            if (modifyForm.value) {
                modifyForm.value.formDatas = { ...val }
              }
          })
      },
      del: (val: object) => {
        console.log(val)
        state.delShow = true
        row.value = val
      },
      // 确认删除按钮
      confirmDel: async () => {
        if (row.value.id) {
          const id = row.value.id
          const  res  = await del(id)
          console.log(row)
          if (res.code === 1) {
            ElMessage.success({
              message: '删除成功',
              type: 'success'
            })
            state.delShow = false
            state.search()
          }
        }
      },
    })
    onMounted(() => {
      state.search()
    })
    return {
      ...toRefs(state),
      tableDatas,
      row,
      modifyForm
    }
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