<template>
  <div class="classification">
    <h2 class="title">{{ $route.matched[1].name }}</h2>
    <Elsearch
      :searchSettings="searchSettings"
      :searchBtn="searchBtn"
      @add="add"
      @search="search"
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
      <Elsearch ref="addForm" :searchSettings="dialogSearch" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="confirm">确认</el-button>
          <el-button @click="cancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="删除" v-model="delShow" center>
      <p>确认要删除选中内容吗？删除后数据不可恢复哦！！</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="confirmDel">确认</el-button>
          <el-button @click="delShow = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, onMounted, ref, nextTick } from 'vue'
  import Elsearch from '/@/components/searchCom/searchCom.vue'
  import Eltable from '/@/components/tableCom/tableCom.vue'
  import { searchAll, insert, del, searchOne, update } from '/@/api/classification/index'
  import { ElMessage } from 'element-plus'
  import { Rows } from '../../types/classification'
  export default defineComponent({
    setup() {
      onMounted(() => {
        state.search()
      })
      const addForm = ref<InstanceType<typeof Elsearch>>()
      const row = ref<{ id?: number }>({})
      const tableDatas = ref<Rows>([])
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
          { placeholder: '请输入枪支编码', type: 'input', value: 'qzlbjbm' },
          { placeholder: '请输入枪支类型', type: 'input', value: 'qzlx' },
          { placeholder: '请输入枪支型号', type: 'input', value: 'qzxh' },
          { placeholder: '请输入枪支名称', type: 'input', value: 'qzmc' },
          { placeholder: '搜索', type: 'search' },
          { placeholder: '重置', type: 'reset' }
        ],
        searchBtn: [
          {
            name: '添加',
            type: 'add'
          },
          {
            name: '导入',
            type: 'uploading'
          }
        ],
        tableHead: [
          { label: '枪支及其零部件编码', prop: 'qzlbjbm' },
          { label: '枪支类型', prop: 'qzlx' },
          { label: '枪支型号', prop: 'qzxh' },
          { label: '枪支名称', prop: 'qzmc' }
        ],
        // tableDatas: [],
        tableSettings: [
          { name: '修改', type: 'modify' },
          { name: '删除', type: 'delete' }
        ],
        dialogSearch: [
          {
            placeholder: '请输入枪支及其零部件编码',
            label: '枪支及其零部件编码',
            type: 'input',
            value: 'qzlbjbm',
            rule: [{ required: true, message: '请输入编码', trigger: 'blur' }]
          },
          {
            placeholder: '请输入枪支类型',
            label: '枪支类型',
            type: 'input',
            value: 'qzlx',
            rule: [{ required: true, message: '请输入枪支类型', trigger: 'blur' }]
          },
          {
            placeholder: '请输入枪支型号',
            label: '枪支型号',
            type: 'input',
            value: 'qzxh',
            rule: [{ required: true, message: '请输入枪支型号', trigger: 'blur' }]
          },
          {
            placeholder: '请输入枪支名称',
            label: '枪支名称',
            type: 'input',
            value: 'qzmc',
            rule: [{ required: true, message: '请输入枪支名称', trigger: 'blur' }]
          }
        ],
        //search
        // 添加按钮
        add: (val: object) => {
          console.log(val)
          state.title = '添加'
          state.dialogShow = true
        },
        // 搜索按钮 这里要一个参数
        search: async (val?: object) => {
          console.log(val)
          let size = state.searchs.searchSize
          let current = state.searchs.searchCurrent
          const res = await searchAll({ ...val, size: size, current: current })
          if (res.code == 1) {
            tableDatas.value = res.data.records
            // data: {records:[],total:0}
            state.searchs.searchTotal = res.data.total
            if (val) {
              ElMessage.success({
                message: '查询成功',
                type: 'success'
              })
            }
          } else {
            // state.tableDatas = res.data.records
            // state.searchs.searchTotal = res.data.total
            ElMessage.error({
              message: '查询失败!',
              type: 'error'
            })
          }
        },
        // 导入按钮
        uploading: (val: object) => {
          console.log(val)
        },
        //table
        // 删除按钮
        del: (val: object) => {
          console.log(val)
          state.title = '删除'
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
        },
        // 修改按钮
        modify: async (val: any) => {
          // console.log(val)
          state.title = '修改'
          const data = await state.getByidsearch(val.id)
          if (data) {
            state.dialogShow = true
            nextTick(() => {
              if (addForm.value) {
                addForm.value.formDatas = { ...data }
              }
            })
          }
        },
        // 根据ID查询
        getByidsearch: async (id: number) => {
          const res = await searchOne(id)
          if (res.code === 1) {
            const data = res.data
            return data
          }
          return
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
                case '添加':
                  state.insertAPI(data)
                  break
                case '修改':
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
        // 切换每页条数
        sizeChange: (val: number) => {
          state.searchs.searchSize = val
        },
        // 切换分页
        currentChange: (val: number) => {
          state.searchs.searchCurrent = val
        }
      })
      return {
        ...toRefs(state),
        addForm,
        row,
        tableDatas
      }
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
