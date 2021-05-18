<template>
  <div class="dictionaries">
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
          <el-button @click="confirmDel">确认</el-button>
          <el-button @click="delShow = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog :title="title" v-model="dialogShow" center destroy-on-close>
      <Elsearch ref="addForm" :searchSettings="dialogSearch" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button @click="confirm">保存</el-button>
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
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, onMounted, ref, nextTick } from 'vue'
  import Elsearch from '/@/components/searchCom/searchCom.vue'
  import { ElMessage } from 'element-plus'
  import Eltable from '/@/components/tableCom/tableCom.vue'
  import { searchAll, update, updateState, del, insert } from '/@/api/system/dictionaries'
  export default defineComponent({
    setup() {
      const tableDatas = ref<any>([])
      const addForm = ref<InstanceType<typeof Elsearch>>()
      const row = ref<{ id?: number,state?:boolean }>({})
      const state = reactive({
        title: '',
        customtitle:'',
        customShow:false,
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
            value: 'state',
            options: [
              { label: '已启用', value: true },
              { label: '已禁用', value: false }
            ]
          },
          {
            placeholder: '全部类别',
            type: 'select',
            value: 'type',
            options: [
              { label: '类别1', value: 0 },
              { label: '类别2', value: 1 }
            ]
          },
          { placeholder: '请输入字典代码或字典名称', type: 'input', value: 'number' },
          {},
          { placeholder: '查询', type: 'search' },
          { placeholder: '新增', type: 'add' }
        ],
        tableHead: [
          { label: '字典类别', prop: 'type' },
          { label: '字典代码', prop: 'number' },
          { label: '字典名称', prop: 'name' },
          {
            label: '状态',
            prop: 'state',
            formatter: function (row: any) {
              switch (row.state) {
                case true:
                  return '已启用'
                case false:
                  return '已禁用'
              }
            }
          }
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
          {
            label: '字典类别',
            type: 'select',
            value: 'type',
            options: [
              { label: '类别1', value: 0 },
              { label: '类别2', value: 1 }
            ]
          },
          { label: '字典编号', placeholder: '请输入字典编号', type: 'input', value: 'number' },
          { label: '字典名称', placeholder: '请输入字典名称', type: 'input', value: 'name' }
        ],
        //search
        add: (val: object) => {
          console.log(val)
          state.title = '新增字典'
          state.dialogShow = true
        },
        // 搜索按钮 这里要一个参数
        search: async (val?: any) => {
          let size = state.searchs.searchSize
          let current = state.searchs.searchCurrent
          if (!val.state) {
            val.state = true
          }
          try {
            const res = await searchAll({ ...val, size: size, current: current })
            if (res.code === 1) {
              tableDatas.value = res.data.records
              state.searchs.searchTotal = res.data.total
              if (val) {
                ElMessage.success({
                  message: '查询成功',
                  type: 'success'
                })
              }
            }
          } catch (err) {
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
        custom: (val: any) => {
          if (val.state===true) {
          state.customtitle = '禁用'
          row.value = val
          row.value.state = false
          }else{
            state.customtitle = '启用'
            row.value = val
            row.value.state = true
          }
          state.customShow = true
        },
        confirmCustom: async()=>{
          if (row.value.id) {
            const id = row.value.id
            const enabled = row.value.state
            const res = await updateState({id:id,state:enabled})
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
          state.title = '修改字典'
          state.dialogShow = true
            nextTick(() => {
              if (addForm.value) {
                addForm.value.formDatas = { ...val }
              }
            })
        },
        insertAPI: async (data: any) => {
          try {
            const res = await insert(data)
            ElMessage.success({
              message: '添加成功',
              type: 'success'
            })
            state.dialogShow = false
            addForm.value?.reset()
            state.search()
          } catch (err) {
            console.log(err)
          }
        },
        updateAPI: async (data: any) => {
          try {
            const res = await update(data)
            ElMessage.success({
              message: res.message || '修改成功',
              type: 'success'
            })
            state.dialogShow = false
            addForm.value?.reset()
            state.search()
          } catch (err) {
            console.log(err)
          }
          // loading = false
        },
        // 确定按钮
        confirm: () => {
          if (addForm.value) {
            const data: object = addForm.value.formDatas
            addForm.value.validate(async (valid: boolean) => {
              // console.log(valid)
              switch (state.title) {
                case '新增字典':
                  state.insertAPI(data)
                  break
                case '修改字典':
                  state.updateAPI(data)
                  break
                default:
                  break
              }
            })
          }
        },
        // 取消按钮
        cancel: () => {
          state.dialogShow = false
          setTimeout(() => {
            if (addForm.value) {
              addForm.value.reset()
            }
          }, 1000)
        },
        // 删除按钮
        del: (val: object) => {
          console.log(val)
          state.title = '删除确认'
          state.delShow = true
          row.value = val
        },
        // 确认删除按钮
        confirmDel: async () => {
          if (row.value.id) {
            const id = row.value.id
            const res = await del(id)
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
        }
      })
      onMounted(() => {
        state.search()
      })
      return {
        ...toRefs(state),
        tableDatas,
        row,
        addForm
      }
    },
    components: { Elsearch, Eltable }
  })
</script>
<style lang="scss">
  .dictionaries {
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
