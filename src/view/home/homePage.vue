<template>
  <div class="homePage">
    <header>
      <div class="rTitle">
        <img src="/src/assets/statistical/u56.png" alt="" />
        <img src="/src/assets/statistical/u34.png" alt="" />
        <h3>
          <p>报警数量</p>
          <p><span>5</span> 次</p>
        </h3>
      </div>
      <div class="rTitle">
        <img src="/src/assets/statistical/u58.png" alt="" />
        <img src="/src/assets/statistical/u34.png" alt="" />
        <h3>
          <p>过检包裹数</p>
          <p><span>200</span> 个</p>
        </h3>
      </div>
      <div class="rTitle">
        <img src="/src/assets/statistical/u60.png" alt="" />
        <img src="/src/assets/statistical/u34.png" alt="" />
        <h3>
          <p>在线设备数<span>5</span> 个</p>
          <p>离线设备数<span>2</span> 个</p>
        </h3>
      </div>
      <div class="rTitle">
        <img src="/src/assets/statistical/u62.png" alt="" />
        <img src="/src/assets/statistical/u34.png" alt="" />
        <h3>
          <p>已录入样本数</p>
          <p><span>200</span> 个</p>
        </h3>
      </div>
    </header>
    <main>
      <div class="l">
        <div class="bar">
          <h3>报警统计</h3>
          <div id="homePageBar"></div>
        </div>
        <div class="line">
          <h3>每日过检包裹统计</h3>
          <div id="homePageLine"></div>
        </div>
      </div>
      <img src="/src/assets/statistical/u196.png" alt="" />
      <div class="map">
        <Elsearch :searchSettings="searchSettings" />
        <div id="homePageMap"></div>
      </div>
      <img src="/src/assets/statistical/u196.png" alt="" />
      <div class="r">
        <div class="table">
          <h3>报警公告栏</h3>
          <el-table
            :data="tableDatas"
            :header-cell-style="{
              color: '#fff',
              textAlign: 'center',
              background: '#194F5D'
            }"
            :cell-style="{
              textAlign: 'center',
              padding: '0'
            }"
            :row-style="{ height: '.4rem' }"
          >
            > >
            <el-table-column
              :prop="item.prop"
              :label="item.label"
              v-for="(item, index) in tableHead"
              :key="index"
            />
          </el-table>
        </div>
        <div class="pie">
          <h3>报警原因</h3>
          <div id="homePagePie"></div>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
import Elsearch from '/@/components/searchCom/searchCom.vue'
export default defineComponent({
  setup() {
    const state = reactive({
      searchs: {
        searchCurrent: 1,
        searchSize: 5,
        searchTotal: 999
      },
      tableHead: [
        { label: '报警点名称', prop: 'input' },
        { label: '报警时间', prop: 'input' }
      ],
      tableDatas: Array(5).fill({
        input: '123'
      }),
      searchSettings: [
        {
          placeholder: '请选择',
          type: 'select',
          value: 'yhmc',
          options: [{ label: '芙蓉区', value: 0 }]
        },
        {
          placeholder: '请选择',
          type: 'select',
          value: 'yhmc',
          options: [
            { label: '万家丽地铁站', value: 0 },
            { label: '万家丽地铁站', value: 1 },
            { label: '万家丽地铁站', value: 2 }
          ]
        },
        { placeholder: '请输入地点', type: 'input', value: 'yhmc' },
        { placeholder: '搜索', type: 'search' }
      ],
      bar: () => {
        let option = {}
        const Chart = echarts.init(document.getElementById('homePageBar') as HTMLCanvasElement)
        option = {
          xAxis: {
            type: 'category',
            data: ['2月', '3月', '4月', '5月', '6月', '7月', '8月'],
            axisLine: {
              lineStyle: {
                color: '#00F3FF'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#00F3FF'
              }
            }
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar'
            }
          ]
        }
        option && Chart.setOption(option)
      },
      line: () => {
        let option = {}
        const Chart = echarts.init(document.getElementById('homePageLine') as HTMLCanvasElement)
        option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['8-27', '8-28', '8-29', '8-30', '9-1', '9-2'],
            axisLine: {
              lineStyle: {
                color: '#00F3FF'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#00F3FF'
              }
            }
          },
          series: [
            {
              data: [820, 932, 10, 934, 1290, 1330],
              type: 'line',
              areaStyle: {}
            }
          ]
        }
        option && Chart.setOption(option)
      },
      map: () => {
        const map = new BMap.Map('homePageMap')
        const point = new BMap.Point(113.03856861181319, 28.196422377752548)
        map.centerAndZoom(point, 15)
        map.enableScrollWheelZoom(true)
      },
      pie: () => {
        let option = {}
        const Chart = echarts.init(document.getElementById('homePagePie') as HTMLCanvasElement)
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
      state.bar()
      state.line()
      state.map()
      state.pie()
    })
    return state
  },
  components: { Elsearch }
})
</script>
<style lang="scss">
.homePage {
  header {
    display: flex;
    justify-content: space-around;
    margin-top: 0.2rem;
    .rTitle {
      width: 20%;
      height: 1rem;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      background: url('/src/assets/statistical/u24.png') no-repeat center center;
      background-size: 100% 100%;
      padding: 0.2rem 0.5rem 0.2rem 0.6rem;
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
          text-align: left;
        }
        p {
          color: #02aae1;
          span {
            color: #fff;
          }
        }
      }
    }
  }
  main {
    width: 100%;
    height: calc(100% - 1.2rem);
    display: flex;
    padding: 0.2rem;
    box-sizing: border-box;
    .l,
    .r {
      width: 30%;
      height: 100%;
      h3 {
        width: 1rem;
        height: 0.3rem;
        line-height: 0.3rem;
        color: #fff;
        font-size: 0.16rem;
        border-bottom: 1px solid #ccc;
        text-align: center;
      }
    }
    img {
      width: 0.01rem;
      height: 100%;
    }
    .map {
      width: calc(40% - 0.2rem);
      height: 100%;
      padding: 0.2rem;
      box-sizing: border-box;
      border: 1px solid #02aae1;
      border-radius: 0.2rem;
      margin: 0 0.1rem;
      #homePageMap {
        width: 100%;
        height: calc(100% - 0.5rem);
        margin-top: 0.1rem;
      }
    }
    .l {
      .bar,
      .line {
        width: 80%;
        height: 3rem;
        margin: 0 auto;
        #homePageBar,
        #homePageLine {
          width: 100%;
          height: calc(100% - 0.31rem);
        }
      }
      .line {
        h3 {
          width: 1.6rem;
        }
      }
    }
    .r {
      padding-left: 0.1rem;
      box-sizing: border-box;
      .table {
        .el-table {
          margin-top: 0.2rem;
          .el-table__body-wrapper {
            .el-table__body {
              tbody {
                .el-table__row {
                  background-color: #00f1fd;
                  .cell {
                    color: #000;
                  }
                }
                .el-table__row:nth-of-type(2n) {
                  background-color: #056a73;
                  .cell {
                    color: #fff;
                  }
                }
              }
            }
          }
        }
        .el-table tbody tr:hover > td {
          background-color: transparent !important;
        }
      }
      .pie {
        width: 100%;
        height: 3rem;
        padding-top: .2rem;
        box-sizing: border-box;
        #homePagePie {
          width: 100%;
          height: calc(100% - 0.31rem);
        }
      }
    }
  }
}
</style>