<template>
  <div class="video">
    <h2 class="title">{{ $route.matched[1].name }}</h2>
    <main>
      <div class="l">
        <h2 class="title">选择设备</h2>
        <Elsearch :searchSettings="searchSettings[0]" />
        <img src="/src/assets/statistical/u961.png" alt="" />
        <Elsearch :searchSettings="searchSettings[1]" />
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox
            v-for="(item, index) in cities"
            :label="item.label"
            :key="index"
            :disabled="!item.disabled"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
        <p style="width: 80%; height: 0.01rem; margin: 0.1rem 0; background: #fff"></p>
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div class="btns">
          <el-button>确认</el-button>
          <el-button>重置</el-button>
        </div>
      </div>
      <img src="/src/assets/statistical/u196.png" alt="" />
      <div class="r">
        <h2 class="title">查看设备</h2>
        <div class="rVideos">
          <template v-for="(i, index) in rVideo" :key="index">
            <div class="rVideo" v-for="(item, index) in i" :key="index">
              <div class="rVideoTitle">
                <h3>
                  {{ item.name }}
                </h3>
                <span class="spanTrue" v-if="item.status">● 正常</span>
                <span v-else>● 未连接</span>
              </div>
              <video :src="item.src" controls preload></video>
              <div class="fVideo">
                <el-button @click="historyVideo">历史视频录像</el-button>
                <span>
                  {{ item.dz }}
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </main>
    <el-dialog :title="title" v-model="dialogShow" center width="60%">
      <Eltable
        :tableHead="tableHead"
        :tableDatas="tableDatas"
        :tableSettings="tableSettings"
        :search="searchs"
        @custom="custom"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
      />
      <el-dialog
        custom-class="innerDialog"
        :title="'回放视频：' + innerTitle"
        v-model="innerDialog"
        append-to-body
        center
        width="30%"
      >
        <video
          src="http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/2243816650/e1e970734163cf5669703f26f4c4903e.mp4?wsSecret=8b59b2438e7ec6aed32c7161848080df&wsTime=1610096217"
          controls
          preload
        ></video>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="innerDialog = false">关闭</el-button>
          </div>
        </template>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Elsearch from '/@/components/searchCom/searchCom.vue'
