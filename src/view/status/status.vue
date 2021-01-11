<template>
  <div class="status">
    <h2 class="title">{{ $route.matched[1].name }}</h2>
    <main>
      <div class="l">
        <div class="bar">
          <h3>设备在线率统计</h3>
          <div id="statusBar"></div>
        </div>
      </div>
      <img src="/src/assets/statistical/u196.png" alt="" />
      <div class="r">
        <div class="pie">
          <h3>设备总数量统计</h3>
          <div id="statusPie"></div>
        </div>
      </div>
    </main>
    <Elsearch :searchSettings="searchSettings" @add="add" @search="search" />
    <Eltable
      :tableHead="tableHead"
      :tableDatas="tableDatas"
      :operateShow="true"
      :search="searchs"
    />
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
      searchs: {
        searchCurrent: 1,
        searchSize: 5,
        searchTotal: 999
      },
      searchSettings: [
        { placeholder: '请输入设备标识', type: 'input', value: 'yhmc' },
        { placeholder: '请输入设备状态', type: 'input', value: 'yhmc' },
        { placeholder: '请输入安装地点', type: 'input', value: 'yhmc' },
        { placeholder: '搜索', type: 'add' },
        { placeholder: '重置', type: 'search' }
      ],
      tableHead: [
        { label: '设备标识', prop: 'input' },
        { label: '设备状态', prop: 'input' },
        { label: '状态采集日期', prop: 'input' },
        { label: '安装地点', prop: 'input' }
      ],
      tableDatas: Array(5).fill({
        input: '123'
      }),
      //search
      add: (val: object) => {
        console.log(val)
      },
      search: (val: object) => {
        console.log(val)
      },
      //echarts
      bar: () => {
        let option = {}
        const Chart = echarts.init(document.getElementById('statusBar') as HTMLCanvasElement)
        option = {
          color: ['#72DDB3', '#818B81'],
          xAxis: {
            show: false
          },
          yAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#000'
              }
            },
            data: [
              '万家丽广场地铁站',
              '锦泰广场地铁站',
              '锦泰广场城轨站',
              '芙蓉区政府地铁站',
              '马王堆地铁站'
            ]
          },
          grid: {
            left: '1%',
            right: '1%',
            bottom: '10%',
            containLabel: true
          },
          legend: {
            textStyle: {
              color: '#000'
            },
            top: '5%',
            data: ['在线', '离线']
          },
          series: [
            {
              name: '在线',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
                formatter: '{c}%'
              },
              emphasis: {
                focus: 'series'
              },
              data: [80, 40, 50, 10, 80]
            },
            {
              name: '离线',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
                formatter: '{c}%',
                color: '#fff'
              },
              emphasis: {
                focus: 'series'
              },
              data: [20, 60, 50, 90, 20]
            }
          ]
        }
        option && Chart.setOption(option)
      },
      pie: () => {
        let option = {}
        const Chart = echarts.init(document.getElementById('statusPie') as HTMLCanvasElement)
        option = {
          color: ['#72DDB3', '#818B81'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            top: '5%',
            textStyle: {
              color: '#000'
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '60%',
              label: {
                position: 'inside',
                formatter: '{d}%',
                color: '#000'
              },
              data: [
                { value: 1048, name: '在线' },
                { value: 735, name: '离线' }
              ]
            }
          ]
        }
        option && Chart.setOption(option)
      }
    })
    onMounted(() => {
      state.bar()
      state.pie()
    })
    return state
  },
  components: { Elsearch, Eltable }
})
</script>
<style lang="scss">
.status {
  main {
    width: 100%;
    display: flex;
    .l,
    .r {
      width: calc(100% - 0.01rem);
      h3 {
        width: 1.2rem;
        height: 0.4rem;
        border-bottom: 1px solid #ccc;
        margin-bottom: 0.1rem;
        color: #fff;
      }
    }
    .l {
      .bar {
        width: 60%;
        margin: 0.2rem auto 0;
        #statusBar {
          width: 100%;
          height: 4rem;
          float: right;
          background: #fff;
          border-radius: 0.2rem;
        }
      }
    }
    .r {
      justify-content: flex-start;
      padding-left: 0.2rem;
      box-sizing: border-box;
      h3 {
        margin: 0.1rem 0;
      }
      .pie {
        width: 60%;
        margin: 0.2rem auto 0;
        #statusPie {
          width: 100%;
          height: 4rem;
          background: #fff;
          border-radius: 0.2rem;
        }
      }
    }
  }
  .searchCom {
    width: 80%;
    margin: 0.2rem auto 0;
  }
  .tableCom {
    width: 80%;
    margin: 0.2rem auto 0;
  }
}
</style>