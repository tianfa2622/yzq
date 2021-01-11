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
          <el-button @click="delShow = false">确认</el-button>
          <el-button @click="delShow = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog :title="title" v-model="dialogShow" center width="30%">
      <el-form :model="dialogData" label-width="auto">
        <el-form-item label="角色名称">
          <el-input v-model="dialogShow.form"></el-input>
        </el-form-item>
        <el-form-item label="设置权限"> </el-form-item>
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
        { placeholder: '请输入角色名称', type: 'input', value: 'yhmc' },
        {},
        {},
        {},
        { placeholder: '查询', type: 'search' },
        { placeholder: '新增', type: 'add' }
      ],
      tableHead: [
        { label: '角色名称', prop: 'input' },
        { label: '账号数量', prop: 'input' }
      ],
      tableDatas: Array(5).fill({
        input: '123'
      }),
      tableSettings: [
        { name: '修改', type: 'modify' },
        { name: '删除', type: 'delete' }
      ],
      dialogData: {},
      //search
      add: (val: object) => {
        console.log(val)
      },
      search: (val: object) => {
        console.log(val)
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