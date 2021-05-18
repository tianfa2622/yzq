<template>
  <div class="log">
    <Elsearch :searchSettings="searchSettings" @search="search" />
    <Eltable
      :tableHead="tableHead"
      :tableDatas="tableDatas"
      :search="searchs"
      :operateShow="true"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, onMounted, ref, nextTick } from 'vue'
  import Elsearch from '/@/components/searchCom/searchCom.vue'
  import Eltable from '/@/components/tableCom/tableCom.vue'
  import { ElMessage } from 'element-plus'
  import { searchAll } from '/@/api/system/Log'
  export default defineComponent({
    setup() {
      const tableDatas = ref<any>([])
      const state = reactive({
        searchs: {
          searchCurrent: 1,
          searchSize: 5,
          searchTotal: 999
        },
        searchSettings: [
          { placeholder: '请输入账号或操作内容进行查询', type: 'input', value: 'keyword' },
          { placeholder: '查询', type: 'search' }
        ],
        tableHead: [
          { label: '账号', prop: 'account' },
          { label: '机构名称', prop: 'organization' },
          { label: 'IP地址', prop: 'ipAddr' },
          { label: '操作内容', prop: 'operation' },
          { label: '操作时间', prop: 'createTime' }
        ],
        tableDatas: Array(5).fill({
          input: '123'
        }),
        // 搜索按钮 这里要一个参数
        search: async (val?: any) => {
          let size = state.searchs.searchSize
          let current = state.searchs.searchCurrent
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
        }
      })
      onMounted(() => {
        state.search()
      })
      return {
        ...toRefs(state),
        tableDatas
      }
    },
    components: { Elsearch, Eltable }
  })
</script>
<style lang="scss">
  .log {
    .searchCom {
      .el-form {
        justify-content: space-between;
        .el-form-item:last-child {
          width: 10%;
        }
        .el-button {
          width: 100%;
        }
      }
    }
  }
</style>
