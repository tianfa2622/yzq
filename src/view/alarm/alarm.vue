<template>
  <div class="alarm">
    <h2 class="title">{{ $route.matched[1].name }}</h2>
    <main>
      <div class="l">
        <div class="bar">
          <h3>报警数量统计</h3>
          <div id="alarmBar"></div>
        </div>
      </div>
      <img src="/src/assets/statistical/u196.png" alt="" />
      <div class="r">
        <div class="pie">
          <h3>报警地点统计</h3>
          <div id="alarmPie"></div>
        </div>
      </div>
    </main>
    <Elsearch :searchSettings="searchSettings" @add="add" @search="search" @download="download" />
    <Eltable
      :tableHead="tableHead"
      :tableDatas="tableDatas"
      :tableSettings="tableSettings"
      :search="searchs"
      @detailed="detailed"
      @custom="custom"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
    <el-dialog :title="title" v-model="dialogShow" center>
      <Elsearch :searchSettings="dialogSearch[0]" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogShow = false">搜索</el-button>
          <el-button @click="dialogShow = false">重置</el-button>
          <el-button @click="dialogShow = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog :title="title" v-model="clickCustom" center>
      <Elsearch :searchSettings="dialogSearch[1]" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clickCustom = false">确认</el-button>
          <el-button @click="clickCustom = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog custom-class="dialogDetailed" :title="title" v-model="clickDetailed" center>
      <div class="head">
        <ul>
          <li v-for="(item, index) in dialogDetailed.arr[0]" :key="index">
            <span>{{ item.label }}</span>
            <span>{{ item.value }}</span>
          </li>
        </ul>
        <div class="img">
          <span>报警图片：</span>
          <img :src="dialogDetailed.img" alt="" />
        </div>
      </div>
      <div class="main">
        <ul>
          <li>
            <h3>事件数据</h3>
          </li>
          <li v-for="(item, index) in dialogDetailed.arr[1]" :key="index">
            <span>{{ item.label }}</span>
            <span>{{ item.value }}</span>
          </li>
        </ul>
        <ul>
          <li>
            <h3>目标区域</h3>
          </li>
          <li v-for="(item, index) in dialogDetailed.arr[2]" :key="index">
            <span>{{ item.label }}</span>
            <span>{{ item.value }}</span>
          </li>
        </ul>
      </div>
      <div class="foot">
        <ul>
          <li v-for="(item, index) in dialogDetailed.arr[3]" :key="index">
            <span>{{ item.label }}</span>
            <span>{{ item.value }}</span>
          </li>
        </ul>
        <Elsearch :searchSettings="dialogSearch[1]" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clickDetailed = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import Elsearch from '/@/components/searchCom/searchCom.vue'