import Eltable from '/@/components/tableCom/tableCom.vue'
export default defineComponent({
  setup() {
    const cityOptions = [
      '万家丽地铁站-1号设备',
      '万家丽地铁站-2号设备',
      '万家丽地铁站-3号设备',
      '万家丽地铁站-4号设备',
      '万家丽地铁站-5号设备（未连接）'
    ]
    const state = reactive({
      title: '',
      innerTitle: '',
      dialogShow: false,
      innerDialog: false,
      checkAll: false,
      searchs: {
        searchCurrent: 1,
        searchSize: 5,
        searchTotal: 999
      },
      checkedCities: [
        '万家丽地铁站-1号设备',
        '万家丽地铁站-2号设备',
        '万家丽地铁站-3号设备',
        '万家丽地铁站-4号设备'
      ],
      cities: [
        { label: '万家丽地铁站-1号设备', disabled: true },
        { label: '万家丽地铁站-2号设备', disabled: true },
        { label: '万家丽地铁站-3号设备', disabled: true },
        { label: '万家丽地铁站-4号设备', disabled: true },
        { label: '万家丽地铁站-5号设备（未连接）', disabled: false }
      ],
      isIndeterminate: true,
      searchSettings: [
        [
          { placeholder: '请输入地点', type: 'input', value: 'yhmc' },
          { placeholder: '搜索', type: 'search' }
        ],
        [
          {
            placeholder: '请输入地点',
            type: 'select',
            value: 'yhmc',
            options: [{ label: '芙蓉区', value: 0 }]
          },
          {
            placeholder: '请输入地点',
            type: 'select',
            value: 'yhmc',
            options: [
              { label: '万家丽地铁站', value: 0 },
              { label: '锦泰广场地铁站', value: 1 },
              { label: '锦泰广场城轨站', value: 2 }
            ]
          }
        ]
      ],
      rVideo: [
        [
          {
            name: '万家丽地铁站-1号设备',
            dz: '万家丽地铁站',
            status: true,
            src:
              'http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/2243816650/e1e970734163cf5669703f26f4c4903e.mp4?wsSecret=8b59b2438e7ec6aed32c7161848080df&wsTime=1610096217'
          }
        ],
        [
          {
            name: '万家丽地铁站-2号设备',
            dz: '万家丽地铁站',
            status: false,
            src: ''
          }
        ],
        [
          {
            name: '万家丽地铁站-3号设备',
            dz: '万家丽地铁站',
            status: true,
            src:
              'http://vodkgeyttp8.vod.126.net/cloudmusic/mv/20180227074012/91832105-772a-4670-9a64-38aa25a44565/2f33148e731f292fc96a38ba9cce0c10.mp4?wsSecret=dd6c1d506e395ae7836ca888b9f77e18&wsTime=1610097398'
          }
        ]
      ],
      tableHead: [
        { label: '视频名称', prop: 'input' },
        { label: '上传时间', prop: 'input' },
        { label: '视频时间段', prop: 'input' },
        { label: '视频时长（分钟）', prop: 'input' },
        { label: '所属设备', prop: 'input' }
      ],
      tableDatas: Array(5).fill({
        input: '123'
      }),
      tableSettings: [{ name: '回放', type: 'custom' }],
      handleCheckAllChange: (val: any) => {
        state.checkedCities = val ? cityOptions : []
        state.isIndeterminate = false
      },
      handleCheckedCitiesChange: (val: any) => {
        let checkedCount = val.length
        state.checkAll = checkedCount === state.cities.length
        state.isIndeterminate = checkedCount > 0 && checkedCount < state.cities.length
      },
      historyVideo: () => {
        state.title = '历史视频录像'
        state.dialogShow = true
      },
      custom: (val: any) => {
        console.log(val)
        state.innerTitle = 'WJLDTZ001-20200907'
        state.innerDialog = true
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
.video {
  .title {
    width: 1.5rem !important;
  }
  main {
    width: 100%;
    height: calc(100% - 0.34rem);
    display: flex;
    justify-content: space-between;
    .title {
      width: 1rem !important;
    }
    .l {
      width: calc(20% - 0.01rem);
      .searchCom:first-of-type {
        .el-form {
          .el-form-item:first-child {
            width: 70%;
          }
        }
      }
      img {
        width: 80%;
        display: block;
        margin: 0.2rem auto 0;
      }
      .searchCom:nth-of-type(2) {
        margin-top: 0.2rem;
        .el-form {
          .el-form-item {
            width: 100%;
            margin-bottom: 0.2rem;
          }
        }
      }
      .el-checkbox-group {
        .is-checked {
          .el-checkbox__label {
            color: #00f3ff;
          }
        }
      }
      .btns {
        text-align: center;
        margin-top: 0.2rem;
        .el-button {
          background-color: #053c43;
          span {
            color: #00f3ff;
          }
        }
      }
    }
    .r {
      width: calc(80% - 0.01rem);
      padding-left: 0.2rem;
      box-sizing: border-box;
      padding: 0 0.2rem;
      box-sizing: border-box;
      .rVideos {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .rVideo {
          width: 30%;
          background-color: #072e37;
          border-radius: 0.2rem;
          padding: 0.2rem;
          box-sizing: border-box;
          .rVideoTitle {
            display: flex;
            justify-content: space-between;
            height: 0.4rem;
            line-height: 0.4rem;
            h3 {
              font-size: 0.2rem;
              color: #fff;
            }
            span {
              color: #999999;
            }
            .spanTrue {
              color: #00ff00;
            }
          }
          video {
            width: 100%;
            height: 2.2rem;
            margin: 0.1rem 0;
          }
          .fVideo {
            display: flex;
            justify-content: space-between;
            height: 0.4rem;
            line-height: 0.4rem;
            .el-button {
              background-color: #053c43;
              span {
                color: #00f3ff;
              }
            }
            span {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
.el-overlay {
  .innerDialog {
    background-color: #072e37;
    border: 1px solid #797979;
    border-radius: 0.1rem;
    .el-dialog__header {
      .el-dialog__title {
        width: 100%;
        color: #fff;
        border-bottom: 1px solid #194f5d;
        display: block;
        padding-bottom: 0.1rem;
        box-sizing: border-box;
      }
    }
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 0;
      video {
        width: 100%;
        height: 2.2rem;
      }
    }
    .el-dialog__footer {
      .dialog-footer {
        .el-button {
          width: 1rem;
          background-color: #053c43;
          span {
            color: #00f3ff;
          }
        }
      }
    }
  }
}
</style>