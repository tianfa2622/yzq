<template>
  <div class="sample">
    <h2 class="title">{{ $route.matched[1].name }}</h2>
    <main>
      <div class="l">
        <h3>各单位录入样本数统计</h3>
        <div class="bar">
          <div id="sampleBar"></div>
        </div>
        <Elsearch
          :searchSettings="searchSettings"
          :searchBtn="searchBtn"
          @add="add"
          @search="search"
          @uploading="uploading"
        />
      </div>
      <img src="/src/assets/statistical/u196.png" alt="" />
      <div class="r">
        <div class="rTitle">
          <img src="/src/assets/statistical/u62.png" alt="" />
          <img src="/src/assets/statistical/u34.png" alt="" />
          <h3>
            <p>总样本数</p>
            <p><span>{{ybtotal}}</span> 个</p>
          </h3>
        </div>
        <img src="/src/assets/statistical/u961.png" alt="" />
      </div>
    </main>
    <footer>
      <Eltable
        :tableHead="tableHead"
        :tableDatas="tableDatas"
        :tableSettings="tableSettings"
        :search="searchs"
        @del="del"
        @modify="modify"
        @detailed="detailed"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
      />
    </footer>
    <el-dialog :title="title" v-model="dialogShow" center width="30%">
      <ul>
        <template v-for="(item, index) in dialog" :key="index">
          <li v-if="item.type == 'img'">
            <span>{{ item.label }}</span>
            <img :src="item.value" alt="" />
          </li>
          <li v-else>
            <span>{{ item.label }}</span>
            <span>{{ item.value }}</span>
          </li>
        </template>
      </ul>
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
import { defineComponent, reactive, onMounted ,ref, toRefs} from 'vue'
import * as echarts from 'echarts'
import Elsearch from '/@/components/searchCom/searchCom.vue'
import Eltable from '/@/components/tableCom/tableCom.vue'
import { searchAll,searchOne,searchTp,searchYbstj,searchYbzs,update,uploadTp,del,insert} from '/@/api/sample/index'
import { ElMessage } from 'element-plus';
import { Rows } from '../../types/sample';
export default defineComponent({
  setup() {
    const tableDatas = ref<Rows>([])
    const row = ref<{ id?: number }>({})
    const ybstj = ref<{lrdw?:any,ybths?:any}>({})
    const state = reactive({
      title: '',
      ybtotal: 0,
      dialogShow: false,
      delShow:false,
      searchs: {
        searchCurrent: 1,
        searchSize: 5,
        searchTotal: 999
      },
      searchSettings: [
        { placeholder: '请输入枪支名称', type: 'input', value: 'qzmc' },
        { placeholder: '请输入枪支类型', type: 'input', value: 'qzlx' },
        { placeholder: '请输入录入人员', type: 'input', value: 'lrly' },
        { placeholder: '请输入录入单位', type: 'input', value: 'lrdw' },
        { placeholder: '请输入录入时间 ', type: 'input', value: 'lrsj' },
        { placeholder: '搜索', type: 'search' }
      ],
      searchBtn: [
        {
          name: '添加',
          type: 'add'
        },
        {
          name: '重置',
          type: 'reset'
        },
        {
          name: '导入',
          type: 'uploading'
        }
      ],
      tableHead: [
        { label: '枪支名称', prop: 'qzmc' },
        { label: '枪支类型', prop: 'qzlx' },
        { label: '录入人员', prop: 'lrly' },
        { label: '录入单位', prop: 'lrdw' },
        { label: '录入时间', prop: 'lrsj' }
      ],
      tableDatas: [],
      tableSettings: [
        { name: '详情', type: 'detailed' },
        { name: '修改', type: 'modify' },
        { name: '删除', type: 'delete' }
      ],
      dialog: [
        { label: '枪支名称：', value: 'M16A4自动步枪' },
        { label: '枪支类型：', value: '制式步枪' },
        {
          label: 'X光样本图片：',
          value:
            'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3643522243,75988123&fm=26&gp=0.jpg',
          type: 'img'
        },
        {
          label: '可见光样本图片：',
          value:
            'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2875406890,2670815530&fm=26&gp=0.jpg',
          type: 'img'
        },
        { label: '样本类型：', value: '图片' },
        { label: '录入人员：', value: '张三' },
        { label: '录入人员：', value: '张三' },
        { label: '录入单位：', value: '万家丽分局' },
        { label: '录入时间：', value: '2020-09-10 10:09:11' }
      ],
      //search
      add: (val: object) => {
        console.log(val)
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
      searchYbzs:async()=>{
        const  res  = await searchYbzs()
        state.ybtotal=res.data
      },
      searchYbstj:async()=>{
        try {
          const  res  = await searchYbstj()
          let lrdwdata:any = [],ybtjsdata:any=[]
          res.data.forEach((item:any) => {
            lrdwdata.push(item.lrdw)
            ybtjsdata.push(item.ybths)
          });
          ybstj.value.lrdw=lrdwdata
          ybstj.value.ybths=ybtjsdata
        } catch (error) {
          console.log(error)
        }
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
      modify: (val: object) => {
        console.log(val)
      },
      detailed: (val: object) => {
        console.log(val)
        state.title = '样本详情'
        state.dialogShow = true
      },
      //echarts
      bar: () => {
        let option = {}
        const Chart = echarts.init(document.getElementById('sampleBar') as HTMLCanvasElement)
        option = {
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            },
            // data: [
            //   '省厅',
            //   '岳麓区分局',
            //   '芙蓉区分局',
            //   '望城区分区',
            //   '天心区分局',
            //   '雨花区分局',
            //   '长沙县',
            //   '宁乡市',
            //   '浏阳市'
            // ]
            data:ybstj.value.lrdw
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#ccc'
              }
            }
          },
          series: [
            {
              // data: [120, 200, 150, 80, 70, 110, 130, 20, 50],
              data: ybstj.value.ybths,
              type: 'bar'
            }
          ]
        }
        option && Chart.setOption(option)
      }
    })
    onMounted(() => {
      state.bar()
      state.search()
      state.searchYbzs()
      state.searchYbstj()
    })
    return {
      ...toRefs(state),
      ybstj,
      tableDatas
    }
  },
  components: { Elsearch, Eltable }
})
</script>
<style lang="scss">
.sample {
  main {
    width: 100%;
    display: flex;
    .l {
      width: 70%;
      padding: 0.2rem;
      box-sizing: border-box;
      h3 {
        width: 1.8rem;
        height: 0.4rem;
        border-bottom: 1px solid #ccc;
        text-align: center;
        color: #fff;
        font-size: 0.16rem;
      }
      .bar {
        width: 100%;
        height: 4rem;
        margin-top: 0.2rem;
        #sampleBar {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 0.2rem;
        }
      }
      .searchCom {
        margin-top: 0.2rem;
        .el-form {
          .el-form-item {
            width: 16.6%;
          }
        }
      }
    }
    .r {
      width: calc(100% - 70%);
      padding-top: 2rem;
      box-sizing: border-box;
      .rTitle {
        width: 60%;
        height: 1rem;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        background: url('/src/assets/statistical/u24.png') no-repeat center center;
        background-size: 100% 100%;
        padding: 0.2rem 0.5rem 0.2rem 0.8rem;
        box-sizing: border-box;
        img:first-child {
          width: 0.5rem;
          height: 0.5rem;
        }
        img:nth-child(2) {
          width: 0.01rem;
          height: 100%;
        }
        img {
          vertical-align: middle;
          display: inline-block;
          margin-right: 0.2rem;
        }
        h3 {
          line-height: 0.4rem;
          text-align: center;
          font-size: 0.16rem;
          p {
            width: 100%;
            height: 0.2rem;
          }
          p {
            color: #02aae1;
            span {
              color: #fff;
            }
          }
        }
      }
      img:last-child {
        width: 100%;
        height: 0.01rem;
        margin-top: 0.4rem;
      }
    }
  }
  .el-overlay {
    .el-dialog {
      .el-dialog__body {
        ul {
          width: 100%;
          li {
            display: flex;
            margin-bottom: 0.1rem;
            span:first-child {
              width: 1.2rem;
              color: #fff;
              display: block;
              text-align: right;
              white-space: nowrap;
            }
            span:last-child {
              color: #00f3ff;
            }
            img {
              width: 50%;
              height: 2rem;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}
</style>