import Eltable from '/@/components/tableCom/tableCom.vue'
export default defineComponent({
  setup() {
    const state = reactive({
      title: '',
      dialogShow: false,
      clickCustom: false,
      clickDetailed: false,
      searchs: {
        searchCurrent: 1,
        searchSize: 5,
        searchTotal: 999
      },
      searchSettings: [
        { placeholder: '请输入设备标识', type: 'input', value: 'yhmc' },
        { placeholder: '请输入危险物品类型', type: 'input', value: 'yhmc' },
        { placeholder: '请输入报警地点', type: 'input', value: 'yhmc' },
        { placeholder: '请输入安检报警当事人', type: 'input', value: 'yhmc' },
        { placeholder: '搜索', type: 'search' },
        { placeholder: '重置', type: 'add' },
        { placeholder: '高级筛选', type: 'download' }
      ],
      tableHead: [
        { label: '事件标识', prop: 'input' },
        { label: '设备标识', prop: 'input' },
        { label: '报警时间', prop: 'input' },
        { label: '检测目标ID', prop: 'input' },
        { label: '物品相似度', prop: 'input' },
        { label: '危险物品类型', prop: 'input' },
        { label: '报警地点', prop: 'input' }
      ],
      tableDatas: Array(5).fill({
        input: '123'
      }),
      tableSettings: [
        { name: '详情', type: 'detailed' },
        { name: '反馈结果', type: 'custom' }
      ],
      dialogSearch: [
        [
          { placeholder: '请输入', label: '事件标识：', type: 'input', value: 'yhmc' },
          { placeholder: '请输入', label: '设备标识：', type: 'input', value: 'yhmc' },
          { placeholder: '请输入', label: '设备通道号：', type: 'input', value: 'yhmc' },
          { placeholder: '请输入', label: '报警时间：', type: 'input', value: 'yhmc' },
          { placeholder: '请输入', label: '报警类别代码：', type: 'input', value: 'yhmc' },
          { placeholder: '请输入', label: '通道标识：', type: 'input', value: 'yhmc' },
          { placeholder: '请输入', label: '检测物品ID：', type: 'input', value: 'yhmc' },
          { placeholder: '请输入', label: '物品相似度：', type: 'input', value: 'yhmc' },
          { placeholder: '请输入', label: '检测物品ID：', type: 'input', value: 'yhmc' },
          { placeholder: '请输入', label: '目标数量：', type: 'input', value: 'yhmc' },
          { placeholder: '请输入', label: '危险物品类型：', type: 'input', value: 'yhmc' },
          { placeholder: '请输入', label: '报警地点：', type: 'input', value: 'yhmc' },
          { placeholder: '请输入', label: '安检报警当事人：', type: 'input', value: 'yhmc' }
        ],
        [
          {
            placeholder: '请输入处理结果',
            label: '安检处理过程：',
            type: 'textarea',
            value: 'yhmc'
          }
        ]
      ],
      dialogDetailed: {
        arr: [
          [
            {
              label: '事件标识：',
              value: '枪械报警'
            },
            {
              label: '设备标识：',
              value: 'FR-WJL001'
            },
            {
              label: '设备标识：',
              value: 'FR-WJL001'
            },
            {
              label: '设备通道号：',
              value: 'BQ003'
            },
            {
              label: '报警时间：',
              value: '2020-09-04 8:44:02'
            },
            {
              label: '报警类别代码：',
              value: 'BJLB02'
            },
            {
              label: '通道标识：',
              value: 'TD02'
            }
          ],
          [
            {
              label: '检测物品ID：',
              value: 'WP200907001'
            },
            {
              label: '物品相似度：',
              value: '70%'
            },
            {
              label: '目标数量：',
              value: '1'
            },
            {
              label: '危险物品类型：',
              value: '危险'
            }
          ],
          [
            {
              label: '目标长度：',
              value: '15CM'
            },
            {
              label: '目标宽度：',
              value: '3CM'
            },
            {
              label: '左上角横坐标：',
              value: 110
            },
            {
              label: '左上角纵坐标：',
              value: 60
            }
          ],
          [
            {
              label: '报警地点：',
              value: '万家丽地铁站'
            },
            {
              label: '安检报警当事人：',
              value: '李钟硕'
            }
          ]
        ],
        img:
          'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3384238017,4211913009&fm=26&gp=0.jpg'
      },
      //search
      add: (val: object) => {
        console.log(val)
      },
      search: (val: object) => {
        console.log(val)
      },
      download: (val: object) => {
        console.log(val)
        state.title = '高级筛选'
        state.dialogShow = true
      },
      //table
      detailed: (val: object) => {
        console.log(val)
        state.title = '报警详情'
        state.clickDetailed = true
      },
      custom: (val: object) => {
        console.log(val)
        state.title = '反馈结果'
        state.clickCustom = true
      },
      sizeChange: (val: any) => {
        console.log(val)
      },
      currentChange: (val: any) => {
        console.log(val)
      },
      //echarts
      bar: () => {
        let option = {}
        const Chart = echarts.init(document.getElementById('alarmBar') as HTMLCanvasElement)
        option = {
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#00F3FF'
              }
            },
            data: ['9-1', '9-2', '9-3', '9-4', '9-5', '9-6', '9-7']
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
      pie: () => {
        let option = {}
        const Chart = echarts.init(document.getElementById('alarmPie') as HTMLCanvasElement)
        option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            bottom: '0',
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
              radius: '60%',
              label: {
                position: 'inside',
                formatter: '{c}',
                color: '#fff'
              },
              data: [
                { value: 1048, name: '万家丽地铁站' },
                { value: 735, name: '锦泰广场地铁站' },
                { value: 580, name: '锦泰广场城轨站' },
                { value: 484, name: '芙蓉区政府地铁站' }
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
.alarm {
  main {
    width: 100%;
    display: flex;
    .l,
    .r {
      width: calc(100% - 0.01rem);
      h3,
      p {
        width: 100%;
        text-align: center;
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
      .bar {
        width: 50%;
        margin: 0 auto;
        #alarmBar {
          width: 100%;
          height: 4rem;
          float: right;
        }
      }
    }
    .r {
      justify-content: flex-start;
      padding-left: 0.2rem;
      box-sizing: border-box;
      p {
        text-align: left;
      }
      h3 {
        margin: 0.1rem 0;
      }
      .pie {
        width: 50%;
        margin: 0 auto;
        #alarmPie {
          width: 100%;
          height: 4rem;
        }
      }
    }
  }
  .searchCom {
    margin-top: 0.2rem;
    .el-form {
      justify-content: center;
      .el-form-item {
        width: 10%;
      }
    }
  }
  .tableCom {
    width: 80%;
    margin: 0 auto;
    margin-top: 0.2rem;
  }
  .el-overlay {
    .dialogDetailed {
      .el-dialog__body {
        ul {
          li {
            margin-bottom: 0.2rem;
            span:first-child {
              color: #fff;
            }
            span:last-child {
              color: #00f3ff;
            }
            h3 {
              color: #bf8c00;
              text-align: left;
            }
          }
        }
        .main,
        .head,
        .foot {
          width: 80%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
        }
        .head {
          .img {
            display: flex;
            span {
              color: #fff;
            }
            img {
              height: 2rem;
              vertical-align: top;
            }
          }
        }
        .main {
          ul:last-child {
            width: 2.7rem;
          }
        }
        .foot {
          flex-wrap: wrap;
          ul {
            width: 100%;
            display: flex;
            justify-content: space-between;
            li:last-child {
              width: 2.7rem;
            }
          }
          .searchCom {
            margin: 0;
            .el-form {
              .el-form-item {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>