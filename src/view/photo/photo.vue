<template>
  <div class="photo">
    <h2 class="title">{{ $route.matched[1].name }}</h2>
    <main>
      <div class="l">
        <div class="yl">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">上传图片</el-button>
          </el-upload>
          <div class="img">
            <h3>图片预览</h3>
            <img src="" alt="" />
          </div>
        </div>
        <div class="yb">
          <el-button>开始识别</el-button>
          <div class="img">
            <h3>样本图片</h3>
            <img src="" alt="" />
          </div>
        </div>
        <div class="sb">
          <h3>识别结果</h3>
          <p>样本相似度：80%</p>
          <p>结果分析：</p>
        </div>
      </div>
      <div class="r">
        <Eltable
          :tableHead="tableHead"
          :tableDatas="tableDatas"
          :tableSettings="tableSettings"
          :search="searchs"
          @custom="custom"
          @sizeChange="sizeChange"
          @currentChange="currentChange"
        />
      </div>
    </main>
    <el-dialog title="对比详情" v-model="dialogShow" center width="30%">
      <div class="img">
        上传图片：
        <img
          src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3395578426,2267424960&fm=26&gp=0.jpg"
          alt=""
        />
      </div>
      <div class="img">
        匹配样本：
        <img
          src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3395578426,2267424960&fm=26&gp=0.jpg"
          alt=""
        />
      </div>
      <div class="sb">
        <h3>识别结果</h3>
        <p>样本相似度：80%</p>
        <p>结果分析：</p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogShow = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Eltable from '/@/components/tableCom/tableCom.vue'
export default defineComponent({
  setup() {
    const state = reactive({
      dialogShow: false,
      fileList: [],
      searchs: {
        searchCurrent: 1,
        searchSize: 5,
        searchTotal: 999
      },
      tableHead: [
        { label: '图片名称', prop: 'input' },
        { label: '识别时间', prop: 'input' },
        { label: '识别结果', prop: 'input' },
        { label: '识别设备', prop: 'input' }
      ],
      tableDatas: Array(5).fill({
        input: '123'
      }),
      tableSettings: [{ name: '对比详情', type: 'custom' }],
      //table
      custom: (val: object) => {
        console.log(val)
        state.dialogShow = true
      },
      sizeChange: (val: any) => {
        console.log(val)
      },
      currentChange: (val: any) => {
        console.log(val)
      },
      handleRemove: (file: any, fileList: any) => {
        console.log(file, fileList)
      },
      handlePreview: (file: any) => {
        console.log(file)
      },
      handleExceed: (files: any, fileList: any) => {
        console.log(files, fileList)
      },
      beforeRemove: (file: any, fileList: any) => {
        console.log(file, fileList)
      }
    })
    return state
  },
  components: { Eltable }
})
</script>
<style lang="scss">
.photo {
  .title {
    width: 1.6rem !important;
  }
  main {
    width: 100%;
    height: calc(100% - 0.34rem);
    display: flex;
    .l {
      width: 30%;
      height: 100%;
      background-color: #081720;
      border: 1px solid #293d44;
      border-radius: 0.2rem;
      padding: 0.2rem;
      box-sizing: border-box;
      .el-button {
        width: 0.5rem;
        height: 1rem;
        padding: 0.1rem;
        background-color: #053c43;
        white-space: normal;
        span {
          color: #00f3ff;
        }
      }
      .yl,
      .yb {
        display: flex;
        .el-button {
          margin-top: 0.2rem;
        }
        .img {
          width: calc(100% - 0.5rem);
          padding-left: 0.2rem;
          box-sizing: border-box;
          h3 {
            color: #fff;
            font-weight: bold;
            font-size: 0.2rem;
          }
          img {
            width: 100%;
            height: 2rem;
            border: 1px solid #fff;
          }
        }
      }
      .yl {
        .upload-demo {
          .el-upload {
            .el-button {
              border-color: #dcdfe6;
            }
          }
        }
      }
      .yb {
        margin-top: 0.2rem;
      }
      .sb {
        background: #09121c;
        border: 1px solid #293d44;
        border-radius: 0.2rem;
        padding: 0.2rem;
        box-sizing: border-box;
        margin-top: 0.2rem;
        h3 {
          color: #ffcc00;
          font-weight: bold;
          font-size: 0.2rem;
        }
        p {
          color: #fff;
          margin-top: 0.2rem;
        }
      }
    }
    .r {
      width: 70%;
      padding: 0 0.2rem;
      box-sizing: border-box;
    }
  }
  .el-overlay {
    .el-dialog {
      .el-dialog__body {
        .img {
          width: 100%;
          display: flex;
          justify-content: space-between;
          color: #fff;
          margin-bottom: 0.2rem;
          img {
            width: 80%;
            height: 2rem;
            border: 1px solid #fff;
          }
        }
        .sb {
          background: #09121c;
          border: 1px solid #293d44;
          border-radius: 0.2rem;
          padding: 0.2rem;
          box-sizing: border-box;
          margin-top: 0.2rem;
          h3 {
            color: #ffcc00;
            font-weight: bold;
            font-size: 0.2rem;
          }
          p {
            color: #fff;
            margin-top: 0.2rem;
            text-align: left !important;
            padding:0 !important;
          }
        }
      }
    }
  }
}
</style>