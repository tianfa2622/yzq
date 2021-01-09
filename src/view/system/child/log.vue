<template>
  <div class="log">
    <Elsearch :searchSettings="searchSettings" @search="search" />
    <Eltable
      :tableHead="tableHead"
      :tableDatas="tableDatas"
      :search="searchs"
      :operateShow="true"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Elsearch from '/@/components/searchCom/searchCom.vue'
import Eltable from '/@/components/tableCom/tableCom.vue'
export default defineComponent({
  setup() {
    const state = reactive({
      searchs: {
        searchCurrent: 1,
        searchSize: 5,
        searchTotal: 999
      },
      searchSettings: [
        { placeholder: '请输入账号或操作内容进行查询', type: 'input', value: 'yhmc' },
        { placeholder: '查询', type: 'search' }
      ],
      tableHead: [
        { label: '账号', prop: 'input' },
        { label: '机构名称', prop: 'input' },
        { label: 'IP地址', prop: 'input' },
        { label: '操作内容', prop: 'input' },
        { label: '操作时间', prop: 'input' }
      ],
      tableDatas: Array(5).fill({
        input: '123'
      }),
      search: (val: object) => {
        console.log(val)
      }
    })
    return state
  },
  components: { Elsearch, Eltable }
})
</script>
<style lang="scss">
.log {
  .searchCom {
    .el-form {
      justify-content: space-between;
      .el-form-item:last-child{
        width: 10%;
      }
      .el-button{
        width: 100%;
      }
    }
  }
}
</style>