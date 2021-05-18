<template>
  <div class="role">
    <Elsearch :searchSettings="searchSettings" @add="add" @search="search" />
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
    <el-dialog :title="title" v-model="delShow" center width="30%">
      <p> 确认删除该角色吗？ 删除前请检查该角色中已无用户，否则无法删除！</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="confirmDel">确认</el-button>
          <el-button @click="delShow = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog :title="title" v-model="dialogShow" center width="30%">
      <el-form :model="dialogData" label-width="auto">
        <el-form-item label="角色名称">
          <el-input v-model="dialogShow.form"></el-input>
        </el-form-item>
        <el-form-item label="设置权限">
          <!-- <template> -->
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          <!-- </template> -->
        </el-form-item>
      </el-form>
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
import { defineComponent, reactive,ref,toRefs,nextTick,onMounted } from 'vue'
import Elsearch from '/@/components/searchCom/searchCom.vue'
import Eltable from '/@/components/tableCom/tableCom.vue'
import { ElMessage } from 'element-plus';
import { Rows } from '/@/types/system/role';
import { searchAll,del} from '/@/api/system/role'
export default defineComponent({
  setup() {
    const tableDatas = ref<Rows>([])
    const row = ref<{ id?: number }>({})
    const state = reactive({
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: ['上海', '北京', '广州', '深圳'],
      isIndeterminate: true,
      title: '',
      dialogShow: false,
      delShow: false,
      searchs: {
        searchCurrent: 1,
        searchSize: 5,
        searchTotal: 999
      },
      searchSettings: [
        { placeholder: '请输入角色名称', type: 'input', value: 'yhmc' },
        {},
        {},
        {},
        { placeholder: '查询', type: 'search' },
        { placeholder: '新增', type: 'add' }
      ],
      tableHead: [
        { label: '角色名称', prop: 'name' },
        { label: '账号数量', prop: 'input' }
      ],
      // tableDatas: Array(5).fill({
      //   input: '123'
      // }),
      tableSettings: [
        { name: '修改', type: 'modify' },
        { name: '删除', type: 'delete' }
      ],
      dialogData: {},
      
      handleCheckAllChange(val:any) {
        const cityOptions:any = ['上海', '北京', '广州', '深圳']
        state.checkedCities = val ? cityOptions : [];
        state.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value:any) {
        let checkedCount = value.length;
        state.checkAll = checkedCount === state.cities.length;
        state.isIndeterminate = checkedCount > 0 && checkedCount < state.cities.length;
      },
      //search
      add: (val: object) => {
        console.log(val)
        state.title = '添加角色'
        state.dialogShow = true
      },
      // 搜索按钮 这里要一个参数
      search: async (val?: object) => {
        let size = state.searchs.searchSize
        let current = state.searchs.searchCurrent
        try{
          const  res  = await searchAll({ ...val, size: size, current: current })
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
      //table
      modify: (val: object) => {
        console.log(val)
        state.title = '修改角色'
        state.dialogShow = true
      },
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
      row
    }
  },
  components: { Elsearch, Eltable }
})
</script>
<style lang="scss">
.role {
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
    .el-dialog {
      .el-dialog__body {
        .el-form {
          .el-form-item {
            .el-form-item__label-wrap {
              .el-form-item__label {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>