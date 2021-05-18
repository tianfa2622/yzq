<template>
  <div class="tableCom">
    <el-table
      :data="tableDatas"
      border
      :header-cell-style="{
        color: '#fff',
        textAlign: 'center',
        background: '#194F5D'
      }"
      :cell-style="{
        color: '#00F3FF',
        textAlign: 'center',
        background: '#081D27',
      }"
    >
      <el-table-column label="序号" width="auto">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in tableHead"
        :formatter='item.formatter'
        :key="index"
      >
      </el-table-column>
      <el-table-column label="操作" width="auto" v-if="!operateShow">
        <template #default="scope">
          <div v-for="(item, index) in tableSettings" :key="index">
            <el-button
              size="mini"
              type="text"
              v-if="item.type === 'modify'"
              @click="handleModify(scope.row)"
              >{{ item.name }}</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="item.type === 'delete'"
              @click="handleDelete(scope.row)"
              >{{ item.name }}</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="item.type === 'detailed'"
              @click="handleDetailed(scope.row)"
              >{{ item.name }}</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="item.type === 'custom'"
              @click="handleCustom(scope.row)"
              >{{ item.name }}</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search.searchCurrent"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="search.searchSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="search.searchTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
export default defineComponent({
  props: {
    tableHead: Array,
    tableDatas: Array,
    tableSettings: Array,
    operateShow: Boolean,
    search: Object
  },
  setup(props, { emit }) {
    const state = reactive({
      handleModify: (row: any) => {
        emit('modify', row)
      },
      handleDelete: (row: any) => {
        emit('del', row)
      },
      handleDetailed: (row: any) => {
        emit('detailed', row)
      },
      handleCustom: (row: any) => {
        emit('custom', row)
      },
      handleSizeChange: (val: number) => {
        emit('sizeChange', val)
      },
      handleCurrentChange: (val: number) => {
        emit('currentChange', val)
      }
    })
    onMounted(() => {})
    return state
  }
})
</script>
<style lang="scss">
.tableCom {
  width: 100%;
  margin-top: 0.1rem;
  .block {
    margin-top: 0.2rem;
    .el-pagination {
      justify-content: flex-end;
      display: flex;
      position: relative;
      span,
      input {
        color: #fff;
      }
      .el-pagination__total {
        position: absolute;
        left: 0;
      }
      .el-pagination__sizes {
        .el-select {
          .el-input {
            input {
              background-color: #053C43;
              border: none;
            }
          }
        }
      }
      .el-pagination__jump {
        .el-input {
          input {
            background-color: #053C43;
            border: none;
          }
        }
      }
      .btn-prev,
      .btn-next,
      .el-pager .number {
        background-color: #053C43;
        color: #fff;
      }
    }
  }
}
.el-table__row td:last-of-type {
  .cell {
    display: flex;
    justify-content: space-around;
  }
}
.el-table::before {
  height: 0px !important;
}

/* 解决饿了么ui 滚动闪烁BOG */
.el-table__footer-wrapper,
.dkcard .el-table {
  /* overflow: auto !important; */
  width: calc(100% - 2px) !important;
}
.el-table__body,
.el-table__footer,
.el-table__header {
  width: calc(100% - 2px) !important;
}
.el-table th.gutter {
  /*解决el-table加了gutter后 边框出现白边*/
  display: table-cell !important;
}
</style>