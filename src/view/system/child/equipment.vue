<template>
  <div class="equipment">
    <Elsearch :searchSettings="searchSettings" @add="add" @search="search" @download="download" />
    <Eltable
      :tableHead="tableHead"
      :tableDatas="tableDatas"
      :tableSettings="tableSettings"
      :search="searchs"
      @modify="modify"
      @detailed="detailed"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
    <el-dialog :title="title" v-model="modifyDialog" center>
      <Elsearch ref="modifyForm" :searchSettings="dialogSearch[0]" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="modifyconfirm">保存</el-button>
          <el-button @click="modifycancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog custom-class="dialog" :title="title" v-model="dialogShow" center>
      <div class="l">
        <Elsearch :searchSettings="dialogSearch[1]" />
      </div>
      <div class="r">
        <el-form :model="form" label-width="auto">
          <el-form-item label="操作类型">
            <el-select v-model="form.czlx" placeholder="请选择操作类型">
              <el-option label="订阅" value="0"></el-option>
              <el-option label="取消订阅" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订阅执行状态">
            <span v-if="form.dyzt == 1">未订阅</span>
            <span v-else>订阅</span>
          </el-form-item>
          <Elsearch v-if="form.dyzt == 1" :searchSettings="dialogSearch[2]" />
        </el-form>
      </div>
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
import { defineComponent, reactive,ref,toRefs,nextTick ,onMounted} from 'vue'
import Elsearch from '/@/components/searchCom/searchCom.vue'
import Eltable from '/@/components/tableCom/tableCom.vue'
import { ElMessage } from 'element-plus';
import { Rows } from '/@/types/system/equipment';
import { searchAll,update,RegDevice} from '/@/api/system/equipment'
export default defineComponent({
  setup() {
    const tableDatas = ref<Rows>([])
    const modifyForm = ref<InstanceType<typeof Elsearch>>()
    const state = reactive({
      form: {},
      title: '',
      dialogShow: false,
      modifyDialog: false,
      searchs: {
        searchCurrent: 1,
        searchSize: 5,
        searchTotal: 999
      },
      searchSettings: [
        { placeholder: '请输入安装地点', type: 'input', value: 'azddXzqhdm' },
        { placeholder: '请输入设备标识', type: 'input', value: 'sbbs' },
        { placeholder: '请输入设备名称', type: 'input', value: 'sbmc' },
        {},
        { placeholder: '查询', type: 'search' },
        { placeholder: '注册', type: 'add' }
      ],
      tableHead: [
        { label: '安装地点', prop: 'azddXzqhdm' },
        { label: '是否包含下级', prop: ' sfbhxjdm',
        formatter:function(row:any){
          switch (row.sfbhxjdm) {
            case true:
              return '是'
            case false:
              return '否'
              }
        } 
        },
        { label: '设备标识', prop: 'sbbs' },
        { label: '设备生产商名称', prop: 'sbscsmc' },
        { label: '设备型号', prop: 'sbxh' },
        { label: '设备类型', prop: 'sblxdm',formatter:function(row:any){
          switch (row.sblxdm) {
            case 0:
              return '智能分析仪'
            case 1:
              return '智能安检机'
            case 2:
              return '其他'
            default: 
              return row.sblxdm
              }
        }  },
        { label: '应用场景', prop: 'yycjdm',formatter:function(row:any){
          switch (row.yycjdm) {
            case 0:
              return '公安检查站'
            case 1:
              return '火车站'
            case 2:
              return '汽车站'
            default: 
              return row.yycjdm
              }
        }  },
        { label: '地球经度', prop: 'dqjd' },
        { label: '地球纬度', prop: 'dqwd' }
      ],
      // tableDatas: Array(5).fill({
      //   input: '123'
      // }),
      tableSettings: [
        { name: '修改', type: 'modify' },
        { name: '订阅详情', type: 'detailed' }
      ],
      dialogSearch: [
        [
          { label: '安装地点', placeholder: '请输入安装地点', type: 'input',value: 'azddXzqhdm' },
          {
            label: '是否包含下级',
            type: 'radio',value: 'sfbhxjdm',
            options: [
              { label: '是', value: true },
              { label: '否', value: false }
            ]
          },
          { label: '设备标识', placeholder: '请输入设备标识', type: 'input',value: 'sbbs' },
          { label: '设备名称', placeholder: '请输入设备名称', type: 'input' ,value: 'sbmc'},
          { label: '设备生产商名称', placeholder: '请输入设备生产商名称', type: 'input' ,value: 'sbscsmc'},
          { label: '设备型号', placeholder: '请输入设备型号', type: 'input',value: 'sbxh' },
          {
            label: '设备类型',
            placeholder: '请输入设备类型',
            type: 'select',value: 'sblxdm',
            options: [
              { label: '智能分析仪', value: 0 },
              { label: '智能安检机', value: 1 },
              { label: '其他', value: 2 }
            ]
          },
          {
            label: '应用场景',
            placeholder: '请输入应用场景',
            type: 'select',value: 'yycjdm',
            options: [
              { label: '公安检查站', value: 0 },
              { label: '火车站', value: 1 },
              { label: '汽车站', value: 2 }
            ]
          },
          { label: '地球经度', placeholder: '请输入地球经度', type: 'input',value: 'dqjd' },
          { label: '地球纬度', placeholder: '请输入地球纬度', type: 'input',value: 'dqwd' }
        ],
        [
          { label: '订阅标题', placeholder: '请输入订阅标题', type: 'input',value: 'dybt' },
          { label: '订阅类别', placeholder: '请输入订阅类别', type: 'input',value: 'dylb' },
          { label: '订阅资源路径', placeholder: '请输入订阅资源路径', type: 'input',value: 'dyzylj' },
          {
            label: '申请人姓名',
            placeholder: '请输入申请人姓名',
            type: 'select',value: 'sqrxm',
            options: [
              { label: '张三', value: 0 },
              { label: '张三', value: 1 },
              { label: '张三', value: 2 }
            ]
          },
          {
            label: '申请人单位名称',
            placeholder: '请输入申请人单位名称',
            type: 'select',value: 'sqrdwmc',
            options: [
              { label: '岳麓区公安局', value: 0 },
              { label: '天心区公安局', value: 1 }
            ]
          },
          { label: '开始时间', type: 'data',value: 'kssj' },
          { label: '结束时间', type: 'data',value: 'jssj' },
          { label: '信息接收地址', placeholder: '请输入信息接收地址', type: 'input',value: 'xxjsdz' },
          { label: '信息上报间隔时间', placeholder: '请输入信息上报间隔时间', type: 'input',value: 'xxsbjgsj' },
          { label: '理由', placeholder: '请输入订阅理由', type: 'textarea',value: 'ly' }
        ],
        [
          {
            label: '订阅取消单位',
            placeholder: '请输入订阅取消单位',
            type: 'select',value: 'dyqxdw',
            options: [
              { label: '岳麓区公安局', value: 0 },
              { label: '天心区公安局', value: 1 }
            ]
          },
          {
            label: '订阅取消人',
            placeholder: '请输入订阅取消人',
            type: 'select',value: 'dyqxrxm',
            options: [
              { label: '张三', value: 0 },
              { label: '张三', value: 1 },
              { label: '张三', value: 2 }
            ]
          },
          { label: '取消时间', type: 'data',value: 'qxsj' },
          { label: '取消原因', placeholder: '请输入取消原因', type: 'textarea' ,value: 'qxyy'}
        ]
      ],
      //search
      add: (val: object) => {
        state.title = "注册信息"
        state.modifyDialog = true
      },
      // 搜索按钮 这里要一个参数
      search: async (val?: any) => {
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
      download: (val: object) => {
        console.log(val)
      },
      //table
      detailed: (val: object) => {
        console.log(val)
        state.title = '订阅详情'
        state.dialogShow = true
      },
      modify: (val: any) => {
        console.log(val)
        state.title = '修改信息'
        state.modifyDialog = true
        nextTick(() => {
            if (modifyForm.value) {
              modifyForm.value.formDatas = { ...val }
            }
          })
      },
      RegDevice: async (data:any)=>{
        try{
          const  res  = await RegDevice(data)
            ElMessage.success({
              message: '添加成功',
              type: 'success'
            })
            state.modifyDialog = false
            modifyForm.value?.reset()
            state.search()
        } catch (err) {
          console.log(err)
        }
      },
      updateAPI: async (data: any) => {
        try {
          const  res  = await update({...data})
          ElMessage.success({
            message: res.message || '修改成功',
            type: 'success'
          })
          state.modifyDialog = false
          modifyForm.value?.reset()
          state.search()
        } catch (err) {
          console.log(err)
        }
        // loading = false
      },
      modifyconfirm:()=>{
        if (modifyForm.value) {
          const data: object = modifyForm.value.formDatas
          modifyForm.value.validate(async (valid: boolean) => {
            // console.log(valid)
            switch (state.title) {
              case '注册信息':
                state.RegDevice(data)
                break
              case '修改信息':
                state.updateAPI(data)
                break
              default:
                break
            }
          })
        }
      },
      modifycancel:()=>{
        state.modifyDialog = false
        setTimeout(() => {
          if (modifyForm.value) {
            modifyForm.value.reset()
          }
        }, 1000);
      }
    })
    onMounted(()=>{
      state.search()
    })
    return {
      ...toRefs(state),
      tableDatas,
      modifyForm
    }
  },
  components: { Elsearch, Eltable }
})
</script>
<style lang="scss">
.equipment {
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
    .dialog {
      .el-dialog__body {
        display: flex;
        justify-content: space-between;
        .l,
        .r {
          width: 50%;
        }
        .l {
          .searchCom {
            .el-form {
              .el-form-item {
                width: 80%;
              }
            }
          }
        }
        .r {
          .el-form {
            margin-top: 0.2rem;
            .searchCom,
            .searchCom > .el-form {
              margin: 0;
            }
            .el-form-item {
              width: 80% !important;
              .el-form-item__label-wrap {
                .el-form-item__label {
                  color: #fff;
                }
              }
              .el-form-item__content {
                span{
                  color: #fff;
                }
                .el-select {
                  width: 90%;
                  .el-input {
                    width: 100%;
                    input {
                      background-color: #072e37;
                      color: #fff;
                      border-width: 2px;
                      border-style: inset;
                      border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
                    }
                    input::placeholder {
                      color: #00f3ff;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>