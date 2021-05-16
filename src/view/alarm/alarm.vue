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
    <Elsearch :searchSettings="searchSettings" @search="search" @download="download" />
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
      <Elsearch ref="seniorSearch" :searchSettings="dialogSearch[0]" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="seniorSearchBtn">搜索</el-button>
          <el-button @click="seniorReset">重置</el-button>
          <el-button @click="seniorCancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog :title="resultsTitle" v-model="clickCustom" center>
      <Elsearch ref="customForm" :searchSettings="dialogSearch[1]" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resultsConfirm">确认</el-button>
          <el-button @click="resultsCancel">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog custom-class="dialogDetailed" :title="detailsTitle" v-model="clickDetailed" center>
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
        <Elsearch ref='detailsText' :searchSettings="dialogSearch[1]" />
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
import { defineComponent, onMounted, reactive,ref,toRefs,nextTick } from 'vue'
import * as echarts from 'echarts'
import Elsearch from '/@/components/searchCom/searchCom.vue'
import Eltable from '/@/components/tableCom/tableCom.vue'
import { ElMessage } from 'element-plus';
import { Rows } from '../../types/alarm';
import { searchAll,update,searchOne,selectbjsl} from '/@/api/alarm/index'
export default defineComponent({
  setup() {
    const row = ref<{ id?: number }>({})
    const feedback = ref<{id?:number, ajclgc?:string}>({})
    const tableDatas = ref<Rows>([])
    const detailedData = ref<any>({})
    const seniorSearch = ref<InstanceType<typeof Elsearch>>()
    const customForm = ref<InstanceType<typeof Elsearch>>()
    const detailsText = ref<InstanceType<typeof Elsearch>>()
    const state = reactive({
      title: '',
      resultsTitle:'',
      detailsTitle:'',
      dialogShow: false,
      clickCustom: false,
      clickDetailed: false,
      searchs: {
        searchCurrent: 1,
        searchSize: 5,
        searchTotal: 999
      },
      searchSettings: [
        { placeholder: '请输入设备标识', type: 'input', value: 'sbbs' },
        { placeholder: '请输入危险物品类型', type: 'input', value: 'wxwplx' },
        { placeholder: '请输入报警地点', type: 'input', value: 'mbqy' },
        { placeholder: '请输入安检报警当事人', type: 'input', value: 'ajbjdsr' },
        { placeholder: '搜索', type: 'search' },
        { placeholder: '重置', type: 'reset' },
        { placeholder: '高级筛选', type: 'download' }
      ],
      tableHead: [
        { label: '事件标识', prop: 'sjbs' },
        { label: '设备标识', prop: 'sbbs' },
        { label: '报警时间', prop: 'bjsjRqsj' },
        { label: '检测目标ID', prop: 'jcmbid' },
        { label: '物品相似度', prop: 'wpxsd' },
        { label: '危险物品类型', prop: 'wxwplx' },
        { label: '报警地点', prop: 'mbqy' }
      ],
      tableSettings: [
        { name: '详情', type: 'detailed' },
        { name: '反馈结果', type: 'custom' }
      ],
      dialogSearch: [
        [
          { placeholder: '请输入', label: '事件标识：', type: 'input', value: 'sjbs' },
          { placeholder: '请输入', label: '设备标识：', type: 'input', value: 'sbbs' },
          { placeholder: '请输入', label: '设备通道号：', type: 'input', value: 'sbtdh' },
          { placeholder: '请输入', label: '报警时间：', type: 'input', value: 'bjsjRqsj' },
          { placeholder: '请输入', label: '报警类别代码：', type: 'input', value: 'bjlbdm' },
          { placeholder: '请输入', label: '通道标识：', type: 'input', value: 'tdbs' },
          { placeholder: '请输入', label: '检测目标ID：', type: 'input', value: 'jcmbid' },
          { placeholder: '请输入', label: '物品相似度：', type: 'input', value: 'wpxsd' },
          // { placeholder: '请输入', label: '检测物品ID：', type: 'input', value: 'yhmc' },
          { placeholder: '请输入', label: '目标数量：', type: 'input', value: 'mbsl' },
          { placeholder: '请输入', label: '危险物品类型：', type: 'input', value: 'wxwplx' },
          { placeholder: '请输入', label: '报警地点：', type: 'input', value: 'mbqy' },
          { placeholder: '请输入', label: '安检报警当事人：', type: 'input', value: 'ajbjdsr' }
        ],
        [
          {
            placeholder: '请输入处理结果',
            label: '安检处理过程：',
            type: 'textarea',
            value: 'ajclgc',
            disabled:true
          }
        ]
      ],
      dialogDetailed: {
        arr: [
          [
            {
              label: '事件标识：',
              value: '枪械报警',
              name:'sjbs'
            },
            {
              label: '设备标识：',
              value: 'FR-WJL001',
              name:'sbbs'
            },
            {
              label: '设备通道号：',
              value: 'BQ003',
              name:'sbtdh'
            },
            {
              label: '报警时间：',
              value: '2020-09-04 8:44:02',
              name:'bjsjRqsj'
            },
            {
              label: '报警类别代码：',
              value: 'BJLB02',
              name:'bjlbdm'
            },
            {
              label: '通道标识：',
              value: 'TD02',
              name:'tdbs'
            }
          ],
          [
            {
              label: '检测物品ID：',
              value: 'WP200907001',
              name:'jcmbid'
            },
            {
              label: '物品相似度：',
              value: '70%',
              name:'wpxsd'
            },
            {
              label: '目标数量：',
              value: 1,
              name:'mbsl'
            },
            {
              label: '危险物品类型：',
              value: 1,
              name:'wxwplx'
            }
          ],
          [
            {
              label: '目标长度：',
              value: 15,
              name:'mbcd'
            },
            {
              label: '目标宽度：',
              value: 3,
              name:'mbkd'
            },
            {
              label: '左上角横坐标：',
              value: 110,
              name:'zsjhzb'
            },
            {
              label: '左上角纵坐标：',
              value: 60,
              name:'zsjzzb'
            }
          ],
          [
            {
              label: '报警地点：',
              value: '万家丽地铁站',
              name:'mbqy'
            },
            {
              label: '安检报警当事人：',
              value: '李钟硕',
              name:'ajbjdsr'
            }
          ]
        ],
        img:
          'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3384238017,4211913009&fm=26&gp=0.jpg'
      },
      //search
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
      // 筛选按钮
      download: (val: object) => {
        console.log(val)
        state.title = '高级筛选'
        state.dialogShow = true
      },
      // 高级搜索按钮
      seniorSearchBtn:()=>{
        if (seniorSearch.value) {
          const data = seniorSearch.value.formDatas
          state.search(data)
        }
        state.dialogShow = false
        seniorSearch.value?.reset()
      },
      // 高级重置按钮
      seniorReset:()=>{
        if (seniorSearch.value) {
          seniorSearch.value.reset()
        }
      },
      // 高级取消按钮
      seniorCancel:()=>{
        state.dialogShow = false
        setTimeout(() => {
          if (seniorSearch.value) {
            seniorSearch.value.reset()
          }
        }, 1000);
      },
      // 根据ID查询
      searchOne: async (id:number)=>{
        try {
          const res = await searchOne(id)
          if (res.code === 1) {
            const data =res.data
            return data
          }
        } catch (error) {
          console.log(error) 
        }
      },
       //table

      // 转换方法
      conversion: (data:any,dataKey:any)=>{
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < dataKey.length; j++) {
              if (data[i].name == dataKey[j].key ) {
                data[i].value=dataKey[j].data
              }
            }
          }
      },
      // 处理数据
      DataProcessing:(data:any)=>{
        const dataKey=[]
          for (const key in data) {
            let obj:any = {}
            obj.key=key
            obj.data = data[key]
            dataKey.push({...obj})
          }
          let dialgData = state.dialogDetailed.arr[0]
          let dialgData1 = state.dialogDetailed.arr[1]
          let dialgData2 = state.dialogDetailed.arr[2]
          let dialgData3 = state.dialogDetailed.arr[3]
          state.conversion(dialgData,dataKey)
          state.conversion(dialgData1,dataKey)
          state.conversion(dialgData2,dataKey)
          state.conversion(dialgData3,dataKey)
      },
      // 详情按钮
      detailed: async (val: any) => {
        // console.log(val)
        state.detailsTitle = '报警详情'
        detailedData.value = await state.searchOne(val.id)
        if (detailedData.value) {
          const data = detailedData.value
          state.clickDetailed = true
          state.DataProcessing(data)
          nextTick(()=>{
            if (detailsText.value) {
              detailsText.value.formDatas = { ajclgc: data.ajclgc}
            }
          })
        }
      },
      // 反馈结果
      custom: async (val: any) => {
        // console.log(val)
        state.resultsTitle = '反馈结果'
        const data =await state.searchOne(val.id)
        console.log(data)
        if (data) {
          state.clickCustom = true
          nextTick(()=>{
            if (customForm.value) {
              customForm.value.formDatas = {...data}
            }
          })
        }
      },
      // 更新反馈API
      updateAPI:async(data:any)=>{
        try {
          const  res  = await update(data)
            ElMessage.success({
              message: res.message || '修改成功',
              type: 'success'
            })
            state.clickCustom = false
            customForm.value?.reset()
            state.search()
          } catch (err) {
            console.log(err)
          }
      },
      // 反馈确定按钮
      resultsConfirm:()=>{
        if (customForm.value) {
          feedback.value=customForm.value.formDatas
          const data:any = {}
          data.id=feedback.value.id
          data.ajclgc=feedback.value.ajclgc
          customForm.value.validate(async(valid:boolean)=>{
            state.updateAPI({...data})
          })
        }
      },
      // 反馈取消按钮
      resultsCancel:()=>{
        state.clickCustom =false
        setTimeout(() => {
          if (customForm.value) {
            customForm.value.reset()
          }
        }, 1000);
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
      state.search()
    })
    return {
      ...toRefs(state),
      seniorSearch,
      row,
      tableDatas,
      customForm,
      feedback,
      detailedData,
      detailsText
    }
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