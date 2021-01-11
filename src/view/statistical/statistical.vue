<template>
  <div class="statistical">
    <h2 class="title">{{ $route.matched[1].name }}</h2>
    <main>
      <div class="l">
        <Elsearch :searchSettings="searchSettings" @search="search" />
        <div class="line">
          <h3>每日过检包裹统计</h3>
          <div id="statisticalLine"></div>
          <p>包裹总数：<span>884件</span></p>
        </div>
      </div>
      <img src="/src/assets/statistical/u196.png" alt="" />
      <div class="r">
        <div style="width: 100%; height: 0.41rem">
          <el-button @click="detailed">导出</el-button>
        </div>
        <div class="bar">
          <h3>报警类型统计</h3>
          <div id="statisticalBar"></div>
          <p>报警总数：<span>88</span></p>
        </div>
      </div>
    </main>
    <el-dialog :title="title" v-model="dialogShow" center width="60%">
      <Eltable
        :tableHead="tableHead"
        :tableDatas="tableDatas"
        :search="searchs"
        :operateShow="true"
      />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
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
        { placeholder: '请选择时间', label: '时间段：', type: 'data', value: 'yhmc' },
        { placeholder: '搜索', type: 'search' }
      ],
      tableHead: [
        { label: '时间', prop: 'input' },
        { label: '包裹数', prop: 'input' },
        { label: '报警数', prop: 'input' },
        { label: '制式手枪数量', prop: 'input' },
        { label: '非制式手枪数量', prop: 'input' },
        { label: '制式步枪数量', prop: 'input' },
        { label: '非制式步枪数量', prop: 'input' }
      ],
      tableDatas: Array(5).fill({
        input: '123'
      }),
      tableSettings: [
        { name: '修改', type: 'modify' },
        { name: '删除', type: 'delete' }
      ],
      dialogSearch: [
        {
          placeholder: '请输入枪支编码',
          label: '枪支及其零部件编码',
          type: 'input',
          value: 'yhmc'
        },
        {
          placeholder: '请输入枪支类型',
          label: '枪支类型',
          type: 'input',
          value: 'yhmc'
        },
        {
          placeholder: '请输入枪支型号',
          label: '枪支型号',
          type: 'input',
          value: 'yhmc'
        },
        { placeholder: '请输入枪支名称', label: '枪支名称', type: 'input', value: 'yhmc' }
      ],
      //search
      search: (val: object) => {
        console.log(val)
      },
      detailed: () => {
        state.title = '导出数据预览列表'
        state.dialogShow = true
      },
      //echarts
      line: () => {
        let option = {}
        const Chart = echarts.init(document.getElementById('statisticalLine') as HTMLCanvasElement)
        option = {
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#000'
              }
            },
            data: ['8-27', '8-28', '8-29', '8-30', '8-31', '9-1', '9-2']
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#000'
              }
            }
          },
          series: [
            {
              label: {
                show: true,
                position: 'top'
              },
              data: [972, 608, 874, 208, 939, 665, 974],
              type: 'line'
            }
          ]
        }
        option && Chart.setOption(option)
      },
      bar: () => {
        let option = {}
        const Chart = echarts.init(document.getElementById('statisticalBar') as HTMLCanvasElement)
        option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            bottom: '5%',
            right: '0',
            orient: 'vertical',
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '70%'],
              label: {
                position: 'inside',
                formatter: '{c}'
              },
              data: [
                { value: 1048, name: '制式手枪' },
                { value: 735, name: '非制式手枪' },
                { value: 580, name: '制式步枪' },
                { value: 484, name: '非制式步枪' }
              ]
            }
          ]
        }
        option && Chart.setOption(option)
      }
    })
    onMounted(() => {
      state.line()
      state.bar()
    })
    return state
  },
  components: { Elsearch, Eltable }
})
</script>
<style lang="scss">
.statistical {
  main {
    width: 100%;
    height: calc(100% - 0.34rem);
    display: flex;
    .l,
    .r {
      display: flex;
      flex-wrap: wrap;
      width: calc(100% - 0.01rem);
      h3,
      p {
        width: 100%;
        color: #fff;
      }
      h3 {
        width: 1.2rem;
        height: 0.4rem;
        border-bottom: 1px solid #ccc;
        margin-bottom: 0.1rem;
      }
      p {
        span {
          color: #00f3ff;
        }
      }
    }
    .l {
      justify-content: flex-end;
      .searchCom {
        height: 0.41rem;
        .el-form {
          justify-content: flex-end;
          .el-form-item:first-child {
            width: 40%;
          }
        }
      }
      .line {
        width: 50%;
        margin: 0.1rem auto;
        #statisticalLine {
          width: 100%;
          height: 4rem;
          float: right;
          background: #fff;
          border-radius: 0.2rem;
          margin-bottom: 0.1rem;
        }
      }
    }
    .r {
      justify-content: flex-start;
      padding-left: 0.2rem;
      box-sizing: border-box;
      .el-button {
        width: 1rem;
        height: 0.41rem;
        background-color: #053c43;
        margin-bottom: 0.2rem;
        span {
          color: #00f3ff;
        }
      }
      p {
        text-align: left;
      }
      h3 {
        margin: 0.1rem 0;
      }
      .bar {
        width: 50%;
        margin: 0.1rem auto;
        #statisticalBar {
          width: 100%;
          height: 4rem;
        }
      }
    }
  }
  .el-overlay {
    .el-dialog {
      .el-dialog__body {
        padding-bottom: 0.2rem !important;
        box-sizing: border-box;
      }
    }
  }
}
</style>